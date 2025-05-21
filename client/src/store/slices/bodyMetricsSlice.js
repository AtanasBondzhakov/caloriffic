import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calculations: {}
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
    }
})

export const { saveCalculation, resetBodyMetrics } = bodyMetricsSlice.actions;

export default bodyMetricsSlice;