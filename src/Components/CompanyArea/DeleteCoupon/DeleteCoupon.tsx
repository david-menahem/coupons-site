import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const id = +params.couponId;
    
    const navigate = useNavigate();
    useEffect(()=>{
        const companyId = authStore.getState().id;
         try{
            couponService.deleteCoupon(id);
            notificationService.success("Coupon deleled");
            navigate("home");
            navigate("/company/coupons/" + companyId);
         }catch(err:any){
            notificationService.error(err);
         }   
    },[]);

    return null;

}

export default DeleteCoupon;
