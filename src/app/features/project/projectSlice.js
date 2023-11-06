import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiToken = import.meta.env.VITE_API_TOKEN;
const initialState = {
  loading: false,
  projects: [],
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const response = await axios.get(
        "https://api.todoist.com/rest/v2/projects",
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);



export const createProject = createAsyncThunk(
  "project/createProject",
  async (name) => {
    try {
      const response = await axios.post(
        "https://api.todoist.com/rest/v2/projects",
        { name },
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const deleteProject =createAsyncThunk('project/deleteProject',async (projectId)=>{
    try{
       await axios.delete(`https://api.todoist.com/rest/v2/projects/${projectId}`,
       {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
        },
      }
       );
       return projectId;
    }
    catch(error){
       throw error;
    }
})

export const updateProjectByFavorite=createAsyncThunk('project/updateProjectByFavorite',async({projectId,isFavorite})=>{
    try{
        const response=await axios.post(`https://api.todoist.com/rest/v2/projects/${projectId}?is_favorite=${isFavorite}`,null,{
            headers:{
                'Authorization': `Bearer ${apiToken}`,
            }
        }
        );
        return {projectId,isFavorite};

    }
    catch(error){
        throw error;
    }
})

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      }),
      builder.addCase(fetchProjects.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      }),
      builder.addCase(createProject.fulfilled,(state,action)=>{
        state.projects.push(action.payload);
      }),
      builder.addCase(createProject.rejected,(state,action)=>{
        state.error=action.error;
      }),
      builder.addCase(deleteProject.fulfilled,(state,action)=>{
        state.projects=state.projects.filter((project)=>project.id!==action.payload);
      }),
      builder.addCase(deleteProject.rejected,(state,action)=>{
        state.error=action.error;
      }),
      builder.addCase(updateProjectByFavorite.fulfilled,(state,action)=>{
         const {projectId,isFavorite}=action.payload;
        state.projects=state.projects.map((project)=>{
            if(project.id==projectId){
                project.is_favorite=isFavorite;
            }
            return project;
        })
      }),
      builder.addCase(updateProjectByFavorite.rejected,(state,action)=>{
         state.error=action.error;
      })
  }
});
export const {activeProject}=projectSlice.actions;
export default projectSlice.reducer;
