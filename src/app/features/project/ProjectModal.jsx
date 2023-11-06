import {useState} from 'react';
import {Dialog,DialogActions,DialogContent,DialogTitle,Box,Button,
TextField,IconButton} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

const ProjectPopup = ({createNewProject}) => {

    const [name,setName]=useState('');
    const [open, setOpen] = useState(false);

    const handleClose=()=>{
        setOpen(false);
    }
    const handleCreate=()=>{
      if(name){
        createNewProject(name);
      }
        setOpen(false);
        setName('');
    }
  return (
    <Box className='project-popup'>
        <Dialog open={open} onClose={handleClose} fullWidth  sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "80%",
          maxWidth: "400px",   
        },
      },
    }}>
            <DialogTitle>New Project</DialogTitle>
            <DialogContent sx={{margin:'0.3rem'}}>
            <TextField label='Project Name' variant='standard' margin="dense" autoFocus value={name} onChange={(e)=>setName(e.target.value)}fullWidth />
            </DialogContent>
            <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={handleCreate}>Add</Button>
            </DialogActions>
        </Dialog>
      <IconButton  onClick={() => setOpen(true)} >
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ProjectPopup;