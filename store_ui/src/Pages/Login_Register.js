import "../assets/styles/Login_Register_style.css";
import { Link } from "react-router-dom";
import AuthenticationForm from "../Components/Authintecation";
export default function Login_Register(){
    return (
        <div className="section">
        <div className="background"></div>
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-top py-5">
					<AuthenticationForm/>
		      	</div>
	      	</div>
	    </div>
	</div>
    );
}