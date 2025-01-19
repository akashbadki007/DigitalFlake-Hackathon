import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './stateSlice';
import authReducer from './authSlice';
import cityReducer from './citySlice';
import wareHouseReducer from './warehouseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    state: stateReducer,
    city: cityReducer,
    warehouse: wareHouseReducer,
  },
});

export default store;
