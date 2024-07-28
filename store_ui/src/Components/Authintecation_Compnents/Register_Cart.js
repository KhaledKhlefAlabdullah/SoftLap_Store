import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import regex to match email and password
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PWD_REGEX,
  REGISTER,
} from "../REGEX_And_APIs";
import { Auth_Context } from "../../Context/Auth_Context";
import Loader from "../Loader";

export default function Register_Cart() {
  // Store user token in useContext to use it in all app
  const auth_context = useContext(Auth_Context);

  // Get loding state
  const [isLoding, setIsLoding] = useState(false);

  // to redirect to home page
  const navigate = useNavigate();
  // to select the items in login form
  const nameRef = useRef();
  const errorRef = useRef();
  // to get Name value and check if is valid & foucs it
  const [name, setName] = useState("");
  const [validName, setValidateName] = useState(false);
  const [nameFoucs, setNameFouces] = useState(false);
  // to get Email value and check if is valid & foucs it
  const [email, setEmail] = useState("");
  const [validEmail, setValidateEmail] = useState(false);
  const [emailFoucs, setEmailFouces] = useState(false);
  // to get password value and check if is valid & foucs it
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordFoucs, setPasswordFouces] = useState(false);
  // to get confirm password value and check if is valid & foucs it
  const [confPassword, setConfPassword] = useState("");
  const [validateConfPassword, setValidateConfPassword] = useState(false);
  const [ConfPasswordFoucs, setConfPasswordFouces] = useState(false);
  // to store the error message
  const [error, setError] = useState("");
  // to make select the email input field automatically
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  // validate the email with regex and set the value of validEmail true
  useEffect(() => {
    setValidateName(NAME_REGEX.test(name));
  }, [name]);
  // validate the email with regex and set the value of validEmail true
  useEffect(() => {
    setValidateEmail(EMAIL_REGEX.test(email));
  }, [email]);
  // validate the password with regex and set the value of validPassword true
  useEffect(() => {
    setValidatePassword(PWD_REGEX.test(password));
    if (confPassword.length > 0)
      setValidateConfPassword(password === confPassword);
  }, [password, confPassword]);
  // set the value of errorMessage empty string
  useEffect(() => {
    setError("");
  }, [name, email, password, confPassword]);

  const handleSubmit = async (e) => {
    // Set isLoding true to view loding components
    setIsLoding(true);

    // Stop send data event
    e.preventDefault();

    // Validate the inputs with regex
    const validate_name = NAME_REGEX.test(name);
    const validation_email = EMAIL_REGEX.test(email);
    const validation_password = PWD_REGEX.test(password);
    const validation_password_confirmation = PWD_REGEX.test(confPassword);

    if (
      !validate_name ||
      !validation_email ||
      !validation_password ||
      !validation_password_confirmation
    ) {
      setError(
        "اسم المستخددم غير صالح\nالبريد الإلكتروني غير صالح\nكلمة المرور غير صالحة"
      );
      return;
    }
    console.log(email + " " + password);
    try {
      const REGISTRATION_DATA = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confPassword,
      };

      const response = await axios.post(REGISTER, REGISTRATION_DATA, {
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      // test the response

      console.log(response.data);
      if (response.status === 422)
        if (response.status === 200) {
          // Get token value from api
          const token = response.data["token"];
          // Get user and his roles

          const user = response.data["user"];

          const roles = response.data["roles"];

          // Store user token in locale storage
          localStorage.setItem("token", token);
          // Store user object in local storage
          localStorage.setItem("user", JSON.stringify(user));

          // Store user permissions in locale storage
          localStorage.setItem("permissions", roles);

          // Pass the token and email by use context to all app
          auth_context.setAuth({ token, user, roles });

          navigate("/");
        } else {
        }
    } catch (error) {
      if (!error.response) {
        setError("No Server Response");
      } else if (error.response?.status === 409) {
        setError("Email Not valid");
      } else {
        setError("Register Failed");
      }

      errorRef.current.focus();
    } finally {
      setIsLoding(false);
    }
  };
  return (
    <div className="card-back">
      <div className="center-wrap">
        <div className="section text-center">
          <p
            ref={errorRef}
            className={error ? "errmsg" : "hide"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h4 className="title mb-3 pb-3">إنشاء حساب</h4>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-style"
              placeholder="الاسم الكامل"
              autoComplete="off"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setNameFouces(true)}
              onBlur={() => setNameFouces(false)}
            />
            <i className="input-icon uil uil-user"></i>
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid state-ico" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !name ? "hide" : "state-ico invalid"}
            />
          </div>
          <p
            id="uidnote"
            className={
              nameFoucs && name && !validName ? "instructions" : "hide"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            يجب أن يكون الاسم أطول من ثلاث احرف
            <br />
            لا بجب أن يحتوي الاسم على أرقام أو محارف غريبة مثل:{""}
            <br />
            <span aria-label="علامة التعجب">!</span>{" "}
            <span aria-label="رمز الدوجمة">@</span>{" "}
            <span aria-label="رمز الهاش">#</span>{" "}
            <span aria-label="رمز الدولار">$</span>{" "}
            <span aria-label="رمز النسبة">%</span>
          </p>
          <div className="form-group mt-2">
            <input
              type="email"
              name="email"
              className="form-style"
              placeholder="البريد الإلكتروني"
              autoComplete="off"
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
              name="password"
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
          <div className="form-group mt-2">
            <input
              type="password"
              name="password_confirmation"
              className="form-style"
              placeholder="تأكيد كلمة المرور"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
              aria-invalid={validateConfPassword ? "false" : "true"}
              aria-describedby="uninote"
              onFocus={() => setConfPasswordFouces(true)}
              onBlur={() => setConfPasswordFouces(false)}
            />
            <i className="input-icon uil uil-lock-alt"></i>
            <FontAwesomeIcon
              icon={faCheck}
              className={validateConfPassword ? "state-ico valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validateConfPassword || !confPassword
                  ? "hide"
                  : "state-ico invalid"
              }
            />
          </div>
          <p
            id="pwdnote"
            className={
              ConfPasswordFoucs && !validateConfPassword
                ? "instructions"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            يجب أن يكون مشابه لكلمة المرور
          </p>
          <Link
            href="#"
            className="btn-Auth mt-4"
            onClick={handleSubmit}
            disabled={
              !validName ||
              !validEmail ||
              !validatePassword ||
              !validateConfPassword
                ? true
                : false
            }
          >
            {!isLoding ? "إنشاء حساب" : <Loader />}
          </Link>
        </div>
      </div>
    </div>
  );
}
