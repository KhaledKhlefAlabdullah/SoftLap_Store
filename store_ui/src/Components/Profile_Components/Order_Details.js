import { Button, Container, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import forma_currency from "../CurrencyFomating";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  DELETE_ORDER,
  DELETE_PRODUCT_FROM_ORDER,
  EDITE_ORDER,
  ORDER_FOR_EDIT,
  SERVER_PATH,
} from "../REGEX_And_APIs";
import { Auth_Context } from "../../Context/Auth_Context";
import Loader from "../Loader";

export default function Order_Details() {
  const auth_context = useContext(Auth_Context);

  // Get the 'id' parameter from the URL
  const { id } = useParams();

  const navigate = useNavigate();

  // Message for products status
  const [message, setMessage] = useState("");

  // State to store the order data
  const [order, setOrder] = useState([]);

  // State to store the order produts data
  const [orderProducts, setOrderProducts] = useState([]);

  // Function to fetch order details
  const getOrder = async () => {
    try {
      const token = auth_context.auth.token;

      // Send a GET request to fetch order details by 'id'
      const response = await axios.get(`${ORDER_FOR_EDIT}?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Set the fetched order data to the 'order' state
        const orderData = response.data.order;

        // Set the fetched order data to the 'order' state
        const orderProductsData = response.data.order_details;

        setOrder(orderData);

        setOrderProducts(orderProductsData);
      }
    } catch (err) {
      // Handle any errors here
    }
  };

  // Delete product from order
  const deleteProduct = async (p_id, index) => {
    try {
      const token = auth_context.auth.token;

      if (orderProducts.length === 1) {
        console.log("delete order ");
        const response = await axios.delete(`${DELETE_ORDER}?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          navigate("/Profile");
        }
      } else {
        console.log("delete order ");

        const response = await axios.delete(
          `${DELETE_PRODUCT_FROM_ORDER}?id=${p_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setOrderProducts(orderProducts.pop(orderProducts[index]));
        }
      }
    } catch (err) {}
  };

  // Edite product order qunatity
  const editeQuantity = async (id, operator, index) => {

    try {

      const token = auth_context.auth.token;
  
      let newOrderProducts = [...orderProducts]; // Create a copy of the array
  
      let quantity = 0;
  
      if (operator === "+") {
        quantity = newOrderProducts[index].quantity + 1;
        newOrderProducts[index].quantity = quantity;
      }
  
      if (operator === "-") {
        quantity = newOrderProducts[index].quantity - 1;
        newOrderProducts[index].quantity = quantity;

        if(quantity <= 0){
          deleteProduct(newOrderProducts[index].product.id, index);
          return;
        }

      }
  
      setOrderProducts(newOrderProducts); // Update the state with the new array
  
      const response = await axios.post(
        EDITE_ORDER,
        { id: id, quantity: quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
     
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    // Fetch order details when the component mounts
    getOrder();
  }, []);

  return (
    <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
      <Container className="home-section d-flex align-items-center justify-content-center mt-2 mb-2 dir-rtl my-box-shadow">
        <Container className="row w-100 position-relative">
          <Container className="col-12 mt-2 mb-2 ">
            <Container
              className="my-box-shadow rounded ml-2 mb-2 pt-2 pb-2"
              key={order.id}
            >
              <h3>
                العنوان:
                <br />
                <span className="text-primary d-inline-block">
                  {order.title}
                </span>{" "}
              </h3>
              <p className="text-secoundry">
                <span>المبلغ الكلي:</span>
                {forma_currency(order.total_price)}{" "}
                {/* Format the total price */}
              </p>
              <p>
                <span>تاريخ الطلب:</span>
                <br />
                {order.created_at} {/* Display the order creation date */}
              </p>
            </Container>
            <Container className="my-box-shadow rounded ml-2 mb-2 pt-2 pb-2">
              {orderProducts ? (
                <Stack
                  direction="horizontal"
                  className="d-flex flex-column align-items-center"
                >
                  {orderProducts.map((item, index) => (
                    <Row
                      key={index}
                      className="m-1 rounded w-100 product-card my-box-shadow"
                    >
                      <Container className="col-4 rounded imgs-container d-flex align-items-center justify-content-center">
                        <img
                          className="imgs"
                          src={SERVER_PATH + item.product.product_img}
                          alt={`product ${item.product.product_name}`}
                        />
                      </Container>
                      <Container className="col-4 d-flex flex-column align-items-center justify-content-center">
                        <Container>
                          <span className="d-inline-block">
                            {item.product.product_name}
                          </span>
                        </Container>
                        <Container>
                          {forma_currency(item.product.price)}
                          {item.quantity > 1 && (
                            <span className="text-danger">
                              X{item.quantity}
                            </span>
                          )}
                        </Container>
                      </Container>
                      <Container className="col-4 m-0 p-0 d-flex align-items-center justify-content-center">
                        {forma_currency(item.product.price * item.quantity)}
                        <Container className="w-100 p-0 d-flex flex-column align-items-center justify-content-center">
                          <Row className="w-100 p-0 m-0 d-flex align-items-center justify-content-around">
                            <Container className="col-lg-4 col-md-6 col-sm-6 p-1 w-auto">
                              <Button
                                onClick={() =>
                                  editeQuantity(item.id, "+", index)
                                }
                                className={`m-0 btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center ${
                                  (item.product.quantity === 0) & "disabled"
                                } m-0`}
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
                            <Container className="col-lg-4 col-12 p-1 w-auto">
                              <Button className="m-0 btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center disabled">
                                {item.quantity}
                              </Button>
                            </Container>
                            <Container className="col-lg-4 col-md-6 col-sm-6 p-1 w-auto">
                              <Button
                                onClick={() =>
                                  editeQuantity(item.id, "-", index)
                                }
                                className="m-0 btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center"
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
                          </Row>
                          <Row className="w-100 d-flex align-items-center justify-content-center">
                            <Container className="col-12 p-0 mt-2 w-auto">
                              <Button
                                className="btn m-0 my-box-shadow rounded-circle d-flex align-items-center justify-content-center"
                                onClick={() => deleteProduct(item.id, index)}
                              >
                                <Container className="d-inline-block person">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                  </svg>
                                </Container>
                              </Button>
                            </Container>
                          </Row>
                        </Container>
                      </Container>
                    </Row>
                  ))}
                </Stack>
              ) : (
                <Loader />
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
