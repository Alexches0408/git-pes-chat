import React, { useState } from 'react';

const SidebarIconOpen = ({ onClick }) => {

  const handleClick = (e) => {          
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-0.75" y="0.75" width="22.5" height="22.5" rx="7.25" transform="matrix(-1 0 0 1 22.5 0)" stroke="#707D8F" stroke-width="1.5"/>
      <path d="M10.1172 8L13.5304 11.4133C13.921 11.8038 13.921 12.4369 13.5304 12.8275L10.1172 16.2407" stroke="#707D8F" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M17 1V23" stroke="#707D8F" stroke-width="1.5" stroke-linecap="round"/>
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

export default SidebarIconOpen;