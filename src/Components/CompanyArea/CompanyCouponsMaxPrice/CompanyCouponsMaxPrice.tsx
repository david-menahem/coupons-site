import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import CompanyCouponsCard from "../CompanyCouponsCard/CompanyCouponsCard";
import "./CompanyCouponsMaxPrice.css";

function CompanyCouponsMaxPrice(): JSX.Element {
    const [coupons,setCoupons] = useState<CouponModel[]>([]);
    const params = useParams();
    const companyId = +params.cId;

    async function getCoupons(args: SyntheticEvent) {
        const maxPrice = (args.target as HTMLSelectElement).value;

    couponService.getCompanyCouponsByMaxPrice(companyId,+maxPrice)
    .then(c=>setCoupons(c))
    .catch(err=>notificationService.error(err));        
    }
    return (
        <div className="CompanyCouponsMaxPrice">
            <div className="maxPriceBox">
                <label>Enter a maximim price:</label>
			    <input onChange={getCoupons} type="number"></input>
            </div>
            <br/>
            {
                coupons && 
                <>
                {
                    coupons.map(c=><CompanyCouponsCard key={c.id} coupon={c} />)
                }
                </>
            }
        </div>
    );
}

export default CompanyCouponsMaxPrice;
