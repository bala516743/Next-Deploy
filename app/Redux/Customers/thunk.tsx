import { createCustomersAPI, deleteCustomersAPI, getCustomerbyIdAPI, getCustomersAPI, updateCustomerAPI } from "@/app/Services/api-services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Customer } from "./slice";

// Fetch customers
export const getallCustomers = createAsyncThunk(
  'customers/getallCustomers', 
  async () => {
    const response = await getCustomersAPI();
    return response.data; 
  }
); 

// Create a Customer
export const createCustomer = createAsyncThunk(
  'customers/createCustomer', 
  async (data : any) => {
    const response = await createCustomersAPI(data);
    return response.data; 
  }
);

// Fetch customer by ID
export const getCustomerbyId = createAsyncThunk<Customer, string | number>(
  'customers/getCustomerbyId', 
  async (id) => {
    const response = await getCustomerbyIdAPI(id);
    return response.data; 
  }
); 

// Update customer by ID
export const updateCustomerbyId = createAsyncThunk(
  'customers/updateCustomerbyId', 
  async ({ id, data }: { id: any; data: any }) => {
    const response = await updateCustomerAPI(id, data);
    return response.data; 
  }
); 

// Delete a Customer by ID
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer', 
  async (id : any) => {
    const response = await deleteCustomersAPI(id);
    return response.data; 
  }
);