import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { TechTagTypes } from "../../model/techtag.types";
import { PostgrestError } from "@supabase/supabase-js";

interface TechTagsState {
  data: TechTagTypes[];
  isLoading: boolean;
  error: PostgrestError | null;
}

const initialState: TechTagsState = {
  data: [],
  isLoading: false,
  error: null,
};

/** FETCH 모든 기술 태그 조회 */
export const fetchTechTags = createAsyncThunk(
  "techtags/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("tech_tags").select();
      console.log("fetchTechTags", data, error);
      if (error) throw error;
      if (data) return data;
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

const techTagsSlice = createSlice({
  name: "techtags",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // /** FETCH 모든 기술 태그 조회 */
    builder.addCase(fetchTechTags.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTechTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTechTags.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const techTagsReducer = techTagsSlice.reducer;
