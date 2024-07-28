import { Button, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import { PRODUCT_DETAILES, SERVER_PATH } from "../Components/REGEX_And_APIs";
import forma_currency from "../Components/CurrencyFomating";
import { useContext } from "react";
import { Shopping_Context } from "../Context/Shopping_Cart_Context";
import { Auth_Context } from "../Context/Auth_Context";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Product_Details() {
  // Use useParams to access the product Id from the URL ( I pass it in App.j in Rout Product_Details and pass it in Product_Component)
  const { id } = useParams();

  // Loding state
  const [isLoading, setIsLoading] = useState(false);

  // To store the product details
  const [product_details, setProductDetails] = useState({});

  // To store product images
  const [images, setImages] = useState([]);

  // Use navigation to redirect to login page if not logged in
  const navigate = useNavigate();

  // Authentication before add item to cart
  const auth_context = useContext(Auth_Context);

  // Get context hook to make add to card functionality
  const {
    getItemsQuantity,
    increaseItemsQuantity,
    decreaseItemsQuantity,
    removeItemFromCart,
  } = useContext(Shopping_Context);

  // Get items quantity in cart
  const quantityInCart = getItemsQuantity(id);

  // Fetch product details when the component mounts
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
        const product_Details = response.data.product; // Assuming response contains product details

        setProductDetails(product_Details);

        setImages(product_Details.images);

        setIsLoading(false);
      }
    } catch (err) {
      // Handle errors here
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
          <Container className="col-12 mt-2  mb-2 ">
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
                                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                                </svg>
                              </Button>
                            </Container>
                            <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                              <Link
                                className="btn my-box-shadow rounded-circle"
                                to="/"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z" />
                                </svg>
                              </Link>
                            </Container>
                          </Container>
                        ) : (
                          <>
                            <Container className="w-50 mb-2 ml-0 mr-0 d-flex flex-column align-items-center justify-content-around">
                              <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                                <Button
                                  onClick={() => {
                                    increaseItemsQuantity(id);
                                  }}
                                  className={
                                    product_details.quantity === 0
                                      ? "btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center disabled m-0"
                                      : "btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center m-0"
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                  </svg>
                                </Button>
                              </Container>
                              <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                                <Button className="btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center disabled m-0">
                                  {quantityInCart}
                                </Button>
                              </Container>
                              <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                                <Button
                                  onClick={() => {
                                    decreaseItemsQuantity(id);
                                  }}
                                  className={
                                    product_details.quantity === 0
                                      ? "btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center disabled m-0"
                                      : "btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center m-0"
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                  </svg>
                                </Button>
                              </Container>
                              <Container className="mt-2 mb-2 d-flex align-items-center justify-content-start">
                                <Button
                                  onClick={() => {
                                    removeItemFromCart(id);
                                  }}
                                  className="btn-dang rounded-circle my-box-shadow "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                  </svg>
                                </Button>
                              </Container>
                            </Container>
                          </>
                        )}
                      </Container>
                    </Row>
                  </Container>
                  <Container>
                    <Row className="m-1 p-2 d-flex align-items-center justify-content-around">
                      {images.length === 0 ? (
                        <Container className="col-12 img-details rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M256 0H576c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64zM476 106.7C471.5 100 464 96 456 96s-15.5 4-20 10.7l-56 84L362.7 169c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h80 48H552c8.9 0 17-4.9 21.2-12.7s3.7-17.3-1.2-24.6l-96-144zM336 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM64 128h96V384v32c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V384H512v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64zm8 64c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V312c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H72zm336 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H424c-8.8 0-16 7.2-16 16z" />
                          </svg>
                        </Container>
                      ) : (
                        images.map((image) => (
                          <Container
                            key={image.id}
                            className="p-0 m-2 my-box-shadow img-details rounded"
                          >
                            <img
                              src={SERVER_PATH + image.img_src}
                              alt={`Product ${product_details.img_name}`}
                              className="imgs "
                            />
                          </Container>
                        ))
                      )}
                      <Container className="col mt-2 mb-1"></Container>
                    </Row>
                  </Container>
                </Row>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
