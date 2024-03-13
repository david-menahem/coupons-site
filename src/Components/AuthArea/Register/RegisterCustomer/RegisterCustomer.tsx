import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import notificationService from "../../../../Service/NotificationService";
import registerService from "../../../../Service/RegisterService";
import "./RegisterCustomer.css";

function RegisterCustomer(): JSX.Element {
    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm<CustomerModel>();
    async function send(customer: CustomerModel){
        try{
            await registerService.registerCustomer(customer);
            notificationService.success("Customer added, you may log in");
            navigate("/login");
        }catch(err: any){
            notificationService.error(err);
        }
    }
    return (
        <div className="RegisterCustomer Box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Register Customer</h2>
			    <label>First Name:</label>
                <br />
                <input
                type="firstName"
                {...register('firstName', {
                    required: { value: true, message: 'first name is required' },
                })}
                />
                <span>{formState.errors?.firstName?.message}</span>
                <br />
                <label>Last Name:</label>
                <input
                type="lastName"
                {...register('lastName', {
                    required: { value: true, message: 'last name is required' },
                })}
                />
                <span>{formState.errors?.lastName?.message}</span>
                <br />
                <label>Email:</label>
                <br />
                <input
                type="email"
                {...register('email', {
                    required: { value: true, message: 'email is required' },
                })}
                />
                <span>{formState.errors?.email?.message}</span>
                <br />
                <label>Password:</label>
                <input
                type="password"
                {...register('password', {
                    required: { value: true, message: 'password is requeired' },
                    minLength: { value: 5,message: 'The password must be atleast 5 charecters'}
                })}
                />
                <span>{formState.errors?.password?.message}</span>
                <br />
                <button>✚</button>
            </form>
        </div>
    );
}

export default RegisterCustomer;
