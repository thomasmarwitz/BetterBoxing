import { configureStore } from '@reduxjs/toolkit';
import packagingReducer from './packagingSlice/packagingSlice';
import apiReducer from './apiSlice/apiSlice';

export default configureStore({
    reducer: {
        packaging: packagingReducer,
        api: apiReducer,
    }
})