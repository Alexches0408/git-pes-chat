import React from 'react';
import { useSelector } from 'react-redux'

const SearchIconDefault = () => {

  const darkMode = useSelector((state)=>state.gitChat.darkMode)

  const strokeColor = darkMode ? "#EAEEF14D" : "#9BA3AF";

  let content;
    content = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{position: "relative", top:"10px", left:"8px"}} xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke={strokeColor} strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" stroke={strokeColor} strokeWidth="2" />
      </svg>
    );

  return (
    <div>
      {content}
    </div>
  );
};

export default SearchIconDefault;