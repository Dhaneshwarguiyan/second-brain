import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import formReducer from '../slices/formData';
import triggerReducer from '../slices/dialogTriggers';
import idReducer from '../slices/contentId';

export const store = configureStore({
    reducer: {
        user:userReducer,
        form:formReducer,
        trigger:triggerReducer,
        id:idReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>