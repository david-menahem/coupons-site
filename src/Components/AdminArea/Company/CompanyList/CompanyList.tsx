import { useEffect, useState } from "react";
import { CompanyModel } from "../../../../Models/UserModel";
import companyService from "../../../../Service/CompanyService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./CompanyList.css";

function CompanyList(): JSX.Element {
    useForceLogin();
    const [companies,setCompanies] = useState<CompanyModel[]>([]);

    useEffect(()=>{
            (async () =>setCompanies(await companyService.getAll()))();
    },[]);
    return (
        <div className="CompanyList">
            <h2>Companies</h2>
            {companies.map(c=><CompanyCard key = {c.id} company={c} />)}
        </div>
    );
}

export default CompanyList;
