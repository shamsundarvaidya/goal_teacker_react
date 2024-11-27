import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
axios.defaults.withCredentials = true;

// Define types for User and AuthState
interface User {
    username: string;
    user_id: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

// Helper functions for localStorage
const loadState = (): AuthState => {
    try {
        const serializedState = localStorage.getItem("auth");
        if (!serializedState) return { isLoggedIn: false, user: null, loading: false, error: null };
        return JSON.parse(serializedState);
    } catch (error) {
        console.warn("Failed to load state from localStorage", error);
        return { isLoggedIn: false, user: null, loading: false, error: null };
    }
};

const saveState = (state: AuthState) => {
    try {
        localStorage.setItem("auth", JSON.stringify(state));
    } catch (error) {
        console.warn("Failed to save state to localStorage", error);
    }
};

const initialState: AuthState = loadState();

// Async action for login
export const login = createAsyncThunk<User, { username: string; password: string }, { rejectValue: string }>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>("http://localhost:8000/login", credentials); // Replace with actual login endpoint

            return response.data;
        } catch (error: any) {
            
            return rejectWithValue(error.response?.data.detail || "Login failed");
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            console.log("logged out");
            state.user = null;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
            saveState(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                console.log("login successfull")
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                saveState(state); // Save state to localStorage on login success
            })
            .addCase(login.rejected, (state, action) => {
                
                state.loading = false;
                state.error = action.payload || "Login failed";
                state.user = null;
                state.loading = false;
                state.isLoggedIn = false;
                saveState(state);
            });
    }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
