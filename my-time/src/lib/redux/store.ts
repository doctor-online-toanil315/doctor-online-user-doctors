import { ConfigAPI } from './../services/MyTimeApp/ConfigAPI';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StatesAPI, UserAPI, OnSiteAPI } from '../services/AccountApp';
import { StoreAPI } from '../services/FileApp';
import {
  OTAPI,
  MyTimeAPI,
  OutsideAPI,
  ExportAPI,
  OperationAPI,
  LeaveAPI,
  DetailModalAPI,
  WorkingHoursAPI,
  WFHAPI,
  PartialDayAPI,
  StateByProcessAPI,
  WorkFromHomeAPI,
  WorkingOnsitesAPI,
  WorkingAfterHourssAPI,
  UpdateTimeSheetsAPI,
  MyRequestAPI,
} from '../services/MyTimeApp';

const rootReducer = combineReducers({
  [UserAPI.reducerPath]: UserAPI.reducer,
  [LeaveAPI.reducerPath]: LeaveAPI.reducer,
  [StoreAPI.reducerPath]: StoreAPI.reducer,
  [StateByProcessAPI.reducerPath]: StateByProcessAPI.reducer,
  [PartialDayAPI.reducerPath]: PartialDayAPI.reducer,
  [OTAPI.reducerPath]: OTAPI.reducer,
  [OnSiteAPI.reducerPath]: OnSiteAPI.reducer,
  [OutsideAPI.reducerPath]: OutsideAPI.reducer,
  [WFHAPI.reducerPath]: WFHAPI.reducer,
  [MyTimeAPI.reducerPath]: MyTimeAPI.reducer,
  [StatesAPI.reducerPath]: StatesAPI.reducer,
  [StoreAPI.reducerPath]: StoreAPI.reducer,
  [LeaveAPI.reducerPath]: LeaveAPI.reducer,
  [DetailModalAPI.reducerPath]: DetailModalAPI.reducer,
  [ExportAPI.reducerPath]: ExportAPI.reducer,
  [OutsideAPI.reducerPath]: OutsideAPI.reducer,
  [OperationAPI.reducerPath]: OperationAPI.reducer,
  [WFHAPI.reducerPath]: WFHAPI.reducer,
  [MyRequestAPI.reducerPath]: MyRequestAPI.reducer,
  [WorkingHoursAPI.reducerPath]: WorkingHoursAPI.reducer,
  [WFHAPI.reducerPath]: WFHAPI.reducer,
  [WorkFromHomeAPI.reducerPath]: WorkFromHomeAPI.reducer,
  [WorkingOnsitesAPI.reducerPath]: WorkingOnsitesAPI.reducer,
  [WorkingAfterHourssAPI.reducerPath]: WorkingAfterHourssAPI.reducer,
  [UpdateTimeSheetsAPI.reducerPath]: UpdateTimeSheetsAPI.reducer,
  [ConfigAPI.reducerPath]: ConfigAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(UserAPI.middleware)
      .concat(LeaveAPI.middleware)
      .concat(OnSiteAPI.middleware)
      .concat(OTAPI.middleware)
      .concat(StoreAPI.middleware)
      .concat(StateByProcessAPI.middleware)
      .concat(OutsideAPI.middleware)
      .concat(WFHAPI.middleware)
      .concat(PartialDayAPI.middleware)
      .concat(MyTimeAPI.middleware)
      .concat(StoreAPI.middleware)
      .concat(DetailModalAPI.middleware)
      .concat(WFHAPI.middleware)
      .concat(WorkingHoursAPI.middleware)
      .concat(MyRequestAPI.middleware)
      .concat(WorkFromHomeAPI.middleware)
      .concat(WorkingOnsitesAPI.middleware)
      .concat(WorkingAfterHourssAPI.middleware)
      .concat(UpdateTimeSheetsAPI.middleware)
      .concat(ConfigAPI.middleware)
      .concat(StatesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
