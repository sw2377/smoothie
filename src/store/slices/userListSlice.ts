import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserListDataType } from "../../model/board.types";
// import axios from "axios";
import { supabase } from "../../app/supabase";

interface UserListState {
  data: UserListDataType[];
}

interface reqDataType {
  title: string;
  position: string;
  keywords: string[];
  techTags: string[];
}

interface editUserCardParams {
  targetId: number | undefined;
  reqData: reqDataType;
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

/** POST 유저 카드 작성 */
export const addUserCard = createAsyncThunk(
  "userlistd/add",
  async (cardData: reqDataType) => {
    const { error } = await supabase.from("userlist").insert(cardData);
    console.log("ERROR", error);
  },
);

/** PATCH 유저 카드 수정 */
export const modifiedUserCard = createAsyncThunk(
  "usercard/edit",
  async ({ targetId, reqData }: editUserCardParams) => {
    const { error } = await supabase
      .from("userlist")
      .update(reqData)
      .eq("id", targetId);

    console.log(error);
  },
);

const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // FETCH
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

    // POST
    builder.addCase(addUserCard.pending, () => {
      console.log("PENDING...");
    });
    builder.addCase(addUserCard.fulfilled, (state, action) => {
      console.log("FULFILLED", state, action);
    });
    builder.addCase(addUserCard.rejected, () => {
      console.log("REJECT");
    });

    // PATCH
    builder.addCase(modifiedUserCard.pending, () => {
      console.log("PENDING...");
    });
    builder.addCase(modifiedUserCard.fulfilled, (state, action) => {
      console.log("FULFILLED", state, action);
    });
    builder.addCase(modifiedUserCard.rejected, () => {
      console.log("REJECT");
    });
  },
});

// export const { } = userListSlice.actions;
export const usersReducer = userListSlice.reducer;
