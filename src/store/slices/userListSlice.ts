import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserListDataType, PageInfo } from "../../model/boardTypes";
// import axios from "axios";
import { supabase } from "../../app/supabase";

interface UserListState {
  data: UserListDataType[];
  pageInfo: PageInfo;
}

const initialState: UserListState = {
  data: [],
  pageInfo: {
    page: 1,
    size: 8,
    totalElements: 0,
    totalpages: 0,
  },
};

/** FETCH 모든 유저 카드 조회 */
export const fetchUserCardList = createAsyncThunk(
  "userlist/fetch",
  async () => {
    const response = await supabase.from("userlist").select();

    console.log(response);
    return response.data;
  },
);

const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchUserCardList.pending, () => {
      console.log("PENDING...");
    });
    builder.addCase(fetchUserCardList.fulfilled, () => {
      console.log("FULFILLED");
    });
    builder.addCase(fetchUserCardList.rejected, () => {
      console.log("REJECT");
    });
  },
});

// export const { } = userListSlice.actions;
export const usersReducer = userListSlice.reducer;
