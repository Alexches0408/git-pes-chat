import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const MSideBarIcon = ({ onClick }) => {

  const darkMode = useSelector((state)=>state.gitChat.darkMode);

  const strokeColor = darkMode ? "#B5BEC7" : "#1A202C";

  const handleClick = (e) => {          
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5H12H22M7.92593 11.7375H22M2 19H22" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );


  return (
    <button
      type="button"
      onClick={handleClick}
      style={{  
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          outline: "none",
          cursor: "pointer",
          }}
    >
      {content}
    </button>
);
} 

export default MSideBarIcon;