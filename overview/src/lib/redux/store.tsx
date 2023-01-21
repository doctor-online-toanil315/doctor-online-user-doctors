import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MyTimeAPI } from '../services/MyTimeApp';
import { OverviewEveryoneAPI } from '../services';
import { OverviewAPI, EmployeeAPI, StreetMapAPI } from '../services';

const rootReducer = combineReducers({
  [MyTimeAPI.reducerPath]: MyTimeAPI.reducer,
  [OverviewAPI.reducerPath]: OverviewAPI.reducer,
  [StreetMapAPI.reducerPath]: StreetMapAPI.reducer,
  [EmployeeAPI.reducerPath]: EmployeeAPI.reducer,
  [OverviewEveryoneAPI.reducerPath]: OverviewEveryoneAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(OverviewAPI.middleware)
      .concat(MyTimeAPI.middleware)
      .concat(StreetMapAPI.middleware)
      .concat(EmployeeAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
