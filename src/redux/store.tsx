import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

type StoreType = typeof store;

export type ApplicationState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
export type GetState = () => ApplicationState;
export type RootReducerType = typeof rootReducer; // Тип корневого редюсера
export type RootState = ReturnType<RootReducerType>; // Тип состояния всего приложения

export default store;
