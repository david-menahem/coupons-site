import CouponModel from "../../../Models/CouponModel";
import "./CustomerCouponsCard.css";

interface CustomerCouponsCardProps{
    coupon: CouponModel;
    buy?: (cuponId: number) => void;
}

function CustomerCouponsCard(props: CustomerCouponsCardProps): JSX.Element {
    return (
        <div className="CustomerCouponsCard Box">
			<h3>{props.coupon.title}</h3>
            <div>${props.coupon.price}</div>
            <div>Expire date: {props.coupon.endDate}</div>
            <div>Description: {props.coupon.description}</div>
            <div className="image">
                <img src = {"data:image/jpeg;base64," + props.coupon.image} alt="" width={250} height={250}/>
            </div>
            {props.buy &&
                <button onClick={() => props.buy(props.coupon.id)}>🛒</button>
            }
        </div>
    );
}

export default CustomerCouponsCard;
