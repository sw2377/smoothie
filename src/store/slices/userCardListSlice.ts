import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserCardListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";

interface UserCardListState {
  data: UserCardListDataType[];
  isLoading: boolean;
  error: string | null;
}

interface reqDataType {
  title: string;
  position: string;
  keywords: string[];
  techTags: string[];
}

interface modifiedUserCardParams {
  targetId: number | undefined;
  reqData: reqDataType;
}

const initialState: UserCardListState = {
  data: [],
  isLoading: false,
  error: null,
};

/** FETCH 모든 유저 카드 조회 */
export const fetchUserCardList = createAsyncThunk(
  "usercardlist/fetch",
  async () => {
    const { data, error } = await supabase.from("userCardList").select();

    if (error) {
      console.warn("모든 유저 카드 조회 실패", error);
      throw error;
    }

    return data || [];
  },
);

/** POST 유저 카드 작성 */
export const addUserCard = createAsyncThunk(
  "usercardlist/add",
  async (cardData: reqDataType) => {
    const { error } = await supabase.from("userCardList").insert(cardData);

    if (error) {
      console.warn("카드 작성 실패", error);
      throw error;
    }
  },
);

/** PATCH 유저 카드 수정 */
export const modifiedUserCard = createAsyncThunk(
  "usercardlist/modified",
  async ({ targetId, reqData }: modifiedUserCardParams) => {
    const { error } = await supabase
      .from("userCardList")
      .update(reqData)
      .eq("id", targetId);

    if (error) {
      console.warn("카드 수정 실패", error);
      throw error;
    }
  },
);

const userCardListSlice = createSlice({
  name: "usercardlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // FETCH
    builder.addCase(fetchUserCardList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserCardList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserCardList.rejected, state => {
      state.isLoading = false;
    });

    // POST
    builder.addCase(addUserCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addUserCard.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(addUserCard.rejected, state => {
      state.isLoading = false;
    });

    // PATCH
    builder.addCase(modifiedUserCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(modifiedUserCard.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(modifiedUserCard.rejected, state => {
      state.isLoading = false;
    });
  },
});

// export const { } = userListSlice.actions;
export const userCardListReducer = userCardListSlice.reducer;
