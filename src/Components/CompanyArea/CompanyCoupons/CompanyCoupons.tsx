import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import CompanyCouponCard from "../CompanyCouponsCard/CompanyCouponsCard";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
    const [coupons,setCoupons] = useState<CouponModel[]>([]);

    const params = useParams();
    const id = +params.cId;
    useEffect(()=>{
        couponService.getCompanyCoupons(id)
        .then(c=>setCoupons(c))
        .catch(err=>notificationService.error(err));
    },[]);
    return (
        <div className="CompanyCoupons">
            <h2>Coupons</h2>
            {coupons && 
            <>
            {
                coupons.map(c=><CompanyCouponCard key={c.id} coupon={c} />)
            }
            </>}
        </div>
    );
}

export default CompanyCoupons;
