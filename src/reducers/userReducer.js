const initialState = {
  user: null, // This will hold the user data or null if not logged in
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
