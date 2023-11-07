import React from "react";
import { setCurrentCourse } from "../actions/currentCourseActions";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../styles/CourseCard.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addUserCourse,
  updateUserCourses,
  removeCourse,
} from "../actions/userActions";
import "react-toastify/dist/ReactToastify.css";

function CourseCard({ course, removeCourseFlag }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser.user);
  const courseList = useSelector((state) => state.courseList.courseList);

  const handleCourseClick = () => {
    dispatch(setCurrentCourse(course.course_name));
    history.push(`/course/${course.course_name}`);
    console.log(course.course_name);
  };

  const removeFromWishlist = () => {
    dispatch(removeCourse(course));
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(currentUser.uid);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const updatedCourses = userData.courses.filter(
            (c) => c !== course.course_name
          );

          userRef.update({ courses: updatedCourses });
        } else {
          console.log("User document not found");
        }
      })
      .catch((error) => {
        console.error("Error removing course from wishlist:", error);
      });
  };

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

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <MDBCardImage
                      src={course.thumbnail}
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{course.course_name}</h5>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <div className="text-danger mb-1 me-2">
                      {[...Array(course.rating)].map((star) => {
                        return (
                          <MDBIcon
                            fas
                            icon="star"
                            className="text-danger"
                            size="sm"
                          />
                        );
                      })}
                    </div>
                    <span>{course.reviews}</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>
                      {" "}
                      <b> Instructor </b>
                    </span>
                    <span className="text-primary"> • </span>
                    <span>{course.instructor_name}</span>
                    <br />
                  </div>
                  <div className="mb-2 text-muted small">
                    <span>
                      {" "}
                      <b> Duration </b>
                    </span>
                    <span className="text-primary"> • </span>
                    <span>{course.course_duration} weeks</span>
                    <br />
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                    {course.description}
                  </p>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className=" mb-2">
                    <h4 className="mb-1 me-1">₹{course.price}</h4>
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn
                      color="primary"
                      size="sm"
                      onClick={handleCourseClick}
                    >
                      Details
                    </MDBBtn>
                    {removeCourseFlag ? (
                      <MDBBtn
                        outline
                        color="primary"
                        size="sm"
                        className="mt-2 "
                        onClick={removeFromWishlist}
                        style={{ color: "red" }}
                      >
                        Remove from wish list
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        outline
                        color="primary"
                        size="sm"
                        className="mt-2"
                        onClick={addToWishlist}
                      >
                        Add to wish list
                      </MDBBtn>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default CourseCard;
