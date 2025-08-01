import React, { useState } from 'react';

const LikeIcon = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setActive(!active);            
    onClick?.(e);               
  };

  let content;
  if (active) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9993 11.4858H18.0925V21.6713H21.9993V11.4858Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 12.2713C18.0926 12.2713 16.1429 11.8785 15.7486 11.4856C15.3542 11.0927 14.1859 9.52854 13.7988 8.7428C13.6236 8.39359 13.4118 7.1786 13.4118 6.78574C13.4118 6.39287 13.0248 6 12.6305 6C12.2362 6 11.8491 6 11.4621 6.39287C10.6808 7.1786 10.6808 10.0233 10.6808 10.0233V11.4856H7.94971C6.78135 11.4856 6 12.2713 6 13.0498C6 14.614 6.53307 16.6147 6.78135 17.3568C7.16837 18.5354 7.94971 21.2709 8.73106 21.6638C10.2937 22.4495 14.9818 21.6638 16.5372 21.2709C16.9169 21.1764 18.0999 20.6307 18.0999 20.6307V12.2568L18.0926 12.2713Z" fill="#9BA3AF" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else if (hovered) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#E1E2E5"/>
      <path d="M21.9993 11.4858H18.0925V21.6713H21.9993V11.4858Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 12.2713C18.0926 12.2713 16.1429 11.8785 15.7486 11.4856C15.3542 11.0927 14.1859 9.52854 13.7988 8.7428C13.6236 8.39359 13.4118 7.1786 13.4118 6.78574C13.4118 6.39287 13.0248 6 12.6305 6C12.2362 6 11.8491 6 11.4621 6.39287C10.6808 7.1786 10.6808 10.0233 10.6808 10.0233V11.4856H7.94971C6.78135 11.4856 6 12.2713 6 13.0498C6 14.614 6.53307 16.6147 6.78135 17.3568C7.16837 18.5354 7.94971 21.2709 8.73106 21.6638C10.2937 22.4495 14.9818 21.6638 16.5372 21.2709C16.9169 21.1764 18.0999 20.6307 18.0999 20.6307V12.2568L18.0926 12.2713Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9994 11.4856H18.0927V21.6711H21.9994V11.4856Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 12.2713C18.0926 12.2713 16.1429 11.8785 15.7486 11.4856C15.3542 11.0927 14.1859 9.52854 13.7988 8.7428C13.6236 8.39359 13.4118 7.1786 13.4118 6.78574C13.4118 6.39287 13.0248 6 12.6305 6C12.2362 6 11.8491 6 11.4621 6.39287C10.6808 7.1786 10.6808 10.0233 10.6808 10.0233V11.4856H7.94971C6.78135 11.4856 6 12.2713 6 13.0498C6 14.614 6.53307 16.6147 6.78135 17.3568C7.16837 18.5354 7.94971 21.2709 8.73106 21.6638C10.2937 22.4495 14.9818 21.6638 16.5372 21.2709C16.9169 21.1764 18.0999 20.6307 18.0999 20.6307V12.2568L18.0926 12.2713Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Оценить сообщение"  
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

export default LikeIcon;