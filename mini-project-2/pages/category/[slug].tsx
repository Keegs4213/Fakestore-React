//[slug].tsx
// Importing necessary modules
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Products from "../../src/app/components/Products"

// Modifying fetcher to make requests to the external Fake Store API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategoryPage() {
    const router = useRouter();
    const { slug } = router.query;
    let [category, setCategory] = useState<string | string[]>('');

    useEffect(() => {
        if (slug) {
            console.log(`Slug: ${slug}`);
            if (slug === 'jewelry') {
                setCategory('jewelery');
            } else {
                setCategory(slug);
            }
        }
    }, [slug]);
  
    // Modifying useSWR hook to make requests to the external Fake Store API
    const { data, error } = useSWR(`https://fakestoreapi.com/products/category/${category}`, fetcher);
  
    if (error) return <div>Failed to load data</div>
    if (!data) return <div>Loading...</div>

    const products: Product[] = data?.map((product: Product) => {
      if(product.category === "jewelery") {
        return { ...product, category: "jewelry" };
      } 
      return product;
    });

    return (
        <div>
            <h1>{category}</h1>
            <Products products={products} />
        </div>
    )
}
