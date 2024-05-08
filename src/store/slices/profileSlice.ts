import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { ProfileDataType } from "../../model/profile.types";
import { PostgrestError } from "@supabase/supabase-js";

interface ProfileState {
  data: ProfileDataType | null;
  isLoading: boolean;
  error: PostgrestError | null;
}

interface reqProfileDataType {
  cover_letter: string;
  tech_tags: string[];
  hard_skills: string[];
  soft_skills: string[];
  // projects: ProjectDataType[] | undefined;
}

interface reqMyInfoDataType {
  user_name: string;
  position: string;
}

interface modifiedProfileParams {
  targetId: string | undefined;
  reqData: reqProfileDataType;
}

interface modifiedMyInfoParams {
  targetId: string | undefined;
  reqData: reqMyInfoDataType;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
};

/** GET 해당 유저의 프로필 조회 */
export const getProfile = createAsyncThunk(
  "profile/get",
  async (targetId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, projects(*)")
        .eq("id", targetId);

      if (error) throw error;
      if (data) return data[0];
    } catch (error) {
      console.error("GET PROFILE ERROR", error);
    }
  },
);

/** PATCH 프로필 수정 - 프로필 탭 프로필 수정 */
export const modifiedProfile = createAsyncThunk(
  "profile/modified",
  async ({ targetId, reqData }: modifiedProfileParams, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(reqData)
        .eq("id", targetId);

      if (error) {
        throw error;
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

/** PATCH 프로필 수정 - 나의 정보 수정 */
export const modifiedMyInfo = createAsyncThunk(
  "profile/modified/myinfo",
  async ({ targetId, reqData }: modifiedMyInfoParams, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(reqData)
        .eq("id", targetId)
        .select();

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** GET 해당 유저의 프로필 조회 */
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

    /** PATCH 프로필 수정 - 프로필 탭 프로필 수정 */
    builder.addCase(modifiedProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(modifiedProfile.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(modifiedProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });

    /** PATCH 프로필 수정 - 나의 정보 수정 */
    builder.addCase(modifiedMyInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(modifiedMyInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(modifiedMyInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });
  },
});

export const profileReducer = profileSlice.reducer;
