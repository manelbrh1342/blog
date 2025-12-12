import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './features/Comment/CommentSlice'
import profileReducer from './features/Profile/ProfileSlice'
import articleReducer from './features/Article/ArticleSlice'
import authReducer from './features/Auth/AuthSlice'
import { commentApi } from './features/Comment/CommentApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
    profile: profileReducer,
    article: articleReducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentApi.middleware),
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
