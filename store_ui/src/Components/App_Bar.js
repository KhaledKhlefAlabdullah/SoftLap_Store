import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo_dark from "../assets/images/logo_dark.png";
import logo_light from "../assets/images/logo_light.png";
import { useEffect, useRef, useState } from "react";
import Serch_Box from "./App_Bar_Components/Serch_Box";
import Menue_Button from "./App_Bar_Components/Menue_Button";
import viewMenu from "./App_Bar_Components/View_Menu";
import Swap_Color_Mode from "./App_Bar_Components/Swap_Color_Mode";
import { useContext } from "react";
import { Auth_Context } from "../Context/Auth_Context";
import axios from "axios";
import { LOGOUT } from "./REGEX_And_APIs";
import { Shopping_Context } from "../Context/Shopping_Cart_Context";
import { Theme_Context } from "../Context/Change_Theme_Context";

export default function App_Bar() {
  // Get quantity of products in cart and side product menu state
  const { openSideCart, cartQuantity } = useContext(Shopping_Context);

  // to redirect to home page
  const navigate = useNavigate();

  // Get user token and email
  const auth_context = useContext(Auth_Context);

  // Get the theme color mod to change the color of the logo
  const theme_context = useContext(Theme_Context);

  // To update menu state (hide, show)
  const [menuState, setMenuState] = useState(true);

  // Get state is mobile to hide menu and show menu button
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

   // Ref to the list menu container
   const linksRef = useRef(null);

  // To get the location of current page
  const location = useLocation();

  // Change menu icons depandend on the state
  const changeMenuState = () => {
    setMenuState(!menuState);

    // Called function to show and hide the nave links menu
    viewMenu(menuState);
  };

  // Handle window resize to hide menu
  useEffect(() => {
    // Function to handle window resize
    function handleResize() {
      setIsMobile(window.innerWidth <= 991);
    }
    // Add window resize event listener
    window.addEventListener("resize", handleResize);
    // Clen the event listener when the component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Logout functionality
  const logout = async () => {
    try {

      const token = auth_context.auth.token;

      const response = await axios.post(
        LOGOUT,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        // Clear user token, permissions and email from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("permissions");

        // Clear the authentication context
        auth_context.setAuth({});

        // Navigate to the desired page (e.g., home)
        navigate("/");
      } else {
        // Handle the response or error message as needed
      }
    } catch (error) {
      console.error(error);

      if (!error.response) {
        // Handle network-related errors
      } else if (error.response.status === 409) {
        // Handle specific status code (e.g., conflict)
      } else {
        // Handle other error cases
      }
    }
  };

  // Hide the nave links when the widow size be mobile screen size
  const menu_style = isMobile
    ? "hide ml-auto nav-bar"
    : "ico-trans ml-auto mr-4 nav-bar";

  // Check if is the path Authintecation page path
  const isAuthPage = location.pathname === "/Login-Register";
  if (isAuthPage) return null;
  return (
    <Navbar className="mt-2 mb-3 dir-rtl app-bar section-me bg-section-color my-box-shadow" ref={linksRef}>
      <Container className="justify-content-around text-right ml-3 mr-3">
        <img
          src={theme_context.theme === "dark" ? logo_dark : logo_light}
          alt="logo"
          className="logo"
        />
        <Nav id="nave-bar-taps" className={menu_style}>
          <Nav.Link to="/" as={NavLink}>
            الصفحة الرئيسية
          </Nav.Link>
          <Nav.Link to="/Contact" as={NavLink}>
            تواصل
          </Nav.Link>
          <Nav.Link to="/About" as={NavLink}>
            معلومات عنا
          </Nav.Link>
          {auth_context.auth.token ? (
            <>
              <Nav.Link to="/Profile" as={NavLink}>
                {!auth_context.auth.roles.includes("admin")
                  ? "الملف الشخصي"
                  : "لوحة التحكم"}
              </Nav.Link>
              <Button className="btn btn-bar mt-1 ml-3 logout" onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                </svg>
              </Button>
            </>
          ) : (
            <Nav.Link to="/Login-Register" as={NavLink}>
              تسجيل الدخول
            </Nav.Link>
          )}
          <Swap_Color_Mode />
        </Nav>
        <Serch_Box />
        <Button
          className="shop-btn rounded-circle"
          onClick={() => openSideCart()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div className="counter-shopping bg-danger rounded-circle d-flex justify-content-center align-item-center c-white">
            {cartQuantity}
          </div>
        </Button>
        <Menue_Button changeMenuState={changeMenuState} menuState={menuState} linksRef={linksRef}/>
      </Container>
    </Navbar>
  );
}
