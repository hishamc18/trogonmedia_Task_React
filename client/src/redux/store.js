import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "../redux/slices/subjectSlice";

const store = configureStore({
  reducer: {
    subjects: subjectsReducer, 
  },
});

export default store;
