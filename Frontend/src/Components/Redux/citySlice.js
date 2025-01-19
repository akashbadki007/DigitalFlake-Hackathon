import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/admin';

// Async Thunks
export const createCity = createAsyncThunk('city/createCity', async (cityData) => {
  const response = await axios.post(`${API_URL}/city/createCity`, cityData);
  return response.data.data;
});

export const fetchCities = createAsyncThunk('city/fetchCities', async () => {
  const response = await axios.get(`${API_URL}/city/fetchCities`);
  return response.data.data;
});

export const updateCity = createAsyncThunk('city/updateCity', async ({ id, ...cityData }) => {
  const response = await axios.put(`${API_URL}/city/updateCity/${id}`, cityData);
  return response.data.data;
});

export const deleteCity = createAsyncThunk('city/deleteCity', async (id) => {
  await axios.delete(`${API_URL}/city/deleteCity/${id}`);
  return id;
});

// Initial State
const initialState = {
  cities: [],
  loading: false,
  error: null,
};

// Slice
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.cities.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.cities[index] = action.payload;
        }
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter((c) => c._id !== action.payload);
      });
  },
});

export default citySlice.reducer;
