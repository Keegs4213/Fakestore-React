// pages/_app.jsx
import React from 'react';
import { CartContext, CartProvider} from '../src/app/components/CartContext';
import '../src/app/page.module.css';
import "../src/app/globals.css"

// Parent component (e.g., App.jsx)
// const handleCategoryChange = (categories: string[] | string) => {
//   if (Array.isArray(categories)) {
//     // If categories is an array, filter products by each category
//     setFilteredProducts(products.filter(product => categories.includes(product.category)));
//   } else {
//     // If categories is a single string, filter products by that category
//     setFilteredProducts(products.filter(product => product.category === categories));
//   }
// }

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      </CartProvider>
  );
}