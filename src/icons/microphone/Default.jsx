import React, { useState } from 'react';

const MicrophoneIconDefault = ({ onClick }) => {
  const handleClick = (e) => {         
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="#D7DDE3"/>
      <path d="M15.0128 5.8335H15.0009C12.5879 5.8335 10.6318 7.32049 10.6318 9.1548V15.0122C10.6318 16.8465 12.5879 18.3335 15.0009 18.3335H15.0128C17.4257 18.3335 19.3818 16.8465 19.3818 15.0122V9.1548C19.3818 7.32049 17.4257 5.8335 15.0128 5.8335Z" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 15.0898C22 18.4132 18.8657 21.1078 15 21.1078C11.1343 21.1078 8 18.4232 8 15.0898" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.0527 25H18.9466" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.9253 9.40625H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.9253 12.2354H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.9253 15.0645H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9995 21.1177V24.9999" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );


  return (
    <button
      type="button"
      onClick={handleClick}
      title="Набрать голосом"  
      style={{  
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          marginRight: "8px",
          outline: "none",
          cursor: "pointer",
          }}
    >
      {content}
    </button>
  );
};

export default MicrophoneIconDefault;