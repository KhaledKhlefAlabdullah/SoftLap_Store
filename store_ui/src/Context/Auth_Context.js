import { createContext, useEffect, useState } from "react";

export const Auth_Context = createContext({});

export function Auth_Provider(props){

    // To store user token and email to pass it to all app
    const [auth, setAuth] = useState({});

    // Use the useEffect to check if there data in local storage(token and email) and stye logedin after page refresh
    useEffect(()=>{
        const token = localStorage.getItem('token');
        // Get user data from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const roles = localStorage.getItem('permissions');
        if (token){
            setAuth({token, user, roles});
        }
    },[]);

    return (
        <Auth_Context.Provider value={{auth, setAuth}}>
            {props.children}
        </Auth_Context.Provider>
    );
}