import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";

interface ProjectListState {
  data: ProjectListDataType[];
}

const initialState: ProjectListState = {
  data: [],
};

/** FETCH 모든 게시글 조회 */
export const fetchProjectList = createAsyncThunk(
  "projectlist/fetch",
  async () => {
    const response = await supabase.from("projectlist").select();
    return response.data || [];
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchProjectList.pending, () => {
      console.log("PENDING...");
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      console.log("FULFILLED", state, action);
      state.data = action.payload;
    });
    builder.addCase(fetchProjectList.rejected, () => {
      console.log("REJECT");
    });
  },
});

// export const { } = projectListSlice.actions;
export const projectReducer = projectSlice.reducer;
