import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { userCardListReducer } from "./slices/userCardListSlice";
import { projectListReducer } from "./slices/projectListSlice";

export const store = configureStore({
  reducer: {
    usercards: userCardListReducer,
    projects: projectListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
