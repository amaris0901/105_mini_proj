import React from 'react'
import { Box,Typography, Stack, Button } from '@mui/material'
import { useState } from 'react';
import Login from '../components/Login';
function Landingpage() {

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpen = () => setOpenLoginModal(true);

  return (
    <Box style={{background:'#DFDFF2'}}>
        <Stack 
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          position:"sticky",
          zIndex:10,
          padding: "10px 5%",
        }}
        >
          <Box sx={{flexGrow:1}}>
            <Typography sx={{
              fontFamily: 'Courgette',
              fontWeight: 300,
              fontSize: 30,
              color: '#474773',
              
            }}>
              Memoir
            </Typography>
          </Box>
          <Box sx={{
            fontFamily:'Work Sans',
            backgroundColor: '#ffffff',
            color:'#000000',
            padding: '6px 18px',
            borderRadius: 12,
            border: '1px solid #ffffff',
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: "#474773",
                border: '#474773',
              },
            }}  onClick={handleOpen} >
              Login
          </Box>
          <Login handleOpen={handleOpen} open={openLoginModal} setOpen={setOpenLoginModal}/>
        </Stack>
        <Box style={{padding: "5% 17% 0 20%"}}>
              <Box sx={{background:'#DFDFF2'}}>
                <img src='../assets/Memoir.png' style={{borderRadius:'50%',width:'45%',margin:"5% 0 0 25%"}}></img>
              </Box>
              <Box style={{background:'#DFDFF2',padding:"7% 20%"}}>
              <Typography sx={{fontFamily:'Work Sans',fontSize:'1.7rem',textAlign:'center'}}>
                  Record your thoughts, reflect on your life, and unlock your pontential!
                </Typography>
              </Box>
        </Box>
        </Box>
  )
}

export default Landingpage