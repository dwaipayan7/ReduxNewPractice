
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../slice/CounterSlice';
import authSlice from '../slice/AuthSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
