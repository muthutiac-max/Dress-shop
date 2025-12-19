
import React from 'react';
import { Dress } from '../types';

interface ProductCardProps {
  dress: Dress;
  onAddToCart: (dress: Dress) => void;
  onTryOn: (dress: Dress) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ dress, onAddToCart, onTryOn }) => {
  return (
    <div className="group relative">
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4 rounded-sm relative">
        <img 
          src={dress.image} 
          alt={dress.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
           <button 
            onClick={() => onTryOn(dress)}
            className="bg-white text-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors"
          >
            Virtual Try-On
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-stone-900 mb-1">{dress.name}</h3>
          <p className="text-xs text-stone-500 uppercase tracking-widest">{dress.category}</p>
        </div>
        <p className="text-sm font-bold">${dress.price}</p>
      </div>
      <button 
        onClick={() => onAddToCart(dress)}
        className="mt-3 w-full border border-stone-200 py-2 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
      >
        Add to Bag
      </button>
    </div>
  );
};

export default ProductCard;
