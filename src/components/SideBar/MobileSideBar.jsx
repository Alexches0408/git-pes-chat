import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { toggleGitCoine, toggleProfile  } from '@/features/gitChat/gitSlice'
import { loadChat,  renameChat, toggleTheme, setCurrentChatId, fetchAPI } from "../../features/gitChat/gitSlice";
import SidebarContextMenu from "@/components/SideBar/SideBarContextMenu";
import '@/styles/Sidebar.css';

import { GitCoinIconDefault, ProfileIconDefault, BookmarkSidebarIconDefault, HistoryChatIconDefault} from '../../icons'

export default function MobileSideBar({open, onClose}) {
    const chatHistory = useSelector((state) => state.gitChat.chatHistory)
    const currentChatId = useSelector((state) => state.gitChat.currentChatId)
    const darkMode = useSelector((state)=>state.gitChat.darkMode)
    const currentChat = useSelector((state)=>state.gitChat.chatCurrent)
    const dispatch = useDispatch()    
    let userId = localStorage.getItem("user-id");

    const [isOpenHistory, setisOpenHistory] = useState(false);
    const [isOpenBookmarks, setisOpenBookmarks] = useState(false);
    const [popupId, setPopupId] = useState(null);
    const [popupPosition, setPopupPosition] = useState({top:0, left:0});
    const [editingChatId, setEditingChatId] = useState(null);
    const [editingChatName, setEditingChatName] = useState();

    const toggleHistoryChat = () => {
        setisOpenHistory(!isOpenHistory);
    }

    const toggleBookmarks = () => {
        setisOpenBookmarks(!isOpenBookmarks);
    }

    const handleChatRename = () => {
        dispatch(renameChat({chatId: editingChatId, newName:editingChatName}));
        setEditingChatId(null);
    }
    

    const loadSelectedChat = async (id) => {
        try {
            const response = await dispatch(fetchAPI({
                endpoint:`chat/${id}`,
                headers:{"user-id": userId,},
                method: 'GET',
            })).unwrap();
            const data = response.data;
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
        if (editingChatId !== null && inputChatNameRefs.current[editingChatId]) {
            inputChatNameRefs.current[editingChatId].select(); 
        }
    }, [editingChatId]);

    const handlers = useSwipeable({
        onSwipedLeft: () => onClose(),   // свайп влево закрывает
        preventScrollOnSwipe: true,
        trackTouch: true,
      });


    return (
        <AnimatePresence>
            {open && (
            <>
                <motion.div
                    className="mob-sidebar-bg"
                    style={{ opacity: 0.25 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />
                <motion.div
                    {...handlers} 
                    className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-1200"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                >
                <div
                id="Sidebar-Window"
                className={`transition-all duration-300 w-[232px]" bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}>
                <div id="sb-main">
                    <div 
                        className='sb-menu-head AG16med'
                        onClick={toggleBookmarks}
                    >
                        <BookmarkSidebarIconDefault/>
                        <span className='ml-[10px]'>Закладки</span>
                    </div>
                    <div 
                        className={`sb-menu-head AG16med`}
                        onClick={toggleHistoryChat}
                    >
                        <HistoryChatIconDefault/>
                        <span className='ml-[10px]'>История</span>
                    </div>
                    {isOpenHistory && (
                        <div className={`list-sb-menu relative`}>
                        {Array.isArray(chatHistory) && chatHistory.map((chat, i) => (
                            <div 
                                key={chat.id}
                                className={`list-sb-menu-item AG16reg ${currentChatId===chat.id ? 'activeChat':''}`}
                            >
                                {editingChatId === chat.id ? (
                                    <input
                                        autoFocus
                                        ref={(el) => inputChatNameRefs.current[chat.id] = el}
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
                                            loadSelectedChat(chat.id);
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
                                        {(chat.title?.slice(0, 15) || 'Без названия')}
                                    </button>
                                )}
                                    
                                <div
                                    className='context-mn-icon'
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setPopupId(chat.id);
                                        setPopupPosition({top:rect.bottom + 4, left:rect.left});
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 10.5C6.82843 10.5 7.5 11.1716 7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5ZM18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12C16.5 11.1716 17.1716 10.5 18 10.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5Z" fill={darkMode ? "#C9D1D9" : "#363B49"}/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                        {popupId !==null && (
                            <SidebarContextMenu 
                                position={popupPosition}
                                chat_id={popupId}
                                onClose={()=>setPopupId(null)}
                                onEdit={()=> {
                                    const chat = chatHistory.find(c => c.id === popupId);
                                    if (chat) {
                                        setEditingChatId(chat.id);
                                        setEditingChatName(chat.title || '');
                                    }
                                    setPopupId(null);
                                }}
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
                </motion.div>
            </>
            )}
        </AnimatePresence>
    )
}