import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Message, MESSAGE_STATUS } from "../../../types/messenger";
import axiosInstance from "../../../axios/axiosIntance";

// Fetch messages for a conversation
export const fetchMessages = createAsyncThunk<Message[], string | null>(
  "chat/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/${conversationId}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a message (e.g., content edit)
export const updateMessage = createAsyncThunk<
  Message,
  { messageId: string; content: string }
>("chat/updateMessage", async ({ messageId, content }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/chat/update/${messageId}`, {
      content,
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Delete a message
export const deleteMessage = createAsyncThunk<string, string>(
  "chat/deleteMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/chat/${messageId}`);
      return messageId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update message status (e.g., READ/DELIVERED)
export const updateMessageStatus = createAsyncThunk<
  Message,
  { messageId: string; status: MESSAGE_STATUS }
>(
  "chat/updateMessageStatus",
  async ({ messageId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/chat/status/${messageId}`, {
        status,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get last message of a conversation
export const getLastMessage = createAsyncThunk<Message, string>(
  "chat/getLastMessage",
  async (conversationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/chat/last/${conversationId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Slice state type
interface ChatState {
  messages: Message[];
  lastMessage: Message | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  lastMessage: null,
  loading: false,
  error: null,
};

// ✅ Slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update message
      .addCase(updateMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })

      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload
        );
      })

      // Update message status
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index].status = action.payload.status;
        }
      })

      // Get last message
      .addCase(getLastMessage.fulfilled, (state, action) => {
        state.lastMessage = action.payload;
      });
  },
});

// ✅ Exports
export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
