import { NavLink } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import "./CompanyCard.css";
interface ComapnayCardProps{
    company : CompanyModel;
}
function CompanyCard(props: ComapnayCardProps): JSX.Element {

    return (
        <div className="CompanyCard Box">
			<span>{props.company.name}</span>
            <br/>
            <span>Email: </span><span>{props.company.email}</span>
            <br/>

            <NavLink to={"/admin/update_company/" + props.company.id} >✏️</NavLink>
            <span> | </span>
            <NavLink to={"/admin/delete_company/" + props.company.id} >🗑</NavLink>
            <span> | </span>
            <NavLink to={"/admin/update_company_password/" + props.company.id}>Password</NavLink>
            
        </div>
    );
}

export default CompanyCard;
