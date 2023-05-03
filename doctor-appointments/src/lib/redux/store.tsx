import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  AppointmentAPI,
  AuthAPI,
  DoctorAPI,
  LabTestAPI,
  MedicineAPI,
  NotificationAPI,
} from "../services";

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [DoctorAPI.reducerPath]: DoctorAPI.reducer,
  [AppointmentAPI.reducerPath]: AppointmentAPI.reducer,
  [NotificationAPI.reducerPath]: NotificationAPI.reducer,
  [MedicineAPI.reducerPath]: MedicineAPI.reducer,
  [LabTestAPI.reducerPath]: LabTestAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(AuthAPI.middleware)
      .concat(DoctorAPI.middleware)
      .concat(AppointmentAPI.middleware)
      .concat(NotificationAPI.middleware)
      .concat(MedicineAPI.middleware)
      .concat(LabTestAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
