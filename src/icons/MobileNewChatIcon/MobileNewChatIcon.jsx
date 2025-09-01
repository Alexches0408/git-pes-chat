import React, { useState } from 'react';

const MNewChatIcon = ({ onClick }) => {

  const handleClick = (e) => {          
    onClick?.(e);               
  };

  let content;
    content = (
      <svg width="69" height="58" viewBox="0 0 69 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_5519_58636)">
      <mask id="path-1-inside-1_5519_58636" fill="white">
      <path d="M9 27C9 15.9543 17.9543 7 29 7H60V47H29C17.9543 47 9 38.0457 9 27Z"/>
      </mask>
      <path d="M9 27C9 15.9543 17.9543 7 29 7H60V47H29C17.9543 47 9 38.0457 9 27Z" fill="none"/>
      <path d="M8 27C8 15.402 17.402 6 29 6H60V8H29C18.5066 8 10 16.5066 10 27H8ZM60 48H29C17.402 48 8 38.598 8 27H10C10 37.4934 18.5066 46 29 46H60V48ZM29 48C17.402 48 8 38.598 8 27C8 15.402 17.402 6 29 6V8C18.5066 8 10 16.5066 10 27C10 37.4934 18.5066 46 29 46V48ZM60 7V47V7Z" fill="#708AB9" mask="url(#path-1-inside-1_5519_58636)"/>
      <rect width="24" height="24" transform="translate(23 15)" fill="none"/>
      <path d="M42.0712 27H27.929" stroke="#708AB9" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M35 19.9289V34.071" stroke="#708AB9" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <defs>
      <filter id="filter0_d_5519_58636" x="0.4" y="0.4" width="68.2" height="57.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="4.3"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.00392157 0 0 0 0 0.00392157 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5519_58636"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5519_58636" result="shape"/>
      </filter>
      </defs>
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

export default MNewChatIcon;