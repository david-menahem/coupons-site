import { useEffect, useState } from "react";
import { CustomerModel } from "../../../../Models/UserModel";
import customerService from "../../../../Service/CustomerService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomerList.css";

function CustomerList(): JSX.Element {
    useForceLogin();
    const [customers,setCustomers] = useState<CustomerModel[]>([]);

    useEffect(()=>{
        (async () =>setCustomers(await customerService.getAll()))();
    },[]);
    return (
        <div className="CustomerList">
            <h2>Customers</h2>
			{customers.map(c=><CustomerCard key={c.id} customer={c} />)}
        </div>
    );
}

export default CustomerList;
