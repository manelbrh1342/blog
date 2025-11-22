import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './features/Comment/CommentSlice'

export const store = configureStore({
  reducer: {
    comment: commentReducer,
  }
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
