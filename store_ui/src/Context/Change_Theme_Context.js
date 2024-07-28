import { createContext,  useState } from "react";

export const Theme_Context = createContext({})

export function Theme_Provider(props){
    
    // Store the selected theme to select icon theme
    const storedTheme = localStorage.getItem('selectedTheme');
    
    const [theme, setTheme] = useState(storedTheme)

    return (
        <Theme_Context.Provider value={{theme, setTheme}}>
            {props.children}
        </Theme_Context.Provider>
    );
}