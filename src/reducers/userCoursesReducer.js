const initialState = {
  courses: [], // Create a 'courses' array to hold all courses
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_COURSE":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case "UPDATE_USER_COURSES":
      return {
        ...state,
        courses: action.payload,
      };
    case "REMOVE_COURSE":
      const courseToRemove = action.payload;
      return {
        ...state,
        courses: state.courses.filter((course) => course !== courseToRemove),
      };
    default:
      return state;
  }
};

export default coursesReducer;
