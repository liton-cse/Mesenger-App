// store/messagesSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosIntance";

interface Message {
  content: string;
  timestamp: string;
  type: "text" | "audio" | "video" | "image";
}

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  conversationId: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
  conversationId: null,
};

interface SendMessagePayload extends Partial<Message> {
  receiverId: string;
}
export const getConversationId = createAsyncThunk(
  "messages/getConversationId",
  async (payload: string) => {
    const convResponse = await axiosInstance.post("/chat/conversation", {
      receiverId: payload,
    });
    return convResponse.data.data._id;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (payload: SendMessagePayload, { getState }) => {
    const state = getState() as { messages: MessagesState };
    let conversationId = state.messages.conversationId;
    // 1️⃣ Create conversation if it doesn't exist for this receiver
    if (!conversationId) {
      const convResponse = await axiosInstance.post("/chat/conversation", {
        receiverId: payload.receiverId,
      });
      conversationId = convResponse.data.data._id;
    }

    const payloadWithConversationId = {
      ...payload,
      conversationId,
    };

    // 2️⃣ Send the message
    const messageResponse = await axiosInstance.post(
      "/chat",
      payloadWithConversationId
    );

    return {
      message: messageResponse.data.data,
      receiverId: payload.receiverId,
      conversationId,
    };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.message);
        state.conversationId = action.payload.conversationId;
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message || "Failed to send message";
        state.loading = false;
      })

      // get coversationId....

      .addCase(getConversationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversationId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.conversationId = action.payload;
        state.loading = false;
      })
      .addCase(getConversationId.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to collect conversationId";
        state.loading = false;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
