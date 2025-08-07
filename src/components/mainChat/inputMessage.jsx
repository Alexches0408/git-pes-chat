import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from "../../features/gitChat/gitSlice";
import '@/styles/Sidebar.css';

import {MicrophoneIconDefault, InputIcon} from '@/icons'



const InputMessageForm = () => {
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
    const dispatch = useDispatch()
    const [questionType, setQuestionType] = useState("general"); 
    const [inputValue, setInputValue] = useState("");

    const [selectedOptionQuestion, setSelectedOptionQuestion] = useState(null); // null — ничего не выбрано

    const optionsQuestion = ["Кратко", "Переформулируй", "Проще"];

    const handleSendMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        // Add user message
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
    
            const assistantContent = data.message || "Error: not answer";
            dispatch(addMessage({ from: "bot", text: assistantContent }));
                } catch (error) {
                dispatch(addMessage({ from: "bot", text: "Ошибка при отправке запроса к серверу." }));
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
                        {optionsQuestion.map((option) => (
                            <button
                            key={option}
                            className={`AGtxt14 ${
                                selectedOptionQuestion === option ? "type-answer-sel" : "type-answer"
                            }`}
                            onClick={() => choiseOptionQuestion(option)}
                            >
                            {option}
                            </button>
                        ))}
                    </div>
                    <div>
                        <MicrophoneIconDefault />
                        <InputIcon inputValue={inputValue} onClick={handleSendMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default InputMessageForm