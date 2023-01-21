import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { NotifyAPI } from '../services';

const rootReducer = combineReducers({
  [NotifyAPI.reducerPath]: NotifyAPI.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(NotifyAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
