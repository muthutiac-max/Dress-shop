
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStylistResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
    config: {
      systemInstruction: `You are Lumi, a world-class fashion stylist for Lumière Couture. 
      You help customers find the perfect dress based on their body type, skin tone, occasion, or current fashion trends. 
      Always be elegant, encouraging, and sophisticated. 
      If a user asks for recommendations, suggest styles from our categories: Evening, Casual, Summer, Formal.
      Keep responses concise and helpful.`,
    }
  });
  return response.text;
};

export const performVirtualTryOn = async (userPhotoBase64: string, dressImageBase64: string) => {
  const ai = getAI();
  
  // Clean up base64 strings if they include data:image prefix
  const cleanUserPhoto = userPhotoBase64.split(',')[1] || userPhotoBase64;
  const cleanDressImage = dressImageBase64.split(',')[1] || dressImageBase64;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: cleanUserPhoto,
            mimeType: 'image/jpeg'
          }
        },
        {
          inlineData: {
            data: cleanDressImage,
            mimeType: 'image/jpeg'
          }
        },
        {
          text: 'Modify the first image to make the person wear the dress shown in the second image. Maintain the person\'s pose and background. The output should be a high-quality visualization.'
        }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
