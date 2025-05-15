import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import bodyMetricsSlice from './slices/bodyMetricsSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        bodyMetrics: bodyMetricsSlice.reducer
    }
});

export default store;