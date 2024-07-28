import { useState, useRef, useEffect } from "react";

export default function Menue_Button(props) {

  // State to control the menu icon type (bars or times)
  const iconState = props.menuState;

  const [iconType, setIconType] = useState(iconState);

  // Function to toggle the menu state
  const changeMenuState = props.changeMenuState;
  const changeState = () => {

    setIconType(!iconType);
    
    changeMenuState();
  };

  // Hide list menu on click outside menu
  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (e) => {
      // Clicked outside the menu container when the menu is open
      if (!iconType && props.linksRef.current && !props.linksRef.current.contains(e.target)) {
        changeState();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [iconType, changeState]);

  return (
    <div className="bar-menu" >
      <i
        id="bar-list"
        onClick={changeState}
        className={iconType ? "ico-trans fas fa-bars" : "ico-trans fas fa-times"}
      ></i>
    </div>
  );
}
