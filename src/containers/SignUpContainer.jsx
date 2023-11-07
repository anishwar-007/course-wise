import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/userActions.js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const SignUpContainer = ({ history }) => {
  const dispatch = useDispatch();
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;

            const db = firebase.firestore();

            const userRef = db.collection("Users").doc(user.uid);

            userRef
              .set({
                uid: user.uid,
                email: user.email,
                courses: [],
              })
              .then(() => {
                console.log("User document created in Firestore");
                dispatch(
                  login({
                    uid: user.uid,
                    email: user.email,
                    courses: [],
                  })
                );
              })
              .catch((error) => {
                console.error(
                  "Error creating user document in Firestore:",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Error signing up:", error);
          });
        history.push("/");
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
            <form onSubmit={handleSignUp}>
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <p className="text-white-50 mb-5">
                  Register with your email and password!
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
                  color="blue-grey"
                  size="lg"
                  type="submit"
                >
                  Sign Up
                </MDBBtn>

                <div>
                  <p className="mb-0">
                    Have an account?{" "}
                    <Link to={"/"} className="text-white-50 fw-bold">
                      Login
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

export default withRouter(SignUpContainer);
