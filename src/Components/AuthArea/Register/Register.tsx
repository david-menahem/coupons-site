import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { BaseUserModel, CustomerModel } from "../../../Models/UserModel";
import "./Register.css";


function Register(): JSX.Element {

    return (
        <div className="Register">
            <div className ="register_option"><NavLink  to="/register_company">Register Company</NavLink></div>
            <div className ="register_option"><NavLink to="/register_customer">Register Customer</NavLink></div>
        </div>
    );
}

export default Register;
