import React, { useState } from 'react';

const MSideBarIcon = ({ onClick }) => {

  const handleClick = (e) => {          
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5H12H22M7.92593 11.7375H22M2 19H22" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round"/>
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