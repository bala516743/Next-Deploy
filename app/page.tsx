'use client';

import { Table, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Button } from "@mui/material";
import { ButtonStyle } from "./styles/page.style";
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from "./Redux/store";
import { useEffect, useState } from "react";
import { deleteCustomer, getallCustomers } from "./Redux/Customers/thunk";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customer);
  console.log('customers',customers);
  const [ data,setData ] = useState([]);

  const handleAdd = () => {
    router.push('/AddCustomer')
  }

  const handleEdit = (id:any) => {
    router.push(`/UpdateCustomer/${id}`)

  }

  const handleDelete = async (id : any) => {
    await dispatch(deleteCustomer(id));
    await dispatch(getallCustomers());
  }

  useEffect (() => {
    dispatch(getallCustomers());
  },[]);

  return (
    <>
    <Box sx={{display:'flex', flexDirection:'column', textAlign:'center'}}>
      <Typography variant="h4" style={{padding:'30px 0px 30px 0px'}}>CUSTOMER LIST</Typography>
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <TableContainer sx={{ borderRadius: "10px", boxShadow:'none', width:'90%', border:'2px solid #D1D1D1' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#222831" }}>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>S.NO</TableCell>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>Name</TableCell>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>Age</TableCell>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>Gender</TableCell>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>Mobile</TableCell>
                <TableCell sx={{ borderRight:'2px solid #D1D1D1', textAlign:'center',color:"#fff"}}>Gmail</TableCell>
                <TableCell sx={{ textAlign:'center',color:"#fff"}}>Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length > 0 ? (
                customers.map((item, index) => (
                  <TableRow key={index} sx={{bgcolor:'#D8D9DA'}}>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{index + 1}</TableCell>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{item.name}</TableCell>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{item.age}</TableCell>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{item.gender}</TableCell>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{item.mobile}</TableCell>
                    <TableCell sx={{ borderRight: '2px solid #e0e0e0', textAlign: 'center' }}>{item.gmail}</TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap:2 }}>
                        <Button sx={{ ...ButtonStyle, bgcolor: '#0B0B0D', width: 'fit-content', padding: '4px' }} onClick={() => handleEdit(item._id)}>Edit</Button>
                        <Button sx={{ ...ButtonStyle,color:"black", bgcolor: '#929AAB', width: 'fit-content', padding: '4px' }} onClick={() => handleDelete(item._id)}>Delete</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', padding: '16px', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                    No Customers Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    </>    
  );
}
