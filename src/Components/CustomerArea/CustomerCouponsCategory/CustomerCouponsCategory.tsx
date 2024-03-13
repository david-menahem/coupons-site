import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCouponsCard from "../CustomerCouponsCard/CustomerCouponsCard";
import "./CustomerCouponsCategory.css";

function CustomerCouponsCategory(): JSX.Element {
useForceLogin();
const [coupons,setCoupons] = useState<CouponModel[]>([]);

const params = useParams();
const customerId = +params.cId;
async function getCoupons(args: SyntheticEvent) {
    const selectCategory = args.target as HTMLSelectElement;
    const category =  selectCategory.value;
    couponService.getCustomerCouponsByCategory(customerId,category)
    .then(c=>setCoupons(c))
    .catch(err=>notificationService.error(err));
}
    
    return (
        <div className="CustomerCouponsCategory">
            <div className="catagoryBox">
                <label>Select category</label>
                <br/>
			    <select className="catagorylabel" onChange={getCoupons} required>
                    <option value="">Please choose an option</option>
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
            </div>
            <br/>
                {
                    coupons && 
                    <>
                    {coupons.map(c=><CustomerCouponsCard key={c.id} coupon={c} />)}
                    </>
                }
        </div>
    );
}

export default CustomerCouponsCategory;
