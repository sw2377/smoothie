import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface ProjectListState {
  data: ProjectListDataType[];
  currentData?: ProjectListDataType;
  isLoading: boolean;
  error: PostgrestError | null;
}

interface reqDataType {
  title: string;
  content: string;
  start_date: string | Date;
  end_date: string | Date;
  position: string[];
  tech_tags: string[];
}

interface modifiedProjectParams {
  targetId: number | undefined;
  reqData: reqDataType;
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
    const { data, error } = await supabase.from("project_list").select();

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
      .from("project_list")
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
  async (postData: reqDataType, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("project_list").insert(postData);

      if (error) {
        throw error;
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      return rejectWithValue(pgError.message);
    }
  },
);

/** PATCH 게시글 수정 */
export const modifiedProject = createAsyncThunk(
  "usercardlist/modified",
  async ({ targetId, reqData }: modifiedProjectParams) => {
    const { error } = await supabase
      .from("project_list")
      .update(reqData)
      .eq("id", targetId);

    if (error) {
      console.warn("게시글 수정 실패", error);
      throw error;
    }
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
    builder.addCase(addProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });
  },
});

// export const { } = projectListSlice.actions;
export const projectListReducer = projectListSlice.reducer;
