// reducers/courseListReducer.js
const initialState = {
  currentCourse: "",
};

const courseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_COURSE":
      return { ...state, currentCourse: action.payload };
    default:
      return state;
  }
};

export default courseListReducer;
