import { useContext } from "react";
import User_Section from "../Components/Profile_Components/User_Section";
import Get_Users_Section from "../Components/Profile_Components/Get_Users_Section"; 
import User_Orders from "../Components/Profile_Components/User_Orders";
import { Auth_Context } from "../Context/Auth_Context";
export default function Profile() {

  const roles = localStorage.getItem("permissions");
  
  return (
    <>
      <User_Section />
      {roles.includes('admin') && <Get_Users_Section />}
       <User_Orders/>
    </>
  );
}
