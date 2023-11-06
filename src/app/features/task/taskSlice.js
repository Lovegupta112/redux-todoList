import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState = {
  loading: false,
  tasks: [],
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (projectId) => {
    try {
      const response = await axios.get(
        ` https://api.todoist.com/rest/v2/tasks?project_id=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const closeTask = createAsyncThunk("task/closeTask", async (taskId) => {
  try {
    console.log({ taskId });
    await axios.post(
      `https://api.todoist.com/rest/v2/tasks/${taskId}/close`,
      {},
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return taskId;
  } catch (error) {
    throw error.message;
  }
});

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ projectId, name }) => {
    try {
      const response = await axios.post(
        `https://api.todoist.com/rest/v2/tasks?project_id=${projectId}`,
        {
          content: name,
        },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("created new task: ", response.data);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const createSubTask = createAsyncThunk(
  "task/createSubTask",
  async ({ projectId, parentId, name }) => {
    try {
      const response = await axios.post(
        `https://api.todoist.com/rest/v2/tasks?project_id=${projectId}&parent_id=${parentId}`,
        {
          content: name,
        },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("created new Subtask: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      return taskId;
    } catch (error) {
      throw error.message;
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updatedName }) => {
    try {
      await axios.post(
        `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
          content: updatedName,
        },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      return { id, updatedName };
    } catch (error) {
      throw error.message;
    }
  }
);
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      }),
      builder.addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      }),
      builder.addCase(closeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }),
      builder.addCase(closeTask.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      }),
      builder.addCase(createTask.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(createSubTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      }),
      builder.addCase(createSubTask.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }),
      builder.addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error;
      }),
      builder.addCase(updateTask.fulfilled, (state, action) => {
        const { id, updatedName } = action.payload;

        state.tasks = state.tasks.map((task) => {
          if (task.id === id) {
            task.content = updatedName;
          }
          return task;
        });
      }),
      builder.addCase(updateTask.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default taskSlice.reducer;
