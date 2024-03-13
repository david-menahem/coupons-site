import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCouponsCard from "../CustomerCouponsCard/CustomerCouponsCard";
import "./BuyCoupon.css";

function BuyCoupon(): JSX.Element {
    useForceLogin();
    const [coupons,setCoupons] =  useState<CouponModel[]>([]);
    const [customerId,setCustomerId] = useState<number>();

    const navigate = useNavigate();

    useEffect(()=>{
       setCustomerId(authStore.getState().id as number);
       couponService.getAllCoupons()
       .then(c=>setCoupons(c))
       .catch(err=>notificationService.error(err));
    },[]);

    async function buyCoupon(couponId:number) {
        try{
            
            try{
                await couponService.buyCoupon(customerId,couponId);
                notificationService.success("Coupon purchased");
                navigate("/customer/buy_coupon");
            }catch(err: any){
                notificationService.error(err);
            }

        }catch(err:any){
            notificationService.error(err);
        }
        const unsubscribe = authStore.subscribe(()=>{
            setCustomerId(authStore.getState().id as number);
        });

        return () =>{
            unsubscribe();
        }
        
    }
    return (
        <div className="BuyCoupon">
			<h2>Coupons</h2>
            {coupons && 
            <>
            {coupons.map(c=><CustomerCouponsCard key={c.id} coupon={c} buy={buyCoupon}/> )}
            </>}
        </div>
    );
}

export default BuyCoupon;
