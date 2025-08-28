import { createSlice } from '@reduxjs/toolkit'
    export const gitChatSlice = createSlice({   
        name: 'gitChat',
        initialState: {
            chatHistory: [],
            chatCurrent:[],
            currentChatId: null,
            favoritesByChatId:{},
            

    
            isOpen: true,
            sidebarOpen: true,
            darkMode: false,
            profileMode:false,
            gitCoinMode:false,

            user: { name: "", email: "" },
            tokens: 0,
            list: [],
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
            toggleProfile: (state,action) => {
                state.profileMode = action.payload;
            },
            toggleGitCoine: (state, action) => {
                state.gitCoinMode = action.payload;
            },
            createNewChat: (state) => {
                if (state.chatCurrent.length>0) {
                    state.currentChatId=null;
                    state.chatCurrent=[];
                }
            }, 
            renameChat: (state, action) => {
                const {chatId, newName} = action.payload;
                if (state.chatHistory[chatId]) {
                    state.chatHistory[chatId].title = newName;
                }
                          
            },
            loadChatHistory: (state, action) => {
                state.currentChatIndex = action.payload;
                const chatIndex = action.payload;
                const selectedChat = state.chatHistory[chatIndex];
                if (selectedChat) {
                    state.chatCurrent = [...selectedChat.messages];
                }   
            },
            loadChat: (state, action) => {
                state.chatCurrent = action.payload.text;
            },
            setCurrentChatId: (state, action) => {
                state.currentChatId = action.payload;
            },
            deleteChat: (state, action) => {
                const index = action.payload;
                if (state.currentChatIndex === index) {
                    state.currentChatIndex = null;
                    state.chatCurrent = [];
                } else if (state.currentChatIndex > index) {
                    state.currentChatIndex -=1;
                }

                state.chatHistory.splice(index,1);
            },
            toggleFavoriteMessage: (state, action) => {
                const {chatId, messageId} = action.payload;
                const favs = state.favoritesByChatId[chatId] || [];
                state.favoritesByChatId[chatId] = favs.includes(messageId)
                    ? favs.filter((id)=> id !== messageId)
                    : [...favs,messageId]
            },
            editChatCurrentMessage: (state, action) => {
                const {text, messageId} = action.payload;
                state.chatCurrent[messageId].text = text;

            },
            setUser: (state, action) => {
                state.user = action.payload; 
            },
            setTokens: (state, action) => {
                state.tokens = action.payload; 
            },
            setList: (state, action) => {
                state.list = action.payload; 
            },
        },
    });


export const { addMessage, toggleChat, toggleTheme, toggleSidebar, createNewChat, loadChatHistory, loadChat, setCurrentChatId, deleteChat, toggleFavoriteMessage, renameChat, editChatCurrentMessage, toggleGitCoine, toggleProfile, setUser, setTokens, setList } = gitChatSlice.actions

export default gitChatSlice.reducer