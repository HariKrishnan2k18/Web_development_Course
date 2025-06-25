/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../../data/SubFolderSlice";
import {
  CardContainer,
  Container,
  CourseContainer,
  CourseName,
  StartCourseButton,
  LoginButton,
  UserName,
  NavBar,
  SearchInput,
  SignupButton,
  NavBarMobile,
} from "./styled.components";
import { Courses } from "../../Courses/Courses";
import { storeCourse } from "../../data/CurrentCourse";
import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";
import LoginPage from "../LoginPage/Login";
import ThemeComponent from "../../Component/ThemeComponent/ThemeComponent";
import { LoadingDiv } from "../../Component/CoursePlayer/styled.components";
import { FaSearch, FaUserLock, FaUserPlus } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import RegisterPage from "../RegisterPage";

function WelcomePage() {
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((s) => s.currentCourse);
  const { themeDark } = useSelector((s) => s.theme);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mobileInput, setMobileInput] = useState(false);

  useEffect(() => {
    dispatch(storeCourse({}));
  }, []);

  if (loadingUser) {
    return (
      <LoadingDiv>
        <FourSquare color="#32cd32" size="large" text="" textColor="#3a36a5" />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      {login && <LoginPage setLogin={setLogin} />}
      {register && <RegisterPage setRegister={setRegister} />}
      <NavBarMobile>
        {!user?.user ? (
          <span style={{ display: mobileInput && "none" }}>Web Course</span>
        ) : (
          <span style={{ display: mobileInput && "none" }}>{user?.user}</span>
        )}
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            width: mobileInput ? "100%" : "",
          }}
        >
          {mobileInput ? (
            <input
              type="text"
              placeholder={`🔍 explore courses to boost your career`}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              onBlur={() => {
                setMobileInput(false);
                setInputValue("");
              }}
              style={{ width: "100%", height: "20px" }}
            />
          ) : (
            <FaSearch onClick={() => setMobileInput(true)} />
          )}
          {!user?.user && !mobileInput && (
            <>
              <FaUserPlus onClick={() => setRegister(true)} />
              <FaUserLock onClick={() => setLogin(true)} />
            </>
          )}
          <ThemeComponent />
        </span>
      </NavBarMobile>
      <NavBar>
        <span>Web Course </span>
        <span> Explore</span>
        <SearchInput
          type="text"
          placeholder={` 🔍     Find expert-led courses to boost your career`}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
        />
        {user?.user ? (
          <UserName>{user?.user}</UserName>
        ) : (
          <>
            <LoginButton
              onClick={() => setLogin(true)}
              style={{ marginTop: "0px" }}
            >
              Login
            </LoginButton>
            <SignupButton
              onClick={() => setRegister(true)}
              style={{ marginTop: "0px" }}
            >
              Signup
            </SignupButton>
          </>
        )}
        <ThemeComponent />
      </NavBar>
      <p style={{ textAlign: "left", width: "95%", margin: "10px" }}>
        <span
          style={{
            display: "block",
            fontSize: isMobile ? "16px" : "20px",
            margin: isMobile ? "4px" : "10px",
          }}
        >
          Ready to reimagine your career?
        </span>
        <span
          style={{
            color: themeDark ? "white" : "#595c73",
            fontSize: isMobile ? "12px" : "16px",
            margin: isMobile ? "4px" : "10px",
            display: "flex",
          }}
        >
          Get the skills and real-world experience employers want with Career
          Accelerators.
        </span>
      </p>
      <CourseContainer>
        {Courses.filter((e) => e.name.toLowerCase().includes(inputValue)).map(
          (course) => (
            <CardContainer key={course.id}>
              <img src={course.img} alt="img" width={"100%"} height={"200px"} />
              <CourseName>{course.name}</CourseName>
              <StartCourseButton
                to="/course"
                availability={course.availability.toString()}
                onClick={(e) => {
                  dispatch(storeCourse(course));
                  if (course.availability && user.user) {
                    dispatch(
                      fetchDataRequest({
                        FOLDER_ID: course.folderid,
                        API_KEY: course.apikey,
                      })
                    );
                  } else if (!user?.user) {
                    e.preventDefault();
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
          )
        )}
      </CourseContainer>
    </Container>
  );
}

export default WelcomePage;
