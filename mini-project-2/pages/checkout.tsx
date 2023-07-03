import NavigationBar from "../src/app/components/NavBar";
import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import InputMask from "react-input-mask";
import styles from "../src/app/page.module.css";
import "../public/bootstrap.min.css";
import { CartContext } from "../src/app/components/CartContext";
import Link from "next/link";
import { Badge } from "react-bootstrap";
import Head from "next/head";

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const shippingCostPerItem = 2;
  const numberOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost = shippingCostPerItem * numberOfItems;
  const totalWithShipping = parseFloat(total) + shippingCost;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Process checkout data here
    console.log({
      address,
      city,
      state,
      zip,
      cardNumber,
      expiryDate,
      cvv,
      cart,
      total,
    });

    // Reset form
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

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
          <Col>
            <h3 className={styles.aboutTitle}>Shipping Information</h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="address">
                <Form.Label className={styles.checkoutText}>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label className={styles.checkoutText}>City</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label className={styles.checkoutText}>State</Form.Label>
                <Form.Control
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="zip">
                <Form.Label className={styles.checkoutText}>Zip</Form.Label>
                <Form.Control
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </Form.Group>
              <h3 className={styles.aboutTitle}>Payment Information</h3>
              <Form.Group controlId="cardNumber">
                <Form.Label className={styles.checkoutText}>Card Number</Form.Label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                >
                  {(inputProps) => (
                    <Form.Control type="text" {...inputProps} required />
                  )}
                </InputMask>
              </Form.Group>
              <Form.Group controlId="expiryDate">
                <Form.Label className={styles.checkoutText}>Expiry Date</Form.Label>
                <InputMask
                  mask="99/99"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                >
                  {(inputProps) => (
                    <Form.Control type="text" {...inputProps} required />
                  )}
                </InputMask>
              </Form.Group>
              <Form.Group controlId="cvv">
                <Form.Label className={styles.checkoutText}>CVV</Form.Label>
                <InputMask
                  mask="999"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                >
                  {(inputProps) => (
                    <Form.Control type="text" {...inputProps} required />
                  )}
                </InputMask>
              </Form.Group>
              <Button className={styles.completePurchaseBtn}variant="primary" type="submit">
                Complete Purchase
              </Button>
            </Form>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={styles.aboutTitle}>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  {cart.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col xs={2}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col xs={6}>{item.title}</Col>
                        <Col xs={3}>
                          x{item.quantity} - ${item.price * item.quantity}
                        </Col>
                        <Col xs={1}>
                          <Button
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                          >
                            X
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Text className={styles.checkoutTotalText}>
                  <Badge bg="warning">
                    Shipping: ${shippingCost.toFixed(2)}
                  </Badge>
                </Card.Text>
                <Card.Text className={styles.checkoutTotalText}>
                  <Badge bg="success">
                    Total: ${totalWithShipping.toFixed(2)}
                  </Badge>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
