import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CompanyCouponsCard.css";

interface CompanyCouponsCardProps{
    coupon: CouponModel;
}
function CompanyCouponsCard(props: CompanyCouponsCardProps): JSX.Element {
    return (
        <div className="CompanyCouponsCard Box">
            <h3>{props.coupon.title}</h3>
            <div>${props.coupon.price}</div>
            <div>Expire date: {props.coupon.endDate}</div>
            <div>{props.coupon.amount}</div>
            <div>Description: {props.coupon.description}</div>
            <NavLink to={"/company/update_coupon/" + props.coupon.company.id + "/" + props.coupon.id} >✏️</NavLink>
            <span> | </span>
            <NavLink to={"/company/delete_coupon/" + props.coupon.id}>🗑</NavLink>
            <div className="image">
                <img src = {"data:image/jpeg;base64," + props.coupon.image} alt="" width={250} height={250}/>
            </div>
        </div>

    );
}

export default CompanyCouponsCard;
