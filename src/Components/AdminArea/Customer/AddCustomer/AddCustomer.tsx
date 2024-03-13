import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
    useForceLogin();
    const { register, handleSubmit, formState } = useForm<CustomerModel>();

    const navigate = useNavigate();
    
    async function send(customer:CustomerModel) {
        try{
        customerService.createCustomer(customer);
        notificationService.success("Customer added");
        navigate("/admin/customers");
        }catch(err:any){
            notificationService.error(err);
        }
    }
    return (
        <div className="AddCustomer Box">
			<form onSubmit={handleSubmit(send)}>
                <h3>Add Customer:</h3>
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
                <input type="passowrd"{...register("password",{
                    required:{value:true,message: "The password is required"},
                    minLength:{value:6,message: "The password must be atleast 6 charecters"}
                })}/>
                <span>{formState.errors?.password?.message}</span>
                <br/>
                <button>✚</button>
            </form>
        </div>
    );
}

export default AddCustomer;
