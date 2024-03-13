import { createStore } from "redux";
import { CustomerModel } from "../Models/UserModel";

export class CustomerState{
    public customers: CustomerModel[] = [];
}

export enum CustomerActionType{
    FetchAllCustomers,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer
}

export interface CustomerAction{
    type: CustomerActionType,
    payload: any;
}

export function fetchAllCustomersAction(customers: CustomerModel[]): CustomerAction{
    return{
        type: CustomerActionType.FetchAllCustomers,
        payload: customers
    }
}

export function addCustomerAction(customer: CustomerModel):CustomerAction{
    return{
        type: CustomerActionType.AddCustomer,
        payload: customer
    }
}

export function updateCustomerAction(customer: CustomerModel): CustomerAction{
    return{
        type: CustomerActionType.UpdateCustomer,
        payload: customer
    }
}

export function deleteCustomerAction(id:number): CustomerAction{
    return{
        type: CustomerActionType.DeleteCustomer,
        payload: id
    }
}

export function customerReducer(currentState = new CustomerState(), action: CustomerAction): CustomerState{
    const newState = {...currentState};

    switch(action.type){
        case CustomerActionType.FetchAllCustomers:
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomer:
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer:
            const customerToUpdate = newState.customers.findIndex(c=>c.id === action.payload.id);
            if(customerToUpdate>=0){
                newState.customers[customerToUpdate] = action.payload;
            }
            break;
        case CustomerActionType.DeleteCustomer:
            const customerToDelete = newState.customers.findIndex(c=> c.id === action.payload)
            if(customerToDelete>=0){
                newState.customers.splice(customerToDelete,1);
            }
            break;
    }
return newState;
}

export const customerStore = createStore(customerReducer);


