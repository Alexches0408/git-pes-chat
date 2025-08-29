import React, { useState } from 'react';
import { useSelector } from 'react-redux'

const BookMarkChatIcon = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const darkMode = useSelector((state)=>state.gitChat.darkMode);
  const hoverStrokeColor = darkMode ? "#EAEEF11A" : "#E1E2E5";
  const activeStrokeColor = darkMode ? "#8C929C" : "#9BA3AF";

  const handleClick = (e) => {
    setActive(!active);            
    onClick?.(e);               
  };

  let content;
  if (active) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8.11717C7 6.94789 7.89543 6 9 6H19C20.1046 6 21 6.94789 21 8.11717V19.8786C21 21.7738 18.828 22.7143 17.5733 21.3623L15.4267 19.0493C14.6429 18.2048 13.3571 18.2048 12.5733 19.0493L10.4267 21.3623C9.17195 22.7143 7 21.7738 7 19.8786V8.11717Z" fill={activeStrokeColor} stroke={activeStrokeColor} stroke-width="1.5"/>
      </svg>
    );
  } else if (hovered) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="14" fill={hoverStrokeColor}/>
        <path d="M7 8.11717C7 6.94789 7.89543 6 9 6H19C20.1046 6 21 6.94789 21 8.11717V19.8786C21 21.7738 18.828 22.7143 17.5733 21.3623L15.4267 19.0493C14.6429 18.2048 13.3571 18.2048 12.5733 19.0493L10.4267 21.3623C9.17195 22.7143 7 21.7738 7 19.8786V8.11717Z" stroke="#9BA3AF" stroke-width="1.5"/>
      </svg>
    );
  } else {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8.11717C7 6.94789 7.89543 6 9 6H19C20.1046 6 21 6.94789 21 8.11717V19.8786C21 21.7738 18.828 22.7143 17.5733 21.3623L15.4267 19.0493C14.6429 18.2048 13.3571 18.2048 12.5733 19.0493L10.4267 21.3623C9.17195 22.7143 7 21.7738 7 19.8786V8.11717Z" stroke="#9BA3AF" stroke-width="1.5"/>
      </svg>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Добавить в закладки"  
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

export default BookMarkChatIcon;