//Products.jsx
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Products = () => {
  const { data: products, error } = useSWR(
    'https://fakestoreapi.com/products',
    fetcher
  )

  if (error) {
    return <div>Error loading products</div>
  }

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

export default Products
