import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import regex to match email & password and login api path
import { EMAIL_REGEX, PWD_REGEX, LOGIN } from "../REGEX_And_APIs.js";
import { Auth_Context } from "../../Context/Auth_Context.js";
import Loader from "../Loader.js";

/**
 * this function is used to login to the application using api
 * @returns login_from
 */
export default function Login_Cart() {

  // Store user token in useContext to use it in all app
  const auth_context = useContext(Auth_Context);

  // Loding state
  const [isLoding, setIsLoging] = useState(false);

  // to redirect to home page
  const navigate = useNavigate();

  // to select the items in login form
  const emailRef = useRef();

  const errorRef = useRef();

  // to get Email value and check if is valid & foucs it
  const [email, setEmail] = useState("");

  const [validEmail, setValidateEmail] = useState(false);

  const [emailFoucs, setEmailFouces] = useState(false);

  // to get password value and check if is valid & foucs it
  const [password, setPassword] = useState("");

  const [validatePassword, setValidatePassword] = useState(false);

  const [passwordFoucs, setPasswordFouces] = useState(false);

  // to store the error message
  const [error, setError] = useState("");

  // to make select the email input field automatically
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // validate the email with regex and set the value of validEmail true
  useEffect(() => {
    setValidateEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // validate the password with regex and set the value of validPassword true
  useEffect(() => {
    setValidatePassword(PWD_REGEX.test(password));
  }, [password]);

  // set the value of errorMessage empty string
  useEffect(() => {
    setError("");
  }, [email,password]);

  const handleSubmit = async (e) => {

    // Set loding true to work
    setIsLoging(true);

    e.preventDefault();
    const validation_email = EMAIL_REGEX.test(email);
    const validation_password = PWD_REGEX.test(password);
    if (!validation_email || !validation_password) {
      setError("Invalid email or password");
      return;
    }
    try {
      const LOGIN_DATA={
        email:email,
        password:password
      }
      const response = await axios.post(
        LOGIN,
        LOGIN_DATA,{
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      );
      
      setEmail("");
      setPassword("");

      if (response.status === 200) {

        // Get token value
        const token =response.data['token'];

        // Get user and his roles

        const user = response.data['user'];

        const roles = response.data['roles'];

        // Store user token in locale storage 
        localStorage.setItem("token", token);
        
        // Store user object in local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Store user permissions in locale storage 
        localStorage.setItem("permissions",roles)

        // Pass the token and email by use context to all app
        auth_context.setAuth({token, user, roles});

        // Redirect to home page
        navigate("/");
      } else {
        setError(response['message']); // Display the error message from the API
      }
    } catch (error) {
      if (!error.response) {
        setError("No Server Response");
      } else if (error.response?.status === 409) {
        setError("Email Not valid");
      } else {
        setError("Login Failed");
      }
      errorRef.current.focus();
    }finally{

      // Set loding false to stop and view button if login failed login or success
      setIsLoging(false);

    }
  };

  return (
    
    <div className="card-front">
      <div className="center-wrap">
        <div className="section text-center">
          <p
            ref={errorRef}
            className= {error ? "errmsg" : "hide"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h4 className="title mb-4 pb-3">تسجيل الدخول</h4>
          <div className="form-group">
            <input
              type="email"
              className="form-style"
              placeholder="البريد الإلكتروني"
              autoComplete="off"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFouces(true)}
              onBlur={() => setEmailFouces(false)}
            />
            <i className="input-icon uil uil-at"></i>
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid state-ico" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "state-ico invalid"}
            />
          </div>
          <p
            id="uidnote"
            className={
              emailFoucs && email && !validEmail ? "instructions" : "hide"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            البريد الإلكتروني غير صالح. يرجى التأكد من أن البريد الإلكتروني يتبع
            الصيغة الصحيحة: يجب أن يتضمن البريد الإلكتروني علامة '@'، ثم يأتي
            اسم النطاق بعد ذلك، مثل: ( .com , .net , .org ...)
          </p>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-style"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validatePassword ? "false" : "true"}
              aria-describedby="uninote"
              onFocus={() => setPasswordFouces(true)}
              onBlur={() => setPasswordFouces(false)}
            />
            <i className="input-icon uil uil-lock-alt"></i>
            <FontAwesomeIcon
              icon={faCheck}
              className={validatePassword ? "state-ico valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validatePassword || !password ? "hide" : "state-ico invalid"
              }
            />
          </div>
          <p
            id="pwdnote"
            className={
              passwordFoucs && !validatePassword ? "instructions" : "hide"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            يجب أن يتراوح طول كلمة المرور بين 8 و 24 حرفًا <br />
            يجب أن تتضمن كلمة المرور أحرفًا كبيرة وأحرفًا صغيرة ورقمًا وحرفًا
            خاصًا <br />
            يسمح باستخدام الحروف الخاصة التالية:{" "}
            <span aria-label="علامة التعجب">!</span>{" "}
            <span aria-label="رمز الدوجمة">@</span>{" "}
            <span aria-label="رمز الهاش">#</span>{" "}
            <span aria-label="رمز الدولار">$</span>{" "}
            <span aria-label="رمز النسبة">%</span>
          </p>
          <Link
            className="btn-Auth mt-4"
            onClick={handleSubmit}
            disabled={!validEmail || !validatePassword ? true : false}
          >
            { !isLoding ? "تسجيل الدخول" : <Loader/>}
          
          </Link><br/>
          <Link href="#" className="link">
            هل نسيت كلمة المرور؟
          </Link>
        </div>
      </div>
    </div>
  );
}
