import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer } from "./slices/authSlice";
import { userCardListReducer } from "./slices/userCardListSlice";
import { projectListReducer } from "./slices/projectListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usercards: userCardListReducer,
    projects: projectListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
