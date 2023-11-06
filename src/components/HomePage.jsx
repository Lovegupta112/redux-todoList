import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import Sidebar from './Sidebar';

const HomePage = () => {
  return (
   <>
    <Stack direction='row' className='main'> 
    <Sidebar />
     <Outlet />
    </Stack>
   </>
  )
}

export default HomePage;