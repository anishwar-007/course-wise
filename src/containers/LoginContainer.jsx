import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";
import { login, updateUserCourses } from "../actions/userActions.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.courseList.courseList);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);

        const userQuery = firebase
          .firestore()
          .collection("Users")
          .where("email", "==", email.value);

        userQuery
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const userData = userDoc.data();
              const userCourses = userData.courses;
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
              dispatch(updateUserCourses(courses));
              dispatch(login(userData));
            } else {
              console.log("User not found");
            }
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
        history.push("/courses");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/courses" />;
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <form onSubmit={handleLogin}>
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  name="email"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  name="password"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  type="submit"
                >
                  Login
                </MDBBtn>
                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link
                      to={"/signup"}
                      onClick={() => history.push("/signup")}
                      className="text-white-50 fw-bold"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default withRouter(LoginContainer);
