import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './features/Comment/CommentSlice'
import profileReducer from './features/Profile/ProfileSlice'

export const store = configureStore({
  reducer: {
    comment: commentReducer,
    profile: profileReducer,
  }
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
