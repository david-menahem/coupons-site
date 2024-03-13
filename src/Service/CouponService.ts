import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { addCouponAction, couponStore, deleteCouponAction, fetchAllCouponsAction, updateCouponAction } from "../Redux/CouponState";
import appConfig from "../Utils/Config";

class CouponService{

    public async getAllCoupons(){
        if(couponStore.getState().coupons.length === 0){
            const response = await axios.get<CouponModel[]>(appConfig.customerUrl + "coupons");
            const coupons = response.data;
            couponStore.dispatch(fetchAllCouponsAction(coupons));
            return coupons;
        }
        return couponStore.getState().coupons;
    }

    public async addCoupon(coupon: CouponModel): Promise<void>{
        const formData = new FormData();
        formData.append("title",coupon.title);
        formData.append("price",coupon.price.toString());
        formData.append("startDate",coupon.startDate.toString());
        formData.append("endDate",coupon.endDate.toString());
        formData.append("amount",coupon.amount.toString());
        formData.append("description",coupon.description);
        formData.append("category",coupon.category);
        formData.append("companyId",coupon.company.id.toString());
        formData.append("imageFile",coupon.imageFile as File);
        const response = await axios.post<CouponModel>(appConfig.companyUrl + "coupons",formData);
        couponStore.dispatch(addCouponAction(response.data));
    }

    public async updateCoupon(coupon: CouponModel): Promise<void>{
        console.log(coupon)
        const formData = new FormData();
        formData.append("id",coupon.id.toString())
        formData.append("title",coupon.title);
        formData.append("price",coupon.price.toString());
        formData.append("startDate",coupon.startDate);
        formData.append("endDate",coupon.endDate);
        formData.append("amount",coupon.amount.toString());
        formData.append("description",coupon.description);
        formData.append("category",coupon.category);
        formData.append("companyId",coupon.company.id.toString());
        formData.append("imageFile",coupon.imageFile as File);
        const response = await axios.put<CouponModel>(appConfig.companyUrl + "coupons/" + coupon.id,formData);
        couponStore.dispatch(updateCouponAction(response.data));
    }

    public async deleteCoupon(couponId:number):Promise<void>{
        await axios.delete(appConfig.companyUrl + "coupons/" + couponId);
        couponStore.dispatch(deleteCouponAction(couponId));
    }

    public async getCompanyCoupons(companyId: number):Promise<CouponModel[]>{
        const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "coupons/" + companyId);
        const coupons = response.data;
        return coupons;
    }

    public async getCompanyCouponsByCategory(companyId: number, category: string): Promise<CouponModel[]>{
        const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "coupons/category/" +  companyId + "?category=" + category);
        const coupons = response.data;
        return coupons;
    }
    
    public async getCompanyCouponsByMaxPrice(companyId: number, maxPrice: number): Promise<CouponModel[]>{
        const response  = await axios.get<CouponModel[]>(appConfig.companyUrl + "coupons/max_price/" +  companyId + "?maxPrice=" + maxPrice);
        const coupons = response.data
        return coupons;
    }

    public async getCustomerCoupons(customerId: number):Promise<CouponModel[]>{
        const response = await axios.get<CouponModel[]>(appConfig.customerUrl + "purchases/" + customerId);
        const coupons = response.data;
        return coupons;
    }
    public async getCustomerCouponsByCategory(customerId: number, category: string): Promise<CouponModel[]>{
        const response = await axios.get<CouponModel[]>(appConfig.customerUrl + "purchases/category/" +  customerId + "?category=" + category);
        const coupons = response.data;
        return coupons;
    }
        
    public async getCustomerCouponsByMaxPrice(customerId: number, maxPrice: number): Promise<CouponModel[]>{
        const response  = await axios.get<CouponModel[]>(appConfig.customerUrl + "purchases/max_price/" +  customerId + "?maxPrice=" + maxPrice);
        const coupons = response.data
        return coupons;
    }

    public async getOneCoupon(couponId:number):Promise<CouponModel>{
        const response = await axios.get<CouponModel>(appConfig.customerUrl + "coupon/" + couponId);
        const coupon = response.data;
        return coupon;
    }

    public async buyCoupon(customerId: number,couponId : number):Promise<void>{
        await axios.get<void>(appConfig.customerUrl + "purchase/?customerId=" + customerId + "&couponId=" + couponId);
    }

}
const couponService = new CouponService();
export default couponService;