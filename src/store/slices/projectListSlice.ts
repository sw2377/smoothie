import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";

interface ProjectListState {
  data: ProjectListDataType[];
  currentData?: ProjectListDataType;
  isLoading: boolean;
  error: string | null;
}

interface reqDataType {
  title: string;
  position: string;
  keywords: string[];
  techTags: string[];
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
    const { data, error } = await supabase.from("projectList").select();

    if (error) {
      console.warn("모든 프로젝트 게시글 조회 실패", error);
      throw error;
    }

    return data || [];
  },
);

/** GET 현재 게시글 조회 */
export const getProject = createAsyncThunk(
  "projectlist/get",
  async (targetId: string) => {
    const { data, error } = await supabase
      .from("projectList")
      .select()
      .eq("id", targetId);

    if (error) {
      console.warn("현재 게시글 조회 실패", error);
      throw error;
    }

    return data[0];
  },
);

/** POST 게시글 작성 */
export const addProject = createAsyncThunk(
  "projectlist/add",
  async (postData: reqDataType) => {
    const { error } = await supabase.from("projectList").insert(postData);

    if (error) {
      console.warn("카드 작성 실패", error);
      throw error;
    }
  },
);

/** PATCH 게시글 수정 */

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

    // GET
    builder.addCase(getProject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentData = action.payload;
    });
    builder.addCase(getProject.rejected, state => {
      state.isLoading = false;
    });

    // POST
    builder.addCase(addProject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addProject.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(addProject.rejected, state => {
      state.isLoading = false;
    });
  },
});

// export const { } = projectListSlice.actions;
export const projectListReducer = projectListSlice.reducer;
