import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI } from "../services/Auth";

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
