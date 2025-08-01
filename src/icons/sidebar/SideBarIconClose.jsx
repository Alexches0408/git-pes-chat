import React, { useState } from 'react';

const SidebarIconClose = ({ onClick }) => {

  const handleClick = (e) => {          
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="7.25" stroke="#707D8F" stroke-width="1.5"/>
      <path d="M13.8828 8L10.4696 11.4133C10.079 11.8038 10.079 12.4369 10.4696 12.8275L13.8828 16.2407" stroke="#707D8F" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M7 1V23" stroke="#707D8F" stroke-width="1.5" stroke-linecap="round"/>
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

export default SidebarIconClose;