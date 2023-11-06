import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { Box, Typography, Stack } from "@mui/material";
import AddItem from "../common/AddItem";
import Task from "../../app/features/task/Task";
import Loader from "../common/Loader";
import { fetchTasks, createTask } from "../../app/features/task/taskSlice";

const index = () => {
  const { id: currentProjectId } = useParams();
  const { projects } = useSelector((state) => state.project);
  const { loading, tasks, error } = useSelector((state) => state.task);
  const [projectInfo, setProjectInfo] = useState();

  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (currentProjectId) {
      dispatch(fetchTasks(currentProjectId));
      setProjectInfo(
        ...projects.filter((project) => project.id === currentProjectId)
      );
    }
  }, [currentProjectId, projects]);

  //grouping tasks based on their parent's IDs ----

  const totalTasks = tasks?.reduce((totalTasks, task) => {
    if (task.parent_id == null) {
      if (totalTasks.has("tasks")) {
        totalTasks.get("tasks").push(task);
      } else {
        totalTasks.set("tasks", []);
        totalTasks.get("tasks").push(task);
      }
    } else {
      if (totalTasks.has(task.parent_id)) {
        totalTasks.get(task.parent_id).push(task);
      } else {
        totalTasks.set(task.parent_id, []);
        totalTasks.get(task.parent_id).push(task);
      }
    }
    return totalTasks;
  }, new Map());

  // console.log({ totalTasks });

  //for creating new task -----------
  function createNewTask(name) {
    dispatch(createTask({ projectId: currentProjectId, name }));
  }

  // show loading -----
  if (loading) {
    return <Loader />;
  }

  // show error -----------
  if (error) {
    showBoundary(error);
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "1rem" }}>
      <Typography variant="h5" sx={{ margin: "1rem 0" }}>
        {projectInfo?.name}
      </Typography>
      <Stack>
        {totalTasks.get("tasks")?.map((task) => {
          return <Task key={task.id} task={task} totalTasks={totalTasks} />;
        })}
      </Stack>
      {projectInfo?.id && (
        <AddItem
          createItem={createNewTask}
          itemName="Task"
          btnText="Add Task"
        />
      )}
    </Box>
  );
};

export default index;
