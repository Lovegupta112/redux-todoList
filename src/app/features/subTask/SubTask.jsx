import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Stack,
  Radio,
  IconButton,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskModal from "../task/TaskModal";

import {updateTask,closeTask,deleteTask} from '../task/taskSlice';

const SubTask = ({subtask}) => {

   const {id,content}=subtask;
    const dispatch=useDispatch();  

     //for updating task -----------
  function updateSelectedTask(updatedName) {
    dispatch(updateTask({ id, updatedName }));
  }

  //  for completing task ----------
  function handleChange(event) {
    const taskId = event.target.value;
    dispatch(closeTask(taskId));
  }

  // for deleting task ---------
  function handleClick() {
    dispatch(deleteTask(id));
  }


  return (
    <Stack
    direction="row"
    sx={{
      justifyContent: "space-between",
      backgroundColor: "var(--light-grey)",
      alignItems:'center',
      width:'90%',
      alignSelf:'flex-end'
    }}
    className="subtask"
  >
    <FormControl>

   <FormControlLabel value='subtask' control={  <Radio
       onChange={handleChange}
       value={id}
       name="radio-button"
    />}
       label={content}
    />
    </FormControl>
    <Stack direction='row'>
    {/* <SubTaskDialog task={task}/> */}
      <TaskModal updateSelectedTask={updateSelectedTask} content={content}/>
    <IconButton  onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
    </Stack>
  </Stack>
  )
}

export default SubTask