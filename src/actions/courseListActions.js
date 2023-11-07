// actions/courseListActions.js
export const setCourseList = (courseList) => {
  return {
    type: "SET_COURSE_LIST",
    payload: courseList,
  };
};
