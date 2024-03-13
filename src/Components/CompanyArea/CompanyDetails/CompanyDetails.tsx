import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const [company,setCompany] = useState<CompanyModel>();
    const params = useParams();
    const id = +params.cId;

    useEffect(()=>{
        companyService.getOne(id)
        .then(c=>setCompany(c))
        .catch(err=>notificationService.error(err));
    },[]);
    return (
        
        <div className="CompanyDetails Box">
            {company && <>
            <h2>Company:</h2>
            <div><span>Name:</span><span>{company.name}</span></div>
			<div><span>Email: </span><span>{company.email}</span></div>
            </>}
        </div>
    );
}

export default CompanyDetails;
