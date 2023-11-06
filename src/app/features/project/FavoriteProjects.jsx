import { Typography, Stack } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Project from "./Project";
import { updateProjectByFavorite , deleteProject,activeProject} from "./projectSlice";


const FavoriteProjects = () => {
  const { projects } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const favoriteProjects = projects.filter(
    (project) => project.is_favorite === true
  );

  //doing favorite , unfavorite project ----------
  function favoriteProject(projectId, isFavorite) {
    dispatch(updateProjectByFavorite({ projectId, isFavorite }));
  }

  //for deleting project -------------
  function deleteSelectedProject(projectId) {
    dispatch(deleteProject(projectId));
  }


    // for tracking current Project ----
  function currentProject(project){
    dispatch(activeProject(project));
  }

 
  return (
    <Stack sx={{ padding: "1rem" }} spacing={2}>
      <Typography>Favorite Projects:</Typography>
      <Stack
        className="favorite-projects-section"
        sx={{ height: "150px", overflowY: "auto" }}
        spacing={2}
      >
        {favoriteProjects.length > 0 ? (
          favoriteProjects.map((project) => (
            <Project
              key={project.id}
              project={project}
              favoriteProject={favoriteProject}
              deleteProject={deleteSelectedProject}
              currentProject={currentProject}
            />
          ))
        ) : (
          <Typography color='error'> No favorite Project</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default FavoriteProjects;
