import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import customerService from "../../../Service/CustomerService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
    useForceLogin();
    const [customer,setCustomer] = useState<CustomerModel>();
    const params = useParams();
    const id = +params.cId;
    useEffect(()=>{
        customerService.getOne(id)
        .then(c=>setCustomer(c))
        .catch(err=>notificationService.error(err));
    },[]);
 return (
     
     <div className="CustomerDetails Box">
         {customer && <>
         <h2>Customer:</h2>
         <div>First name: {customer.firstName}</div>
         <div>Last name: {customer.lastName}</div>
		<div><span>Email: </span><span>{customer.email}</span></div>
        </>
        }
     </div>
 );
}

export default CustomerDetails;
