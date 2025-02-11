/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../../data/SubFolderSlice";
import {
  CardContainer,
  Container,
  CourseContainer,
  CourseName,
  StartCourseButton
} from "./styled.components";
import { Courses } from "../../Courses/Courses";
import { storeCourse } from "../../data/CurrentCourse";
import { useEffect } from "react";

function WelcomePage({ setLogin }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.currentCourse);
  useEffect(() => {
    dispatch(storeCourse({}));
  }, []);
  return (
    <Container>
      <h1>Welcome To The Course</h1>
      <CourseContainer>
        {Courses.map((course) => (
          <CardContainer key={course.id}>
            <img src={course.img} alt="img" width={"100%"} height={"200px"} />
            <CourseName>{course.name}</CourseName>
            <StartCourseButton
              to="/course"
              availability={course.availability}
              onClick={(e) => {
                if (course.availability && user.user) {
                  dispatch(storeCourse(course));
                  dispatch(
                    fetchDataRequest({
                      FOLDER_ID: course.folderid,
                      API_KEY: course.apikey
                    })
                  );
                } else if (!user?.user) {
                  setLogin(true);
                } else {
                  e.preventDefault();
                  alert("course unavailable");
                }
              }}
            >
              Start Course
            </StartCourseButton>
          </CardContainer>
        ))}
      </CourseContainer>
    </Container>
  );
}

export default WelcomePage;
