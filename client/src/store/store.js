import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import bodyMetricsSlice from './slices/bodyMetricsSlice.js';
import adminSlice from './slices/adminSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        bodyMetrics: bodyMetricsSlice.reducer,
        admin: adminSlice.reducer
    }
});

export default store;