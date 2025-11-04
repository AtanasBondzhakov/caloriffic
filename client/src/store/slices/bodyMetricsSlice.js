import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester";

export const saveCalculationToUser = createAsyncThunk('bodyMetrics/save-calculation-to-user', async (bodyMetrics, { rejectWithValue }) => {
    try {
        const result = await requester.put('/calculator/save-calculation-to-user', bodyMetrics);

        console.log(result);
        

        return result;
    } catch (err) {
        return rejectWithValue(err);
    }
});

const initialState = {
    calculations: {},
    loading: false,
    error: null
}

const bodyMetricsSlice = createSlice({
    name: 'bodyMetrics',
    initialState,
    reducers: {
        saveCalculation(state, action) {
            state.calculations = action.payload;
        },
        resetBodyMetrics() {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCalculationToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveCalculationToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.calculations = action.payload;
            })
            .addCase(saveCalculationToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export const { saveCalculation, resetBodyMetrics } = bodyMetricsSlice.actions;

export default bodyMetricsSlice;