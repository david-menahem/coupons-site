import axios from "axios";
import { CompanyModel } from "../Models/UserModel";
import { addCompanyAction, companyStore, deleteCompanyAction, fetchAllCompaniesAction, updateCompanyAction } from "../Redux/CompaniesState";
import appConfig from "../Utils/Config";

class CompanyService{

    public async addCompany(company: CompanyModel): Promise<void>{
        const resposne = await axios.post<CompanyModel>(appConfig.adminUrl + "companies/",company);
        companyStore.dispatch(addCompanyAction(resposne.data));
    }

    public async updateCompanyDetail(company: CompanyModel): Promise<void>{
        const resposne = await axios.put<CompanyModel>(appConfig.adminUrl + "companies/details/" + company.id,company);
        companyStore.dispatch(updateCompanyAction(resposne.data));
    }

    public async updateCompanyPassword(company: CompanyModel): Promise<void>{
        await axios.put<CompanyModel>(appConfig.adminUrl + "companies/password/" + company.id,company);
    }

    public async deleteCompany(id: number): Promise<void>{
        await axios.delete(appConfig.adminUrl + "companies/" + id);
        companyStore.dispatch(deleteCompanyAction(id));
    }

    public async getAll(): Promise<CompanyModel[]>{
        if(companyStore.getState().companies.length === 0){
            const response = await axios.get<CompanyModel[]>(appConfig.adminUrl + "companies");
            const companies = response.data;
            companyStore.dispatch(fetchAllCompaniesAction(companies));
            return companies;
        }
        return companyStore.getState().companies;
    }
    public async getOne(id: number): Promise<CompanyModel>{
        const response = await axios.get<CompanyModel>(appConfig.companyUrl + id);
        const company = response.data;
        return company
    }

    public async getOneByEmail(email: string): Promise<CompanyModel>{
        const response = await axios.get<CompanyModel>(appConfig.companyUrl + "email/" + email);
        const company = response.data;
        console.log(company)
        return company
    }
}
const companyService = new CompanyService();
export default companyService;