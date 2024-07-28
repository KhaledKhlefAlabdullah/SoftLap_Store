import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { GET_USERS, SERVER_PATH } from "../REGEX_And_APIs";
import Loader from "../Loader";
import axios from "axios";
import { Auth_Context } from "../../Context/Auth_Context";
export default function Get_Users_Section() {

  // To get token values
  const auth_context = useContext(Auth_Context);

  // To store users
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      // Get user token to authenticate
      const token = auth_context.auth.token;
  
      const response = await axios.get(GET_USERS, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const users = response.data.users;
        setUsers(users);
      }
    } catch (error) {
      if (!error.response) {
        console.error("No Server Response");
      } else if (error.response.status === 409) {
        console.error("Email Not Valid");
      } else {
        console.error("Login Failed");
      }
    }
  };
  
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className="section-me bg-section-color pt-1 pb-1 mb-3 my-box-shadow">
      <Container className="home-section mt-2 mb-2 dir-rtl my-box-shadow">
        <Container className="row pt-2 pb-2 position-relative">
          {users.length == 0 ? (
            <Loader />
          ) : (
            users.map((user) => (
              <Container className="col-sm-12 col-md-6 col-lg-4 mt-2  mb-2 ">
                <Container className="product-card my-box-shadow p-1 rounded-lg">
                  <Container className="imgs-container">
                    <img
                      src={SERVER_PATH + user.profile_img}
                      alt={`User ${user.name}`}
                      className="imgs"
                    />
                  </Container>

                  <Container className="col-12">
                    <Container className="row mt-2 mb-1">
                      <Container className="col-6 d-flex flex-end align-items-center">
                        <h3>{user.name}</h3>
                      </Container>
                      <Container className="col-6 d-flex flex-end align-items-center justify-content-end">
                        <Container className="d-flex pl-3 flex-end align-items-center justify-content-end">
                          {user.roles.map((role) => (
                            <span>{role.role}</span>
                          ))}
                        </Container>
                      </Container>
                    </Container>
                    <Container className="row produdct-btns mb-4 mt-2">
                      <Container className="col-4 d-flex align-items-center justify-content-center">
                        <Button
                          className={
                            user.quantity === 0
                              ? "btn my-box-shadow rounded-circle disabled"
                              : "btn my-box-shadow rounded-circle"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
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
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                          </svg>
                        </Button>
                      </Container>
                      <Container className="col-4 d-flex align-items-center justify-content-end">
                        <h6>
                          <span>rating</span>
                        </h6>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            ))
          )}
        </Container>
      </Container>
    </Container>
  );
}
