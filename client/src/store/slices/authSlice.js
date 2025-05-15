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
            console.log(err);
            
            return rejectWithValue(err || 'Login Failed!')
        }
    } catch (err) {
        return rejectWithValue(err || 'Login Failed!');
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
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
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
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
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { setUser, clearError } = authSlice.actions;

export default authSlice;