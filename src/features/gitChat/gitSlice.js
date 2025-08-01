import { createSlice } from '@reduxjs/toolkit'
    export const gitChatSlice = createSlice({   
        name: 'gitChat',
        initialState: {
            chatHistory: [],
            chatCurrent:[],
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
        },
    });


export const { addMessage, toggleChat, toggleTheme, toggleSidebar } = gitChatSlice.actions

export default gitChatSlice.reducer