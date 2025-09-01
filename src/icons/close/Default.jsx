import React from 'react';
import { useSelector } from 'react-redux'

const CloseIcon = ({ onClick }) => {

  const darkMode = useSelector((state)=>state.gitChat.darkMode)

  const strokeColor = darkMode ? "#B5BEC7" : "#363B49";

  const handleClick = (e) => {           
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1L1 15M1 1L15 15" stroke= {strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Закрыть"
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

export default CloseIcon;