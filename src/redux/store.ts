import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import modalReducer from "./features/modalSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { cafeApi } from './services/cafeApi'
import { userApi } from "./services/userApi";
import { menuApi } from "./services/menuApi";


export const store = configureStore({
    reducer: {
        counterReducer,
        modalReducer,
        [userApi.reducerPath]: userApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [cafeApi.reducerPath]: cafeApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([userApi.middleware]).concat([menuApi.middleware]).concat([cafeApi.middleware])
    ,
});
setupListeners(store.dispatch); // refetchOnFocus Active

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;