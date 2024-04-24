import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { ProjectDataType } from "../../model/profile.types";
import { PostgrestError } from "@supabase/supabase-js";

interface ProjectState {
  data: ProjectDataType | null;
  isLoading: boolean;
  error: PostgrestError | null;
}

interface reqDataType {
  title: string;
  description: string;
  repo_url: string;
  image_url?: string;
  inside_project: boolean;
  profile_id: string;
}

const initialState: ProjectState = {
  data: null,
  isLoading: false,
  error: null,
};

/** POST 프로필 수정 - 프로젝트 추가 */
export const addProject = createAsyncThunk(
  "project/add",
  async (projectData: reqDataType, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("projects").insert(projectData);

      if (error) {
        throw error;
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

/** DELETE 프로필 수정 - 프로젝트 삭제 */
export const removeProject = createAsyncThunk(
  "project/remove",
  async (targetId: number) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", targetId);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  },
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** POST 프로필 수정 - 프로젝트 추가 */
    builder.addCase(addProject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addProject.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const projectReducer = projectSlice.reducer;
