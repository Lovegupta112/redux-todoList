import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './features/project/projectSlice';
import TaskReducer from './features/task/taskSlice';

const store=configureStore({
    reducer:{
      project:ProjectReducer,
      task:TaskReducer,
    }
})

export default store;