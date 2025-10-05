import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosIntance";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface SearchState {
  query: string;
  results: User[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

// Async thunk for fetching search results
export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query: string, thunkAPI) => {
    if (!query.trim()) return [];
    try {
      const response = await axiosInstance.get(`/user/search`, {
        params: { query },
      });
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
