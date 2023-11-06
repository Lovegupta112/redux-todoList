import React from 'react';
import {useSelector } from 'react-redux';
import {Stack, Typography} from '@mui/material';
import notFound from '../../../assets/notFound.jpg';
const NoCurrentProjectUi = () => {

  const {loading}=useSelector((state)=>state.project);
  
  if(loading){
    return ;
  }
  return (
    <Stack sx={{flexGrow:1,textAlign:'center',padding:'2rem 0',alignItems:'center'}}>
      <Typography variant='h4'>No Project Selected !</Typography>
      <img src={notFound} alt='not-found-pic' />
    </Stack>
  )
}

export default NoCurrentProjectUi;