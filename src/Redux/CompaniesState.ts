import { createStore } from "redux";
import { CompanyModel } from "../Models/UserModel";

export class CompanyState{
    public companies: CompanyModel[] = [];
}

export enum CompanyActionType{
    FetchAllCompnaies,
    AddCompany,
    UpdateCompany,
    DeleteCompany
}

export interface CompanyAction{
    type: CompanyActionType,
    payload: any;
}

export function fetchAllCompaniesAction(companies: CompanyModel[]): CompanyAction{
    return{
        type: CompanyActionType.FetchAllCompnaies,
        payload: companies
    }
}

export function addCompanyAction(company: CompanyModel): CompanyAction{
    return{
        type: CompanyActionType.AddCompany,
        payload: company
    }
}

export function updateCompanyAction(company: CompanyModel): CompanyAction{
    return{
        type: CompanyActionType.UpdateCompany,
        payload: company
    }
}

export function deleteCompanyAction(id:number): CompanyAction{
    return{
        type: CompanyActionType.DeleteCompany,
        payload: id
    }
}

export function companyReducer(currentState = new CompanyState(), action: CompanyAction): CompanyState{
    const newState = {...currentState};
    
    switch(action.type){
        case CompanyActionType.FetchAllCompnaies:
            newState.companies = action.payload;
            break;
        case CompanyActionType.AddCompany:
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany:
            const companyToUpdate = newState.companies.findIndex(c=>c.id === action.payload.id);
            if(companyToUpdate>=0){
                newState.companies[companyToUpdate] = action.payload;
            }
            break;
        case CompanyActionType.DeleteCompany:
            const companyToDelete = newState.companies.findIndex(c=> c.id === action.payload)
            if(companyToDelete>=0){
                newState.companies.splice(companyToDelete,1);
            }
            break;
    }
return newState;
}

export const companyStore = createStore(companyReducer);


