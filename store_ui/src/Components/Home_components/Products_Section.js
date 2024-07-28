import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { CATEGORIES_PRODUCTS } from "../REGEX_And_APIs";
import Loader from "../Loader";
import Product from "./Product_Component";
import Category from "./Category";

export default function Products_Section() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [c_id, setC_id] = useState('');

  // Fetch categories and products
  const getCategories_Products = async () => {
    try {
      const response = await axios.get(CATEGORIES_PRODUCTS, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        const { categories, products } = response.data;
  
        // Ensure categories and products are arrays
        if (Array.isArray(categories) && Array.isArray(products)) {
          setCategories(categories);
          setProducts(products);
          setFilteredProducts(products); // Initialize filtered products

          // Store products in local storage
          localStorage.setItem('products', JSON.stringify(products));
  
          console.log('Categories:', categories);
          console.log('Products:', products);
        } else {
          alert('البيانات لم تأتي بالتنسيق المتوقع');
        }
      } else {
        alert('Failed to fetch data');
      }
    } catch (error) {
      // Handle errors with better error checking
      if (error.response) {
        alert(`Error: ${error.response.data.detail || error.response.statusText}`);
      } else if (error.request) {
        alert('No response from server');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    getCategories_Products();
  }, []);

  useEffect(() => {
    // Filter products based on selected category id
    if (c_id) {
      setFilteredProducts(products.filter(item => item.c_id === c_id));
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  }, [c_id, products]);

  // Handle category selection
  const handleCategoryClick = (id) => {
    setC_id(id);
  };

  return (
    <Container className="home-section mt-2 mb-2 dir-rtl my-box-shadow">
      <Row className="w-auto my-inset-shadow my-box-shadow rounded mt-2 product-card m-1">
        <Container className="p-1 m-1  ">
          <Container className="d-flex p-1 categories w-auto position-relative m-1 align-items-center justify-content-center">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Category
                  key={category.id}
                  clk={() => handleCategoryClick(category.id)}
                  {...category}
                />
              ))
            ) : (
              <Loader />
            )}
          </Container>
        </Container>
      </Row>
      <Container className="row pt-2 pb-2 position-relative">
        {filteredProducts.length === 0 ? (
          <Loader />
        ) : (
          filteredProducts.map((product) => <Product key={product.id} {...product} />)
        )}
      </Container>
    </Container>
  );
}
