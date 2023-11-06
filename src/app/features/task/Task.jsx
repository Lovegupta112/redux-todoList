import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Stack,
  Radio,
  IconButton,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskModal from "./TaskModal";

import { updateTask, closeTask, deleteTask } from "../task/taskSlice";
import SubTaskDialog from "../subTask/SubTaskDialog";
import SubTask from "../subTask/SubTask";

const Task = ({ task, totalTasks }) => {
  const { id, content } = task;
  const dispatch = useDispatch();

  const subTasks = totalTasks.get(id);

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
    <Stack className="Task">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          backgroundColor: "var(--light-grey)",
          alignItems: "center",
        }}
      >
        <FormControl>
          <FormControlLabel
            value="task"
            control={
              <Radio onChange={handleChange} value={id} name="radio-button" />
            }
            label={content}
          />
        </FormControl>

        <Stack direction="row" sx={{ flexGrow: 1 }}>
          <SubTaskDialog task={task} />
          <TaskModal
            updateSelectedTask={updateSelectedTask}
            content={content}
          />
          <IconButton onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* for subtask ------ */}
      {subTasks &&
        subTasks.map((subtask) => {
          return <SubTask subtask={subtask} key={subtask.id} />;
        })}
    </Stack>
  );
};

export default Task;
