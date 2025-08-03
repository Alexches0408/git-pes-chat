import { createSlice } from '@reduxjs/toolkit'
    export const gitChatSlice = createSlice({   
        name: 'gitChat',
        initialState: {
            chatHistory: [],
            chatCurrent:[],
            currentChatIndex: null,
    
            isOpen: true,
            sidebarOpen: true,
            darkMode: false,
        },
        reducers: {
            addMessage: (state, action) => {
                state.chatCurrent.push(action.payload);
            },
            toggleChat: (state) => { 
                state.isOpen = !state.isOpen;
            },
            toggleTheme: (state) => {
                state.darkMode = !state.darkMode;
            },
            toggleSidebar: (state) => {
                state.sidebarOpen = !state.sidebarOpen;
            },
            commitChat: (state) => {
                if (state.chatCurrent.length>0) {
                    const firstMessage = state.chatCurrent[0]?.text || 'Название чата';
                    const title = firstMessage.slice(0, 20);
                    state.chatHistory.push({
                        title,
                        messages: [...state.chatCurrent],
                    });
                    state.chatCurrent=[];
                }
            }, 
            loadChatHistory: (state, action) => {
                state.currentChatIndex = action.payload;
                const chatIndex = action.payload;
                const selectedChat = state.chatHistory[chatIndex];
                if (selectedChat) {
                    state.chatCurrent = [...selectedChat.messages];
                }
            }
        },
    });


export const { addMessage, toggleChat, toggleTheme, toggleSidebar, commitChat, loadChatHistory } = gitChatSlice.actions

export default gitChatSlice.reducer