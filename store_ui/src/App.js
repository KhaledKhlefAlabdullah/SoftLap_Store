import "./App.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import App_Bar from "./Components/App_Bar";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Login_Register from "./Pages/Login_Register";
import Footer from "./Components/Footer";
import { Auth_Provider } from "./Context/Auth_Context";
import Shopping_Provider from "./Context/Shopping_Cart_Context";
import Product_Details from "./Pages/Product_Details";
import { Theme_Provider } from "./Context/Change_Theme_Context";
import Order_Details from "./Components/Profile_Components/Order_Details";
function App() {
  return (
    <Container className="pt-1 pb-1">
      <App_Bar />
      <div className="body-app mb-3 section-me p-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="product-details/:id" element={<Product_Details />} />
          <Route path="order-details/:id" element={<Order_Details />} />
          <Route path="Login-Register" element={<Login_Register />} />
        </Routes>
      </div>
      <Footer />
    </Container>
  );
}

function App_With_Providers() {
  return (
    <Auth_Provider>
      <Shopping_Provider>
        <Theme_Provider>
          <App />
        </Theme_Provider>
      </Shopping_Provider>
    </Auth_Provider>
  );
}

export default App_With_Providers;
