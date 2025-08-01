import React, { useState } from 'react';

const EditIcon = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const handleClick = (e) => {         
    onClick?.(e);               
  };

  let content;
  if (hovered) {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill="#E1E2E5"/>
      <path d="M21.1806 12.5433V14.4099C21.1806 17.7843 21.1806 19.4714 20.2272 20.5921C20.0881 20.7556 19.9361 20.9076 19.7726 21.0467C18.6519 22.0001 16.9647 22.0001 13.5904 22.0001V22.0001C10.216 22.0001 8.5288 22.0001 7.40816 21.0467C7.24466 20.9076 7.09263 20.7556 6.95353 20.5921C6.00012 19.4714 6.00012 17.7709 6.00012 14.3697V14.3697C6.00012 10.8904 6.00012 9.15079 6.99499 8.01829C7.10873 7.88881 7.23072 7.76681 7.36021 7.65307C8.4927 6.6582 10.2188 6.6582 13.6711 6.6582H15.4037" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.5515 15.4788L13.0166 12.9759L19.5486 6.42109C20.1081 5.85964 21.0181 5.85964 21.5776 6.42109C22.1371 6.98255 22.1371 7.89576 21.5776 8.45721L15.0456 15.012L12.5515 15.4788Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.3892 9.65257L21.5804 8.45721C22.1399 7.89576 22.1399 6.98255 21.5804 6.42109C21.0209 5.85964 20.1109 5.85964 19.5514 6.42109L18.3602 7.61645L20.3892 9.65257Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else {
    content = (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.1806 12.5433V14.4099C21.1806 17.7843 21.1806 19.4714 20.2272 20.5921C20.0881 20.7556 19.936 20.9076 19.7725 21.0467C18.6519 22.0001 16.9647 22.0001 13.5903 22.0001V22.0001C10.2159 22.0001 8.52874 22.0001 7.40811 21.0467C7.24461 20.9076 7.09257 20.7556 6.95347 20.5921C6.00007 19.4714 6.00007 17.7709 6.00007 14.3697V14.3697C6.00007 10.8904 6.00007 9.15079 6.99493 8.01829C7.10868 7.88881 7.23067 7.76681 7.36015 7.65307C8.49265 6.6582 10.2188 6.6582 13.671 6.6582H15.4036" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.5515 15.4788L13.0166 12.9759L19.5485 6.42109C20.108 5.85964 21.018 5.85964 21.5775 6.42109C22.137 6.98255 22.137 7.89576 21.5775 8.45721L15.0456 15.012L12.5515 15.4788Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.3893 9.65257L21.5805 8.45721C22.14 7.89576 22.14 6.98255 21.5805 6.42109C21.021 5.85964 20.1109 5.85964 19.5515 6.42109L18.3603 7.61645L20.3893 9.65257Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Редактировать сообщение"  
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

export default EditIcon;