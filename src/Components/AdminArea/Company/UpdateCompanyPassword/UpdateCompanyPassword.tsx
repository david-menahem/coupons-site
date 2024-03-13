import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./UpdateCompanyPassword.css";

function UpdateCompanyPassword(): JSX.Element {
    useForceLogin();
const { register, handleSubmit, formState } = useForm<CompanyModel>();
 
 const params = useParams();
 const id = +params.cId;
 const navigate = useNavigate();
 async function sendPassword(company: CompanyModel) {
     try{
     company.id = id;
     await companyService.updateCompanyPassword(company);
     notificationService.success("Company password updated");
     navigate("/admin/companies");
     }catch(err:any){
         notificationService.error(err);
     }
 }
 return (
     <div className="UpdateCompanyPassowrd">
		<form onSubmit={handleSubmit(sendPassword)}>
             <h3>Update password</h3>
             <input type="password"{...register("password",{
                 required:{value: true, message:"Password is required"},
                 minLength:{value: 5,message:"Password must be atleast 5 characters"}
             })} />
             <span>{formState.errors?.password?.message}</span>
             <br/>
             <button>✚</button>
        </form>
     </div>
 );
}

export default UpdateCompanyPassword;
