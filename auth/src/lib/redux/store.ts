import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { KeycloakAPI } from '../services/GatewayApp';

const rootReducer = combineReducers({
  [KeycloakAPI.reducerPath]: KeycloakAPI.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(KeycloakAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
