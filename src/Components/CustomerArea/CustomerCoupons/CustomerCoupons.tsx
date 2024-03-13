import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCouponsCard from "../CustomerCouponsCard/CustomerCouponsCard";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {
    useForceLogin();
    const [coupons,setCoupons] = useState<CouponModel[]>([]);
        const params = useParams();
        const id = +params.cId;
        useEffect(()=>{
            couponService.getCustomerCoupons(id)
            .then(c=>setCoupons(c))
            .catch(err=>notificationService.error(err));
        },[]);
    return (
        <div className="CustomerCoupons">
			<h2>Coupons</h2>
                {coupons && 
                <>
                {
                    coupons.map(c=><CustomerCouponsCard key={c.id} coupon={c} />)
                }
                </>}
        </div>
    );
}

export default CustomerCoupons;
