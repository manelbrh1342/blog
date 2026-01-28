import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./ArticleApi.ts";
import articleReducer from "./ArticleSlice.ts";

export const store = configureStore({
  reducer: {
    articles: articleReducer,

    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
