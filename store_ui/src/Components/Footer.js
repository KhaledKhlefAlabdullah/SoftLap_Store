import { Link, useLocation } from "react-router-dom";
import {Container} from "react-bootstrap";
export default function Footer() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/Login-Register";
  if (isAuthPage) return null;
  return (
      <footer>
        <Container className="footer section-me bg-section-color mb-2 my-box-shadow">
          <Container className="footer-row sociale">
            <a href="#">
              <i className="fab fa-facebook-square "></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
          </Container>

          <Container className="footer-row">
            <ul>
              <li>
                <Link to="/Contact">تواصل معنا</Link>
              </li>
              <li>
                <Link to="#">خدماتنا</Link>
              </li>
              <li>
                <Link to="#">سياساتنا</Link>
              </li>
              <li>
                <Link to="#">القواعد والقوانين</Link>
              </li>
              <li>
                <Link to="#">المسار الوظيفي</Link>
              </li>
            </ul>
          </Container>

          <Container className="footer-row">
            حقوق النشر © 2023 - جميع الحقوق محفوظة || تصميم: خالد العبدالله
          </Container>
        </Container>
      </footer>
  );
}
