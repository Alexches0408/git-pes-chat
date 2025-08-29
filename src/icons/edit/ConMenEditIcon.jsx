import React, { useState } from 'react';

import { useSelector } from 'react-redux'

const ConMenEditIcon = () => {


  const darkMode = useSelector((state)=>state.gitChat.darkMode);
  const strokeColor = darkMode ? "#C9D1D9" : "#363B49";


  let content;

    content = (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6293 8.95222V11.0001C17.6293 14.7714 17.6293 16.657 16.4578 17.8286C15.2862 19.0001 13.379 19.0001 9.56464 19.0001V19.0001C5.75027 19.0001 3.84308 19.0001 2.67151 17.8286C1.49994 16.657 1.49994 14.7714 1.49994 11.0001V10.6992C1.49994 6.92798 1.49994 5.04236 2.67151 3.87079C3.84308 2.69922 5.7287 2.69922 9.49994 2.69922H11.4913" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.46155 12.0713L8.95574 9.41196L15.896 2.44741C16.4904 1.85086 17.4573 1.85086 18.0518 2.44741C18.6463 3.04396 18.6463 4.01426 18.0518 4.61081L11.1116 11.5754L8.46155 12.0713Z" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.7858 5.88089L18.0514 4.61081C18.6459 4.01426 18.6459 3.04396 18.0514 2.44741C17.457 1.85086 16.4901 1.85086 15.8956 2.44741L14.6299 3.71749L16.7858 5.88089Z" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )


  return (
    <div
      title="Редактировать имя чата"  
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

export default ConMenEditIcon;