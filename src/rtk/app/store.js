import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import ticketReducer from '../features/ticketDetailSlice';
import formTicketReducer from '../features/formTicketSlice';

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    formTicket: formTicketReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
