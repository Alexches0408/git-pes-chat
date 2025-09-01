import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, fetchAPI } from "../../features/gitChat/gitSlice";
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

    const editMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        try {
            const response = await dispatch(fetchAPI({
                endpoint:`chat/${currentChatId}`,
                headers:{"user-id": userId,},
                method: 'PUT',
                body: {
                    question: trimmed,
                    type_question: "Вопрос по GitVerse",
                    },
            })).unwrap();
    
            const assistantContent = response.data.text || "Error: not answer";
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
                            editMessage();
                          }
                    }}
                />
                <div className="edit-actions">
                    <button onClick={resetEditingMessageIndex} className="btn-cancel AGtext">Отменить</button>
                    <button onClick={() => editMessage()} className="btn-send AGtext">Отправить</button>
                </div>
            </div>
        </div>
    )


}

export default EditMessageForm