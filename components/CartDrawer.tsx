
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-widest">Your Bag ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-500 italic mb-4">Your shopping bag is empty.</p>
              <button 
                onClick={onClose}
                className="bg-stone-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-24 h-32 bg-stone-100 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-stone-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-stone-200 space-x-3 px-2 py-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-stone-500 disabled:opacity-30" disabled={item.quantity <= 1}>-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-stone-500">+</button>
                    </div>
                    <p className="text-sm font-bold">${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-stone-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 uppercase tracking-widest text-xs">Total</span>
              <span className="text-xl font-bold">${total}</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
              Secure Checkout
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-4 uppercase tracking-[0.2em]">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
