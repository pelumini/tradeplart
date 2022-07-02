import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi, ticketApi, tradesApi } from '../services';
import { counterPartyDataSlice } from './reducers/counterPartyDataSlice';
import { economicsDataSlice } from './reducers/economicsSlice';
import { selectedBondDataSlice } from './reducers/selectedBondDataSlice';
import { settlementDataSlice } from './reducers/settlementSlice';
import { ticketDefaultSlice } from './reducers/ticketDefaultSlice';

export const store = configureStore({
  reducer: {
    [tradesApi.reducerPath]: tradesApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    ticketDefaultState: ticketDefaultSlice.reducer,
    selectedBondDataState: selectedBondDataSlice.reducer,
    settlementState: settlementDataSlice.reducer,
    counterPartyState: counterPartyDataSlice.reducer,
    economicsState: economicsDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tradesApi.middleware,
      dashboardApi.middleware,
      ticketApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
