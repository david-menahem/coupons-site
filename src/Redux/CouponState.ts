import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CouponState{
    public coupons : CouponModel[] = [];
}

export enum CouponActionType{
    FetchAllCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon
}

export interface CouponAction{
    type: CouponActionType,
    payload: any;
}

export function fetchAllCouponsAction(coupons: CouponModel[]): CouponAction{
    return{
        type: CouponActionType.FetchAllCoupons,
        payload: coupons
    }
}

export function addCouponAction(coupon: CouponModel): CouponAction{
    return{
        type: CouponActionType.AddCoupon,
        payload: coupon
    }
}

export function updateCouponAction(coupon: CouponModel): CouponAction{
    return{
        type: CouponActionType.UpdateCoupon,
        payload: coupon
    }
}

export function deleteCouponAction(id: number): CouponAction{
    return{
        type: CouponActionType.DeleteCoupon,
        payload: id
    }
}

export function couponReducer(currentState = new CouponState(),action: CouponAction): CouponState{
    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.FetchAllCoupons:
            newState.coupons = action.payload;
            break;
        case CouponActionType.AddCoupon:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.UpdateCoupon:
            const couponToUpdate = newState.coupons.findIndex(c=>c.id === action.payload.id);
            if(couponToUpdate >= 0){
                newState.coupons[couponToUpdate] = action.payload;
            }
            break;
        case CouponActionType.DeleteCoupon:
            const couponToDelete = newState.coupons.findIndex(c=>c.id === action.payload);
                if(couponToDelete >= 0){
            newState.coupons.splice(couponToUpdate,1);
                }
            break;
    }
     return newState;           
}

export const couponStore = createStore(couponReducer);

