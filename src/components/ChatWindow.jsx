import React, {useEffect} from "react";
import { motion } from "framer-motion";
import SideBarOpen from "@/components/SideBar/SideBarOpen";
import SideBarClose from "@/components/SideBar/SideBarClose";
import MainChatWindow from "@/components/mainChat/MainChatWindow";
import Profile from "@/components/Profile/ProfileWindow";
import GitCoine from "@/components/GitCoine/GitCoineWindow";
import { useSelector, useDispatch } from 'react-redux'
import '@/styles/ChatWindow.css';

import { setUser, setTokens, setList } from "@/features/gitChat/gitSlice";

const ChatWindow = () => {
  const dispatch = useDispatch()
  const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
  const profileModeOpen = useSelector((state) => state.gitChat.profileMode)
  const gitCoineModeOpen = useSelector((state) => state.gitChat.gitCoinMode)
  const darkMode = useSelector((state) => state.gitChat.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const initUser = async () => {
      const apiBase = "http://localhost:8000"; 
      let userId = localStorage.getItem("user-id");

      const createUser = async () => {
        try {
          const res = await fetch(`${apiBase}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "TestUser",
              email: "test@user.com",
            }),
          });
          if (!res.ok) throw new Error("Ошибка при создании пользователя");
          const data = await res.json();
          localStorage.setItem("user-id", data.id);
          return data.id;
        } catch (err) {
          console.error("createUser error:", err);
          return null;
        }
      };

      const fetchWithUser = async (endpoint, uid) => {
        try {
          const res = await fetch(`${apiBase}${endpoint}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "user-id": uid,
            },
          });
          if (!res.ok) throw new Error("Ошибка запроса " + endpoint);
          return await res.json();
        } catch (err) {
          console.error(`fetchWithUser ${endpoint} error:`, err);
          throw err;
        }
      };

      if (!userId) {
        userId = await createUser();
        return;
      }

      try {
        // /user → name, email
        const userData = await fetchWithUser("/user", userId);
        dispatch(setUser({ name: userData.name, email: userData.email }));

        // /user/token → tokens
        const tokenData = await fetchWithUser("/user/token", userId);
        dispatch(setTokens(tokenData.tokens));

        // /list → список
        const listData = await fetchWithUser("/list", userId);
        dispatch(setList(listData));

      } catch (err) {
        console.warn("userId невалидный, пересоздание:", err);

        const newId = await createUser();
        if (!newId) return;

        try {
          const userData = await fetchWithUser("/user", newId);
          dispatch(setUser({ name: userData.name, email: userData.email }));

          const tokenData = await fetchWithUser("/user/token", newId);
          dispatch(setTokens(tokenData.tokens));

          const listData = await fetchWithUser("/list", newId);
          dispatch(setList(listData));
        } catch (err2) {
          console.error("Ошибка при повторных запросах:", err2);
        }
      }
    };

    initUser();
  }, [dispatch]);


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
