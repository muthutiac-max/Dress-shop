
import React, { useState } from 'react';
import { Dress, View } from '../types';
import { DRESSES } from '../constants';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  onAddToCart: (dress: Dress) => void;
  onNavigateToTryOn: (dress: Dress) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart, onNavigateToTryOn }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Evening', 'Casual', 'Summer', 'Formal'];
  const filteredDresses = activeCategory === 'All' 
    ? DRESSES 
    : DRESSES.filter(d => d.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 mb-2 block font-bold">Lumière Collections</span>
          <h2 className="text-4xl font-bold tracking-tight">Elegance Defined</h2>
        </div>
        <div className="flex overflow-x-auto pb-2 space-x-6 text-xs font-bold uppercase tracking-widest text-stone-400 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 border-b-2 transition-all whitespace-nowrap ${activeCategory === cat ? 'text-stone-900 border-stone-900' : 'border-transparent hover:text-stone-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredDresses.map(dress => (
          <ProductCard 
            key={dress.id} 
            dress={dress} 
            onAddToCart={onAddToCart}
            onTryOn={onNavigateToTryOn}
          />
        ))}
      </div>

      {filteredDresses.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-stone-500 italic">No dresses found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
