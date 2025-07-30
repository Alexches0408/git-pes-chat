import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import SideBarOpen from "./SideBarOpen";
import SideBarClose from "./SideBarClose";
import { useSelector, useDispatch } from 'react-redux'
import { toggleChat, addMessage } from "../features/gitChat/gitSlice";
import '../styles/ChatWindow.css';
import logo from "../assets/icons/logo.png";


const ChatWindow = () => {
  const togglePopup = () => setIsOpen(!isOpen);
  const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
  const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
  const dispatch = useDispatch()
  const [questionType, setQuestionType] = useState("general"); 
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  
  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setInputValue("");

    // Добавляем сообщение пользователя
    dispatch(addMessage({ from: "user", text: trimmed }));

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
          type_question: questionType === "specialized" ? "Вопрос по GitVerse" : "Вопрос общего характера",
        }),
      });

      const data = await response.json();

      const assistantContent = data.message || "Ошибка: ответ не получен";
      dispatch(addMessage({ from: "bot", text: assistantContent }));
    } catch (error) {
      dispatch(addMessage({ from: "bot", text: "Ошибка при отправке запроса к серверу." }));
      console.error("Ошибка запроса:", error);
    }
    
    setInputValue("");

  };

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
                        {chatCurrent.map((msg, i) => (
                            <div 
                                key={i}
                                className={`AGtext ${msg.from === "bot" ? "bot-message" : "user-message"}`}
                            >
                                <div className="message-main">{highlightText(msg.text, searchQuery)}</div>
                                {msg.from === "bot" ? (
                                    <div className="bot-extra">
                                        <div>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.14445 14C7.14445 10.4654 10.0332 7.6 13.5967 7.6C16.2906 7.6 18.6002 9.23811 19.566 11.5654L18.4601 11.372C18.0257 11.296 17.6116 11.5859 17.5344 12.0201C17.4569 12.4561 17.7482 12.8721 18.1844 12.9484L21.3654 13.5048C21.8041 13.5815 22.2224 13.291 22.2997 12.8558L22.8585 9.71272C22.9366 9.2734 22.643 8.85419 22.2035 8.77731C21.7657 8.70074 21.3485 8.99287 21.2707 9.43046L21.0167 10.8596C19.786 8.00249 16.9279 6 13.5967 6C9.14236 6 5.53138 9.58172 5.53138 14C5.53138 14.6299 7.14445 14.6299 7.14445 14Z" fill="#9BA3AF"/>
                                                <path d="M20.0096 14.7121C19.6531 17.9112 16.9174 20.4 13.5967 20.4C11.3021 20.4 9.28595 19.2116 8.14183 17.4201L9.53987 17.6647C9.97434 17.7406 10.3884 17.4507 10.4656 17.0165C10.5431 16.5805 10.2518 16.1645 9.81559 16.0882L6.6346 15.5318C6.19593 15.4551 5.77762 15.7457 5.70027 16.1808L5.14152 19.3239C5.06342 19.7632 5.35696 20.1824 5.79649 20.2593C6.2343 20.3359 6.65151 20.0437 6.7293 19.6062L6.92628 18.4981C8.37747 20.6114 10.823 22 13.5967 22C17.7487 22 21.167 18.8887 21.6129 14.8879C21.6827 14.2619 20.0794 14.0861 20.0096 14.7121Z" fill="#9BA3AF"/>
                                            </svg>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.9994 11.4856H18.0927V21.6711H21.9994V11.4856Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M18.0926 12.2713C18.0926 12.2713 16.1429 11.8785 15.7486 11.4856C15.3542 11.0927 14.1859 9.52854 13.7988 8.7428C13.6236 8.39359 13.4118 7.1786 13.4118 6.78574C13.4118 6.39287 13.0248 6 12.6305 6C12.2362 6 11.8491 6 11.4621 6.39287C10.6808 7.1786 10.6808 10.0233 10.6808 10.0233V11.4856H7.94971C6.78135 11.4856 6 12.2713 6 13.0498C6 14.614 6.53307 16.6147 6.78135 17.3568C7.16837 18.5354 7.94971 21.2709 8.73106 21.6638C10.2937 22.4495 14.9818 21.6638 16.5372 21.2709C16.9169 21.1764 18.0999 20.6307 18.0999 20.6307V12.2568L18.0926 12.2713Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.9994 16.5144H18.0927V6.32893H21.9994V16.5144Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M18.0926 15.7287C18.0926 15.7287 16.1429 16.1215 15.7486 16.5144C15.3542 16.9073 14.1859 18.4715 13.7988 19.2572C13.6236 19.6064 13.4118 20.8214 13.4118 21.2143C13.4118 21.6071 13.0248 22 12.6305 22C12.2362 22 11.8491 22 11.4621 21.6071C10.6808 20.8214 10.6808 17.9767 10.6808 17.9767V16.5144H7.94971C6.78135 16.5144 6 15.7287 6 14.9502C6 13.386 6.53307 11.3853 6.78135 10.6432C7.16837 9.46459 7.94971 6.72907 8.73106 6.3362C10.2937 5.55046 14.9818 6.3362 16.5372 6.72907C16.9169 6.82365 18.0999 7.3693 18.0999 7.3693V15.7432L18.0926 15.7287Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="flex">
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M7 8.11717C7 6.94789 7.89543 6 9 6H19C20.1046 6 21 6.94789 21 8.11717V19.8786C21 21.7738 18.828 22.7143 17.5733 21.3623L15.4267 19.0493C14.6429 18.2048 13.3571 18.2048 12.5733 19.0493L10.4267 21.3623C9.17195 22.7143 7 21.7738 7 19.8786V8.11717Z" fill="none" stroke="#9BA3AF" stroke-width="1.5"/>
                                            </svg>
                                            <button type="button" 
                                                onClick={() => copyToClipboard(msg.text)} 
                                                title="Скопировать сообщение"  
                                                style={{  
                                                    background: "none",
                                                    border: "none",
                                                    padding: 0,
                                                    margin: 0,
                                                    outline: "none",
                                                    cursor: "pointer",
                                                    }}>
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.4755 8.52646C18.4935 8.28636 17.1388 8.28636 15.1425 8.28636C12.0366 8.28636 10.4837 8.28636 9.47159 9.19054C9.37227 9.27928 9.27801 9.37352 9.18926 9.47282C8.28496 10.4847 8.28496 12.0376 8.28496 15.1432C8.28496 17.1378 8.28496 18.4919 8.52454 19.4735M19.4755 8.52646C20.0212 8.65991 20.4518 8.86753 20.8134 9.19054C20.9127 9.27928 21.0069 9.37352 21.0957 9.47282C22 10.4847 22 12.0376 22 15.1432C22 18.2488 22 19.8016 21.0957 20.8135C21.0069 20.9128 20.9127 21.0071 20.8134 21.0958C19.8013 22 18.2484 22 15.1425 22C12.0366 22 10.4837 22 9.47159 21.0958C9.37227 21.0071 9.27801 20.9128 9.18926 20.8135C8.86576 20.4515 8.65798 20.0203 8.52454 19.4735M19.4755 8.52646C19.342 7.97969 19.1342 7.54846 18.8107 7.18646C18.722 7.08715 18.6277 6.99291 18.5284 6.90418C17.5163 6 15.9634 6 12.8575 6C9.75164 6 8.1987 6 7.18663 6.90418C7.08731 6.99291 6.99305 7.08715 6.90431 7.18646C6 8.19838 6 9.75119 6 12.8568C6 15.9624 6 17.5153 6.90431 18.5272C6.99305 18.6265 7.08731 18.7207 7.18663 18.8095C7.54819 19.1325 7.97878 19.3401 8.52454 19.4735" stroke="#9BA3AF" stroke-width="1.5"/>
                                                </svg>
                                            </button>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1202 19.0245L9.80013 14.5413V13.2582L16.1202 9.18401M9.66667 13.6667C9.66667 14.9553 8.622 16 7.33333 16C6.04467 16 5 14.9553 5 13.6667C5 12.378 6.04467 11.3333 7.33333 11.3333C8.622 11.3333 9.66667 12.378 9.66667 13.6667ZM21 8.33333C21 9.622 19.9553 10.6667 18.6667 10.6667C17.378 10.6667 16.3333 9.622 16.3333 8.33333C16.3333 7.04467 17.378 6 18.6667 6C19.9553 6 21 7.04467 21 8.33333ZM21 19.6667C21 20.9553 19.9553 22 18.6667 22C17.378 22 16.3333 20.9553 16.3333 19.6667C16.3333 18.378 17.378 17.3333 18.6667 17.3333C19.9553 17.3333 21 18.378 21 19.6667Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="user-extra">
                                        <button type="button" 
                                            onClick={() => copyToClipboard(msg.text)} 
                                            title="Скопировать сообщение"  
                                            style={{  
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                margin: 0,
                                                outline: "none",
                                                cursor: "pointer",
                                                }}>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.4755 8.52646C18.4935 8.28636 17.1388 8.28636 15.1425 8.28636C12.0366 8.28636 10.4837 8.28636 9.47159 9.19054C9.37227 9.27928 9.27801 9.37352 9.18926 9.47282C8.28496 10.4847 8.28496 12.0376 8.28496 15.1432C8.28496 17.1378 8.28496 18.4919 8.52454 19.4735M19.4755 8.52646C20.0212 8.65991 20.4518 8.86753 20.8134 9.19054C20.9127 9.27928 21.0069 9.37352 21.0957 9.47282C22 10.4847 22 12.0376 22 15.1432C22 18.2488 22 19.8016 21.0957 20.8135C21.0069 20.9128 20.9127 21.0071 20.8134 21.0958C19.8013 22 18.2484 22 15.1425 22C12.0366 22 10.4837 22 9.47159 21.0958C9.37227 21.0071 9.27801 20.9128 9.18926 20.8135C8.86576 20.4515 8.65798 20.0203 8.52454 19.4735M19.4755 8.52646C19.342 7.97969 19.1342 7.54846 18.8107 7.18646C18.722 7.08715 18.6277 6.99291 18.5284 6.90418C17.5163 6 15.9634 6 12.8575 6C9.75164 6 8.1987 6 7.18663 6.90418C7.08731 6.99291 6.99305 7.08715 6.90431 7.18646C6 8.19838 6 9.75119 6 12.8568C6 15.9624 6 17.5153 6.90431 18.5272C6.99305 18.6265 7.08731 18.7207 7.18663 18.8095C7.54819 19.1325 7.97878 19.3401 8.52454 19.4735" stroke="#9BA3AF" stroke-width="1.5"/>
                                            </svg>
                                        </button>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.1806 12.5433V14.4099C21.1806 17.7843 21.1806 19.4714 20.2272 20.5921C20.0881 20.7556 19.936 20.9076 19.7725 21.0467C18.6519 22.0001 16.9647 22.0001 13.5903 22.0001V22.0001C10.2159 22.0001 8.52874 22.0001 7.40811 21.0467C7.24461 20.9076 7.09257 20.7556 6.95347 20.5921C6.00007 19.4714 6.00007 17.7709 6.00007 14.3697V14.3697C6.00007 10.8904 6.00007 9.15079 6.99493 8.01829C7.10868 7.88881 7.23067 7.76681 7.36015 7.65307C8.49265 6.6582 10.2188 6.6582 13.671 6.6582H15.4036" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.5515 15.4788L13.0166 12.9759L19.5485 6.42109C20.108 5.85964 21.018 5.85964 21.5775 6.42109C22.137 6.98255 22.137 7.89576 21.5775 8.45721L15.0456 15.012L12.5515 15.4788Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M20.3893 9.65257L21.5805 8.45721C22.14 7.89576 22.14 6.98255 21.5805 6.42109C21.021 5.85964 20.1109 5.85964 19.5515 6.42109L18.3603 7.61645L20.3893 9.65257Z" stroke="#9BA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="chat-messages-grad" />
                    {/* Chat Input */}
                    <div id="chat-input-main">
                        {/* ToggleTypeAsk */}
                        <div id="toggle-type-ask">
                            <button
                                onClick={() => setQuestionType("specialized")}
                                className={`AGtext toggle-type ${questionType === "specialized"?"toggle-type-active":""}`}
                            >
                                Вопрос по GitVerse
                            </button>
                            <button
                                onClick={() => setQuestionType("general")}
                                className={`AGtext toggle-type ${questionType === "general"? "toggle-type-active": ""}`}
                            >
                                Вопрос общего характера
                            </button>
                        </div>
                        {/* Input */}
                        <div id="chat-input">
                            <textarea
                                type="text"
                                className="AGtext"
                                placeholder="Напиши сообщение..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendMessage();
                                }}
                            />
                            <div id="chat-input-buttons">
                                <div>
                                    <button className="AGtxt14">Кратко</button>
                                    <button className="AGtxt14">Переформулируй</button>
                                    <button className="AGtxt14">Проще</button>
                                </div>
                                <div>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"margin-right":"5px"}}>
                                        <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="#D7DDE3"/>
                                        <path d="M15.0128 5.8335H15.0009C12.5879 5.8335 10.6318 7.32049 10.6318 9.1548V15.0122C10.6318 16.8465 12.5879 18.3335 15.0009 18.3335H15.0128C17.4257 18.3335 19.3818 16.8465 19.3818 15.0122V9.1548C19.3818 7.32049 17.4257 5.8335 15.0128 5.8335Z" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M22 15.0898C22 18.4132 18.8657 21.1078 15 21.1078C11.1343 21.1078 8 18.4232 8 15.0898" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.0527 25H18.9466" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.9253 9.40625H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.9253 12.2354H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.9253 15.0645H14.9883" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14.9995 21.1177V24.9999" stroke="#747A85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="15" cy="15" r="15" fill={inputValue ? "#708AB9" : "#D7DDE3"}/>
                                        <path d="M14.25 22.1738C14.25 22.588 14.5858 22.9238 15 22.9238C15.4142 22.9238 15.75 22.588 15.75 22.1738H14.25ZM15.5303 7.45872C15.2374 7.16582 14.7626 7.16582 14.4697 7.45872L9.6967 12.2317C9.40381 12.5246 9.40381 12.9995 9.6967 13.2923C9.98959 13.5852 10.4645 13.5852 10.7574 13.2923L15 9.04971L19.2426 13.2923C19.5355 13.5852 20.0104 13.5852 20.3033 13.2923C20.5962 12.9995 20.5962 12.5246 20.3033 12.2317L15.5303 7.45872ZM15 22.1738H15.75V7.98905H15H14.25V22.1738H15Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[35px]"></div>
          </div>
        </motion.div>
    </div>
  );
};

export default ChatWindow;
