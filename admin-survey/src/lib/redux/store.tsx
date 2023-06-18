import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  AppointmentAPI,
  AuthAPI,
  DoctorAPI,
  LabTestAPI,
  MedicineAPI,
  NotificationAPI,
  SurveyAPI,
} from "../services";

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [DoctorAPI.reducerPath]: DoctorAPI.reducer,
  [AppointmentAPI.reducerPath]: AppointmentAPI.reducer,
  [NotificationAPI.reducerPath]: NotificationAPI.reducer,
  [MedicineAPI.reducerPath]: MedicineAPI.reducer,
  [LabTestAPI.reducerPath]: LabTestAPI.reducer,
  [SurveyAPI.reducerPath]: SurveyAPI.reducer,
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
      .concat(LabTestAPI.middleware)
      .concat(SurveyAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
