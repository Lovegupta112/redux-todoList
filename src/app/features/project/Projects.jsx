import { useEffect } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Project from "./Project";
import ProjectModal from "./ProjectModal";
import { useErrorBoundary } from "react-error-boundary";
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProjectByFavorite,
} from "./projectSlice";
import Loader from "../../../components/common/Loader";

const Projects = () => {
  const { loading, projects, error } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // for creating project ---------

  function createNewProject(name) {
    dispatch(createProject(name));
  }

  //for deleting project -------------

  function deleteSelectedProject(projectId) {
    dispatch(deleteProject(projectId));
  }

  //for doing favorite , unfavorite project ----------

  function favoriteProject(projectId, isFavorite) {
    dispatch(updateProjectByFavorite({ projectId, isFavorite }));
  }

  if (loading) {
    //show loader ---------
    return <Loader />;
  }
  // show error ----------
  if (error) {
    showBoundary(error);
  }

  return (
    <Stack sx={{ padding: "1rem" }} spacing={2}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography>Projects</Typography>
        <ProjectModal createNewProject={createNewProject} />
      </Stack>
      <Stack
        className="projects-section"
        sx={{ height: "300px", overflowY: "auto" }}
        spacing={2}
      >
        {projects.length > 0 ? (
          projects.map((project) => {
            return (
              <Project
                key={project.id}
                project={project}
                deleteProject={deleteSelectedProject}
                favoriteProject={favoriteProject}
              />
            );
          })
        ) : (
          <h2>No Project</h2>
        )}
      </Stack>
    </Stack>
  );
};

export default Projects;
