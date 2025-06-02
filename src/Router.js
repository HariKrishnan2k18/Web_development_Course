/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContainer } from "./Component/CoursePlayer/styled.components";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import VideoPlayer from "./Component/CoursePlayer/CoursePlayer";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/theme";
import { useSelector } from "react-redux";

export const Routers = () => {
  const { themeDark } = useSelector((s) => s.theme);
  return (
    <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/course" element={<VideoPlayer />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};
