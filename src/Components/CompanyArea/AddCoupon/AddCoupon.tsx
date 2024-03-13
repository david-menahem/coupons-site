import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { CompanyModel } from "../../../Models/UserModel";
import couponService from "../../../Service/CouponService";
import notificationService from "../../../Service/NotificationService";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
    const { register,handleSubmit,formState } = useForm<CouponModel>();

    const params = useParams();
    const companyId = +params.cId;

    const navigate = useNavigate();
    async function send(coupon:CouponModel) {
        try{
            coupon.company = new CompanyModel();
            coupon.company.id = companyId;
            coupon.imageFile = (coupon.imageFile as FileList)[0];
            couponService.addCoupon(coupon);
            notificationService.success("Coupon added");
            navigate("/home");
        }catch(err:any){
            notificationService.error(err);
        }
    }
    return (
        <div className="AddCoupon Box">
			<h3>Add Coupon</h3>
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
                    required:{value:true,message:"The price is required"},
                    min:{value: 1,message: "The price must be atleast 1"}
                })}/>
                <span>{formState.errors?.price?.message}</span>
                <br/>
                <label>Start date:</label>
                <br/>
                <input type="date"{...register("startDate",{
                    required:{value:true,message:"The start date is required"}
                })}/>
                <span>{formState.errors?.startDate?.message}</span>
                <br/>
                <label>Expiration date:</label>
                <br/>
                <input type="date"{...register("endDate",{
                    required:{value:true,message:"The expiration date is required"}
                })}/>
                <span>{formState.errors?.endDate?.message}</span>
                <br/>
                <label>Amount in stock:</label>
                <br/>
                <input type="number"{...register("amount",{
                    required:{value:true,message:"The  price is required"},
                    min:{value:1,message:"the amount in stock must be atleast 1"}
                })}/>
                <span>{formState.errors?.amount?.message}</span>
                <br/>
                <label>Description</label>
                <br/>
                <input type="text"{...register("description",{
                    required:{value:true,message:"The  description is required"}
                })}/>
                <span>{formState.errors?.description?.message}</span>
                <br/>
                <label>Category:</label>
                <br/>
                <select {...register("category",{
                    required:{value:true,message:"The catagory is required"}
                })}
                    required>
                <option value="">Please choose an option</option>
                <option value="FOOD">Food</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="VACATION">vaction</option>
                </select>
                <span>{formState.errors?.category?.message}</span>
                <br/>
                <input type="file" {...register("imageFile",{
                    required:{value:true,message:"The image is required"}
                })}/>
                <span>{formState.errors?.imageFile?.message}</span>
                <br/>
                <button>✚</button>
            </form>
        </div>
    );
}

export default AddCoupon;
