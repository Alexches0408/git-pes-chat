import React, { useState } from 'react';
import { useSelector } from 'react-redux'

const PlusIcon = ({ onClick }) => {
  const darkMode = useSelector((state)=>state.gitChat.darkMode);


  const handleClick = (e) => {           
    onClick?.(e);               
  };

  let content;

  content = (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 11C0.999999 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 0.999999 1 5.47715 1 11Z" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.071 11H3.92891" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M11 3.92871V18.0708" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Создать чат"  
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
};

export default PlusIcon;