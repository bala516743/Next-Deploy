'use client';

import React, { useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { ButtonStyle, textfield } from '../styles/page.style'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '../Redux/store';
import { createCustomer }  from '../Redux/Customers/thunk';

const data = [
  { key: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  { key: 'age', label: 'Age', placeholder: 'Enter Your Age' },
  { key: 'gender', label: 'Gender', placeholder: 'Enter Your Gender' },
  { key: 'mobile', label: 'Mobile', placeholder: 'Enter Your Mobile' },
  { key: 'gmail', label: 'E-mail', placeholder: 'Enter Your Mail' },
];

export default function AddCustomer()  {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ newCustomer, setNewCustomer ] = useState({ name: '', age: '', gender: '', mobile: '', gmail: ''});
   
  const handleChange = (key: string, value: string) => {
    setNewCustomer((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
  
    const formattedCustomer = {
      ...newCustomer,
      age: Number(newCustomer.age),
      mobile: Number(newCustomer.mobile),
    };
  
    dispatch(createCustomer(formattedCustomer));
    setNewCustomer({ name: '', age: '', gender: '', mobile: '', gmail: '' });
  };
  
  
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',minHeight:'80vh', color:'black'}}>
      <Box sx={{display:'flex', flexDirection:'column',p:'20px',justifyContent:'center', gap:'20px', bgcolor:"#E0E0E0", borderRadius:'10px'}}>
          <Typography variant='h5' sx={{padding:'10px', textAlign:'center', color:'black', fontWeight:600}}>Add Customer</Typography>
          {data.map((item, index)=> (
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
          ))}
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button sx={{...ButtonStyle, width:'fit-content', backgroundColor:'#0B0B0D'}} onClick={handleAdd}>Add</Button>
          </Box>
      </Box>
    </Box>
  )
}