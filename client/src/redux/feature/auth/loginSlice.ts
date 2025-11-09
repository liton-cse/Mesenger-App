// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  AuthResponse,
  LoginAuthState,
  UserData,
} from "../../../types/auth/auth.type.js";
import { getProfile, loginProcess } from "../../apiAction/auth/authApi.js";
import axiosInstance from "../../../axios/axiosIntance.js";

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>("auth/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await loginProcess(payload);
    return response;
  } catch (err) {
    let errorMessage = "Login failed";

    if (typeof err === "string") {
      errorMessage = err;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = String(err.message);
    }

    return rejectWithValue(errorMessage);
  }
});

export const loadUserFromToken = createAsyncThunk<UserData>(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getProfile();
      return user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load user"
      );
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call backend to update online status and last seen
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Logout failed";
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchAllUser = createAsyncThunk<
  UserData[],
  void,
  { rejectValue: string }
>("auth/users", async (_, { rejectWithValue }) => {
  try {
    // Call backend to update online status and last seen
    const response = await axiosInstance.get("/user");
    console.log(response.data.data);
    return response.data.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "fetch data suceesfully";
    return rejectWithValue(errorMessage);
  }
});

const initialState: LoginAuthState = {
  user: null,
  users: [],
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
      })
      // load user from token
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.user = null;
        state.token = null;
      })

      // logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      // fetch data ..
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "fetch data failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
