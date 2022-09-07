import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import ticketReducer from '../features/ticketDetailSlice';

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
