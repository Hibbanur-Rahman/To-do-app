import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';

const store=configureStore({
    reducer:{
        auth:authSlice,
        task:taskSlice,
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export default store;