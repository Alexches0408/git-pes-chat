import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from "../../features/gitChat/gitSlice";
import '@/styles/ChatWindow.css';



const EditMessageForm = ({text, resetEditingMessageIndex}) => {
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
    const dispatch = useDispatch()
    const [questionType, setQuestionType] = useState("general"); 
    const [inputValue, setInputValue] = useState(text);

    const [selectedOptionQuestion, setSelectedOptionQuestion] = useState(null); // null — ничего не выбрано
    
    const currentChatId = useSelector((state)=>state.gitChat.currentChatId);
    let userId = localStorage.getItem("user-id");

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
            resetEditingMessageIndex();
        };

    return (
        <div className="edit-message-wrapper">
            {/* Input */}
            <div id="edit-message-input" className="edit-message-container">
                <textarea
                    className="edit-textarea AGtext"
                    type="text"
                    placeholder="Напиши сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            existChatMessage();
                          }
                    }}
                />
                <div className="edit-actions">
                    <button onClick={resetEditingMessageIndex} className="btn-cancel AGtext">Отменить</button>
                    <button onClick={() => existChatMessage()} className="btn-send AGtext">Отправить</button>
                </div>
            </div>
        </div>
    )


}

export default EditMessageForm