import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, fetchAPI } from "../../features/gitChat/gitSlice";
import { CloseIcon } from '@/icons'
import '@/styles/ChatWindow.css';



const FeedBackForm = ({resetFeedMessageIndex}) => {
    let userId = localStorage.getItem("user-id");
    const chatCurrent = useSelector((state) => state.gitChat.chatCurrent)
    const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
    const dispatch = useDispatch()
    const ref = useRef();
    const [inputValue, setInputValue] = useState('');
    const currentChatId = useSelector((state)=>state.gitChat.currentChatId);

    const [selectedQuestion, setSelectedQuestion] = useState([]); 
    const questions = [
        "Неточная информация",
        "Слишком кратко",
        "Много лишнего",
        "Не тот стиль",
        "Другая причина",
      ];

    const toggleSelect = (i) => {
        setSelectedQuestion((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                resetFeedMessageIndex();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [resetFeedMessageIndex])
    
    

    const sendFeed = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
    
        try {
            const response = await dispatch(fetchAPI({
                endpoint:`chat/${currentChatId}/feedback`,
                headers:{"user-id": userId,},
                method: 'POST',
                body: {
                    text: trimmed,
                    },
            }
        ))} catch (error) {
                console.error("Error:", error);
                }
            resetFeedMessageIndex();
        };

    return (
        <>
            <div id="all-background-for-feed-popup" />
            <div id="feedback-popup" ref={ref}>
                <div id="feed-head">
                    <div className='AGtext '>Обратная связь, почему не подошел ответ?</div>
                    <CloseIcon            
                        onClick={resetFeedMessageIndex}/>
                </div>
                <div className="feed-buttons-block">
                {questions.map((text, i) => (
                    <button
                    key={i}
                    className={`feed-button AGtxt14 ${
                                selectedQuestion.includes(i)
                                    ? "sel"
                                    : ""
                                }`}
                    onClick={() => toggleSelect(i)}
                    >
                    {text}
                    </button>
                ))}
                </div>
                <textarea
                    className="AGtext feed-text-area"
                    type="text"
                    placeholder="Помогите нам стать лучше - укажите что исправить, и мы переработаем ответ"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendFeed();
                          }
                    }}
                />
                <div className="edit-actions">
                    <button onClick={resetFeedMessageIndex} className="btn-cancel AGtext">Отменить</button>
                    <button onClick={() => sendFeed()} className="btn-send AGtext">Отправить</button>
                </div>
            </div>
        </>
    )


}

export default FeedBackForm