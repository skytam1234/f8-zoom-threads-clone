import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { postSlice } from "@/features/posts/postSlice";

const persistConfig = {
    key: "root",
    storage,
};
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    post: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const persistor = persistStore(store);
export const reduxStore = { store, persistor };
