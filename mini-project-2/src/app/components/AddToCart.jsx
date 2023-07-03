// AddToCart.jsx
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from './CartContext';
import styles from "../page.module.css"



const AddToCart = ({ product, openCart }) => {
  const { addToCart, cart } = useContext(CartContext);
  useEffect(() => {
}, [cart]);
  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };
  
  return (
    <Button variant="primary" className={styles.addToCartBtn} onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
