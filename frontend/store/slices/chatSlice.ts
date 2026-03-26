import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, Message, UserWithLastMessage } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
  : "http://localhost/api";

interface ChatState {
  contacts: UserWithLastMessage[];
  chatPartners: UserWithLastMessage[];
  activeUser: User | null;
  messages: Message[];
  onlineUserIds: number[];
  socketConnected: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  contacts: [],
  chatPartners: [],
  activeUser: null,
  messages: [],
  onlineUserIds: [],
  socketConnected: false,
  loading: false,
  error: null,
};

const upsertUserLastMessage = (
  list: UserWithLastMessage[],
  user: User,
  message: Message,
) => {
  const existingIndex = list.findIndex((item) => item.id === user.id);
  const nextUser: UserWithLastMessage = {
    ...user,
    last_message: message,
  };

  if (existingIndex === -1) {
    list.unshift(nextUser);
    return;
  }

  list.splice(existingIndex, 1);
  list.unshift(nextUser);
};

const addMessageIfMissing = (messages: Message[], message: Message) => {
  const alreadyExists = messages.some((item) => item.id === message.id);

  if (!alreadyExists) {
    messages.push(message);
  }
};

const findKnownUser = (
  state: ChatState,
  partnerId: number,
): User | null => {
  const contact = state.contacts.find((item) => item.id === partnerId);
  if (contact) {
    return { id: contact.id, name: contact.name };
  }

  const chatPartner = state.chatPartners.find((item) => item.id === partnerId);
  if (chatPartner) {
    return { id: chatPartner.id, name: chatPartner.name };
  }

  if (state.activeUser?.id === partnerId) {
    return state.activeUser;
  }

  return null;
};

const syncIncomingMessage = (state: ChatState, message: Message) => {
  const partnerId = state.activeUser && state.activeUser.id === message.from
    ? message.from
    : state.activeUser && state.activeUser.id === message.to
      ? message.to
      : message.from;

  if (state.activeUser && (message.from === state.activeUser.id || message.to === state.activeUser.id)) {
    addMessageIfMissing(state.messages, message);
  }

  const knownUser =
    findKnownUser(state, message.from) ??
    findKnownUser(state, message.to) ??
    (state.activeUser
      ? {
          id: partnerId,
          name: state.activeUser.name,
        }
      : null);

  if (!knownUser) {
    return;
  }

  upsertUserLastMessage(state.contacts, knownUser, message);
  upsertUserLastMessage(state.chatPartners, knownUser, message);
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

      return data.data;
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

    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },

    setOnlineUsers: (state, action: PayloadAction<number[]>) => {
      state.onlineUserIds = action.payload;
    },

    receiveSocketMessage: (state, action: PayloadAction<Message>) => {
      syncIncomingMessage(state, action.payload);
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      addMessageIfMissing(state.messages, action.payload);
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
      (state, action: PayloadAction<UserWithLastMessage[]>) => {
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
      (
        state,
        action: PayloadAction<{ partners: UserWithLastMessage[]; }>,
      ) => {
        state.chatPartners = action.payload.partners;
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

    builder.addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      state.loading = false;
      syncIncomingMessage(state, action.payload);
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

export const {
  setActiveUser,
  setSocketConnected,
  setOnlineUsers,
  receiveSocketMessage,
  clearMessages,
  addMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
