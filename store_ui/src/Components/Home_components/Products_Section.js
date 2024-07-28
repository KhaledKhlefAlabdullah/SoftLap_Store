import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { CATEGORIES_PRODUCTS } from "../REGEX_And_APIs";
import Loader from "../Loader";
import Product from "./Product_Component";
import Category from "./Category";

export default function Products_Section() {
  // To store categories comming from api
  const [categories, setCategories] = useState([]);

  // To store products comming from api
  const [products, setProducts] = useState([]);

  const [c_id, setC_id] = useState('')

  // Get all categories and prducts in database
  const getCategories_Products = async () => {

    try {
      const response = await axios.get(CATEGORIES_PRODUCTS, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const categories = response.data.categories;
        const products = response.data.products;
   
        setCategories(categories);
        setProducts(products);

        localStorage.setItem('products', JSON.stringify(products));

      }
    } catch (error) {
      if (!error.response) {
        alert("لايمكن جلب بيانات الاصناف والمنتجات المتوفرة");
      }
    }
  };

  useEffect(() => {
    getCategories_Products();
  }, []);


  useEffect(()=>{

    setProducts(products.filter(item => item.c_id === c_id))

  },[c_id]);


  // Make add to fivorate function
  const add_to_fivorate = () => {
    // Emplemnted later
  };

  return (
    <Container className="home-section mt-2 mb-2 dir-rtl my-box-shadow">
      <Row className="w-auto my-inset-shadow my-box-shadow rounded mt-2 product-card m-1">
        <Container className="p-1 m-1  ">
          <Container className="d-flex p-1 categories w-auto position-relative m-1 align-items-center justify-content-center">
            {categories.length > 0 ? (
              categories.map((category) => <Category clk={() => setC_id(c_id)} {...category} />)
            ) : (
              <Loader />
            )}
          </Container>
        </Container>
      </Row>
      <Container className="row pt-2 pb-2 position-relative">
        {products.length === 0 ? (
          <Loader />
        ) : (
          products.map((product) => <Product {...product} />)
        )}
      </Container>
    </Container>
  );
}
