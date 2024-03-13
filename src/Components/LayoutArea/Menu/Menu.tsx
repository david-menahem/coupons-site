import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";

function Menu(): JSX.Element {
    const [role,setRole] = useState<string>();
    const [id,setId] = useState<number>();

    useEffect(()=>{
        
        setRole(authStore.getState().authorities);
        setId(authStore.getState().id);

       const unsubscribe = authStore.subscribe(()=>{
        setRole(authStore.getState().authorities);
        setId(authStore.getState().id as number);
       });

       return ()=>{
        unsubscribe();
    };
    },[]);

    return (
        <div className="Menu">
			{ 
            id > 0 && role === Role.Customer && 
            <>
            <span>Customer Menu</span>
            <NavLink to={"/customer/coupons/" + id}>See my coupons</NavLink>
            <NavLink to={"/customer/coupons/by_category/" + id}>See my coupons by category</NavLink>
            <NavLink to={"/customer/coupons/by_max_price/" + id}>See my coupons by maxiumum price</NavLink>
            <NavLink to={"/customer/buy_coupon"}>Buy Coupons</NavLink>
            <NavLink to={"/customer/" + id}>See my details</NavLink>
            </>}
            { 
            id > 0 && role === Role.Company && 
            <>
            <span>Company Menu</span>
            <NavLink to={"/company/coupons/" + id}>See my coupons</NavLink>
            <NavLink to={"/company/coupons/by_category/" + id}>See my coupons by category</NavLink>
            <NavLink to={"/company/coupons/by_max_price/" + id}>See my coupons by maxiumum price</NavLink>
            <NavLink to={"/company/add_coupon/" + id}>Add coupon</NavLink>
            <NavLink to={"/company/" + id}>See my details</NavLink>
            </>}
            { 
            id ===0 && role === Role.Admin && 
            <>
            <span>Admin Menu</span>
            <NavLink to="/admin/companies">See Companies</NavLink>
            <NavLink to="/admin/add_company" >Add Company</NavLink>
            <NavLink to="/admin/customers">See Customers</NavLink>
            <NavLink to="/admin/add_customer">Add Customer</NavLink>
            </>}
        </div>
    );
}

export default Menu;
