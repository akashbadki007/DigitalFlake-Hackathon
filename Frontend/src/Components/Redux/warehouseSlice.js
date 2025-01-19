import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/admin";

// Async Thunks
export const fetchWarehouses = createAsyncThunk("warehouse/fetchWarehouses", async () => {
  const response = await axios.get(`${API_URL}/warehouse/fetchWarehouses`);
  return response.data.data;
});

export const createWarehouse = createAsyncThunk("warehouse/createWarehouse", async (warehouseData) => {
  const response = await axios.post(`${API_URL}/warehouse/createWarehouse`, warehouseData);
  return response.data.data;
});

export const updateWarehouse = createAsyncThunk("warehouse/updateWarehouse", async ({ id, ...warehouseData }) => {
  const response = await axios.put(`${API_URL}/warehouse/updateWarehouse/${id}`, warehouseData);
  return response.data.data;
});

export const deleteWarehouse = createAsyncThunk("warehouse/deleteWarehouse", async (id) => {
  await axios.delete(`${API_URL}/warehouse/deleteWarehouse/${id}`);
  return id;
});

// Initial State
const initialState = {
  warehouses: [],
  loading: false,
  error: null,
};

// Slice
const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.warehouses.push(action.payload);
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        const index = state.warehouses.findIndex((w) => w._id === action.payload._id);
        if (index !== -1) {
          state.warehouses[index] = action.payload;
        }
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.warehouses = state.warehouses.filter((w) => w._id !== action.payload);
      });
  },
});

export default warehouseSlice.reducer;
