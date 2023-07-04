//home.jsx
import React, { useState, useRef } from "react";
import NavigationBar from "../src/app/components/NavBar";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../src/app/page.module.css";
import "../public/bootstrap.min.css"
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Cart from "../src/app/components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

const HomePage = () => {
  const { data: products, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );
  const categories = ["", "clothing", "electronics", "jewelry"];
  const [showCart, setShowCart] = useState(false);
  const cartContainerRef = useRef(null);
  const router = useRouter(); // get the router instance

  const handleImageClick = (category) => {
    // router.push(`/products?category=${category}`);
    router.push({pathname:`/allProducts`, query:{category:category},});
  };

  if (error) return <div>Failed to load</div>;
  if (!products) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <span className={styles.loadingText}>Loading products...</span>
      </div>
    );
  }

  // Get the product with ID 14
  const product14 = products.find((product) => product.id === 14);
  const product6 = products.find((product) => product.id === 7);
  const product16 = products.find((product) => product.id === 16);
  const product3 = products.find((product) => product.id === 3);
  
  // Create an array of products with the first three products and product 14
  const limitedProducts = [product16, product3, product14, product6];

  const imageCaptions = [
    "Women's Clothing",
    "Men's Clothing",
    "Electronics",
    "Jewellery",
  ];

  return (
    <div className={styles.container}>
      <Head>
      <title>FAUX</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
      <Container>
        <Link className={styles.headingLink} href="/allProducts">
          <h1 className={styles.heading}>F A U X</h1>
        </Link>
        <NavigationBar />
        <Row>
          {limitedProducts.map((product, index) => (
            <Col md={6} key={product.id}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.homeProductImage}
                  onClick={() => handleImageClick(product.category)} // add this line
                />
                <div className={styles.imageCaption}>
                  {imageCaptions[index]}
                </div>
              </div>
              <div
                className={styles.cartIcon}
                onClick={() => setShowCart(!showCart)}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
              </div>
              {showCart && (
                <div ref={cartContainerRef} className={styles.cartContainer}>
                  <Cart />
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
