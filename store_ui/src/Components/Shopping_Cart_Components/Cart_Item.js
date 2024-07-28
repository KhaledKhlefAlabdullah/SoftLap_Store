import React, { useContext } from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import { SERVER_PATH } from "../REGEX_And_APIs";
import forma_currency from "../CurrencyFomating";
import { Shopping_Context } from "../../Context/Shopping_Cart_Context";

const Cart_Item = ({ id, quantity }) => {
  // Get items from locale storage (items is product who come from api store in local storage)
  const items = JSON.parse(localStorage.getItem("products"));

  // Get the item data by id from the items
  const item = items.find((item) => item.id === id);

  // Use context to remove item from cart
  const { removeItemFromCart } = useContext(Shopping_Context);

  return (
    <Stack direction="horizontal" className="d-flex align-items-center">
      <Row className="m-1 rounded w-100 product-card my-box-shadow">
        <Container className="col-4 rounded imgs-container d-flex align-items-center justify-content-center">
          <img
            className="imgs"
            src={SERVER_PATH + item.img}
            alt={`product ${item.name}`}
          />
        </Container>
        <Container className="col-4 d-flex flex-column align-items-center justify-content-center">
          <Container className="">
            <span className="d-inline-block">{item.name}</span>
          </Container>
          <Container className="">
            {forma_currency(item.price)}
            {quantity > 1 && <span className="text-danger">X{quantity}</span>}
          </Container>
          
        </Container>
        <Container className="col-4 d-flex align-items-center justify-content-center">
          {forma_currency(item.price * quantity)}
          <Button className="my-box-shadow rounded-circle d-flex align-items-center justify-content-center mr-2" onClick={() => removeItemFromCart(id)}>
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
    </Stack>
  );
};

export default Cart_Item;
