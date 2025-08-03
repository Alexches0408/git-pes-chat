import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '@/features/gitChat/gitSlice'
import { commitChat, loadChatHistory, deleteChat } from "../features/gitChat/gitSlice";
import SidebarContextMenu from "./SideBarContextMenu";
import '../styles/Sidebar.css';

import {SidebarIconOpen} from '../icons'

export default function SideBarOpen() {
    const chatHistory = useSelector((state) => state.gitChat.chatHistory)
    const currentChatIndex = useSelector((state) => state.gitChat.currentChatIndex)
    const dispatch = useDispatch()    

    const [isOpenHistory, setisOpenHistory] = useState(false);
    const [isOpenBookmarks, setisOpenBookmarks] = useState(false);
    const [popupIndex, setPopupIndex] = useState(null);
    const [popupPosition, setPopupPosition] = useState({top:0, left:0})

    const toggleHistoryChat = () => {
        setisOpenHistory(!isOpenHistory);
    }

    const toggleBookmarks = () => {
        setisOpenBookmarks(!isOpenBookmarks);
    }

    return (
        <div
            id="Sidebar-Window"
            className={`transition-all duration-300 w-[232px]" bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}>
            <div id="Sidebar-Header">
                <button
                    onClick={()=>dispatch(commitChat())}
                    style={{backgroundColor:'transparent'}}
                    className={'new-chat-button AG16med'}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.0001 9H1.00013" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9 1V16.9999" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <span>Новый чат</span>
                </button>
                <SidebarIconOpen onClick={() => dispatch(toggleSidebar())}/>
            </div>
            <div 
                className='sb-menu-head AG16med'
                onClick={toggleBookmarks}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.625 8.875C7.625 8.18464 8.18464 7.625 8.875 7.625H15.125C15.8154 7.625 16.375 8.18464 16.375 8.875V15.8191C16.375 16.938 15.0175 17.4933 14.2333 16.6951L12.8917 15.3295C12.4018 14.8308 11.5982 14.8308 11.1083 15.3295L9.76667 16.6951C8.98247 17.4933 7.625 16.938 7.625 15.8191V8.875Z" stroke="#363B49" stroke-width="1.5"/>
                    <path d="M22 12C22 15.2561 20.4438 18.1487 18.0346 19.9747C16.3574 21.2458 14.2668 22 12 22C9.73325 22 7.64265 21.2458 5.96544 19.9747C3.55622 18.1487 2 15.2561 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#363B49" stroke-width="1.5"/>
                </svg>
                <span className='ml-[10px]'>Закладки</span>
            </div>
            <div 
                className='sb-menu-head AG16med'
                onClick={toggleHistoryChat}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.74516 8.13173C7.46646 8.43816 7.48894 8.91251 7.79537 9.19121C8.1018 9.4699 8.57614 9.44742 8.85484 9.14099L7.74516 8.13173ZM7.75 12C7.75 11.5858 7.41421 11.25 7 11.25C6.58579 11.25 6.25 11.5858 6.25 12H7.75ZM12.4558 10.5303C12.4558 10.1161 12.12 9.78027 11.7058 9.78027C11.2916 9.78027 10.9558 10.1161 10.9558 10.5303H12.4558ZM11.7058 12.8832H10.9558C10.9558 13.2974 11.2916 13.6332 11.7058 13.6332V12.8832ZM13.4705 13.6332C13.8847 13.6332 14.2205 13.2974 14.2205 12.8832C14.2205 12.469 13.8847 12.1332 13.4705 12.1332V13.6332ZM9.94116 9.51471C10.3554 9.51471 10.6912 9.17892 10.6912 8.76471C10.6912 8.35049 10.3554 8.01471 9.94116 8.01471V9.51471ZM8.17645 8.76471H7.42645C7.42645 9.17892 7.76224 9.51471 8.17645 9.51471V8.76471ZM8.92645 7C8.92645 6.58579 8.59067 6.25 8.17645 6.25C7.76224 6.25 7.42645 6.58579 7.42645 7H8.92645ZM18.0346 19.9747L18.4876 20.5724L18.0346 19.9747ZM5.96544 19.9747L6.41846 19.3769L5.96544 19.9747ZM8.3 8.63636L8.85484 9.14099C9.63238 8.28609 10.7519 7.75 12 7.75V7V6.25C10.3118 6.25 8.7949 6.97755 7.74516 8.13173L8.3 8.63636ZM12 7V7.75C14.3494 7.75 16.25 9.65058 16.25 12H17H17.75C17.75 8.82215 15.1779 6.25 12 6.25V7ZM17 12H16.25C16.25 14.3494 14.3494 16.25 12 16.25V17V17.75C15.1779 17.75 17.75 15.1779 17.75 12H17ZM12 17V16.25C9.64919 16.25 7.75 14.3622 7.75 12H7H6.25C6.25 15.1934 8.82353 17.75 12 17.75V17ZM11.7058 10.5303H10.9558V12.8832H11.7058H12.4558V10.5303H11.7058ZM11.7058 12.8832V13.6332H13.4705V12.8832V12.1332H11.7058V12.8832ZM9.94116 8.76471V8.01471H8.17645V8.76471V9.51471H9.94116V8.76471ZM8.17645 8.76471H8.92645V7H8.17645H7.42645V8.76471H8.17645ZM2 12H2.75C2.75 6.89137 6.89137 2.75 12 2.75V2V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2ZM12 2V2.75C17.1086 2.75 21.25 6.89137 21.25 12H22H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2ZM22 12H21.25C21.25 15.0114 19.8118 17.6867 17.5815 19.3769L18.0346 19.9747L18.4876 20.5724C21.0758 18.6108 22.75 15.5008 22.75 12H22ZM18.0346 19.9747L17.5815 19.3769C16.0302 20.5527 14.0976 21.25 12 21.25V22V22.75C14.4359 22.75 16.6845 21.9389 18.4876 20.5724L18.0346 19.9747ZM12 22V21.25C9.90241 21.25 7.96983 20.5527 6.41846 19.3769L5.96544 19.9747L5.51243 20.5724C7.31546 21.9389 9.56409 22.75 12 22.75V22ZM5.96544 19.9747L6.41846 19.3769C4.18825 17.6867 2.75 15.0114 2.75 12H2H1.25C1.25 15.5008 2.92418 18.6108 5.51243 20.5724L5.96544 19.9747Z" fill="#363B49"/>
                </svg>
                <span className='ml-[10px]'>История</span>
            </div>
            {isOpenHistory && (
                <div className="list-sb-menu relative">
                {chatHistory.map((msg, i) => (
                    <div 
                        key={i}
                        className={`list-sb-menu-item AG16reg ${currentChatIndex===i ? 'activeChat':''}`}
                    >
                        <button
                            onClick={() => dispatch(loadChatHistory(i))}
                            className={`AG16reg`}
                            style={{  
                                background: "none",
                                margin:0,
                                padding:0,
                                border: "none",
                                width: "100%",
                                outline: "none",
                                cursor: "pointer",
                                }}
                        >
                            {(msg.title?.slice(0, 15) || 'Без названия')}
                        </button>
                        <div
                            onClick={(e)=>{
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                setPopupIndex(i);
                                setPopupPosition({top:rect.bottom + 4, left:rect.left});
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 10.5C6.82843 10.5 7.5 11.1716 7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5ZM18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12C16.5 11.1716 17.1716 10.5 18 10.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5Z" fill="#363B49"/>
                            </svg>
                        </div>
                    </div>
                ))}
                {popupIndex !==null && (
                    <SidebarContextMenu 
                        position={popupPosition}
                        onClose={()=>setPopupIndex(null)}
                        onEdit={()=>console.log("Редактировать", popupIndex)}
                        onDelete={()=>dispatch(deleteChat(popupIndex))}
                    />
                )}
            </div>
            )}
            
        </div>
    )
}