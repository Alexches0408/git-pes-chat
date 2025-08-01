import React, { useState } from 'react';

const InputIcon = ({ onClick, inputValue }) => {
  const handleClick = (e) => {         
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill={inputValue ? "#708AB9" : "#D7DDE3"}/>
        <path d="M14.25 22.1738C14.25 22.588 14.5858 22.9238 15 22.9238C15.4142 22.9238 15.75 22.588 15.75 22.1738H14.25ZM15.5303 7.45872C15.2374 7.16582 14.7626 7.16582 14.4697 7.45872L9.6967 12.2317C9.40381 12.5246 9.40381 12.9995 9.6967 13.2923C9.98959 13.5852 10.4645 13.5852 10.7574 13.2923L15 9.04971L19.2426 13.2923C19.5355 13.5852 20.0104 13.5852 20.3033 13.2923C20.5962 12.9995 20.5962 12.5246 20.3033 12.2317L15.5303 7.45872ZM15 22.1738H15.75V7.98905H15H14.25V22.1738H15Z" fill="white"/>
       </svg>
    );

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Отправить сообщение"  
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

export default InputIcon;