import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // your slices
  }
})

// Optional: Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
