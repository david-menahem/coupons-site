import axios from "axios";
import { CustomerModel } from "../Models/UserModel";
import { addCustomerAction, customerStore, deleteCustomerAction, fetchAllCustomersAction, updateCustomerAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class CustomerService{

    public async createCustomer(customer : CustomerModel): Promise<void>{
        const response = await axios.post<CustomerModel>(appConfig.adminUrl + "customers/",customer);
        customerStore.dispatch(addCustomerAction(response.data));
    }

    public async updateCustomerDetail(customer: CustomerModel): Promise<void>{
        const resposne = await axios.put<CustomerModel>(appConfig.adminUrl + "customers/details/" +  customer.id,customer);
        customerStore.dispatch(updateCustomerAction(resposne.data));
    }

    public async updateCustomerPassword(customer: CustomerModel): Promise<void>{
        await axios.put<CustomerModel>(appConfig.adminUrl + "customers/password/" +  customer.id, customer);
    }

    public async deleteCustomer(id: number): Promise<void>{
        await axios.delete(appConfig.adminUrl + "customers/" + id);
        customerStore.dispatch(deleteCustomerAction(id));
    }

    public async getAll(): Promise<CustomerModel[]>{
        if(customerStore.getState().customers.length === 0){
            const response = await axios.get<CustomerModel[]>(appConfig.adminUrl + "customers/");
            customerStore.dispatch(fetchAllCustomersAction(response.data));
            return response.data;
        }
        return customerStore.getState().customers;
    }

    public async getOne(id: number): Promise<CustomerModel>{
        const response = await axios.get<CustomerModel>(appConfig.customerUrl + id);
        const customer = response.data;
        return customer;
    }

    public async getOneByEmail(email: string): Promise<CustomerModel>{
        const response = await axios.get<CustomerModel>(appConfig.customerUrl + "email/" + email);
        const customer = response.data;
        return customer;
    }
}
const customerService = new CustomerService();
export default customerService;