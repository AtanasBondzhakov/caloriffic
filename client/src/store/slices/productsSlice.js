import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester";

export const getProducts = createAsyncThunk('products', async (productName, { rejectWithValue }) => {
    try {
        const products = await requester.get(`/products/${productName}`);
        
        return products;
    } catch (err) {
        return rejectWithValue(err);
    }
})

const initialState = {
    products: [],
    selected: null,
    loading: false,
    error: null,
    lastFetched: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                console.log("Pending");
                
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log("Fullfiled", action.payload);

                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default productsSlice;