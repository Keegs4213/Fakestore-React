// CartContext.jsx
import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // On initial load, try to get the cart from localStorage
  useEffect(() => {
    const localCart = window.localStorage.getItem('cart');
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);



  const addToCart = (product) => {
    // Check if product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, update the quantity
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If product doesn't exist, add it to the cart with quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    
    if (product.quantity > 1) {
      // If product quantity is more than 1, decrease the quantity
      setCart(cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      // If product quantity is 1, remove the product from the cart
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};