import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notificationService from "../Service/NotificationService";

    function useForceLogin() {

        const navigate = useNavigate();
    
        useEffect(() => {
            
            const token = authStore.getState().token;
            if(token){
                const container:{exp: number} = jwtDecode(token);
                if(container.exp < Date.now()/1000){
                    notificationService.error("Login expired,please log back in");
                    logout();
                    navigate("/login");
                }
            }else{
                notificationService.error("Please login");
                logout();
                navigate("/login");
            }
    
        }, []);

        function logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("authorities");
            localStorage.removeItem("id");
        }
    }

    export default useForceLogin;