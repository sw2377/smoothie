import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";

interface ProjectListState {
  data: ProjectListDataType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectListState = {
  data: [],
  isLoading: false,
  error: null,
};

/** FETCH 모든 게시글 조회 */
export const fetchProjectList = createAsyncThunk(
  "projectlist/fetch",
  async () => {
    const response = await supabase.from("projectList").select();
    return response.data || [];
  },
);

const projectListSlice = createSlice({
  name: "projectlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // FETCH
    builder.addCase(fetchProjectList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProjectList.rejected, state => {
      state.isLoading = false;
    });
  },
});

// export const { } = projectListSlice.actions;
export const projectListReducer = projectListSlice.reducer;
