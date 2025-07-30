import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Mascot3DBase from './Mascot3DBase';
import ChatWindow from './ChatWindow';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChat } from "../features/gitChat/gitSlice";

export default function ChatMascotPlugin() {
  const chatOpen = useSelector((state) => state.gitChat.isOpen)
  const dispatch = useDispatch()

  return (
    <div>
      {!chatOpen && (
        <Canvas 
          style={{ width: 300, height: 300, cursor: 'pointer' }}
          dpr={[1, 2]}
          shadows
          gl={{ antialias: true, physicallyCorrectLights: true }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1.2} position={[5, 5, 5]} />
          <axesHelper args={[5]} />
          <gridHelper args={[10, 10]} />
          <Mascot3DBase onClick={() => dispatch(toggleChat())} />
        </Canvas>
      )}

      {chatOpen && (
        <>
          {/* Затемняющий фон */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999, // ниже чата, но выше остального
              pointerEvents: 'auto' // блокирует клики по фону
            }}
            onClick={() => dispatch(toggleChat())} // Закрытие при клике вне чата (по желанию)
          />

          {/* Окно чата */}
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
