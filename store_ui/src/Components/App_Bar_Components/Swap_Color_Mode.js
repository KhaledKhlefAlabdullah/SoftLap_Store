import { ReactComponent as Sun } from "../../assets/images/swap_color_icon/Sun.svg";
import { ReactComponent as Moon } from "../../assets/images/swap_color_icon/Moon.svg";
import "../../assets/styles/app_bar_components_style/swap_color.css";
import { useState, useEffect, useContext } from 'react';
import { Theme_Context } from "../../Context/Change_Theme_Context";
export default function Swap_Color_Mode() {

    // Get context to update theme state in auther conponenets 
    const theme_context = useContext(Theme_Context)

    // Set dark mode theme on the app
    const setDarkMode=()=>{

        // Set body color theme dark
        document.querySelector('body').setAttribute('data-theme', 'dark');

        // In order to preserve the color scheme after refreshing the page
        localStorage.setItem('selectedTheme','dark');

        // Set logo theme as dark
        theme_context.setTheme('dark');
    }

    // Set theme on the app
    const setLightMode=()=>{

        document.querySelector('body').setAttribute('data-theme', 'light');
        // In order to preserve the color scheme after refreshing the page

        localStorage.setItem('selectedTheme','light');

        // Set theme as light
        theme_context.setTheme('light');
    }
    
    // Effect to initialize the theme based on localStorage
    useEffect(() => {
        if (theme_context.theme === "dark") {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, [theme_context.theme]);

    // this function change the color theme depending on switch button chacking
    const toggleTheme = e =>{

        if(e.target.checked)

            setDarkMode();

        else
        
            setLightMode();
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                // caled functio to switch color theme
                onChange={toggleTheme}

                // make the default check the dark them and dark icon
                defaultChecked={theme_context.theme}
            />           
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};


