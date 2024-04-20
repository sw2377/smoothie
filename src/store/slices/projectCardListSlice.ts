import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectCardListDataType } from "../../model/board.types";
import { supabase } from "../../app/supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface ProjectCardListState {
  data: ProjectCardListDataType[];
  currentData?: ProjectCardListDataType;
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

interface modifiedProjectCardParams {
  targetId: number | undefined;
  reqData: reqDataType;
}

const initialState: ProjectCardListState = {
  data: [],
  isLoading: false,
  error: null,
};

/** FETCH 모든 게시글 조회 */
export const fetchProjectCardList = createAsyncThunk(
  "projectcardlist/fetch",
  async () => {
    const { data, error } = await supabase.from("projectcard_list").select();

    if (error) {
      console.warn("모든 프로젝트 게시글 조회 실패", error);
      throw error;
    }

    return data || [];
  },
);

/** GET 현재 게시글 조회 */
export const getProjectCard = createAsyncThunk(
  "projectcardlist/get",
  async (targetId: string) => {
    const { data, error } = await supabase
      .from("projectcard_list")
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
export const addProjectCard = createAsyncThunk(
  "projectcardlist/add",
  async (postData: reqDataType, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("projectcard_list")
        .insert(postData);

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
export const modifiedProjectCard = createAsyncThunk(
  "projectcardlist/modified",
  async ({ targetId, reqData }: modifiedProjectCardParams) => {
    const { error } = await supabase
      .from("projectcard_list")
      .update(reqData)
      .eq("id", targetId);

    if (error) {
      console.warn("게시글 수정 실패", error);
      throw error;
    }
  },
);

/** DELETE 게시글 삭제 */
export const removeProjectCard = createAsyncThunk(
  "projectcardlist/remove",
  async (targetId: string) => {
    try {
      const { error } = await supabase
        .from("projectcard_list")
        .delete()
        .eq("id", targetId);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  },
);

/** FILTER 특정 유저의 카드 조회 */
export const filteredProjectCardByUserId = createAsyncThunk(
  "projectlist/filterbyid",
  async (targetId: string) => {
    try {
      const { data, error } = await supabase
        .from("projectcard_list")
        .select()
        .eq("user_id", targetId);

      if (error) throw error;
      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const projectListSlice = createSlice({
  name: "projectlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** FETCH 모든 게시글 조회 */
    builder.addCase(fetchProjectCardList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectCardList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProjectCardList.rejected, state => {
      state.isLoading = false;
    });

    /** GET 현재 게시글 조회 */
    builder.addCase(getProjectCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProjectCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentData = action.payload;
    });
    builder.addCase(getProjectCard.rejected, state => {
      state.isLoading = false;
    });

    /** POST 게시글 작성 */
    builder.addCase(addProjectCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addProjectCard.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(addProjectCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });

    /** PATCH 게시글 수정 */
    builder.addCase(modifiedProjectCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(modifiedProjectCard.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(modifiedProjectCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });

    /** DELETE 게시글 삭제 */
    builder.addCase(removeProjectCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(removeProjectCard.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(removeProjectCard.rejected, state => {
      state.isLoading = false;
    });

    /** FILTER 특정 유저의 카드 조회 */
    builder.addCase(filteredProjectCardByUserId.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(filteredProjectCardByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(filteredProjectCardByUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as PostgrestError;
    });
  },
});

// export const { } = projectListSlice.actions;
export const projectListReducer = projectListSlice.reducer;
