import React, { useContext } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import styles from "../page.module.css";
import { CartContext } from "./CartContext";
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveClick = (productId) => {
    removeFromCart(productId);
  };

  const router = useRouter();

  const handleCheckoutClick = () => {
    router.push('/checkout'); // Navigate to the checkout page
  };

  return (
    <div>
      <h2 className={styles.cartTitle}>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <Card.Title>{item.title} x {item.quantity}</Card.Title>
                <Card.Img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "80px", height: "80px" }}
                />
                <Card.Text>${item.price * item.quantity}</Card.Text>
                <Button
                 className={styles.removeBtn}
              
                  size="sm"
                  onClick={() => handleRemoveClick(item.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className={styles.totalContainer}>
            <span className={styles.totalText}>Total:</span>
            
            <Badge className={styles.cartCheckoutTotalText} bg="success">${total.toFixed(2)}</Badge>
            <div className={styles.checkoutContainer}>
              <Button variant="success" onClick={handleCheckoutClick} className={styles.checkoutBtn}>
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;