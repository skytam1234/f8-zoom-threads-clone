import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { postSlice } from "@/features/posts/postSlice";
import { themeSlice } from "@/features/theme/theme";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [postSlice.reducerPath, authSlice.reducerPath],
};
const authPersistConfig = {
    key: [authSlice.reducerPath],
    storage: storage,
    blacklist: ["fetching", "forgotPass"],
};
const rootReducer = combineReducers({
    [authSlice.reducerPath]: persistReducer(
        authPersistConfig,
        authSlice.reducer
    ),
    [postSlice.reducerPath]: postSlice.reducer,
    [themeSlice.reducerPath]: themeSlice.reducer,
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
