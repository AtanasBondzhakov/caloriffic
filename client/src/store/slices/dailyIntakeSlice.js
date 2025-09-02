import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import requester from "../../api/requester.js";

export const addProductToDaily = createAsyncThunk('dailyIntake/addProductToDaily', async ({ productId, quantity }, { rejectedWithValue }) => {
    try {
        const result = await requester.post(`/products/add-product-to-daily/${productId}`, quantity);

        return result;
    } catch (err) {
        return rejectedWithValue(err);
    }
});

const initialState = {
    today: null,
    loading: false,
    error: null
};

const dailyIntakeSlice = createSlice({
    name: 'dailyIntake',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToDaily.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToDaily.fulfilled, (state, action) => {
                state.loading = false;
                state.today = action.payload;
            })
            .addCase(addProductToDaily.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export default dailyIntakeSlice;