import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../app/supabase";
import { AuthError } from "@supabase/supabase-js";

interface AuthState {
  isLoggedIn: boolean;
  currentUserId: string | null;
  isLoading: boolean;
  error: AuthError | null;
  // error: string | null;
}

interface signUpReqDataType {
  email: string;
  username: string;
  password: string;
}

const {
  data: { user },
} = await supabase.auth.getUser();

// console.log("authSlice USER ", user);

const initialState: AuthState = {
  isLoggedIn: user !== null,
  currentUserId: user ? user.id : null,
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
        if (error.status === 422) {
          throw new Error("이미 가입된 이메일입니다.");
        }
        throw error;
      }

      if (data.session) {
        return;
      }
    } catch (error) {
      const authError = error as AuthError;

      return rejectWithValue(authError.message);
    }
  },
);

/** SIGN IN WITH EMAIL */
export const signInWithEmail = createAsyncThunk(
  "auth/login/email",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.status === 400) {
          throw new Error("이메일 또는 패스워드를 확인해 주세요.");
        }

        throw error;
      }

      if (data.session) {
        return data.session;
      }
    } catch (error) {
      const authError = error as AuthError;
      return rejectWithValue(authError.message);
    }
  },
);

/** SIGN IN WITH GITHUB */
export const signInWithGithub = createAsyncThunk(
  "auth/login/github",
  async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
);

/** SIGN OUT */
export const signOut = createAsyncThunk("auth/signout", async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** SIGN UP WITH EMAIL */
    builder.addCase(signUpNewUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpNewUser.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(signUpNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AuthError;
    });

    /** SIGN IN WITH EMAIL */
    builder.addCase(signInWithEmail.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signInWithEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.currentUserId = action.payload?.user.id as string;
    });
    builder.addCase(signInWithEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AuthError;
    });

    /** SIGN IN WITH GITHUB */
    builder.addCase(signInWithGithub.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signInWithGithub.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(signInWithGithub.rejected, state => {
      state.isLoading = false;
    });

    /** SIGN OUT */
    builder.addCase(signOut.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUserId = null;
    });
    builder.addCase(signOut.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
