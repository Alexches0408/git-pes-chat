import { MascotProvider } from "./MascotProvider";
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Mascot3DBase from './Mascot3DBase';
import ChatWindow from './ChatWindow';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChat } from "../features/gitChat/gitSlice";
import wh_dog from "@/assets/images/git_dog_wh.png"; 
import dr_dog from "@/assets/images/git_dog_dr.png"; 



export default function ChatMascotPlugin() {
  const chatOpen = useSelector((state) => state.gitChat.isOpen);
  const dispatch = useDispatch();
  const darkMode = useSelector((state)=>state.gitChat.darkMode);
  const [isMobile, setIsMobile] = useState(false);
      

  const phrases = [
    "Генерирую новые фрагменты кода по описанию",
    "Читаю и подробно объясняю чужой код",
    "Провожу lightning-code-review и нахожу потенциальные баги",
    "Пишу тесты и документацию, пока ты пьёшь кофе",
    "Контекстное автодополнение слов, строк и целых функций!",
    "смарт-блоки кода, которые ложатся в нужное место",
    "Моментальные синтаксические советы, чтобы ошибки даже не появлялись",
  ];


  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addListener(handler);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
    }, 30000);

    return () => {
      mediaQuery.removeListener(handler);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className={`${chatOpen ? 'plagin-open-chat' : 'plagin-close-chat'} ${isMobile && 'plagin-chat-mobile'}`}  
    > 
      {!chatOpen && (
        <>
          {isMobile &&
            <div onClick={() => dispatch(toggleChat())} style={{ cursor: 'pointer' }}>
                <img src={darkMode? dr_dog: wh_dog} alt="Логотип" width={50} height={50} />
            </div> }
        {!isMobile && (
          <>
          <div className="chat-mascot-container">
            {/* Блок с фразой */}
            <div
              className="phrase-bubble"
            >
              {currentPhrase}
            </div> 
            <div onClick={() => dispatch(toggleChat())} style={{ cursor: 'pointer' }}>
                <img src={darkMode? dr_dog: wh_dog} alt="Логотип" width={80} height={80} />
            </div>
          </div>
            </>)}
            </>       
      )}

      {/* Окно чата */}
      {chatOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              pointerEvents: 'auto'
            }}
            onClick={() => dispatch(toggleChat())}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              display: 'inline-block',
              overflow: 'hidden',
            }}
          >
            <ChatWindow onClose={() => dispatch(toggleChat())} />
          </div>
        </>
      )}
    </div>
  );
}