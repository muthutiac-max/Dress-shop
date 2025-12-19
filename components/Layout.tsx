
import React, { useState } from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
  toggleCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, cartCount, toggleCart }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold tracking-tighter cursor-pointer" 
              onClick={() => onNavigate(View.Home)}
            >
              LUMIÈRE <span className="font-light italic">Couture</span>
            </h1>
            <nav className="hidden md:flex space-x-6 text-sm font-medium uppercase tracking-widest text-stone-600">
              <button 
                onClick={() => onNavigate(View.Shop)}
                className={`hover:text-stone-900 transition-colors ${currentView === View.Shop ? 'text-stone-900 border-b-2 border-stone-900' : ''}`}
              >
                Collections
              </button>
              <button 
                onClick={() => onNavigate(View.Stylist)}
                className={`hover:text-stone-900 transition-colors ${currentView === View.Stylist ? 'text-stone-900 border-b-2 border-stone-900' : ''}`}
              >
                AI Stylist
              </button>
              <button 
                onClick={() => onNavigate(View.TryOn)}
                className={`hover:text-stone-900 transition-colors ${currentView === View.TryOn ? 'text-stone-900 border-b-2 border-stone-900' : ''}`}
              >
                Virtual Try-On
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-stone-700 hover:text-stone-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-stone-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-stone-100 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold tracking-tighter mb-4">LUMIÈRE <span className="font-light italic">Couture</span></h2>
              <p className="text-stone-500 max-w-sm">
                Redefining the digital shopping experience with artificial intelligence. 
                Experience the future of fashion today.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Customer Care</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>Sizing Guide</li>
                <li>Gift Cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">The Brand</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li>Our Story</li>
                <li>Sustainability</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-200 text-center text-stone-400 text-xs uppercase tracking-widest">
            &copy; 2024 Lumière Couture. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
