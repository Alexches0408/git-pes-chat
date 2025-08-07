import { useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import '@/styles/Sidebar.css';

export default function SidebarContextMenu({onClose, onShare, onEdit,onDelete, position={top:0, left:0}}){
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose])

    return createPortal(
        <>
            <div id="all-background-for-sb-popup" />
            <div
                ref={ref}
                style={{top: position.top, left:position.left}}
                className="sidebar-popup"
            >
                <button
                    style={{  
                        background: "none",
                        border: "none",
                        margin: 0,
                        outline: "none",
                        cursor: "pointer",
                    }}
                    className="context-menu-item AGtext"
                    onClick={()=>{
                        onShare();
                        onClose();                        
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.89893 6.49756V4.5249C4.89893 4.00172 5.10676 3.49997 5.4767 3.13002C5.84665 2.76008 6.3484 2.55225 6.87158 2.55225H17.1294C17.6526 2.55225 18.1543 2.76008 18.5243 3.13002C18.8942 3.49997 19.102 4.00172 19.102 4.5249V16.3608C19.102 16.884 18.8942 17.3858 18.5243 17.7557C18.1543 18.1257 17.6526 18.3335 17.1294 18.3335H6.87158C6.3484 18.3335 5.84665 18.1257 5.4767 17.7557C5.10676 17.3858 4.89893 16.884 4.89893 16.3608V14.3882" stroke="#363B49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.29622 14.3882L13.2415 10.4429L9.29622 6.49756M0.897949 10.4429H12.4525" stroke="#363B49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="ml-[8px]">Поделиться</span>
                </button>
                <button
                    style={{  
                        background: "none",
                        border: "none",
                        margin: 0,
                        outline: "none",
                        cursor: "pointer",
                    }}
                    className="context-menu-item AGtext"
                    onClick={()=>{
                        onEdit();
                        onClose();
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.6293 8.95222V11.0001C17.6293 14.7714 17.6293 16.657 16.4578 17.8286C15.2862 19.0001 13.379 19.0001 9.56464 19.0001V19.0001C5.75027 19.0001 3.84308 19.0001 2.67151 17.8286C1.49994 16.657 1.49994 14.7714 1.49994 11.0001V10.6992C1.49994 6.92798 1.49994 5.04236 2.67151 3.87079C3.84308 2.69922 5.7287 2.69922 9.49994 2.69922H11.4913" stroke="#363B49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.46155 12.0713L8.95574 9.41196L15.896 2.44741C16.4904 1.85086 17.4573 1.85086 18.0518 2.44741C18.6463 3.04396 18.6463 4.01426 18.0518 4.61081L11.1116 11.5754L8.46155 12.0713Z" stroke="#363B49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.7858 5.88089L18.0514 4.61081C18.6459 4.01426 18.6459 3.04396 18.0514 2.44741C17.457 1.85086 16.4901 1.85086 15.8956 2.44741L14.6299 3.71749L16.7858 5.88089Z" stroke="#363B49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="ml-[8px]">Редактировать</span>
                </button>
                <button
                    style={{  
                        background: "none",
                        border: "none",
                        margin: 0,
                        outline: "none",
                        cursor: "pointer",
                    }}
                    className="context-menu-item AGtext"
                    onClick={()=>{
                        onDelete();
                        onClose();
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.83333H3M19 4.83333H17M3 4.83333L4.63568 16.4194C4.84464 17.8995 6.11139 19 7.60622 19H12.3938C13.8886 19 15.1554 17.8995 15.3643 16.4194L17 4.83333M3 4.83333H6.5M17 4.83333H13.5M13.5 4.83333H10H6.5M13.5 4.83333H6.5M13.5 4.83333C13.5 4.83333 13 2 10 2C7 2 6.5 4.83333 6.5 4.83333" stroke="#A83433" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <span 
                        className="ml-[8px]"
                        style={{'color':'#A83433'}}
                    >
                        Удалить
                    </span>
                </button>
            </div>            
        </>,
        document.body
    )
}