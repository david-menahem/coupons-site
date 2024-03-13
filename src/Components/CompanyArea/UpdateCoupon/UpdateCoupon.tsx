import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { CompanyModel } from "../../../Models/UserModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {
    const { register,handleSubmit,formState,setValue} = useForm<CouponModel>();
    const navaigate = useNavigate();
    const params = useParams();
    const companyId = +params.cId;
    const couponId = +params.couponId;

    useEffect(()=>{
        (async()=>{const coupon = await couponService.getOneCoupon(couponId);
        setValue("title",coupon.title);
        setValue("price",coupon.price);
        setValue("endDate",coupon.endDate);
        setValue("startDate",coupon.startDate);
        setValue("amount",coupon.amount);
        setValue("category",coupon.category);
        setValue("description",coupon.description);
        })();
    },[]);

    async function send(coupon:CouponModel) {
        try{
            
            coupon.id = couponId;
            coupon.company = new CompanyModel();
            coupon.company.id = companyId;
            coupon.imageFile = (coupon.imageFile as FileList)[0];
            couponService.updateCoupon(coupon);
            notificationService.success("Coupon updated");
            navaigate("/home");
        }catch(err:any){
            notificationService.error(err);
        }
    }
    return (
        <div className="UpdateCoupon">
			<h3>Update Coupon</h3>
             <form encType="multipart/form-data" onSubmit={handleSubmit(send)}>
                <label>Title:</label>
                <br/>
                <input type="text"{...register("title",{
                    required:{value:true,message:"The title is required"}
                })}/>
                <span>{formState.errors?.title?.message}</span>
                <br/>
                <label>Price:</label>
                <br/>
                <input type="number"{...register("price",{
                    min:{value: 1,message: "The price must be atleast 1"}})}/>
                <span>{formState.errors?.price?.message}</span>
                <br/>
                <label>Start date:</label>
                <br/>
                <input type="date"{...register("startDate")}/>
                <span>{formState.errors?.startDate?.message}</span>
                <br/>
                <label>Expiration date:</label>
                <br/>
                <input type="date"{...register("endDate")}/>
                <span>{formState.errors?.endDate?.message}</span>
                <br/>
                <label>Amount in stock:</label>
                <br/>
                <input type="number"{...register("amount",{
                    min:{value:0,message:"the amount in stock must be atleast 0"}
                })} />
                <span>{formState.errors?.amount?.message}</span>
                <br/>
                <label>Description</label>
                <br/>
                <input type="text"{...register("description")} />
                <span>{formState.errors?.description?.message}</span>
                <br/>
                <label>Category:</label>
                <br/>
                <select {...register("category")}
                    required>
                <option>FOOD</option>
                <option>ELECTRICITY</option>
                <option>RESTAURANT</option>
                <option>VACATION</option>
                </select>
                <br/>
                <input type="file" {...register("imageFile",{
                    required:{value:true,message: "The image is required"}
                })}/>
                <span>{formState.errors?.imageFile?.message}</span>
                <br/>
                <button>✚</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
