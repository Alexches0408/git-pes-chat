import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import Mascot3DBase from '@/components/Mascot3DBase';
import InputMessageForm from "@/components/mainChat/inputMessage";
import EditMessageForm from "@/components/mainChat//editMessage";
import MobileSideBar from "@/components/SideBar/MobileSideBar";
import { toggleChat, toggleGitCoine, toggleProfile } from "../../features/gitChat/gitSlice";
import '@/styles/ChatWindow.css';
import logo from "@/assets/icons/logo.png";

// Import of Icons
import {MSideBarIcon, CopyIcon, EditIcon, UpdateIcon, LikeIcon, DislikeIcon, BookMarkChatIcon, ShareIcon, CloseIcon, SearchIconDefault} from '@/icons'




const MainChatWindow = () => {
    const dispatch = useDispatch()
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const chatHistory=useSelector((state) => state.gitChat.chatHistory)
    const [editingMessageIndex, setEditingMessageIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [openMobileSB, setOpenMobileSB] = useState(false);
    
    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi"); 
        const parts = text.split(regex);

        return parts.map((part, i) =>
        regex.test(part) ? (
            <span key={i} className="highlight">
            {part}
            </span>
        ) : (
            part
        )
        );
    };
  
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    };
    


    return(
        <motion.div>
            {/* SideBar */}
            <div id="mob-sidebar-wrapper">
                <MobileSideBar open={openMobileSB} onClose={() => setOpenMobileSB(false)} />
            </div>
            {/* Chat */}
            <div className="relative flex-1 flex flex-col overflow-hidden" id="MainChat-Window">
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-200 dark:dark" id="chat-header">
                <div 
                    id="m-sb-toggle"
                    onClick={()=> {
                        setOpenMobileSB(true);
                        console.log(openMobileSB)
                    }}
                >
                    <MSideBarIcon/>
                </div>
                <div className="flex items-center gap-2">
                {/* {<Canvas 
                    style={{ width: 60, height: 60, cursor: 'pointer' }}
                    dpr={[1, 2]}
                    shadows
                    gl={{ antialias: true, physicallyCorrectLights: true }}
                    >
                    <ambientLight intensity={0.3} />
                    <directionalLight intensity={1.2} position={[5, 5, 5]} />
                    <Mascot3DBase onClick={() => dispatch(toggleChat())} />
                </Canvas> } */}
                    <span className='AGhead'>Гитпес</span>
                </div>
                <div id="toggle-chat-btn">
                    <CloseIcon
                        onClick={() => dispatch(toggleChat())}
                    />    
                </div>
            </div>
            <div id="search-bar"> 
            {!searchQuery && (
                <div id="search-icon-wrapper" style={{ position: 'absolute'}}>
                    {/* СВОЯ SVG */}
                    <SearchIconDefault/>
                </div>
            )}
                <input
                    type="text"
                    placeholder="Поиск по сообщениям..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`search-input AGtxt14 ${searchQuery && 'search-input-with-query'}`}
                    style={{
                        height: "22px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        color: "#363B49",
                        // transition: "padding 0.2s ease"
                    }}
                />
            </div>
            <div id="chat-body">
                {/* Chat Messages */}
                <div id="chat-messages">
                    {((!chatHistory || chatHistory.length === 0) && (!chatCurrent || chatCurrent.length === 0) )  && (
                        <div className="bot-message AGtext">Привет! Я - ГитПес, Ваш цифровой ассистент и антибаг агент! Ваш запрос - мой git commit!</div>
                    )}
                    {chatCurrent.map((pair, i) => {
                        const userMsg = Object.keys(pair)[0];
                        const botMsg = pair[userMsg];

                        return (
                            <div key={i}>
                                {/* Сообщение пользователя */}
                                {editingMessageIndex === i ? (
                                    <div>
                                        <EditMessageForm text={userMsg} resetEditingMessageIndex={() => setEditingMessageIndex(null)}/>
                                    </div>
                                ) : (
                                    <div className="AGtext user-message">
                                        <div className="message-main">
                                            {highlightText(userMsg, searchQuery)}
                                        </div>
                                        <div className="user-extra">
                                            <CopyIcon onClick={() => copyToClipboard(userMsg)} />
                                            <EditIcon
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingMessageIndex(i);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Сообщение бота */}
                                <div className="AGtext bot-message">
                                    <div className="message-main">
                                        {highlightText(botMsg, searchQuery)}
                                    </div>
                                    <div className="bot-extra">
                                        <div>
                                            <UpdateIcon />
                                            <LikeIcon />
                                            <DislikeIcon />
                                        </div>
                                        <div className="flex">
                                            <BookMarkChatIcon />
                                            <CopyIcon onClick={() => copyToClipboard(botMsg)} />
                                            <ShareIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chat-messages-grad" />
                {/* Chat Input */}
                <InputMessageForm/>
            </div>
            <div className="h-[1px]"></div>
            </div>
        </motion.div>
    )
}


export default MainChatWindow;