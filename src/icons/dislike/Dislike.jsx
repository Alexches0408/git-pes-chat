import React, { useState } from 'react';

const DislikeIcon = ({ onClick }) => {
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
      <path d="M21.9993 16.5142H18.0925V6.32869H21.9993V16.5142Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 15.7287C18.0926 15.7287 16.1429 16.1215 15.7486 16.5144C15.3542 16.9073 14.1859 18.4715 13.7988 19.2572C13.6236 19.6064 13.4118 20.8214 13.4118 21.2143C13.4118 21.6071 13.0248 22 12.6305 22C12.2362 22 11.8491 22 11.4621 21.6071C10.6808 20.8214 10.6808 17.9767 10.6808 17.9767V16.5144H7.94971C6.78135 16.5144 6 15.7287 6 14.9502C6 13.386 6.53307 11.3853 6.78135 10.6432C7.16837 9.46459 7.94971 6.72907 8.73106 6.3362C10.2937 5.55046 14.9818 6.3362 16.5372 6.72907C16.9169 6.82365 18.0999 7.3693 18.0999 7.3693V15.7432L18.0926 15.7287Z" fill="#9BA3AF" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else if (hovered) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#E1E2E5"/>
      <path d="M21.9993 16.5142H18.0925V6.32869H21.9993V16.5142Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 15.7287C18.0926 15.7287 16.1429 16.1215 15.7486 16.5144C15.3542 16.9073 14.1859 18.4715 13.7988 19.2572C13.6236 19.6064 13.4118 20.8214 13.4118 21.2143C13.4118 21.6071 13.0248 22 12.6305 22C12.2362 22 11.8491 22 11.4621 21.6071C10.6808 20.8214 10.6808 17.9767 10.6808 17.9767V16.5144H7.94971C6.78135 16.5144 6 15.7287 6 14.9502C6 13.386 6.53307 11.3853 6.78135 10.6432C7.16837 9.46459 7.94971 6.72907 8.73106 6.3362C10.2937 5.55046 14.9818 6.3362 16.5372 6.72907C16.9169 6.82365 18.0999 7.3693 18.0999 7.3693V15.7432L18.0926 15.7287Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9994 16.5144H18.0927V6.32893H21.9994V16.5144Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0926 15.7287C18.0926 15.7287 16.1429 16.1215 15.7486 16.5144C15.3542 16.9073 14.1859 18.4715 13.7988 19.2572C13.6236 19.6064 13.4118 20.8214 13.4118 21.2143C13.4118 21.6071 13.0248 22 12.6305 22C12.2362 22 11.8491 22 11.4621 21.6071C10.6808 20.8214 10.6808 17.9767 10.6808 17.9767V16.5144H7.94971C6.78135 16.5144 6 15.7287 6 14.9502C6 13.386 6.53307 11.3853 6.78135 10.6432C7.16837 9.46459 7.94971 6.72907 8.73106 6.3362C10.2937 5.55046 14.9818 6.3362 16.5372 6.72907C16.9169 6.82365 18.0999 7.3693 18.0999 7.3693V15.7432L18.0926 15.7287Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

export default DislikeIcon;