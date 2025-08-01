import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import SideBarOpen from "./SideBarOpen";
import SideBarClose from "./SideBarClose";
import InputMessageForm from "./inputMessage";
import { useSelector, useDispatch } from 'react-redux'
import { toggleChat, addMessage } from "../features/gitChat/gitSlice";
import '../styles/ChatWindow.css';
import logo from "../assets/icons/logo.png";

// Import of Icons
import {CopyIcon, EditIcon, UpdateIcon, LikeIcon, DislikeIcon, BookMarkChatIcon, ShareIcon} from '../icons'


const ChatWindow = () => {
  const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
  const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("");

  
    // highlight the search text  
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

    //   
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    };


  return (
    <div id="chat-wraper">
        <motion.div
          className="flex flex-row h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
            {/* SideBar */}
            <div
                className={`transition-all duration-300 ${
                    sideBarIsOpen ? "w-[232px]" : "w-[70px]"
                } bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}
            >
                {sideBarIsOpen ? <SideBarOpen /> : <SideBarClose />}
            </div>
        
            {/* Chat */}
            <div className="relative flex-1 flex flex-col overflow-hidden" id="MainChat-Window">
                {/* Header */}
                <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-2" id="chat-header">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Логотип" />
                        <span className=".AGhead">Гитпес</span>
                    </div>
                    <button 
                        onClick={() => dispatch(toggleChat())} 
                        id="toggle-chat-btn"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 1L1 15M1 1L15 15" stroke="#363B49" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div id="search-bar"> 
                {!searchQuery && (
                    <div style={{ position: 'absolute'}}>
                        {/* СВОЯ SVG */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{position: "relative", top:"10px", left:"8px"}} xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke="#888" strokeWidth="2" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="#888" strokeWidth="2" />
                        </svg>
                    </div>
                )}
                    <input
                        type="text"
                        placeholder="Поиск по сообщениям..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input AGtxt14"
                        style={{
                            width: searchQuery ? "460px" : "420px",
                            padding: searchQuery ? "8px 12px" : "8px 30px",
                            height: "22px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            // transition: "padding 0.2s ease"
                        }}
                    />
                </div>
                <div id="chat-body">
                    {/* Chat Messages */}
                    <div id="chat-messages">
                        <div className="bot-message AGtext">Привет! Я - ГитПес, Ваш цифровой ассистент и антибаг агент! Ваш запрос - мой git commit!</div>
                        {chatCurrent.map((msg, i) => (
                            <div 
                                key={i}
                                className={`AGtext ${msg.from === "bot" ? "bot-message" : "user-message"}`}
                            >
                                <div className="message-main">{highlightText(msg.text, searchQuery)}</div>
                                {msg.from === "bot" ? (
                                    <div className="bot-extra">
                                        <div>
                                            <UpdateIcon />
                                            <LikeIcon />
                                            <DislikeIcon />
                                        </div>
                                        <div className="flex">
                                            <BookMarkChatIcon />
                                            <CopyIcon onClick={() => copyToClipboard(msg.text)} />
                                            <ShareIcon/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="user-extra">
                                        <CopyIcon onClick={() => copyToClipboard(msg.text)} />
                                        <EditIcon />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="chat-messages-grad" />
                    {/* Chat Input */}
                    <InputMessageForm/>
                </div>
                <div className="h-[35px]"></div>
          </div>
        </motion.div>
    </div>
  );
};

export default ChatWindow;
