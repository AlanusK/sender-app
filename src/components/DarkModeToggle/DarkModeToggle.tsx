import React from "react";
import { LightBulbIcon } from "..";
import './DarkModeToggle.css'

interface IDarkModeToggleProps {
  darkMode: any;
  setDarkMode: any;
}

const DarkModeToggle = ({ darkMode, setDarkMode }: IDarkModeToggleProps) => {
  return (
    <span
      className="dark-mode-toggle"
      onClick={() => setDarkMode(darkMode ? false : true)}
    >
      <LightBulbIcon color={darkMode ? "silver" : "#232323"}/>
    </span>
  );
};

export default DarkModeToggle;
