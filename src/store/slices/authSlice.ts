import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { AuthError } from "@supabase/supabase-js";

import { session } from "../../app/supabase";

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: AuthError | null;
  // error: string | null;
}

interface signUpReqDataType {
  email: string;
  username: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: session !== null, // 이렇게 하는게 맞는 방법인가,,?
  isLoading: false,
  error: null,
};

/** SIGN UP WITH EMAIL */
export const signUpNewUser = createAsyncThunk(
  "auth/signup",
  async (
    { email, password, username }: signUpReqDataType,
    { rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: username,
            avatar_url: "",
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        return;
      }
    } catch (error) {
      // const authError = error as AuthError;
      // console.dir(authError);

      // return rejectWithValue(authError.message);
      // console.warn(error);

      return rejectWithValue(error);
    }
  },
);

/** LOG IN WITH EMAIL */
export const signInWithEmail = createAsyncThunk(
  "auth/login/email",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error?.status === 400) {
        alert("이메일 또는 패스워드를 확인해 주세요.");
      }

      if (data.session) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },
);

/** LOG IN WITH GITHUB */

/** LOG OUT */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // SIGN UP
    builder.addCase(signUpNewUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signUpNewUser.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(signUpNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // LOG IN WITH EMAIL
    builder.addCase(signInWithEmail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signInWithEmail.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(signInWithEmail.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
