import { useState, useEffect } from "react";
import firebase from "../firebase";
import { setCourseList } from "../actions/courseListActions";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "../Components/CourseCard";
import { MDBContainer } from "mdb-react-ui-kit";

function CourseListContainer() {
  const courseList = useSelector((state) => state.courseList.courseList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("courses");

  function getCourses() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      dispatch(setCourseList(items));
      setLoading(false);
    });
  }

  useEffect(() => {
    getCourses();
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <MDBContainer className="App">
      <h2
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontFamily: "poppins",
        }}
      >
        Browse from the list of Courses below ...
      </h2>
      {courseList.map((course) => (
        <CourseCard course={course} />
      ))}
    </MDBContainer>
  );
}

export default CourseListContainer;
