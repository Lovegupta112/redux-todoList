import {AppBar, IconButton, Toolbar,Stack,Button,Typography} from '@mui/material'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const index = () => {


  return (
    <AppBar position='static' sx={{backgroundColor:'var(--light-red)'}}>
        <Toolbar >
          <Typography sx={{marginInline:'0.5rem',fontWeight:'800',flexGrow:1,cursor:'pointer'}}variant='h6' component='div'>
             TodoList
          </Typography>
          <Stack direction='row' >
             <IconButton size='large' edge='end' color='inherit' aria-label='account-logo'>
                <AccountCircleIcon />
             </IconButton >
             {/* <Button color='inherit'>{user}</Button> */}
          </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default index;