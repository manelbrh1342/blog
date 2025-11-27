import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './features/Comment/CommentSlice'
import articleReducer from './features/Article/ArticleSlice'

export const store = configureStore({
  reducer: {
    comment: commentReducer,
    article: articleReducer,
  }
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
