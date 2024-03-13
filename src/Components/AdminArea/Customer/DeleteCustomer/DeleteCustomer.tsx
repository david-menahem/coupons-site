import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
    useForceLogin();
    const params = useParams();
    const id = +params.cId;

    const navigate = useNavigate();

    useEffect(()=>{
        try{
        customerService.deleteCustomer(id);
        notificationService.success("Customer deleted");
        navigate("/home");
        }catch(err:any){
            notificationService.error(err);
        }
    },[]);
    return null;
}

export default DeleteCustomer;
