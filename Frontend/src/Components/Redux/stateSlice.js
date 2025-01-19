import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:3000/api/v1/admin'; // Adjust this URL based on your backend
const API_URL = 'http://localhost:3000/api/v1/admin'; // Ensure this is correct


// Async Thunks
export const createState = createAsyncThunk('state/createState', async (stateData) => {
    const response = await axios.post(`${API_URL}/state/createState`, stateData);
    return response.data.data;
  });
  
  export const fetchStates = createAsyncThunk('state/fetchStates', async () => {
    const response = await axios.get(`${API_URL}/state/fetchStates`);
    return response.data.data;
  });
  
  export const updateState = createAsyncThunk('state/updateState', async ({ id, ...stateData }) => {
    const response = await axios.put(`${API_URL}/state/updateState/${id}`, stateData);
    return response.data.data;
  });
  
  export const deleteState = createAsyncThunk('state/deleteState', async (id) => {
    await axios.delete(`${API_URL}/state/deleteState/${id}`);
    return id;
  });
  

// Initial State
const initialState = {
  states: [],
  loading: false,
  error: null,
};

// Slice
const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.states.push(action.payload);
      })
      .addCase(updateState.fulfilled, (state, action) => {
        const index = state.states.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.states[index] = action.payload;
        }
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.states = state.states.filter((s) => s._id !== action.payload);
      });
  },
});

export default stateSlice.reducer; 