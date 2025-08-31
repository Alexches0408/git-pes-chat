import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, setCurrentChatId, fetchAPI, setTokens } from "../../features/gitChat/gitSlice";
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

    const handleChatMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        try {
            const response = await dispatch(fetchAPI({
                endpoint:`${currentChatId ?`chat/${currentChatId}`:'chats'}`,
                headers:{"user-id": userId,},
                method: `${currentChatId ?'PUT':'POST'}`,
                body: {
                    question: trimmed,
                    type_question: questionType === "specialized" ? "Вопрос по GitVerse" : "Вопрос общего характера",
                    },
            })).unwrap();
    
            const assistantContent = response.data.text || "Error: not answer";
            dispatch(setCurrentChatId(response.data.id))
            dispatch(addMessage({ [trimmed]: assistantContent }));

            const tokens = await dispatch(fetchAPI({
                endpoint:'user/token',
                headers:{"user-id": userId,},
                method: 'GET',
            })).unwrap();
            dispatch(setTokens(tokens.data.tokens));
                } catch (error) {
                dispatch(addMessage({ [trimmed]: "Ошибка при отправке запроса к серверу." }));
                console.error("Error:", error);
                }
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
                            handleChatMessage()
                        }
                    }}
                />
                <div id="mob-input-icons">
                    {inputValue ? 
                        <InputIcon inputValue={inputValue} onClick={() => handleChatMessage()} /> : 
                        <MicrophoneIconDefault />
                    }
                </div>
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
                    <div id="input-icons">
                        <MicrophoneIconDefault />
                        <InputIcon 
                            inputValue={inputValue} 
                            onClick={() => handleChatMessage()} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )


}

export default InputMessageForm