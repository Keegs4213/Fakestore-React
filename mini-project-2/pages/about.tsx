import NavigationBar from "../src/app/components/NavBar";
import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../src/app/page.module.css";
import "../public/bootstrap.min.css";
import Link from "next/link";
import Cart from "../src/app/components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

const AboutPage = () => {
  const [showCart, setShowCart] = useState(false);
  const cartContainerRef = useRef(null);

  return (
    <div className={styles.container}>
      <Container>
        <Head>
          <title>FAUX</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Link className={styles.headingLink} href="/allProducts">
          <h1 className={styles.heading}>F A U X</h1>
        </Link>
        <NavigationBar />
        <Row>
          <Col>
            <h2 className={styles.aboutTitle}>About</h2>
            <div className={styles.aboutContainer}>
              <p className={styles.aboutText}>
                <u> F A U X: Adjective</u>
                <br></br>
                made in imitation; artificial.<br></br>
                "a rope of faux pearls"<br></br>
                not genuine; fake or false.
                <br></br>
                <br></br>F A U X is your one stop shop for all your fake product
                needs! We started with a simple idea: to make high-quality,
                beautifully designed fake products unavailable for every
                shopper!
                <br></br>
                <br></br>
                Built using the FakeStoreAPI: <br></br>https://fakestoreapi.com/products<br></br>
                https://fakestoreapi.com/docs
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className={styles.aboutTitle}>Contact Us</h2>
            <Form>
              <Form.Group controlId="name">
                <Form.Label className={styles.contactTitle}>Name</Form.Label>
                <Form.Control
                  className={styles.contactForm}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className={styles.contactTitle}>Email</Form.Label>
                <Form.Control
                  className={styles.contactForm}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label className={styles.contactTitle}>Message</Form.Label>
                <Form.Control
                  className={styles.contactForm}
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>
              <Button
                className={styles.contactButton}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className={styles.cartIcon} onClick={() => setShowCart(!showCart)}>
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
      </div>
      {showCart && (
        <div ref={cartContainerRef} className={styles.cartContainer}>
          <Cart />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
