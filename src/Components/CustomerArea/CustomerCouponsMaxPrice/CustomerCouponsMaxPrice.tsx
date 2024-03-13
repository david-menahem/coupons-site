import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCouponsCard from "../CustomerCouponsCard/CustomerCouponsCard";
import "./CustomerCouponsMaxPrice.css";
function CustomerCouponsMaxPrice(): JSX.Element {
    useForceLogin();
    const [coupons,setCoupons] = useState<CouponModel[]>([]);
    const params = useParams();
    const customerId = +params.cId;
    async function getCoupons(args: SyntheticEvent) {
    
    const maxPrice = (args.target as HTMLSelectElement).value;
    couponService.getCustomerCouponsByMaxPrice(customerId,+maxPrice)
    .then(c=>setCoupons(c))
    .catch(err=>notificationService.error(err));        
}
    return (
        <div className="CustomerCouponsMaxPrice">
			<div className="maxPriceBox">
                <label>Enter a maximum price:</label>
                <input onChange={getCoupons} type="number"></input>
            </div>
        <br/>
        {
           coupons && 
           <>
           {
               coupons.map(c=><CustomerCouponsCard key={c.id} coupon={c} />)
           }
          </>
        }
        </div>
    );
}

export default CustomerCouponsMaxPrice;
