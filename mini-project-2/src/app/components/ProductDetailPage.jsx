import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Button, Badge, Container, ListGroup, Image } from 'react-bootstrap';
import AddToCart from './AddToCart';
import NavigationBar from '../components/NavBar';
import styles from '../page.module.css';
import "../../../public/bootstrap.min.css"
import Cart from "./Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Mock reviews data
const mockReviews = [
  {
    name: 'John Doe',
    review: 'Great product! Loved it.'
  },
  {
    name: 'Jane Smith',
    review: 'The quality is really good for the price.'
  }
];

const ProductDetailPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [showCart, setShowCart] = useState(false) 
  const cartContainerRef = useRef(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <span className={styles.loadingText}>Loading product details...</span>
      </div>
    )
  }

  const adjustCartContainerHeight = () => {
    if (cartContainerRef.current) {
      const containerHeight = cartContainerRef.current.scrollHeight
      cartContainerRef.current.style.height = `${containerHeight}px`
    }
  }



  return (
    <div className={styles.container}>
      <Container>
        <h1 className={styles.heading}>F A U X</h1>
        <NavigationBar/>
        <Link href="/">
          <Button variant="light" style={{border: "2.5px solid black" }} className={styles.backButton}>Back to Products</Button>
        </Link>
        <Row className={styles.productRow}>
          <Col md={6}>
            <Image
              src={product.image}
              alt={product.title}
              fluid
              className={styles.detailedProductImage}
            />
          </Col>
          <Col md={6}>
            <div className={styles.detailedProductDetails}>
              <h2 className={styles.detailedProductTitle}>{product.title}</h2>
              <Badge pill bg="success" style={{ fontSize: '15px', marginBottom: "20px", border: "1.5px solid black" }}>{product.category}</Badge>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.priceCard}>
                <Card.Body>
                  <Card.Title className={styles.productPrice}>${product.price}</Card.Title>
                  <Card.Text className={styles.productRating}>Rating: {product.rating.rate} / 5</Card.Text>
                  <AddToCart product={product} openCart={() => setShowCart(true)} />
                </Card.Body>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={styles.reviewRow}>
          <Col>
            <h3 className={styles.reviewTitle}>Reviews</h3>
            <ListGroup className={styles.reviewList}>
              {mockReviews.map((review, index) => (
                <ListGroup.Item key={index} className={styles.reviewItem}>
                  <strong className={styles.reviewName}>{review.name}</strong>: {review.review}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className={styles.cartIcon} onClick={() => setShowCart(!showCart)}>
              <FontAwesomeIcon icon={faShoppingCart} size='2x' />
            </div>
            {showCart && (
              <div ref={cartContainerRef} className={styles.cartContainer}>
                <Cart/>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
