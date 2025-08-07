import React, { useState } from 'react';

const CloseIcon = ({ onClick }) => {

  const handleClick = (e) => {           
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1L1 15M1 1L15 15" stroke="#363B49" stroke-width="1.5" stroke-linecap="round"/>
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