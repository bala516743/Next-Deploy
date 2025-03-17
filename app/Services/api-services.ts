import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

//Get all Customers
export const getCustomersAPI = () => {
    return axios.get('/api')
}

//Create a Customer
export const createCustomersAPI = (data : any) => {
    return axios.post('/api/createCustomer', data)
}

//Get customer by ID
export const getCustomerbyIdAPI = (id:any) => {
    return axios.get(`/api/updateCustomer/${id}`)
}

//Update customer
export const updateCustomerAPI = (id:any, data : any) => {
    return axios.put(`/api/updateCustomer/${id}`, data)
}

//Delete a Customer
export const deleteCustomersAPI = (id : any) => {
    return axios.delete(`/api/deleteCustomer/${id}`)
}