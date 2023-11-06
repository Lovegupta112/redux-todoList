import React from 'react';
import { Stack } from '@mui/material';

import Projects from '../../app/features/project/Projects';
import FavoriteProjects from '../../app/features/project/FavoriteProjects';

const index = () => {
 
  return (
    <>
    <Stack className='sidebar' sx={{minWidth:'25%',border:'1px solid grey'}} spacing={2}>
       <Projects />
       <FavoriteProjects />
    </Stack>
    </>
  )
}

export default index;