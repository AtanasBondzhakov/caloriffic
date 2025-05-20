import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            const err = await response.json();

            return rejectWithValue(err || 'Login Failed!')
        }

        return response.json();
    } catch (err) {
        return rejectWithValue(err || 'Login Failed!');
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            const err = await response.json();

            return rejectWithValue(err || 'Register Failed!')
        }

        return response.json();
    } catch (err) {
        return rejectWithValue(err || 'Register Failed!');
    }
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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
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
                state.user = action.payload;
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