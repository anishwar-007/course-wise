// actions/courseListActions.js
export const setCurrentCourse = (currentCourse) => {
  return {
    type: "SET_CURRENT_COURSE",
    payload: currentCourse,
  };
};
