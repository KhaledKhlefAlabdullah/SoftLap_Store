import { Button, Row, Container } from "react-bootstrap";
import { useContext } from "react";
import { SERVER_PATH } from "../REGEX_And_APIs";
import forma_currency from "../CurrencyFomating";
import { Shopping_Context } from "../../Context/Shopping_Cart_Context";
import { Auth_Context } from "../../Context/Auth_Context";
import { Link, useNavigate } from "react-router-dom";

export default function Product({ desc, id, img, name, price, quantity }) {
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
  
  return (
    <Container className="col-sm-12 col-md-6 col-lg-4 mt-2  mb-2 ">
      <Container className="product-card my-box-shadow p-1 rounded-lg">
        <Container className="imgs-container img-container-product">
          <img
            src={SERVER_PATH.concat(img)}
            alt={`Product ${name}`}
            className="imgs"
          />
        </Container>

        <Container className="col-12">
          <Container className="row mt-2 mb-1">
            <Container className="col-6 d-flex flex-end align-items-center">
              <h5>{name}</h5>
            </Container>
            <Container className="col-6 d-flex flex-end align-items-center justify-content-end">
              <Container className="d-flex pl-3 flex-end align-items-center justify-content-end">
                <h6>{forma_currency(price)}</h6>
              </Container>
            </Container>
          </Container>
          <Container className="row produdct-btns mb-4 mt-2">
            {quantityInCart === 0 ? (
              <Row className="w-100 mb-2 ml-0 mr-0 d-flex align-items-center justify-content-around">
                <Container className="col-4 d-flex align-items-center justify-content-center">
                  <Button
                    onClick={() => {
                      auth_context.auth.token
                        ? increaseItemsQuantity(id)
                        : navigate("/Login-Register");
                    }}
                    className={
                      quantity === 0
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
                <Container className="col-4 d-flex align-items-center justify-content-center">
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
                <Container className="col-4 d-flex align-items-center justify-content-end">
                  <Link className="btn my-box-shadow rounded-circle" to={`/product-details/${id}`} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg></Link>
         
                </Container>
              </Row>
            ) : (
              <>
                <Row className="w-100 mb-2 ml-0 mr-0 d-flex align-items-center justify-content-around">
                  <Container className="col-4 w-auto  d-flex align-items-center justify-content-around">
                    <Button
                      onClick={() => {
                        increaseItemsQuantity(id);
                      }}
                      className={
                        quantity === 0
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
                  <Container className="col-4 w-auto d-flex align-items-center justify-content-around">
                  <Button className="rounded-circle my-box-shadow disabled">
                  {quantityInCart}
                            </Button>
                   
                  </Container>
                  <Container className="col-4 w-auto p-0 d-flex align-items-center justify-content-around">
                    <Button
                      onClick={() => {
                        decreaseItemsQuantity(id);
                      }}
                      className="btn my-box-shadow rounded-circle d-flex align-items-center justify-content-center m-0"
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
                  <Container className="col-4 w-auto p-0 d-flex align-items-center justify-content-around">
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
                </Row>
              </>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
