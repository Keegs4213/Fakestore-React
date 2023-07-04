// Products.jsx
import React from 'react';

const Products = ({products}) => {
  if (!products) {
    return <div>Loading products...</div>
  }
  const productsToDisplay = products;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {productsToDisplay.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products;