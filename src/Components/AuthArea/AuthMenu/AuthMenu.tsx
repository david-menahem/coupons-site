import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [role,setRole] = useState<string>();
    const [name,setName] = useState<string>();


    useEffect(()=>{
        setRole(authStore.getState().authorities);
        setName(authStore.getState().name);

        const unsubscribe = authStore.subscribe(()=>{
            setRole(authStore.getState().authorities);
            setName(authStore.getState().name);
        });

        return () =>{
            unsubscribe();
        }
     },[]);

    return (
        <div className="AuthMenu">
			{
            !role && <>
            <span>Hello Guest | </span>
            <NavLink to="/login">Login</NavLink>
            <span> | </span>
            <NavLink to="/register">Register</NavLink>
            </>
            }
            {
            role &&<>
            <span> {"Hello " + name}</span>
            <span> | </span>
            <NavLink to="logout">Logout</NavLink>
            </>
            }
        </div>
    );
}

export default AuthMenu;
