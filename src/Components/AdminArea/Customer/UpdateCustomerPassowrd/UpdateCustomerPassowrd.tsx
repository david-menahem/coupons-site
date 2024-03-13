import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./UpdateCustomerPassowrd.css";

function UpdateCustomerPassowrd(): JSX.Element {
    useForceLogin();
    const { register, handleSubmit, formState } = useForm<CustomerModel>();
    
    const params = useParams();
    const id = +params.cId;
    const navigate = useNavigate();
    async function sendPassword(customer: CustomerModel) {
        try{
        customer.id= id;
        await customerService.updateCustomerPassword(customer);
        notificationService.success("Customer password updated");
        navigate("/admin/customers");
        }catch(err:any){
            notificationService.error(err);
        }
    }
    return (
        <div className="UpdateCustomerPassowrd">
			<form onSubmit={handleSubmit(sendPassword)}>
                <h3>Update password</h3>
                <input type="password"{...register("password",{
                    required:{value: true, message:"Password is required"},
                    minLength:{value: 6,message:"Password must be atleast 6 characters"},
                    maxLength:{value: 10,message:"Password must be at the most 10 characters"}
                })} />
                <span>{formState.errors?.password?.message}</span>
                <br/>
                <button>✚</button>
        </form>
        </div>
    );
}

export default UpdateCustomerPassowrd;
