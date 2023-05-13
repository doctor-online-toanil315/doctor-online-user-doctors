import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  AppointmentAPI,
  AuthAPI,
  DoctorAPI,
  NotificationAPI,
} from "../services";

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [DoctorAPI.reducerPath]: DoctorAPI.reducer,
  [AppointmentAPI.reducerPath]: AppointmentAPI.reducer,
  [NotificationAPI.reducerPath]: NotificationAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(AuthAPI.middleware)
      .concat(DoctorAPI.middleware)
      .concat(AppointmentAPI.middleware)
      .concat(NotificationAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
