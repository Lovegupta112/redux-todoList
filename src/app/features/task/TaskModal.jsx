import {useState} from 'react';
import {Dialog,DialogActions,DialogContent,DialogTitle,Box,Button,
TextField,IconButton} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';

const TaskModal = ({updateSelectedTask,content}) => {

    const [name,setName]=useState(content);
    const [open, setOpen] = useState(false);

    const handleClose=()=>{
        setOpen(false);
    }
    const handleCreate=()=>{
      if(name){
        updateSelectedTask(name);
      }
        setOpen(false);
        setName('');
    }
  return (
    <Box className='task-modal'>
        <Dialog open={open} onClose={handleClose} fullWidth  sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "80%",
          maxWidth: "400px",   
        },
      },
    }}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent sx={{margin:'0.3rem'}}>
            <TextField label='Task Name' variant='standard' margin="dense" autoFocus value={name} onChange={(e)=>setName(e.target.value)}fullWidth />
            </DialogContent>
            <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={handleCreate}>Update</Button>
            </DialogActions>
        </Dialog>
      <IconButton  onClick={() => setOpen(true)} >
        <EditIcon />
      </IconButton>
    </Box>
  )
}

export default TaskModal;