
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./AddCompany.css";

function AddCompany(): JSX.Element {
    useForceLogin();
    const {register,handleSubmit,formState} = useForm<CompanyModel>();

    const navigate = useNavigate();

    async function send(company: CompanyModel){
        try{
        await companyService.addCompany(company);
        notificationService.success("Company added");
        navigate("/admin/companies");
        }catch(err: any){
            notificationService.error(err);
        }
        
    }
    return (
        <div className="AddCompany Box">
            <h3>Add Comapany</h3>
                <form onSubmit={handleSubmit(send)}>
                    <label>Name:</label>
                    <br/>
                    <input type="text"{...register("name",{
                        required:{value: true,message: "Name is required"},
                        minLength:{value: 4,message:"Company name must be atleast 4 letters"},
                        maxLength:{value: 15,message:"Company name must be 15 letters at the most"}
                    })}/>
                    <span>{formState.errors?.name?.message}</span>
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input type="email"{...register("email",{
                        required:{value: true,message: "Email is required"}
                    })}/>
                    <span>{formState.errors?.email?.message}</span>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type="password"{...register("password",{
                        required:{value: true,message: "password is required"},
                        minLength: { value: 5,message: 'The password must be atleast 5 charecters'}
                    })}/>
                    <span>{formState.errors?.password?.message}</span>
                    <br/>
                    <button>✚</button>
                </form>
        </div>
    );
}

export default AddCompany;
