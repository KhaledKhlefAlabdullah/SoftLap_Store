import { Container, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { USER_ORDERS } from "../REGEX_And_APIs";
import { Auth_Context } from "../../Context/Auth_Context";
import Loader from "../Loader";
import forma_currency from "../CurrencyFomating";
import { Link } from "react-router-dom";

export default function User_Orders() {

  const [userOrdes, setUserOrders] = useState([]);

  const auth_context = useContext(Auth_Context);

  const [message, setMessage] = useState('');

  const getUserOrders = async () => {
    
    try {
      
      const user_id = auth_context.auth.user.id;

      const token = auth_context.auth.token;

      const response = await axios.get(`${USER_ORDERS}?id=${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const orders = response.data.orders;
        setUserOrders(orders);
        if(userOrdes.length === 0) {
          setMessage('لا يوجد فواتير لك بعد اذهب واحصل على بعض المنتجات')
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
      <Container className="col home-section mt-2 mb-2 dir-rtl my-box-shadow">
        <Container className="my-box-shadow mt-2 mb-2 rounded">
          <h1>
            <span>فواتيرك:</span>
          </h1>
        </Container>

        {userOrdes.length > 0 ? (
          userOrdes.map((order) => (
            <Container
              className=" my-box-shadow rounded ml-2 mb-2 pt-2 pb-2"
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
                {forma_currency(order.total_price)}
              </p>
              <p>
                <span>تاريخ الطلب:</span>
                <br />
                {order.created_at}
              </p>
              <Container>
                <Link
                  className="btn my-box-shadow rounded-circle"
                  to={`/order-details/${order.id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                </Link>
              </Container>
            </Container>
          ))
        ) : (
          
          <Container className="m-3">
            <span>{message}</span> 
            <Loader />
          </Container>
        )}
      </Container>
    </Container>
  );
}
/*

<ul>
        {userOrdes.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Title: {order.title}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Created At: {order.created_at}</p>
           
            </li>
            ))}
          </ul>
*/
