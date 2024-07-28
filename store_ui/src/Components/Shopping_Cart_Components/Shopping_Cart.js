import { useContext, useState } from "react";
import { Button, Container, Offcanvas, Row, Stack } from "react-bootstrap";
import { Shopping_Context } from "../../Context/Shopping_Cart_Context";
import Cart_Item from "./Cart_Item";
import forma_currency from "../CurrencyFomating";
import axios from "axios";
import { CREATE_ORDER } from "../REGEX_And_APIs";
import { Auth_Context } from "../../Context/Auth_Context";
import Loader from "../Loader";

export default function Shoppinh_Cart({ isOpen }) {
  
  // Get order values from Shopping_Context
  const { cartItems, setCartItems, closeSideCart } =
    useContext(Shopping_Context);

  // Intiale is loding state
  const [isLoding, setIsloding] = useState(false);

  // To check if is loged in or redirecte to login page
  const auth_context = useContext(Auth_Context);

  const items = JSON.parse(localStorage.getItem("products"));

  const create_order = async () => {

    // Set isLoding true
    setIsloding(true);

    try {
      // Get user token to authintecat
      const token = auth_context.auth.token;

      // Get user id to create order
      const user_id = auth_context.auth.user.id;

      // Get user name to create order
      const user_name = auth_context.auth.user.name;

      const order_products = cartItems.map((item) => ({
        order_id: "",
        product_id: item.id,
        quantity: item.quantity,
      }));
      const CREAT_ORDER_D = {
        title: `${user_name} order with ${cartItems.quantity} items`,
        user_id: user_id,
        products: order_products,
      };
      
      const response = await axios.post(CREATE_ORDER, CREAT_ORDER_D, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {

        alert("تم اضافة الطلب بنجاح");

        const user_id = JSON.parse(localStorage.getItem('user')).id;

        // Get the existing orders from local storage
        const existing_orders = JSON.parse(localStorage.getItem(`Shopping_Items${user_id}`)) || [];

        // Combine the new order (cartItems) with the existing orders
        const new_order = [...existing_orders, cartItems];

        // Store the combined orders in local storage
        localStorage.setItem("my_orders", JSON.stringify(new_order));

        // Clear the shopping items and reset the cart items
        localStorage.removeItem(`Shopping_Items${user_id}`);

        setCartItems([]);

      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("الصفحة غير موجودة");
      } else if (error.response && error.response.status === 505) {
        alert("حدث خطأ في جانب الخادم نرجو المعذرة");
      }
    } finally {
      setIsloding(false);
    }
  };

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeSideCart}
      className="dir-rtl bg-section-color color"
    >
      <Offcanvas.Header closeButton className="color">
        <Offcanvas.Title>
          <span className="d-inline-block">سلة المشتريات</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="bg-section-color-2 rounded my-box-shadow m-2 p-1">
        <Stack gap={3}>
          {cartItems.map((item) => (
            <Cart_Item key={item.id} {...item} />
          ))}
          <Row className="fw-bold fs-5 my-box-shadow  bg-section-color rounded d-flex align-items-center justify-contint-center">
            {isLoding ? (
              <Loader />
            ) : (
              <>
                <Container className="col-6 mt-2 mb-2">
                  المجموع:{" "}
                  {forma_currency(
                    cartItems.reduce((total, cartItem) => {
                      const item = items.find(
                        (i) => i.id === cartItem.id
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </Container>
                {cartItems.length > 0 && (
                  <Container className="col-6 mt-2 mb-2">
                    <span className="d-inline-block">إنشاء طلب؟</span>
                    <Button
                      onClick={() => create_order()}
                      className="my-box-shadow rounded-circle text-success d-inline-block p-1  mr-2"
                    >
                      نعم
                    </Button>
                  </Container>
                )}
              </>
            )}
          </Row>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
