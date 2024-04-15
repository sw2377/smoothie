import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserCardListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface UserCardListState {
  data: UserCardListDataType[];
  isLoading: boolean;
  error: PostgrestError | null;
}

interface reqDataType {
  title: string;
  position: string;
  keywords: string[];
  tech_tags: string[];
  user_name: string;
  avatar_url: string;
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
    try {
      const { data, error } = await supabase.from("usercard_list").select();

      if (error) {
        console.warn("모든 유저 카드 조회 실패", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.log(error);
    }
  },
);

/** POST 유저 카드 작성 */
export const addUserCard = createAsyncThunk(
  "usercardlist/add",
  async (cardData: reqDataType, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("usercard_listt").insert(cardData);

      if (error) {
        throw error;
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

/** PATCH 유저 카드 수정 */
export const modifiedUserCard = createAsyncThunk(
  "usercardlist/modified",
  async ({ targetId, reqData }: modifiedUserCardParams) => {
    try {
      const { error } = await supabase
        .from("usercard_list")
        .update(reqData)
        .eq("id", targetId);

      if (error) {
        console.warn("카드 수정 실패", error);
        throw error;
      }
    } catch (error) {
      console.log(error);
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
    builder.addCase(addUserCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
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