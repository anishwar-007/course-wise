import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../Components/CourseCard";

function DashboardContainer() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const courses = useSelector((state) => state.courses.courses);
  console.log(courses);
  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      <h2>Your Courses:</h2>
      <ul>
        {courses.map((course) => (
          <CourseCard course={course} removeCourseFlag={true} />
        ))}
      </ul>
    </div>
  );
}

export default DashboardContainer;
