import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar, toggleGitCoine, toggleProfile  } from '@/features/gitChat/gitSlice'
import { createNewChat, loadChat, deleteChat, renameChat, toggleTheme, setCurrentChatId, setList } from "../../features/gitChat/gitSlice";
import SidebarContextMenu from "@/components/SideBar/SideBarContextMenu";
import '@/styles/Sidebar.css';

import {SidebarIconOpen, GitCoinIconDefault, ProfileIconDefault, BookmarkSidebarIconDefault, HistoryChatIconDefault} from '../../icons'

export default function SideBarOpen() {
    const chatHistory = useSelector((state) => state.gitChat.list)
    const currentChatIndex = useSelector((state) => state.gitChat.currentChatId)
    const darkMode = useSelector((state)=>state.gitChat.darkMode)
    const currentChat = useSelector((state)=>state.gitChat.chatCurrent)
    const dispatch = useDispatch()    
    let userId = localStorage.getItem("user-id");

    const [isOpenHistory, setisOpenHistory] = useState(false);
    const [isOpenBookmarks, setisOpenBookmarks] = useState(false);
    const [popupIndex, setPopupIndex] = useState(null);
    const [popupPosition, setPopupPosition] = useState({top:0, left:0});
    const [editingChatIndex, setEditingChatIndex] = useState(null);
    const [editingChatName, setEditingChatName] = useState();

    const toggleHistoryChat = () => {
        setisOpenHistory(!isOpenHistory);
    }

    const toggleBookmarks = () => {
        setisOpenBookmarks(!isOpenBookmarks);
    }

    const handleChatRename = () => {
        dispatch(renameChat({chatId: editingChatIndex, newName:editingChatName}));
        setEditingChatIndex(null);
    }

    const createChat = async () => {
        dispatch(createNewChat());
        try {
            const res = await fetch(`http://localhost:8000/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-id": userId,
            },
            });
            if (!res.ok) throw new Error("Ошибка запроса " + endpoint);
            const listData = await res.json();
            dispatch(setList(listData))
        } catch (err) {
            console.error(`Ошибка получения чата`, err);
            throw err;
        }
    }

    const loadSelectedChat = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/chat/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-id": userId,
            },
            });
            if (!res.ok) throw new Error("Ошибка запроса " + endpoint);
            const data = await res.json();
            dispatch(loadChat(data));
            dispatch(setCurrentChatId(id));
            return await data;
        } catch (err) {
            console.error(`Ошибка получения чата`, err);
            throw err;
        };
    }

    const inputChatNameRefs = useRef({});

    useEffect(() => {
        if (editingChatIndex !== null && inputChatNameRefs.current[editingChatIndex]) {
            inputChatNameRefs.current[editingChatIndex].select(); 
        }
    }, [editingChatIndex]);


    return (
        <div
            id="Sidebar-Window"
            className={`transition-all duration-300 w-[232px]" bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}>
            <div id="Sidebar-Header">
                <button
                    onClick={()=>{
                            createChat();
                            dispatch(toggleProfile(false));
                            dispatch(toggleGitCoine(false));
                        }}
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
            <div id="sb-main">
                <div 
                    className='sb-menu-head AG16med'
                    onClick={toggleBookmarks}
                >
                    <BookmarkSidebarIconDefault/>
                    <span className='ml-[10px]'>Закладки</span>
                </div>
                <div 
                    className={`sb-menu-head AG16med ${chatHistory.some(chat => chat.id === currentChatIndex) ? 'activeMenuItem' : ''}`}
                    onClick={toggleHistoryChat}
                >
                    <HistoryChatIconDefault/>
                    <span className='ml-[10px]'>История</span>
                </div>
                {isOpenHistory && (
                    <div className={`list-sb-menu relative`}>
                    {chatHistory.map((msg, i) => (
                        <div 
                            key={msg.id}
                            className={`list-sb-menu-item AG16reg ${currentChatIndex===msg.id ? 'activeChat':''}`}
                        >
                            {editingChatIndex === msg.id ? (
                                <input
                                    autoFocus
                                    ref={(el) => inputChatNameRefs.current[i] = el}
                                    className={`AG16reg`}
                                    value={editingChatName}
                                    onChange={(e) => setEditingChatName(e.target.value)}
                                    onBlur={handleChatRename}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleChatRename();
                                    }}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',  
                                        border: 'none',             
                                        padding: 0,                
                                        margin: 0,
                                        color: 'inherit',           
                                        font: 'inherit',           
                                        outline: 'none'            
                                    }}
                                />
                            ) : (
                                <button
                                    onClick={() => {
                                        loadSelectedChat(msg.id);
                                        dispatch(toggleProfile(false));
                                        dispatch(toggleGitCoine(false));
                                    }}
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
                            )}
                                
                            <div
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setPopupIndex(msg.id);
                                    setPopupPosition({top:rect.bottom + 4, left:rect.left});
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 10.5C6.82843 10.5 7.5 11.1716 7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5ZM18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12C16.5 11.1716 17.1716 10.5 18 10.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5Z" fill={darkMode ? "#C9D1D9" : "#363B49"}/>
                                </svg>
                            </div>
                        </div>
                    ))}
                    {popupIndex !==null && (
                        <SidebarContextMenu 
                            position={popupPosition}
                            onClose={()=>setPopupIndex(null)}
                            onEdit={()=> {
                                setEditingChatIndex(popupIndex);
                                setEditingChatName(chatHistory[popupIndex].title || '');
                                setPopupIndex(null);
                            }}
                            onDelete={()=>dispatch(deleteChat(popupIndex))}
                        />
                    )}
                </div>
                )}
            </div>
            <div
                id="sb-footer"
            >
                <button
                    onClick={()=>{
                        dispatch(toggleGitCoine(true))
                        dispatch(toggleProfile(false))
                    }}
                    className='sb-menu-head AG16med'
                    style={{  
                        background: "none",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        }}
                >
                    <GitCoinIconDefault/>
                    <span>GitCoin</span>
                </button>
                <button
                    onClick={()=>{
                        dispatch(toggleProfile(true))
                        dispatch(toggleGitCoine(false))
                    }}
                    className='sb-menu-head AG16med'
                    style={{  
                        background: "none",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        }}
                >
                    <ProfileIconDefault />
                    <span>Профиль</span>
                </button>
                <div id="toggle-theme">
                    <button
                        className={`AG16med ${darkMode ? '' : 'active-theme-btn'}`}
                        style={{  
                            background: "none",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            }}
                            onClick={() => {
                                if (darkMode) {
                                    dispatch(toggleTheme())
                                }
                            }}
                    >
                        Светлая
                    </button>
                    <button
                        className={`AG16med ${darkMode ? 'active-theme-btn' : ''}`}
                        style={{  
                            background: "none",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            }}
                            onClick={() => {
                                if (!darkMode) {
                                    dispatch(toggleTheme())
                                }
                            }}
                    >
                        Темная
                    </button>
                </div>
            </div>
        </div>
    )
}