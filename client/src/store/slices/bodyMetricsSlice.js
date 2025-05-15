import { createSlice } from "@reduxjs/toolkit";

const bodyMetricsSlice = createSlice({
    name: 'bodyMetrics',
    initialState: {
        calculations: {}
    },
    reducers: {
        saveCalculation(state, action) {
            state.calculations = action.payload;
        }
    }
})

export const { saveCalculation } = bodyMetricsSlice.actions;

export default bodyMetricsSlice;