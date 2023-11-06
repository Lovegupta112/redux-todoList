import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {useErrorBoundary} from 'react-error-boundary';

const ErrorHandlingUi = ({error}) => {

    const {resetBoundary} =useErrorBoundary();
  return (
    <Box className='error-handling' sx={{padding:'20vh 0',fontSize:'rem',textAlign:'center',color:'crimson',width:'fit-content',margin:'0 auto'}}>
         <Typography variant='h5'>
          {error.message}
        </Typography>
          <br /> 
          <Button variant='contained' onClick={resetBoundary} sx={{magin:'1rem'}}>
          Please try again later
          </Button>
    </Box>
  )
}

export default ErrorHandlingUi;