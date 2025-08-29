import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:8000/'
    
export const fetchAPI = createAsyncThunk(
    'api/fetchAPI',
    async ({ endpoint, method = 'GET', body = null, headers = {}, target=null }, thunkAPI) => {
      try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          body: body ? JSON.stringify(body) : null,
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Ошибка запроса');
  
        return {data, target};
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )

export const gitChatSlice = createSlice({   
    name: 'gitChat',
    initialState: {
        chatHistory: [],
        chatCurrent:[],
        currentChatId: null,
        favoritesByChatId:{},
        


        isOpen: true,
        sidebarOpen: false,
        darkMode: false,
        profileMode:false,
        gitCoinMode:false,

        user: { name: "", email: "" },
        tokens: 0,
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
        clearCurrentChat: (state) => {
            state.currentChatId=null;
            state.chatCurrent=[];
        }, 
        renameChat: (state, action) => {
            const {chatId, newName} = action.payload;
            state.chatHistory = state.chatHistory.map(chat =>
                chat.id === chatId ? { ...chat, title: newName } : chat
            );                        
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
        setChatHistory: (state, action) => {
            state.chatHistory = action.payload; 
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchAPI.pending, (state) => {
            state.loading = true
            state.error = null
          })
          .addCase(fetchAPI.fulfilled, (state, action) => {
            state.loading = false
            const { data, target } = action.payload
            if (target && state.hasOwnProperty(target)) {
              state[target] = data   // вставляем в нужное поле
            }
          })
          .addCase(fetchAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
          })
      },
});


export const { addMessage, toggleChat, toggleTheme, toggleSidebar, clearCurrentChat, loadChatHistory, loadChat, setCurrentChatId, deleteChat, toggleFavoriteMessage, renameChat, editChatCurrentMessage, toggleGitCoine, toggleProfile, setUser, setTokens, setChatHistory } = gitChatSlice.actions

export default gitChatSlice.reducer