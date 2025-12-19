
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getStylistResponse } from '../services/geminiService';

const AIStylist: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Lumière Couture. I am Lumi, your personal fashion stylist. How can I assist you in finding the perfect dress today?", suggestions: ["Summer wedding guest dresses", "Formal evening gowns", "What's trending now?"] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const responseText = await getStylistResponse(text, history);
      const modelMsg: ChatMessage = { role: 'model', text: responseText || "I apologize, I'm having trouble connecting to my creative archives. Please try again." };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error. Please ensure your API key is configured." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 h-[calc(100vh-160px)] flex flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Personal AI Stylist</h2>
        <p className="text-stone-500 italic">Curated advice, instantly tailored to you.</p>
      </div>

      <div className="flex-grow bg-white border border-stone-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-6 py-4 text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-stone-900 text-white rounded-tr-none' 
                  : 'bg-stone-100 text-stone-800 rounded-tl-none'
              }`}>
                {m.text}
                {m.suggestions && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.suggestions.map((s, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="bg-white/50 hover:bg-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-stone-600 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-stone-100 text-stone-400 rounded-2xl rounded-tl-none px-6 py-4">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex space-x-4"
          >
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Lumi for advice..."
              className="flex-grow bg-white border border-stone-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <button 
              disabled={!input.trim() || isTyping}
              className="bg-stone-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIStylist;
