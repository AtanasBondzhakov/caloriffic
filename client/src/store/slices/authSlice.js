import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import requester from '../../api/requester';

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const result = await requester.post('/auth/login', userData);

        return result;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const result = await requester.post('/auth/register', userData);

        return result;
    } catch (err) {
        return rejectWithValue(err);
    };
});

export const logoutUser = createAsyncThunk('auth/logout', async ({ navigate }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            const err = await response.json();

            return rejectWithValue(err || 'Logout Failed!');
        }

        navigate('/auth/login');
        return response.json();
    } catch (err) {
        return rejectWithValue(err || 'Logout Failed');
    }
});

export const checkAuth = createAsyncThunk('auth/check-auth', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/auth/check-auth', {
            credentials: 'include'
        });

        if (!response.ok) {
            const err = await response.json();

            return rejectWithValue(err);
        }

        return response.json();
    } catch (err) {
        return rejectWithValue(err);
    }
});

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = !!action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.error = action.payload?.message;
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
    }

});

export const { clearError } = authSlice.actions;

export default authSlice;