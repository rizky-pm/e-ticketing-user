import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isFetching: false,
  data: {},
  error: '',
};

export const postTicketForm = createAsyncThunk('ticket/post', (payload) => {
  return axios
    .post('http://localhost:3001/report', payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
});

const formTicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTicketForm.pending, (state) => {
      state.isFetching = true;
      state.data = {};
      state.error = '';
    });

    builder.addCase(postTicketForm.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.error = '';
    });

    builder.addCase(postTicketForm.rejected, (state, action) => {
      state.isFetching = false;
      state.data = {};
      state.error = action.payload.message;
    });
  },
});

export default formTicketSlice.reducer;
