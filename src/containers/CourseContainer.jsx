// CourseDetails.js
import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import firebase from "../firebase";
import { addUserCourse, updateUserCourses } from "../actions/userActions";

const CourseContainer = () => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState();
  const courseList = useSelector((state) => state.courseList.courseList);
  const currentUser = useSelector((state) => state.currentUser.user);
  const { name } = useParams();

  useEffect(() => {
    const currentCourse = courseList.find(
      (course) => course.course_name === name
    );
    setCourse(currentCourse);
  }, []);

  const addToWishlist = () => {
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(currentUser.uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const userCourses = userData.courses || [];

          if (!userCourses.includes(course.course_name)) {
            dispatch(addUserCourse(course));
            const courses = userCourses
              .map((courseName) => {
                const matchingCourse = courseList.find(
                  (course) => course.course_name === courseName
                );
                if (matchingCourse) {
                  return matchingCourse;
                }
                return null;
              })
              .filter(Boolean);
            courses.push(course);
            dispatch(updateUserCourses(courses));

            userRef.update({
              courses: [...userCourses, course.course_name],
            });

            toast.success("Course added to wishlist");
          } else {
            console.log("Course already in wishlist");
            toast.info("Course already in wishlist");
          }
        } else {
          console.log("User document not found");
        }
      })
      .catch((error) => {
        console.error("Error checking and adding course to wishlist:", error);
      });
  };

  if (!course) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontFamily: "poppins",
        }}
      >
        Course Details
      </h2>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 mb-4 ">
            <img src={course.thumbnail} class="img-fluid" alt="" />
          </div>
          <div class="col-md-6 mb-4">
            <div class="p-4">
              <div class="mb-3">
                <a href="">
                  <span class="badge bg-info me-1">New</span>
                </a>
                <a href="">
                  <span class="badge bg-danger me-1">Bestseller</span>
                </a>
              </div>

              <p class="lead" style={{ fontSize: 30 }}>
                <span>₹{course.price}</span>
              </p>
              <div className="text-danger">
                {[...Array(course.rating)].map((star) => {
                  return (
                    <MDBIcon
                      fas
                      icon="star"
                      className="text-danger"
                      size="lg"
                    />
                  );
                })}
              </div>
              <strong>
                <p
                  style={{
                    marginTop: "1rem",
                    fontFamily: "open sans",
                    fontSize: 30,
                  }}
                >
                  {course.course_name}
                </p>
              </strong>
              <p style={{ fontSize: 20 }}>{course.description}</p>

              <p>
                <strong>Duration: </strong> {course.course_duration} weeks
              </p>
              <p>
                <strong>Schedule: </strong> {course.schedule}
              </p>
              <p>
                <strong>Location: </strong> {course.location}
              </p>
              <p>
                <strong>Pre-requisites: </strong>
                <ul>
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Syllabus: </strong>
                <ul>
                  {course.syllabus.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Instructor: </strong> {course.instructor_name}
              </p>
              <p>
                <strong>Enrollment Status: </strong> {course.enrollment_status}
              </p>
              <button class="btn btn-primary ms-1" onClick={addToWishlist}>
                Add to wishlist
                <MDBIcon className="ms-1" fas icon="book-open" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;
