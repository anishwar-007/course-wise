// reducers/index.js
import { combineReducers } from "redux";
import courseListReducer from "./courseListReducer";
import currentCourseReducer from "./currentCourseReducer";
import userReducer from "./userReducer";
import coursesReducer from "./userCoursesReducer";

const rootReducer = combineReducers({
  courseList: courseListReducer,
  currentCourse: currentCourseReducer,
  currentUser: userReducer,
  courses: coursesReducer,
});

export default rootReducer;
