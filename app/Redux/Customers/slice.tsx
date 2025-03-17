import { createSlice } from "@reduxjs/toolkit";
import { createCustomer, deleteCustomer, getallCustomers, getCustomerbyId, updateCustomerbyId } from "./thunk";

export interface Customer {
  _id: string; 
  name: string;
  age: number;
  gender: string;
  mobile: number;
  gmail: string;
}

interface InitialState {
  customer: Customer | null; 
  customers: Customer[]; 
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  customer: null,
  customers: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all customers
      .addCase(getallCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(getallCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch customers';
      })
      // Create a Customer
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create customers';
      })
      // Get Customer by Id
      .addCase(getCustomerbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerbyId.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;
      })
      .addCase(getCustomerbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete Customer';
      })
      
      // Update Customer by Id
      .addCase(updateCustomerbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerbyId.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;
      })
      .addCase(updateCustomerbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete Customer';
      })

      // Delete Customer by Id
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete Customer';
      })
  },
});

export default customerSlice.reducer;