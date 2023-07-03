//pages.tsx
'use client'
import React, { useState, useEffect, useRef, useContext } from 'react'
import useSWR from 'swr'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import MyApp from '../../pages/_app'
import "../../public/bootstrap.min.css"
import styles from './page.module.css'
import AddToCart from './components/AddToCart'
import Cart from './components/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ProductDetailPage from './components/ProductDetailPage'
import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import NavigationBar from "./components/NavBar"
import PaginationBootstrap from "./components/Pagination"
import { CartContext } from './components/CartContext'
import { CartProvider } from './components/CartContext'
import Head from 'next/head'



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('https://fakestoreapi.com/products', fetcher)
  const [showCart, setShowCart] = useState(false) 
  const cartContainerRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(1)
  const [productsPerPage] = useState(9) 
  const router = useRouter() 
  const [selectedCategory, setSelectedCategory] = useState('') 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  
  let category = '';
// if (router.isReady) {
//     category = router.query.category;
// }

console.log(category)

useEffect(() => {
    adjustCartContainerHeight()
    if (data && data.length > 0) {
        // If there's a category in the URL, filter the products based on this category
        if (category) {
            setFilteredData(data.filter((item) => item.category === category));
        } else {
            setFilteredData(data);
        }
    }
}, [data, category]) // Add category to the dependency array

 

  const handleCategoryChange = (newCategory) => {
    // If newCategory is an array, set selected category to that array
    // If newCategory is a single string, set selected category to an array with that string
    setSelectedCategory(Array.isArray(newCategory) ? newCategory : [newCategory]);
    setActivePage(1); // Reset active page when changing category
  
    // Filter the data based on the category
    if (newCategory.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        if (Array.isArray(newCategory)) {
          return newCategory.includes(item.category);
        } else {
          return item.category === newCategory;
        }
      });
      setFilteredData(filtered);
    }
  }


  const adjustCartContainerHeight = () => {
    if (cartContainerRef.current) {
      const containerHeight = cartContainerRef.current.scrollHeight
      cartContainerRef.current.style.height = `${containerHeight}px`
    }
  }

  if (error) {
    return <div>Error loading products</div>
  }

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <span className={styles.loadingText}>Loading products...</span>
      </div>
    )
  }

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage(1); // Reset active page when search query changes
  
    let filtered = data;
  
    if (query !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    setFilteredData(filtered);
  };

  const productsToDisplay = filteredData.slice((activePage - 1) * productsPerPage, activePage * productsPerPage);

  const indexOfLastProduct = activePage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage

  const totalPages = Math.ceil((filteredData ? filteredData.length : 0) / productsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber)
  }


  return (
    <CartProvider>
      <Head>
      <title>FAUX</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <div className={styles.container}>
      <Container>
      <Link className={styles.headingLink} href="/allProducts">
  <h1 className={styles.heading}>F A U X</h1>
</Link>
        <NavigationBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
        <div className={styles.productRow}>
        {productsToDisplay.map((product: any) => (
  <div key={product.id} className={styles.productItem}>
    <Card className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Card.Img
          variant='top'
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
        <div className={styles.cardOverlay}>
          <div className={styles.overlayContent}>
            <Button variant="primary" href={`/products/${product.id}`} className={styles.viewProductButton}>View Product</Button>
          </div>
        </div>
      </div>
      
      <Card.Body className={styles.productCardBody}>
        <Link onClick={() => handleProductClick(product.id)} href={`/products/${product.id}`} passHref>
          <Card.Title className={styles.cardTitle}>{product.title}</Card.Title>{' '}
        </Link>
        <Card.Text className={styles.cardText}>${product.price}</Card.Text>
        <div className={styles.addToCartButtonContainer}>
        <AddToCart
          product={product}
          openCart={() => setShowCart(true)}
        />
        </div>
      </Card.Body>
    </Card>
  </div>
))}
        </div>
        <div className={`${styles.paginationContainer} pagination`}>
  <PaginationBootstrap 
    activePage={activePage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</div>
        
        <div className={styles.cartIcon} onClick={() => setShowCart(!showCart)}>
          <FontAwesomeIcon icon={faShoppingCart} size='2x' />
        </div>
        {showCart && (
          <div ref={cartContainerRef} className={styles.cartContainer}>
            <Cart/>
          </div>
        )}


      </Container>
      
    </div>
    </CartProvider>
  )
}