import { useDispatch } from "react-redux";
import { fetchDataRequest } from "../../data/SubFolderSlice";
import {
  CardContainer,
  Container,
  CourseContainer,
  StartCourseButton
} from "./styled.components";
import { Courses } from "../../Courses/Courses";
import { storeCourse } from "../../data/CurrentCourse";

function WelcomePage() {
  const dispatch = useDispatch();

  return (
    <Container>
      <h1>Welcome To The Course</h1>
      <CourseContainer>
        {Courses.map((course) => (
          <CardContainer key={course.id}>
            <img src={course.img} alt="img" width={"100%"} height={"200px"} />
            <div>{course.name}</div>
            <StartCourseButton
              to="/course"
              onClick={() => {
                dispatch(storeCourse(course));
                dispatch(
                  fetchDataRequest({
                    FOLDER_ID: course.folderid,
                    API_KEY: course.apikey
                  })
                );
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
