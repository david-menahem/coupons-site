import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
    useForceLogin();
    const { register, handleSubmit, formState,setValue } = useForm<CustomerModel>();
    
    const params = useParams();
    const id = +params.cId;

    const navigate = useNavigate();

    useEffect(()=>{
        
        (async()=>{const customer = await customerService.getOne(id)
            setValue("firstName",customer.firstName);
            setValue("lastName",customer.lastName);
            setValue("email",customer.email);})();        
    },[]);

    async function sendDetails(customer:CustomerModel) {
        try{
        customer.id = id;
        await customerService.updateCustomerDetail(customer);
        notificationService.success("Customer details updated");
        navigate("/admin/customers");
        }catch(err:any){
            notificationService.error(err);
        }
    }

    return (
        <div className="UpdateCustomer">
			<form onSubmit={handleSubmit(sendDetails)}>
            <h3>Update Customer:</h3>
                <label>First Name:</label>
                <br/>
                <input type="text"{...register("firstName",{
                    required:{value:true,message: "The first Name is required"},
                    minLength:{value: 2,message: "The first name must be atleast 2 letters"},
                    maxLength:{value: 15, message: "The first name must be 15 letters at most"}
                })}/>
                <span>{formState.errors?.firstName?.message}</span>
                <br/>
                <label>Last Name:</label>
                <br/>
                <input type="text"{...register("lastName",{
                    required:{value:true,message: "The last Name is required"},
                    minLength:{value: 3,message: "The last name must be atleast 3 letters"},
                    maxLength:{value: 15, message: "The last name must be 15 letters at most"}
                })}/>
                <span>{formState.errors?.lastName?.message}</span>
                <br/>
                <label>Email:</label>
                <br/>
                <input type="email"{...register("email",{
                    required:{value: true,message:"The email is required"}
                })} />
                <span>{formState.errors?.email?.message}</span>
                <br/>
                <label>Password:</label>
                <br/>
                <button>✚</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
