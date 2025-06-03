import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester.js";

export const getAllUsers = createAsyncThunk('admin/manage-users', async (_, { rejectWithValue }) => {
    try {
        const users = await requester.get('/admin/manage-users');

        return users;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const deleteUser = createAsyncThunk('admin/manage-users/delete', async (userId, { rejectWithValue }) => {
    try {
        await requester.del(`/admin/manage-users/delete/${userId}`);

        return userId;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const editUser = createAsyncThunk('admin/manage-users/edit', async (userData, { rejectWithValue }) => {
    try {
        const editedUser = await requester.put(`/admin/manage-users/edit/${userData._id}`, userData);

        return editedUser;
    } catch (err) {
        return rejectWithValue(err);
    }
});

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
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const deletedUser = action.payload;
                state.users = state.users.filter(user => user._id !== deletedUser);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                const editedUser = action.payload;
                state.users = state.users.map(user => {
                    user._id === editUser._id ? editedUser : user;
                });
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default adminSlice;