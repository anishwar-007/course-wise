// reducers/courseListReducer.js
const initialState = {
  courseList: [], // Initial state for your courseList
};

const courseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COURSE_LIST":
      return { ...state, courseList: action.payload };
    default:
      return state;
  }
};

export default courseListReducer;
