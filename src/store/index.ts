import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { usersReducer } from "./slices/userListSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
