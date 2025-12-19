
import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <img 
          src="https://picsum.photos/id/445/1920/1080" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter drop-shadow-lg">
            Elegance <span className="font-light italic">Evolved</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-stone-100 font-light tracking-wide leading-relaxed">
            Discover a curated collection of exquisite dresses. 
            Powered by AI to find your unique silhouette.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => onNavigate(View.Shop)}
              className="bg-white text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-all transform hover:scale-105"
            >
              Explore Collection
            </button>
            <button 
              onClick={() => onNavigate(View.Stylist)}
              className="bg-transparent border-2 border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-stone-900 transition-all transform hover:scale-105"
            >
              Talk to Lumi
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Curated Themes</h2>
          <button 
            onClick={() => onNavigate(View.Shop)}
            className="text-stone-500 hover:text-stone-900 text-xs uppercase tracking-widest border-b border-stone-300 pb-1"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'The Evening Gala', img: 'https://picsum.photos/id/64/800/1000', label: 'Evening' },
            { title: 'Linen & Light', img: 'https://picsum.photos/id/158/800/1000', label: 'Summer' },
            { title: 'Modern Formal', img: 'https://picsum.photos/id/118/800/1000', label: 'Formal' }
          ].map((cat, i) => (
            <div key={i} className="group cursor-pointer relative overflow-hidden aspect-[4/5]" onClick={() => onNavigate(View.Shop)}>
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">{cat.label}</span>
                <h3 className="text-2xl font-bold tracking-tight group-hover:translate-y-[-4px] transition-transform">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Promotion Section */}
      <section className="bg-stone-900 text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800/50 skew-x-[-15deg] translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              A New Way to <br />
              <span className="font-light italic">See Yourself.</span>
            </h2>
            <p className="text-stone-400 text-lg mb-10 max-w-md font-light leading-relaxed">
              Our AI Try-On technology allows you to visualize any dress on your own photo instantly. 
              No more guessing, just pure digital perfection.
            </p>
            <button 
              onClick={() => onNavigate(View.TryOn)}
              className="bg-stone-100 text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:translate-x-2"
            >
              Try It On Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-[500px] border-[12px] border-stone-800 rounded-[3rem] shadow-2xl overflow-hidden">
               <img src="https://picsum.photos/id/321/400/800" className="w-full h-full object-cover" alt="AI Demo" />
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
                 <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
