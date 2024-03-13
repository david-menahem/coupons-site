import axios from "axios";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import appConfig from "../Utils/Config";

class RegisterService{

    public async registerCompany(company : CompanyModel): Promise<void>{
       await axios.post<void>(appConfig.registerUrl + "company",company);
    }

    public async registerCustomer(customer : CustomerModel): Promise<void>{
        await axios.post<void>(appConfig.registerUrl + "customer",customer);
     }

}
const registerService = new RegisterService();
export default registerService;