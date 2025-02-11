/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppContainer,
  SwitchButtonIcon
} from "./Component/CoursePlayer/styled.components";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import VideoPlayer from "./Component/CoursePlayer/CoursePlayer";
import { useSelector } from "react-redux";
import darkCloud from "../src/Assets/Logo/dark-cloud.svg";
import whiteCloud from "../src/Assets/Logo/white-cloud.svg";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage/Login";
import { LoginButton, UserName } from "./Pages/LoginPage/styled.components";

export const Routers = ({ theme, setTheme }) => {
  const { course, user } = useSelector((s) => s.currentCourse);
  const [login, setLogin] = useState(false);
  return (
    <Router>
      <AppContainer>
        {login && <LoginPage setLogin={setLogin} />}
        <SwitchButtonIcon>
          {course && <div>{course.name}</div>}
          <>
            {user?.user ? (
              <UserName>{user?.user}</UserName>
            ) : (
              <LoginButton
                onClick={() => setLogin(true)}
                style={{ marginTop: "0px" }}
              >
                Login
              </LoginButton>
            )}
            <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <img src={theme === "dark" ? darkCloud : whiteCloud} alt="img" />
            </div>
          </>
        </SwitchButtonIcon>
        <Routes>
          <Route path="/" element={<WelcomePage setLogin={setLogin} />} />
          <Route path="/course" element={<VideoPlayer />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};
