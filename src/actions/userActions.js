export const login = (user) => {
  return {
    type: "LOG_IN",
    payload: user,
  };
};

export const logout = () => {
  return {
    type: "LOG_OUT",
  };
};

export const addUserCourse = (course) => ({
  type: "ADD_USER_COURSE",
  payload: course,
});

export const updateUserCourses = (courses) => {
  console.log(courses);
  return {
    type: "UPDATE_USER_COURSES",
    payload: courses,
  };
};

export const removeCourse = (course) => ({
  type: "REMOVE_COURSE",
  payload: course,
});
