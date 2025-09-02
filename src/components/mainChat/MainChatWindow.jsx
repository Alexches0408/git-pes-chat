import React, { useState, useEffect, Suspense  } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import Mascot3DBase from '@/components/Mascot3DBase';
import InputMessageForm from "@/components/mainChat/inputMessage";
import EditMessageForm from "@/components/mainChat/editMessage";
import FeedBackForm from "@/components/mainChat/FeedBackPopup";
import { MascotProvider } from "@/components/MascotProvider";
import MobileSideBar from "@/components/SideBar/MobileSideBar";
import { toggleChat, fetchAPI, clearCurrentChat } from "../../features/gitChat/gitSlice";
import '@/styles/ChatWindow.css';
import logo from "@/assets/icons/logo.png";

// Import of Icons
import {MNewChatIcon, MSideBarIcon, CopyIcon, EditIcon, UpdateIcon, LikeIcon, DislikeIcon, BookMarkChatIcon, ShareIcon, CloseIcon, SearchIconDefault} from '@/icons'




const MainChatWindow = () => {
    let userId = localStorage.getItem("user-id");
    const dispatch = useDispatch()
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const chatHistory=useSelector((state) => state.gitChat.chatHistory)
    const [editingMessageIndex, setEditingMessageIndex] = useState(null);
    const [feedMessageIndex, setFeedMessageIndex] = useState(null);
    const [feedback, setFeedback] = useState({}); 
    const [searchQuery, setSearchQuery] = useState("");
    const [openMobileSB, setOpenMobileSB] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
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
        navigator.clipboard.writeText(text); 
    };

    const createChat = () => {
        dispatch(clearCurrentChat());
        dispatch(fetchAPI({
            endpoint: 'list',
            headers:{"user-id": userId,},
            method: 'GET',
            target: 'chatHistory'
        }))
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        setIsMobile(mediaQuery.matches);

        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addListener(handler);
    }, []);
    
    

    return(
        <motion.div>
            {/* SideBar */}
            <div id="mob-sidebar-wrapper">
                <MobileSideBar open={openMobileSB} onClose={() => setOpenMobileSB(false)} />
            </div>
            <div className={`mob-new-chat-btn ${!openMobileSB && 'mob-new-chat-btn-open'}`}>
                <MNewChatIcon onClick={() => createChat()}/>
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
                    {isMobile ? 
                        <div>
                        </div> : 
                        <div>
                        </div>
                    }
                    {/* <Canvas 
                        style={{ width: 60, height: 60, cursor: 'pointer' }}
                        dpr={[1, 2]}
                        shadows
                        gl={{ antialias: true, physicallyCorrectLights: true }}
                        camera={{ position: [0, 5, 40], fov: 20 }}
                    >
                        <MascotProvider>
                        <ambientLight intensity={0.3} />
                        <directionalLight intensity={1.2} position={[5, 5, 5]} />

                        <Suspense fallback={null}>
                            <Mascot3DBase 
                                onClick={() => dispatch(toggleChat())} 
                                position={[0, -20, 0]} 
                                scale={0.6} 
                            />
                        </Suspense>
                        </MascotProvider>
                    </Canvas> */}
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
                                            <LikeIcon 
                                                active={feedback[i] === "like"}
                                                onClick={() =>
                                                setFeedback((prev) => ({
                                                    ...prev,
                                                    [i]: prev[i] === "like" ? null : "like"
                                                }))
                                                }
                                            />
                                            <DislikeIcon
                                              active={feedback[i] === "dislike"}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (feedback[i] !== "dislike") {
                                                    setFeedMessageIndex(i);
                                                }
                                                setFeedback((prev) => ({
                                                  ...prev,
                                                  [i]: prev[i] === "dislike" ? null : "dislike"
                                                }))
                                                }
                                              }
                                            />
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
                <div className="h-[50px] chat-messages-btm-block"></div>
                </div>
                <div className="chat-messages-grad" />
                {/* Chat Input */}
                <InputMessageForm/>
            </div>
            <div className="h-[1px]"></div>
            </div>
            {feedMessageIndex != null && (
                <div>
                    <FeedBackForm resetFeedMessageIndex={() => setFeedMessageIndex(null)}/>
                </div>
            )}
        </motion.div>
    )
}


export default MainChatWindow;