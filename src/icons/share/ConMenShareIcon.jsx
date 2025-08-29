import React, { useState } from 'react';
import { useSelector } from 'react-redux'

const ConMenShareIcon = () => {

  const darkMode = useSelector((state)=>state.gitChat.darkMode);
  const strokeColor = darkMode ? "#C9D1D9" : "#363B49";

  let content;

  content = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.89893 6.49756V4.5249C4.89893 4.00172 5.10676 3.49997 5.4767 3.13002C5.84665 2.76008 6.3484 2.55225 6.87158 2.55225H17.1294C17.6526 2.55225 18.1543 2.76008 18.5243 3.13002C18.8942 3.49997 19.102 4.00172 19.102 4.5249V16.3608C19.102 16.884 18.8942 17.3858 18.5243 17.7557C18.1543 18.1257 17.6526 18.3335 17.1294 18.3335H6.87158C6.3484 18.3335 5.84665 18.1257 5.4767 17.7557C5.10676 17.3858 4.89893 16.884 4.89893 16.3608V14.3882" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.29622 14.3882L13.2415 10.4429L9.29622 6.49756M0.897949 10.4429H12.4525" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );

  return (
    <div
      title="Поделиться чатом"  
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
    </div>
  );
};

export default ConMenShareIcon;