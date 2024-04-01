import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserListDataType } from "../../model/board.types";
// import axios from "axios";
import { supabase } from "../../app/supabase";

interface UserListState {
  data: UserListDataType[];
}

const initialState: UserListState = {
  data: [],
};

/** FETCH 모든 유저 카드 조회 */
export const fetchUserCardList = createAsyncThunk(
  "userlist/fetch",
  async () => {
    const response = await supabase.from("userlist").select();
    return response.data || [];
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
    builder.addCase(fetchUserCardList.fulfilled, (state, action) => {
      console.log("FULFILLED", state, action);
      state.data = action.payload;
    });
    builder.addCase(fetchUserCardList.rejected, () => {
      console.log("REJECT");
    });
  },
});

// export const { } = userListSlice.actions;
export const usersReducer = userListSlice.reducer;
