import React from "react";
import { motion } from "framer-motion";
import SideBarOpen from "@/components/SideBar/SideBarOpen";
import SideBarClose from "@/components/SideBar/SideBarClose";
import MainChatWindow from "@/components/mainChat/MainChatWindow";
import Profile from "@/components/Profile/ProfileWindow";
import GitCoine from "@/components/GitCoine/GitCoineWindow";
import { useSelector} from 'react-redux'
import '@/styles/ChatWindow.css';


const ChatWindow = () => {
  const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
  const profileModeOpen = useSelector((state) => state.gitChat.profileMode)
  const gitCoineModeOpen = useSelector((state) => state.gitChat.gitCoinMode)


  return (
    <div id="chat-wraper">
        <motion.div
          className="flex flex-row h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
            {/* SideBar */}
            <div
                className={`transition-all duration-300 ${
                    sideBarIsOpen ? "w-[232px]" : "w-[70px]"
                } bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}
            >
                {sideBarIsOpen ? <SideBarOpen /> : <SideBarClose />}
            </div>
        
            {/* Chat */}
            {profileModeOpen ? <Profile/> : (gitCoineModeOpen ? <GitCoine/> : <MainChatWindow/>)}
        </motion.div>
    </div>
  );
};

export default ChatWindow;
