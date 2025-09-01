import { MascotProvider } from "./MascotProvider";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Mascot3DBase from './Mascot3DBase';
import ChatWindow from './ChatWindow';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChat } from "../features/gitChat/gitSlice";

export default function ChatMascotPlugin() {
  const chatOpen = useSelector((state) => state.gitChat.isOpen);
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas 
        style={{ width: 100, height: 100, cursor: 'pointer' }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, physicallyCorrectLights: true }}
        camera={{ position: [0, 5, 40], fov: 20 }}
      >
        {/* Теперь MascotProvider внутри Canvas */}
        <MascotProvider>
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1.2} position={[5, 5, 5]} />

          <Suspense fallback={null}>
            {!chatOpen && (
              <Mascot3DBase 
                onClick={() => dispatch(toggleChat())} 
                position={[0, -20, 0]} 
                scale={0.6} 
              />
            )}
          </Suspense>
        </MascotProvider>
      </Canvas>

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
