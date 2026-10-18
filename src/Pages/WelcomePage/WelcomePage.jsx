/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../../data/SubFolderSlice";
import {
  CardContainer,
  CardImageWrapper,
  CardBody,
  Container,
  CourseContainer,
  CourseName,
  StartCourseButton,
  LoginButton,
  UserName,
  NavBar,
  NavBrand,
  NavLink,
  NavSpacer,
  SearchInput,
  SearchWrapper,
  SignupButton,
  NavBarMobile,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  IconButton,
} from "./styled.components";
import {
  storeCourse,
  loadCourseDetails,
  storeCourseDetails,
} from "../../data/CurrentCourse";
import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";
import LoginPage from "../LoginPage/Login";
import ThemeComponent from "../../Component/ThemeComponent/ThemeComponent";
import { LoadingDiv } from "../../Component/CoursePlayer/styled.components";
import { FaSearch, FaUserLock, FaUserPlus } from "react-icons/fa";
import RegisterPage from "../RegisterPage";
import { isEmpty } from "lodash";

function WelcomePage() {
  const dispatch = useDispatch();
  const {
    user,
    loadingUser,
    courseDetails: getCourse,
  } = useSelector((s) => s.currentCourse);
  const { themeDark } = useSelector((s) => s.theme);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mobileInput, setMobileInput] = useState(false);
  const details = JSON.parse(sessionStorage.getItem("courseDetails"));
  const courseDetails = !isEmpty(getCourse) ? getCourse : details || [];

  useEffect(() => {
    if (details) {
      storeCourseDetails(details);
    } else {
      dispatch(loadCourseDetails({}));
    }
  }, [details]);

  if (loadingUser) {
    return (
      <LoadingDiv>
        <FourSquare color="#8b5cf6" size="large" text="" textColor="#ec4899" />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      {login && <LoginPage setLogin={setLogin} />}
      {register && <RegisterPage setRegister={setRegister} />}

      {/* ── Mobile NavBar ── */}
      <NavBarMobile>
        {!mobileInput && (
          <NavBrand style={{ fontSize: "16px" }}>
            {user?.user ? user.user : "WebCourse"}
          </NavBrand>
        )}
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            width: mobileInput ? "100%" : "",
          }}
        >
          {mobileInput ? (
            <input
              type="text"
              placeholder="🔍 Search courses..."
              autoFocus
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              onBlur={() => {
                setMobileInput(false);
                setInputValue("");
              }}
              style={{
                width: "100%",
                height: "36px",
                padding: "0 12px",
                borderRadius: "18px",
                border: "1.5px solid rgba(139,92,246,0.5)",
                background: themeDark ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.06)",
                color: themeDark ? "#f0f0f5" : "#1a1a2e",
                outline: "none",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            />
          ) : (
            <IconButton onClick={() => setMobileInput(true)}>
              <FaSearch />
            </IconButton>
          )}
          {!user?.user && !mobileInput && (
            <>
              <IconButton onClick={() => setRegister(true)}>
                <FaUserPlus />
              </IconButton>
              <IconButton onClick={() => setLogin(true)}>
                <FaUserLock />
              </IconButton>
            </>
          )}
          <ThemeComponent />
        </span>
      </NavBarMobile>

      {/* ── Desktop NavBar ── */}
      <NavBar>
        <NavBrand>WebCourse</NavBrand>
        <NavLink>Explore</NavLink>
        <NavSpacer />
        <SearchWrapper>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Find expert-led courses..."
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </SearchWrapper>
        <NavSpacer />
        {user?.user ? (
          <UserName>👤 {user.user}</UserName>
        ) : (
          <>
            <LoginButton onClick={() => setLogin(true)}>Login</LoginButton>
            <SignupButton onClick={() => setRegister(true)}>Sign Up</SignupButton>
          </>
        )}
        <ThemeComponent />
      </NavBar>

      {/* ── Hero Section ── */}
      <HeroSection>
        <HeroTitle>Ready to reimagine your career?</HeroTitle>
        <HeroSubtitle>
          Get the skills and real-world experience employers want with Career
          Accelerators.
        </HeroSubtitle>
      </HeroSection>

      {/* ── Course Grid ── */}
      <CourseContainer>
        {courseDetails.length > 0 &&
          courseDetails
            .filter((e) => e.name.toLowerCase().includes(inputValue))
            .map((course) => (
              <CardContainer key={course.id}>
                <CardImageWrapper>
                  <img
                    src={`data:image/jpeg;base64,${course.image}`}
                    alt={course.name}
                  />
                </CardImageWrapper>
                <CardBody>
                  <CourseName>{course.name}</CourseName>
                  <StartCourseButton
                    to="/course"
                    onClick={(e) => {
                      dispatch(storeCourse(course));
                      if (user.user) {
                        dispatch(
                          fetchDataRequest({
                            FOLDER_ID: course.id,
                          })
                        );
                      } else if (!user?.user) {
                        e.preventDefault();
                        setLogin(true);
                      }
                    }}
                  >
                    Start Course
                  </StartCourseButton>
                </CardBody>
              </CardContainer>
            ))}
      </CourseContainer>
    </Container>
  );
}

export default WelcomePage;
