import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isFetching: false,
  data: {},
  error: '',
};

export const fetchTicketDetail = createAsyncThunk(
  'ticket/fetch',
  async (id) => {
    return axios
      .get('http://localhost:3001/report/' + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
);

export const patchTicket = createAsyncThunk('ticket/patch', async (payload) => {
  return axios
    .patch('http://localhost:3001/report/' + payload.id, payload.data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
});

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTicketDetail.pending, (state) => {
      state.isFetching = true;
      state.data = {};
      state.error = '';
    });

    builder.addCase(fetchTicketDetail.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.error = '';
    });

    builder.addCase(fetchTicketDetail.rejected, (state, action) => {
      state.isFetching = false;
      state.data = {};
      state.error = action.payload.message;
    });

    // ------------------------------------------------------------------

    builder.addCase(patchTicket.pending, (state) => {
      state.isFetching = true;
      state.data = {};
      state.error = '';
    });

    builder.addCase(patchTicket.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.error = '';
    });

    builder.addCase(patchTicket.rejected, (state, action) => {
      state.isFetching = false;
      state.data = {};
      state.error = action.payload.message;
    });
  },
});

export default ticketSlice.reducer;
