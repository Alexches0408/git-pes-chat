import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, setCurrentChatId } from "../../features/gitChat/gitSlice";
import '@/styles/ChatWindow.css';
import {MicrophoneIconDefault, InputIcon} from '@/icons'



const InputMessageForm = () => {
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
    const currentChatId = useSelector((state)=>state.gitChat.currentChatId)
    const dispatch = useDispatch()
    const [questionType, setQuestionType] = useState("specialized"); 
    const [inputValue, setInputValue] = useState("");

    let userId = localStorage.getItem("user-id");

    const [selectedOptionQuestion, setSelectedOptionQuestion] = useState(null); 

    const optionsQuestion = ["Кратко", "Переформулируй", "Проще"];
    const tooltips = {
        "Кратко": "Нейросеть даёт сжатый ответ без лишних подробностей",
        "Переформулируй": "Нейросеть пересказывает текст другими словами, сохраняя смысл",
        "Проще": "Нейросеть объясняет сложное понятие доступным языком"
      };

    const [hoveredOption, setHoveredOption] = useState(null);
    const [arrowPos, setArrowPos] = useState(0);

    const newChatMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        try {
            const response = await fetch("http://localhost:8000/chats", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "user-id": userId,
                },
                body: JSON.stringify({
                title: trimmed.slice(0, 20),
                text: trimmed,
                type_question: questionType === "specialized" ? "Вопрос по GitVerse" : "Вопрос общего характера",
                }),
            });
    
            const data = await response.json();
    
            const assistantContent = data.text || "Error: not answer";
            dispatch(setCurrentChatId(data.id))
            dispatch(addMessage({ [trimmed]: assistantContent }));
                } catch (error) {
                dispatch(addMessage({ [trimmed]: "Ошибка при отправке запроса к серверу." }));
                console.error("Error:", error);
                }
            
            setInputValue("");
        };
        
    const existChatMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        try {
            const response = await fetch(`http://localhost:8000/chat/${currentChatId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "user-id": userId,
                },
                body: JSON.stringify({
                question: trimmed,
                type_question: questionType === "specialized" ? "Вопрос по GitVerse" : "Вопрос общего характера",
                }),
            });
    
            const data = await response.json();
    
            const assistantContent = data.text || "Error: not answer";
            dispatch(addMessage({ [trimmed]: assistantContent }));
                } catch (error) {
                dispatch(addMessage({ [trimmed]: "Ошибка при отправке запроса к серверу." }));
                console.error("Error:", error);
                }
            
            setInputValue("");
        };

    const choiseOptionQuestion = (option) => {
        if (selectedOptionQuestion === option) {
            setSelectedOptionQuestion(null); // Снять выбор, если кликнуть по активной
        } else {
            setSelectedOptionQuestion(option);
        }
    };

    return (
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
                    className="AGtext inputPlaceHolder"
                    placeholder="Напиши сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (currentChatId === null) {
                                newChatMessage();
                              } else {
                                existChatMessage();
                              }
                        }
                    }}
                />
                <div id="chat-input-buttons">
                <div className="tooltip-container">
                    {optionsQuestion.map((option) => (
                        <button
                        key={option}
                        className={`AGtxt14 type-answer ${
                            selectedOptionQuestion === option ? "type-answer-sel" : ""
                        }`}
                        onClick={() => choiseOptionQuestion(option)}
                        onMouseEnter={(e) => {
                            setHoveredOption(option);
                            // вычисляем центр кнопки для стрелки
                            const rect = e.currentTarget.getBoundingClientRect();
                            const containerRect = e.currentTarget.parentElement.getBoundingClientRect();
                            setArrowPos(rect.left - containerRect.left + rect.width / 2);
                        }}
                        onMouseLeave={() => setHoveredOption(null)}
                        >
                        {option}
                        </button>
                    ))}

                    {/* Tooltip — фиксированный блок */}
                    <div className={`tooltip-box-fixed ${hoveredOption ? "show" : ""}`}>
                        {hoveredOption && tooltips[hoveredOption]}
                        <div
                        className="tooltip-arrow-fixed"
                        style={{ left: `${arrowPos}px` }}
                        />
                    </div>
                </div>
                    <div>
                        <MicrophoneIconDefault />
                        <InputIcon 
                            inputValue={inputValue} 
                            onClick={() => currentChatId === null ? newChatMessage() : existChatMessage()} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )


}

export default InputMessageForm