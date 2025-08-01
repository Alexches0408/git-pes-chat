import React, { useState } from 'react';

const ShareIcon = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const handleClick = (e) => {         
    onClick?.(e);               
  };

  let content;
  if (hovered) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#E1E2E5"/>
      <path d="M16.1202 19.0245L9.80013 14.5413V13.2582L16.1202 9.18401M9.66667 13.6667C9.66667 14.9553 8.622 16 7.33333 16C6.04467 16 5 14.9553 5 13.6667C5 12.378 6.04467 11.3333 7.33333 11.3333C8.622 11.3333 9.66667 12.378 9.66667 13.6667ZM21 8.33333C21 9.622 19.9553 10.6667 18.6667 10.6667C17.378 10.6667 16.3333 9.622 16.3333 8.33333C16.3333 7.04467 17.378 6 18.6667 6C19.9553 6 21 7.04467 21 8.33333ZM21 19.6667C21 20.9553 19.9553 22 18.6667 22C17.378 22 16.3333 20.9553 16.3333 19.6667C16.3333 18.378 17.378 17.3333 18.6667 17.3333C19.9553 17.3333 21 18.378 21 19.6667Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1202 19.0245L9.80013 14.5413V13.2582L16.1202 9.18401M9.66667 13.6667C9.66667 14.9553 8.622 16 7.33333 16C6.04467 16 5 14.9553 5 13.6667C5 12.378 6.04467 11.3333 7.33333 11.3333C8.622 11.3333 9.66667 12.378 9.66667 13.6667ZM21 8.33333C21 9.622 19.9553 10.6667 18.6667 10.6667C17.378 10.6667 16.3333 9.622 16.3333 8.33333C16.3333 7.04467 17.378 6 18.6667 6C19.9553 6 21 7.04467 21 8.33333ZM21 19.6667C21 20.9553 19.9553 22 18.6667 22C17.378 22 16.3333 20.9553 16.3333 19.6667C16.3333 18.378 17.378 17.3333 18.6667 17.3333C19.9553 17.3333 21 18.378 21 19.6667Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Поделиться сообщением"  
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

export default ShareIcon;