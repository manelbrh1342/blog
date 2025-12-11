import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: any | null;
}

// Helper to get token from localStorage safely
const getInitialToken = () => {
    try {
        return localStorage.getItem('token');
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    token: getInitialToken(),
    isAuthenticated: !!getInitialToken(),
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        checkTokenExpiry: (state) => {
            // This is a basic check. Real JWT expiry check would require decoding the token.
            // For now, if token exists, we assume valid unless API returns 401.
            // We can check if token matches the one in storage.
            const token = localStorage.getItem('token');
            if (!token) {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            }
        }
    },
});

export const { loginSuccess, logout, checkTokenExpiry } = authSlice.actions;
export default authSlice.reducer;
