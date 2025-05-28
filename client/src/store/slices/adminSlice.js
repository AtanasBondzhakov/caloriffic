import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester.js";

export const getAllUsers = createAsyncThunk('admin/manage-users', async (_, { rejectWithValue }) => {
    try {
        const users = await requester.get('/admin/manage-users');
        
        return users;
    } catch (err) {
        return rejectWithValue(err);
    }
})

const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    updateStatus: 'idle',
    updateError: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default adminSlice;