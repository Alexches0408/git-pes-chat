import { useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAPI, clearCurrentChat } from '@/features/gitChat/gitSlice'
import '@/styles/Sidebar.css';
import {ConMenEditIcon, ConMenShareIcon} from '../../icons'

export default function SidebarContextMenu({onClose, onShare, onEdit, position={top:0, left:0}, chat_id}){
    let userId = localStorage.getItem("user-id");
    const ref = useRef();
    const dispatch = useDispatch() 
    const currentChatId = useSelector((state) => state.gitChat.currentChatId)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose])

    const deleteChat = async (chat_id) => {
        await dispatch(fetchAPI({
            endpoint: 'detail_delete',
            headers:{"user-id": userId,},
            method: 'DELETE',
            body:{"chat_id":`${chat_id}`},
        }))
        dispatch(fetchAPI({
            endpoint: 'list',
            headers:{"user-id": userId,},
            method: 'GET',
            target: 'chatHistory'
        }))
        if (chat_id === currentChatId) {
            dispatch(clearCurrentChat());
        }
        
    }

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
                    <ConMenShareIcon/>
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
                    <ConMenEditIcon/>
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
                        deleteChat(chat_id);
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