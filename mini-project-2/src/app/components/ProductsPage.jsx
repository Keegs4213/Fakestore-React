import React from 'react'

export default function ProductPage() {
    const { data, error } = useSWR("https://fakestoreapi.com/products", fetcher);
    const [showCart, setShowCart] = useState(false);
    const cartContainerRef = useRef(null);
    const [activePage, setActivePage] = useState(1);
    const [productsPerPage] = useState(9);
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [priceSorting, setPriceSorting] = useState("none");
    const { search } = router.query;
  
    let category = "";
    if (router.isReady) {
      category = router.query.category;
    }
  
    console.log(category);
    useEffect(() => {
      adjustCartContainerHeight();
      if (data && data.length > 0) {
        // If there's a category in the URL, filter the products based on this category
        if (category) {
          setFilteredData(
            sortProducts(data.filter((item) => item.category === category))
          );
        } else {
          setFilteredData(sortProducts(data));
        }
      }
    }, [data, category, priceSorting]); // Add priceSorting to the dependency array
  
    const sortProducts = (products) => {
      if (priceSorting === "lowToHigh") {
        return [...products].sort((a, b) => a.price - b.price);
      } else if (priceSorting === "highToLow") {
        return [...products].sort((a, b) => b.price - a.price);
      } else {
        return products; // No sorting
      }
    };
  
    const handleCategoryChange = (newCategory) => {
      // If newCategory is an array, set selected category to that array
      // If newCategory is a single string, set selected category to an array with that string
      setSelectedCategory(
        Array.isArray(newCategory) ? newCategory : [newCategory]
      );
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
    };
  
    const adjustCartContainerHeight = () => {
      if (cartContainerRef.current) {
        const containerHeight = cartContainerRef.current.scrollHeight;
        cartContainerRef.current.style.height = `${containerHeight}px`;
      }
    };
  
    if (error) {
      return <div>Error loading products</div>;
    }
  
    if (!data) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}>
            <div className={styles.spinnerInner}></div>
          </div>
          <span className={styles.loadingText}>Loading products...</span>
        </div>
      );
    }
  
    const handleProductClick = (productId) => {
      router.push(`/products/${productId}`);
    };
  
    const handleSearch = (query) => {
      setSearchQuery(query);
      setActivePage(1); // Reset active page when search query changes
  
      let filtered = data;
  
      if (query !== "") {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      }
  
      setFilteredData(filtered);
    };
  
    const productsToDisplay = filteredData.slice(
      (activePage - 1) * productsPerPage,
      activePage * productsPerPage
    );
  
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
    const totalPages = Math.ceil(
      (filteredData ? filteredData.length : 0) / productsPerPage
    );
  
    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    };
}