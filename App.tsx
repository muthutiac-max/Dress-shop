
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Home from './views/Home';
import Shop from './views/Shop';
import AIStylist from './views/AIStylist';
import VirtualTryOn from './views/VirtualTryOn';
import CartDrawer from './components/CartDrawer';
import { View, Dress, CartItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tryOnDress, setTryOnDress] = useState<Dress | null>(null);

  const navigateToView = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const addToCart = (dress: Dress) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dress.id);
      if (existing) {
        return prev.map(item => 
          item.id === dress.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dress, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleTryOn = (dress: Dress) => {
    setTryOnDress(dress);
    navigateToView(View.TryOn);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <Home onNavigate={navigateToView} />;
      case View.Shop:
        return <Shop onAddToCart={addToCart} onNavigateToTryOn={handleTryOn} />;
      case View.Stylist:
        return <AIStylist />;
      case View.TryOn:
        return <VirtualTryOn initialDress={tryOnDress} />;
      default:
        return <Home onNavigate={navigateToView} />;
    }
  };

  return (
    <div className="antialiased text-stone-900 bg-stone-50 selection:bg-stone-900 selection:text-white">
      <Layout 
        currentView={currentView} 
        onNavigate={navigateToView} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      >
        {renderView()}
      </Layout>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
