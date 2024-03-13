import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import notificationService from "../../../../Service/NotificationService";
import registerService from "../../../../Service/RegisterService";
import "./RegisterCompany.css";

function RegisterCompany(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    async function send(company: CompanyModel){
        try{
            registerService.registerCompany(company);
            notificationService.success("Company added, you may lgoin");
            navigate("/login");
        }
        catch(err : any){
            notificationService.error(err);
        }
    }
    return (
        <div className="RegisterCompany Box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Register Company</h2>
                <label>Name:</label>
                <br />
                <input type="name"
                {...register('name', {
                    required: { value: true, message: 'name is required' },
                })}
                />
                <span>{formState.errors?.name?.message}</span>
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
                <br />
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

export default RegisterCompany;
