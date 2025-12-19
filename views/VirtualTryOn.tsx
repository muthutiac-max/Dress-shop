
import React, { useState, useRef } from 'react';
import { Dress } from '../types';
import { performVirtualTryOn } from '../services/geminiService';

interface VirtualTryOnProps {
  initialDress: Dress | null;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ initialDress }) => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<Dress | null>(initialDress);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!userPhoto || !selectedDress) return;

    setIsProcessing(true);
    try {
      // In a real app, we would fetch the dress image and convert to base64
      // For this demo, we assume the provided initial image URL is accessible 
      // or we use a placeholder that works with the prompt.
      // Note: Getting base64 of external images needs CORS handling or local proxies.
      const dressBase64 = await fetchImageAsBase64(selectedDress.image);
      const result = await performVirtualTryOn(userPhoto, dressBase64);
      if (result) {
        setResultImage(result);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the AI transformation. Please check your API key and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchImageAsBase64 = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">AI Magic Mirror</h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          Upload your portrait and see yourself in our finest couture instantly. 
          Experience the ultimate fitting room from anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1: User Photo */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">1</span>
            <h3 className="font-bold uppercase tracking-widest text-sm">Your Photo</h3>
          </div>
          <div 
            className="aspect-[3/4] border-2 border-dashed border-stone-200 bg-stone-50 rounded-lg flex flex-col items-center justify-center overflow-hidden group transition-colors hover:border-stone-400 cursor-pointer relative"
            onClick={() => fileInputRef.current?.click()}
          >
            {userPhoto ? (
              <img src={userPhoto} className="w-full h-full object-cover" alt="User" />
            ) : (
              <div className="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium text-stone-500">Click to upload your portrait</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2">Best with neutral backgrounds</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoUpload}
            />
          </div>
          {userPhoto && (
             <button 
              onClick={() => setUserPhoto(null)}
              className="w-full text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              Replace Photo
            </button>
          )}
        </div>

        {/* Step 2: Selected Dress */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">2</span>
            <h3 className="font-bold uppercase tracking-widest text-sm">Selected Style</h3>
          </div>
          {selectedDress ? (
            <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden group">
              <img src={selectedDress.image} className="w-full h-full object-cover" alt={selectedDress.name} />
              <div className="p-4 bg-white/90 backdrop-blur-sm -mt-16 relative">
                <h4 className="font-bold text-sm">{selectedDress.name}</h4>
                <p className="text-xs text-stone-500">${selectedDress.price}</p>
              </div>
            </div>
          ) : (
             <div className="aspect-[3/4] bg-stone-100 rounded-lg flex items-center justify-center p-8 text-center border border-stone-200">
               <p className="text-sm text-stone-400 font-medium italic">Please select a dress from our collection first</p>
             </div>
          )}
          <button 
            disabled={!userPhoto || !selectedDress || isProcessing}
            onClick={handleProcess}
            className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all disabled:opacity-30 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Weaving Magic...</span>
              </>
            ) : (
              <span>Generate Preview</span>
            )}
          </button>
        </div>

        {/* Step 3: Result */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">3</span>
            <h3 className="font-bold uppercase tracking-widest text-sm">The Result</h3>
          </div>
          <div className="aspect-[3/4] bg-stone-200 rounded-lg overflow-hidden relative shadow-inner">
            {resultImage ? (
              <img src={resultImage} className="w-full h-full object-cover animate-fadeIn" alt="Virtual Try-on Result" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-8 text-center">
                {isProcessing ? (
                   <div className="space-y-4">
                     <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center animate-pulse mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                     </div>
                     <p className="text-xs uppercase tracking-widest animate-pulse">Our AI Stylist is tailoring your preview...</p>
                   </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm italic">Generate a preview to see it here.</p>
                  </>
                )}
              </div>
            )}
          </div>
          {resultImage && (
            <div className="flex space-x-4">
              <button className="flex-grow border border-stone-200 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors">
                Save Image
              </button>
              <button className="flex-grow bg-stone-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
                Share Look
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
