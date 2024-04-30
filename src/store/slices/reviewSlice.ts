import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { ReviewDataType } from "../../model/profile.types";
import { PostgrestError } from "@supabase/supabase-js";

interface ReviewState {
  data: ReviewDataType[] | null;
  isLoading: boolean;
  error: PostgrestError | null;
}

const initialState: ReviewState = {
  data: null,
  isLoading: false,
  error: null,
};

/** GET 해당 유저의 리뷰 조회 */
export const getReviews = createAsyncThunk(
  "review/get",
  async (targetId: string) => {
    try {
      const { data, error } = await supabase
        .from("peer_reviews")
        .select("*, projects(*)")
        .eq("receiver_id", targetId);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("data", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** GET 해당 유저의 리뷰 조회 */
    builder.addCase(getReviews.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getReviews.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const reviewReducer = reviewSlice.reducer;
