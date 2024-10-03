import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoursePlayer from "./Component/CoursePlayer/CoursePlayer";
import { ThemeProvider } from "styled-components";
import {
  AppContainer,
  SwitchButtonIcon
} from "./Component/CoursePlayer/styled.components";
import WelcomePage from "./Component/WelcomePage/WelcomePage";
import { Provider } from "react-redux";
import store from "./data/store";

function App() {
  const title = "Javascript Data Structures and Algorithms";
  const darkTheme = {
    type: "dark",
    background: "#2d2f31",
    color: "white",
    contentlayout: "#2d2f31"
  };
  const lightTheme = {
    background: "white",
    color: "black",
    contentlayout: "#f7f9fa",
    type: "light"
  };
  const [theme, setTheme] = useState("light");
  const obj = {
    light: lightTheme,
    dark: darkTheme
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={obj[theme]}>
        <Router>
          <AppContainer>
            <SwitchButtonIcon>
              <button
                width={"20px"}
                style={{ marginRight: "30px", marginTop: "10px" }}
                onClick={() =>
                  theme === "dark" ? setTheme("light") : setTheme("dark")}
              >
                Switch Theme
              </button>
            </SwitchButtonIcon>
            <Routes>
              <Route path="/course" element={<CoursePlayer title={title} />} />
              <Route path="/" element={<WelcomePage title={title} />} />
            </Routes>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
