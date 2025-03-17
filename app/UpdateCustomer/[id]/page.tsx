'use client';

import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { ButtonStyle, textfield } from '../../styles/page.style'
import { useParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/Redux/store';
import { getCustomerbyId, updateCustomerbyId } from '@/app/Redux/Customers/thunk';
import { updateCustomerAPI } from '@/app/Services/api-services';

const labelData = [
  { key: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  { key: 'age', label: 'Age', placeholder: 'Enter Your Age' },
  { key: 'gender', label: 'Gender', placeholder: 'Enter Your Gender' },
  { key: 'mobile', label: 'Mobile', placeholder: 'Enter Your Mobile' },
  { key: 'gmail', label: 'G-Mail', placeholder: 'Enter Your Mail' },
];

export default function UpdateCustomer()  {
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const data = useAppSelector((state) => state.customer);
  const customerbyId = data.customer;
  console.log('customerbyId',customerbyId);

  const [ newCustomer, setNewCustomer ] = useState<{name: string, age: number, gender: string, mobile: number, gmail: string}>({ name: '', age: 0, gender: '', mobile: 0, gmail: ''});
  
  const params = useParams();
  const customerId = params?.id; 

  const handleChange = (key: string, value: string) => {
    setNewCustomer((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (id: any) => {
    try {
      const data = {
        name: newCustomer.name,
        age: newCustomer.age,
        gender: newCustomer.gender,
        mobile: newCustomer.mobile,
        gmail: newCustomer.gmail 
      };

      await dispatch(updateCustomerbyId({id, data}));
      setNewCustomer({ name: '', age: 0, gender: '', mobile: 0, gmail: ''});
      router.push('/')
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    }
  }

  useEffect(() => {
    dispatch(getCustomerbyId(customerId as string));
  }, [customerId]); 

  useEffect(() => {
    if(customerbyId){
      setNewCustomer({ name: customerbyId.name, age: customerbyId.age, gender: customerbyId.gender, mobile: customerbyId.mobile, gmail: customerbyId.gmail})
    }
  }, [customerbyId]);
    
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',height:'90vh'}}>
      <Box sx={{display:'flex', flexDirection:'column',p:'20px',justifyContent:'center', gap:'20px', width:'400px', bgcolor:"#FFCFCF", borderRadius:'10px'}}>
          <Typography variant='h4' sx={{padding:'10px', textAlign:'center'}}>Update Customer</Typography>
          {labelData.map((item, index)=> (
            <Box key={index} style={{display:'flex', gap: item.label === "Age" ? "40px" :"20px", justifyContent:'space-around'}}>
              <Typography variant='h6'>{item.label} :</Typography>
              <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                {item.label === 'Gender' ? 
                  <FormControl>
                    <RadioGroup value={newCustomer[item.key as keyof typeof newCustomer]} onChange={(e) => handleChange(item.key, e.target.value)}>
                      <Box sx={{display:'flex', mr:"40px"}}>
                      <FormControlLabel value='Male' control={<Radio />} label='Male' />
                      <FormControlLabel value='Female' control={<Radio />} label='Female' />
                      </Box>
                    </RadioGroup>
                  </FormControl>
                :
                <TextField sx={textfield} placeholder={item.placeholder} value={newCustomer[item.key as keyof typeof newCustomer]} onChange={(e) => handleChange(item.key, e.target.value)} />
                }
              </Box>
            </Box>
            ))
          }
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button sx={{...ButtonStyle, bgcolor:'green', width:'fit-content'}} onClick={() => {handleUpdate(customerId)}}>Update</Button>
          </Box>
      </Box>
    </Box>
  )
}
