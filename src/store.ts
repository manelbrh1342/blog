import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './features/Comment/CommentSlice'
import profileReducer from './features/Profile/ProfileSlice'
import articleReducer from './features/Article/ArticleSlice'
import authReducer from './features/Auth/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
    profile: profileReducer,
    article: articleReducer,
  }
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
