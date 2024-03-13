import jwtDecode from "jwt-decode";
import { createStore } from "redux";

export class AuthState{
    public token: string = null;
    public id: number = null;
    public authorities: string = null;
    public name: string = null;

    public constructor(){
        this.token = localStorage.getItem("token");
        if(this.token){
            const container: { authorities: string, id: number, name: string} = jwtDecode(this.token);
            this.authorities = container.authorities;
            this.id = container.id;
            this.name = container.name;

            localStorage.setItem("name",this.name);
            localStorage.setItem("authorities",this.authorities);
            localStorage.setItem("id",this.id.toString());
        }
    }
}

export enum AuthActionType{
    Login,
    Logout
}

export interface AuthAction{
    type: AuthActionType,
    payload?: string
}

export function loginAction(token: string): AuthAction{
    return{
        type: AuthActionType.Login,
        payload: token
    }
}

export function logoutAction(): AuthAction{
    return{
        type: AuthActionType.Logout,
        payload: null
    }
}


export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.Login:
            newState.token = action.payload;
            const container: { authorities: string, id: number, name: string} = jwtDecode(newState.token);
            newState.authorities = container.authorities;
            newState.id = container.id;
            newState.name = container.name;


            localStorage.setItem("name",newState.name);
            localStorage.setItem("token",newState.token);
            localStorage.setItem("authorities",newState.authorities);
            localStorage.setItem("id",newState.id.toString());

            break;
    
    case AuthActionType.Logout:
        newState.token = null;
        newState.authorities = null;
        newState.id = null;
        newState.name = null;
        localStorage.removeItem("token");
        localStorage.removeItem("authorities");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        break;

    default: break;
    }
    return newState;
}

export const authStore = createStore(authReducer);


