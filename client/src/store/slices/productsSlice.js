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

        return product;
    } catch (err) {
        return rejectWithValue(err);
    }
})

const initialState = {
    products: [],
    selected: null,
    loadingProducts: false,
    loadingSelected: false,
    error: null,
    lastFetched: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts(state) {
            state.products = [];
        },
        clearSelectedProduct(state) {
            state.selected = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loadingProducts = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loadingProducts = false;
                state.error = action.payload.message;
            })
            .addCase(getProductById.pending, (state) => {
                state.loadingSelected = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loadingSelected = false;
                state.selected = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loadingSelected = false;
                state.error = action.payload.message;
            })
    }
})

export const { clearProducts, clearSelectedProduct } = productsSlice.actions;

export default productsSlice;