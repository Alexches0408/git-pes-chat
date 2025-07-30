import { configureStore } from '@reduxjs/toolkit'
import gitChatReducer from '../features/gitChat/gitSlice'

export const store = configureStore({
  reducer: {
    gitChat: gitChatReducer,
  }
})