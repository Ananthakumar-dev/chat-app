import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, Message } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
  : "http://localhost/api";

interface ChatState {
  contacts: User[];
  chatPartners: User[];
  activeUser: User | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  contacts: [],
  chatPartners: [],
  activeUser: null,
  messages: [],
  loading: false,
  error: null,
};

export const getContacts = createAsyncThunk(
  "chat/getContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/messages/contacts`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch contacts");
      }

      return data.data.contacts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getChatPartners = createAsyncThunk(
  "chat/getChatPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/messages/chat-partners`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.data.chatPartners;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/messages/${userId}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.data.all_messages;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { to, message }: { to: number; message: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_URL}/chat/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to send message");
      }

      return data.data; // backend response
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to send message");
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User | null>) => {
      state.activeUser = action.payload;
      state.messages = [];
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers(builder) {
    builder.addCase(getContacts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getContacts.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.contacts = action.payload;
      },
    );

    builder.addCase(
      getContacts.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    builder.addCase(
      getChatPartners.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.chatPartners = action.payload;
      },
    );

    builder.addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      },
    );

    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sendMessage.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(
      sendMessage.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export const { setActiveUser, clearMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
