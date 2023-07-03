// Navbar.jsx
import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import classNames from "classnames";
import styles from "../page.module.css";
import useSWR from "swr"
import Link from 'next/link';
import { useRouter } from "next/navigation";

function NavigationBar({ onSearch, onCategoryChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('');
  const router = useRouter();
  const { data, error } = useSWR('https://fakestoreapi.com/products');

  const navbarClass = classNames(styles.navbarClass, "custom-navbar");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Redirect to allProducts with the search query as a URL parameter
    if (router.pathname !== "/allProducts") {
      router.push({
        pathname: '/allProducts',
        query: { search: query },
      });
    }

    // call onSearch passed from the Home component
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleCategoryClick = (category) => {
    let realCategory = "";
    switch (category) {
      case "clothing":
        realCategory = ["men's clothing", "women's clothing"];
        break;
      case "jewelry":
        realCategory = "jewelery";
        break;
      default:
        realCategory = category;
        
    }
  
    if (onCategoryChange) {
      onCategoryChange(realCategory);
    }
  };

 const handleImageClick = (category) => {
    let categoryParam = Array.isArray(category) ? category.join(',') : category;
    router.push({pathname: `/allProducts`, query: {category: categoryParam}});
};




  const fetcher = (url) => fetch(url).then((res) => res.json());
const { data: products} = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );
  

  const handleNavItemClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    // Set the initial active page based on the current URL
    const path = window.location.pathname;
    const currentPage = path === "/" ? "products" : path.substring(1);
    setActivePage(currentPage);
  }, []);

  return (
   
    <Navbar expand="lg" className={navbarClass}>
      <Container fluid>
        <Navbar.Brand>F A U X</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className={`${styles.nav} me-auto my-2 my-lg-0`} navbarScroll>
            <Nav.Link href="/home"
            onClick={() => handleNavItemClick('home')}
            className={activePage === 'home' ? 'active' : ''}
            >Home</Nav.Link>
            <Nav.Link href="/allProducts"
            onClick={() => handleNavItemClick('products')}
            className={activePage === 'allProducts' ? 'active' : ''}>All Products</Nav.Link>
            <NavDropdown
              title="Categories"
              id="navbarScrollingDropdown"
              menuVariant="dark"
              renderMenuOnMount
            >
              <NavDropdown.Item  onClick={() => {
                  handleCategoryClick('clothing');
                  handleNavItemClick('clothing');
                  handleImageClick("women's clothing");
                }}
                className={activePage === 'clothing' ? 'active' : ''}>Clothing</NavDropdown.Item>
<NavDropdown.Item onClick={() => {
                  handleCategoryClick('electronics');
                  handleNavItemClick('electronics');
                  handleImageClick('electronics');
                }}
                className={activePage === 'electronics' ? 'active' : ''}>Electronics</NavDropdown.Item>
<NavDropdown.Item onClick={() => {
                  handleCategoryClick('jewelry');
                  handleNavItemClick('jewelry');
                  handleImageClick('jewelery');
                }}
                className={activePage === 'jewelry' ? 'active' : ''}>Jewelry</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about"
            onClick={() => handleNavItemClick('about')}
              className={activePage === 'about' ? 'active' : ''}
            >About</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            />
          
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;