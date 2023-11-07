// import { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import { Route } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import SignUpContainer from "./containers/SignUpContainer";
import CourseListContainer from "./containers/CourseListContainer";
import DashboardContainer from "./containers/DashboardContainer";
import CourseContainer from "./containers/CourseContainer";
import Header from "./Components/Header";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateUserCourses } from "./actions/userActions";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const signOut = () => {
    firebase.auth().signOut();
    history.push("/");
    dispatch(updateUserCourses([]));
  };

  return (
    <AuthProvider>
      <div>
        <Header signOut={signOut} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
        />
        <Route
          exact
          path="/signup"
          component={SignUpContainer}
          history={history}
        />
        <Route exact path="/" component={LoginContainer} history={history} />
        <PrivateRoute exact path="/courses" component={CourseListContainer} />
        <PrivateRoute exact path="/course/:name" component={CourseContainer} />
        <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
      </div>
    </AuthProvider>
  );
}

export default App;
