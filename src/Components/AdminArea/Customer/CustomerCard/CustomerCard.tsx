import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import "./CustomerCard.css";

interface CustomerCardProps{
    customer: CustomerModel;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Box">
            <h3>Customer:</h3>
            <div>First name:</div>
			<div>{props.customer.firstName}</div>
            <div>Last name:</div>
            <div>{props.customer.lastName}</div>
            <div>Email:</div>
            <div>{props.customer.email}</div>
            <NavLink to={"/admin/update_customer/" + props.customer.id}>✏️</NavLink>
            <span> | </span>
            <NavLink to={"/admin/delete_customer/"+ props.customer.id}>🗑</NavLink>
            <span> | </span>
            <NavLink to={"/admin/update_customer_password/" + props.customer.id}>Password</NavLink>
        </div>
    );
}

export default CustomerCard;
