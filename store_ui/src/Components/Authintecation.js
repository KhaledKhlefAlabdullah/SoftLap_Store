import Login_Cart from "./Authintecation_Compnents/Login_Cart";
import Register_Cart from "./Authintecation_Compnents/Register_Cart";

export default function AuthenticationForm({ title, btnText }) {
  return (
    <div className="section pb-5 pt-0 pt-sm-2 text-center">
      <h6 className="mb-0 pb-3 title ">
        <span>إنشاء حساب</span>
        <span> تسجيل الدخول</span>
      </h6>
      <input className="checkbox my-box-shadow" type="checkbox" id="reg-log" name="reg-log" />
      <label for="reg-log"></label>
      <div className="card-3d-wrap mx-auto">
        <div className="card-3d-wrapper my-box-shadow">
          <Login_Cart/>
          <Register_Cart/>
        </div>
      </div>
    </div>
  );
}
