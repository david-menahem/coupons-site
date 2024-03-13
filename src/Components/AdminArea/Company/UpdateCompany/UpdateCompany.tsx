import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {
    useForceLogin();
    const {register,handleSubmit,formState,setValue} = useForm<CompanyModel>();

    const params = useParams();
    const id = +params.cId;

    const navigate = useNavigate();

    useEffect(()=>{
        (async()=>{const company = await companyService.getOne(id)
            setValue("name",company.name);
            setValue("email",company.email);})();
    },[]);

    async function sendDetails(company:CompanyModel) {
        company.id = id;
        try{
            await companyService.updateCompanyDetail(company);
            notificationService.success("Company details updated");
            navigate("/admin/companies");
        }catch(err: any){
            notificationService.error(err);
        }
    }

    return (
    <div className="UpdateCompany">
        <h3>Update comapny:</h3>
        <form onSubmit={handleSubmit(sendDetails)}>
            <label>Name:</label>
            <br/>
            <input type="text"{...register("name")} disabled/>
            <br/>
            <label>Email:</label>
            <br/>
            <input type="email"{...register("email",{
                required:{value: true,message: "Email is required"}
            })}/>
            <span>{formState.errors?.email?.message}</span>
            <br/>
            <button>✚</button>
        </form>
    </div>
    );
}

export default UpdateCompany;
