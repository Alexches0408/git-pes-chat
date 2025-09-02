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
      
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addListener(handler);

  }, []);

  return (
    <div 
      className={`${chatOpen ? 'plagin-open-chat' : 'plagin-close-chat'}`}  
    >
      {isMobile ? 
          <div onClick={() => dispatch(toggleChat())} style={{ cursor: 'pointer' }}>
              <img src={darkMode? dr_dog: wh_dog} alt="Логотип" width={80} height={80} />
          </div> : 
          <div onClick={() => dispatch(toggleChat())} style={{ cursor: 'pointer' }}>
              <img src={darkMode? dr_dog: wh_dog} alt="Логотип" width={80} height={80} />
          </div>
      }
      {/* {isMobile ? 
      <div>
      </div> :
      <Canvas 
        style={{ width: 700, height: 700, cursor: 'pointer' }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, physicallyCorrectLights: true }}
        camera={{ position: [0, 15, 100], fov: 20 }}
        onClick={() => dispatch(toggleChat())} 
      >
        <MascotProvider>
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1.2} position={[5, 5, 5]} />

          <Suspense fallback={null}>
            {!chatOpen && (
              <Mascot3DBase 
                position={[0, -47, 0]} 
                scale={0.9} 
              />
            )}
          </Suspense>
        </MascotProvider>
      </Canvas>
      }  */}

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