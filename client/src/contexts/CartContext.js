import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map(item =>
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
