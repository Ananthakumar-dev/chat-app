import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initalState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Signup failed");
      }
      return data.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Signup failed");
    }
  },
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

// Async thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || "Logout failed");
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  },
);

// Async thunk for checking auth status (load user from token)
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to load user");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load user");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      },
    );

    builder.addCase(signup.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      },
    );
    
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Load User
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
    );
    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
