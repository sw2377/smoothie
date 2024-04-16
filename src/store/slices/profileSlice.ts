import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { ProfileDataType } from "../../model/profile.types";

interface ProfileState {
  data: ProfileDataType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
};

/** 해당 유저의 프로필 조회 */
export const getProfile = createAsyncThunk(
  "profile/get",
  async (targetId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", targetId);

      if (error) {
        throw error;
      }

      if (data) {
        return data[0];
      }
    } catch (error) {
      console.log(error);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** 해당 유저의 프로필 조회 */
    builder.addCase(getProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getProfile.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const profileReducer = profileSlice.reducer;
