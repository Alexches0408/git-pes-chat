import React, {useEffect} from "react";
import { motion } from "framer-motion";
import SideBarOpen from "@/components/SideBar/SideBarOpen";
import SideBarClose from "@/components/SideBar/SideBarClose";
import MainChatWindow from "@/components/mainChat/MainChatWindow";
import Profile from "@/components/Profile/ProfileWindow";
import GitCoine from "@/components/GitCoine/GitCoineWindow";
import WithoutTokens from "@/components/mainChat/WithoutTokens";
import { useSelector, useDispatch } from 'react-redux'
import '@/styles/ChatWindow.css';

import { setTokens, fetchAPI } from "@/features/gitChat/gitSlice";

const ChatWindow = () => {
  const dispatch = useDispatch()
  const sideBarIsOpen = useSelector((state) => state.gitChat.sidebarOpen)
  const profileModeOpen = useSelector((state) => state.gitChat.profileMode)
  const gitCoineModeOpen = useSelector((state) => state.gitChat.gitCoinMode)
  const darkMode = useSelector((state) => state.gitChat.darkMode);
  const noTokens = useSelector((state) => state.gitChat.noTokens);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const initUser = async () => {
      let userId = localStorage.getItem("user-id");

      const createUser = async () => {
        try {
            const response = await dispatch(fetchAPI({
                endpoint:`users`,
                method: 'POST',
                body: {
                  name: "TestUser",
                  email: `test+${Date.now()}@user.com`,
                },
            })).unwrap();
            const data = response.data;
            userId = data.id
            localStorage.setItem("user-id", userId);
            await fetchWithUser("user", "user");
            const tokenData = await fetchWithUser("user/token");
            dispatch(setTokens(tokenData.tokens));
            await fetchWithUser("list", "list");
            return data.id;
          } catch (err) {
            console.error("createUser error:", err);
            return null;
          }
        };

      const fetchWithUser = async (endpoint, target='') => {
        try {
          const response = await dispatch(fetchAPI({
              endpoint: endpoint,
              method: 'GET',
              headers:{"user-id": userId,},
              target:target,
          })).unwrap();
          return response.data;
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
        await fetchWithUser("user", "user");
        const tokenData = await fetchWithUser("user/token");
        dispatch(setTokens(tokenData.tokens));
        await fetchWithUser("list", "list");
      } catch (err) {
        console.warn("userId невалидный, пересоздание:", err);

        const newId = await createUser();
        if (!newId) return;

        try {
          await fetchWithUser("user", "user");
          const tokenData = await fetchWithUser("user/token");
          dispatch(setTokens(tokenData.tokens));
          await fetchWithUser("list", "list");
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
                id="sidebar-wrapper"
                className={`transition-all duration-300 ${
                    sideBarIsOpen ? "w-[232px]" : "w-[70px]"
                } bg-gray-100 dark:bg-gray-800 p-3 overflow-auto`}
            >
                {sideBarIsOpen ? <SideBarOpen /> : <SideBarClose />}
            </div>
        
            {/* Chat */}
            {profileModeOpen ? <Profile/> : (gitCoineModeOpen ? <GitCoine/> : (noTokens ? <WithoutTokens/> : <MainChatWindow/>))}
        </motion.div>
    </div>
  );
};

export default ChatWindow;