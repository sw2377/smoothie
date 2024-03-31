import { createSlice } from "@reduxjs/toolkit";
import { UserListDataType, PageInfo } from "../../model/boardTypes";

interface UserState {
  data: UserListDataType[];
  pageInfo: PageInfo;
  // editTitle: string;
}

const initialState: UserState = {
  data: [],
  pageInfo: {
    page: 1,
    size: 8,
    totalElements: 0,
    totalpages: 0,
  },
  // editTitle: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    test(state) {
      console.log(state, "test reducer입니다.");
    },
  },
});

export const { test } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
