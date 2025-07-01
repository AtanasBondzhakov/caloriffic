import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester";

export const getProducts = createAsyncThunk('products', async (productName, { rejectWithValue }) => {
    try {
        const products = await requester.get(`/products?search=${productName}`);

        return products;
    } catch (err) {
        return rejectWithValue(err);
    }
})

export const getProductById = createAsyncThunk('products/product', async (productId, { rejectWithValue }) => {
    try {
        const product = await requester.get(`/products/${productId}`);
        console.log(productId);

        return product;
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
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default productsSlice;