import { Button, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PRODUCT_DETAILES, SIMILAR_PRODUCTS, SERVER_PATH } from "../Components/REGEX_And_APIs";
import forma_currency from "../Components/CurrencyFomating";
import { useContext } from "react";
import { Shopping_Context } from "../Context/Shopping_Cart_Context";
import { Auth_Context } from "../Context/Auth_Context";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Product_Details() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product_details, setProductDetails] = useState({});
  const [images, setImages] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]); // New state for similar products

  const navigate = useNavigate();
  const auth_context = useContext(Auth_Context);
  const {
    getItemsQuantity,
    increaseItemsQuantity,
    decreaseItemsQuantity,
    removeItemFromCart,
  } = useContext(Shopping_Context);

  const quantityInCart = getItemsQuantity(id);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${PRODUCT_DETAILES}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const product_Details = response.data.product;
        setProductDetails(product_Details);
        setImages(product_Details.images);

        // Fetch similar products
        const similarResponse = await axios.get(`${SIMILAR_PRODUCTS}${product_Details.category}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (similarResponse.status === 200) {
          setSimilarProducts(similarResponse.data.products);
        }

        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  return (
    <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
      <Container className="home-section d-flex align-items-center justify-content-center mt-2 mb-2 dir-rtl my-box-shadow">
        <Container className="row w-100 position-relative">
          <Container className="col-12 mt-2 mb-2 ">
            <Container className="product-card w-100 mt-2 mb-2 my-box-shadow p-1 rounded-lg">
              {isLoading ? (
                <Loader />
              ) : (
                <Row className="d-flex align-items-center justify-content-between">
                  <Container className="col-lg-4 col-md-6 col-sm-12 p-sm-2">
                    <Container className="imgs-container rounded m-md-2">
                      <img
                        src={SERVER_PATH + product_details.product_img}
                        alt={`Product ${product_details.product_img}`}
                        className="imgs h-100"
                      />
                    </Container>
                  </Container>
                  <Container className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                    <Row className="d-flex align-items-center justify-content-between">
                      <Container className="col-12 mt-2 mb-1">
                        <Container className="d-flex flex-end align-items-center justify-content-start">
                          <h3>{product_details.product_name}:</h3>
                        </Container>
                        <Container className="d-flex flex-end align-items-center justify-content-start">
                          <h5>{product_details.product_description}</h5>
                        </Container>
                        <Container className="d-flex flex-end align-items-center justify-content-start">
                          <h6>{forma_currency(product_details.price)}</h6>
                        </Container>
                      </Container>
                      <Container className="col-12 produdct-btns mb-4 mt-2">
                        {quantityInCart === 0 ? (
                          <Container className="w-50 mb-2 m-md-2 m-sm-4 ml-0 mr-0 d-flex flex-lg-column flex-md-column align-items-center justify-content-around">
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                              <Button
                                onClick={() => {
                                  auth_context.auth.token
                                    ? increaseItemsQuantity(id)
                                    : navigate("/Login-Register");
                                }}
                                className={
                                  product_details.quantity === 0
                                    ? "btn my-box-shadow rounded-circle disabled"
                                    : "btn my-box-shadow rounded-circle"
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 576 512"
                                >
                                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                                </svg>
                              </Button>
                            </Container>
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                              <Button className="btn my-box-shadow rounded-circle">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1.1-1.1c-2.1-1.9-4.1-3.6-6.2-5.5c-5.5-4.7-11.1-8.6-16.7-11.7c-5.4-3.2-10.4-5.5-15.6-6.8c-11.3-2.5-22.8-1.5-32.7 4.4c-8.8 5.6-15.6 14.7-20.2 24.9c-2.7 5.8-4.1 11.9-4.1 18.1c0 4.7 1.3 9.4 3.6 13.5c-24.4 12.8-41.6 38.3-41.6 66.6v3.3c0 32.1 12.8 62.8 35.4 85.8L254.1 414c12.6-11.5 27.3-18.8 43.9-18.8s31.3 7.3 43.9 18.8L463.6 325.5c22.7-23 35.4-53.8 35.4-85.8v-3.3c0-30.1-17.1-55.7-41.8-66.5c2.3-4.1 3.5-8.8 3.5-13.5c0-6.2-1.4-12.3-4.1-18.1c-4.6-10.2-11.3-19.3-20.2-24.9c-9.8-5.8-21.4-6.8-32.7-4.4c-5.3 1.2-10.2 3.6-15.6 6.8c-5.6 3.1-11.2 7-16.7 11.7c-2.1 1.9-4.1 3.6-6.2 5.5c-.3.3-.7.7-1.1 1.1z" />
                                </svg>
                              </Button>
                            </Container>
                          </Container>
                        ) : (
                          <Container className="w-100 d-flex align-items-center justify-content-between">
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                              <Button
                                onClick={() => decreaseItemsQuantity(id)}
                                className="btn my-box-shadow rounded-circle"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M0 24C0 10.7 10.7 0 24 0H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 48 0 37.3 0 24z" />
                                </svg>
                              </Button>
                            </Container>
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-center">
                              <h5>{quantityInCart}</h5>
                            </Container>
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                              <Button
                                onClick={() => increaseItemsQuantity(id)}
                                className="btn my-box-shadow rounded-circle"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M0 24C0 10.7 10.7 0 24 0H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 48 0 37.3 0 24zM256 208c0-13.3 10.7-24 24-24h144c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24z" />
                                </svg>
                              </Button>
                            </Container>
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-end">
                              <Button
                                onClick={() => removeItemFromCart(id)}
                                className="btn my-box-shadow rounded-circle"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M0 24C0 10.7 10.7 0 24 0H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 48 0 37.3 0 24z" />
                                </svg>
                              </Button>
                            </Container>
                          </Container>
                        )}
                      </Container>
                    </Row>
                  </Container>
                </Row>
              )}
            </Container>
          </Container>
          <Container className="col-12 my-3">
            <h3>منتجات مشابهة</h3>
            <Row className="d-flex">
              {similarProducts.map((product) => (
                <Container key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Container className="product-card my-box-shadow p-2 rounded-lg">
                      <img
                        src={SERVER_PATH + product.product_img}
                        alt={`Product ${product.product_img}`}
                        className="imgs w-100"
                      />
                      <h5>{product.product_name}</h5>
                      <p>{forma_currency(product.price)}</p>
                    </Container>
                  </Link>
                </Container>
              ))}
            </Row>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
