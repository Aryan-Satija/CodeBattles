import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice.js';
import profileReducer from '../slices/profileSlice.js'
import courseReducer from '../slices/courseSlice.js'
import viewCourseSlice from "../slices/viewCourseSlice.js";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        profile: profileReducer,
        course: courseReducer,
        viewCourse: viewCourseSlice
    }
});
