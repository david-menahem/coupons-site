import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
    useForceLogin();
    const params = useParams();
    const id = +params.cId;

    const navigate = useNavigate();
    useEffect(()=>{
        try{
            navigate("/home");
            (async ()=>await companyService.deleteCompany(id))();
            notificationService.success("Company deleted");
            navigate("/home");
        }catch(err:any){
            notificationService.error(err);
        }
    },[]);
    return null;
}

export default DeleteCompany;
