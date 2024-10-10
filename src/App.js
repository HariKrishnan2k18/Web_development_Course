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
              <div
                onClick={() =>
                  theme === "dark" ? setTheme("light") : setTheme("dark")}
              >
                {theme === "dark"
                  ? <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="yellow"
                        d="M122.4 1.2C127.6-.9 133.4-.2 137.9 3l70.3 50.3L278.5 3c4.5-3.2 10.3-3.9 15.4-1.8s8.8 6.7 9.7 12.2l14.1 85.3L403 112.8c5.4 .9 10.1 4.6 12.2 9.7s1.4 10.9-1.8 15.4l-38.8 54.3c-2.2-.1-4.3-.2-6.5-.2c-23.2 0-45 6.2-63.8 17c.1-12.5-2.2-25.3-7.3-37.6c-20.3-49-76.4-72.2-125.4-52s-72.2 76.4-52 125.4c18.3 44.3 66 67.5 111.1 56.6c-36.3 18.2-62.8 53.3-69.1 94.9l-23.6 16.9c-4.5 3.2-10.3 3.9-15.4 1.8s-8.8-6.7-9.7-12.2L98.7 317.7 13.4 303.6c-5.5-.9-10.1-4.6-12.2-9.7S-.2 282.9 3 278.5l50.3-70.3L3 137.9c-3.2-4.5-3.9-10.3-1.8-15.4s6.7-8.8 12.2-9.7L98.7 98.7l14.1-85.3c.9-5.5 4.6-10.1 9.7-12.2zM149 232.7c-13.5-32.7 2-70.1 34.6-83.6s70.1 2 83.6 34.6s-2 70.1-34.6 83.6s-70.1-2-83.6-34.6zM639.9 431.9c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z"
                      />
                    </svg>
                  : <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M495.8 0c5.5 0 10.9 .2 16.3 .7c7 .6 12.8 5.7 14.3 12.5s-1.6 13.9-7.7 17.3c-44.4 25.2-74.4 73-74.4 127.8c0 81 65.5 146.6 146.2 146.6c8.6 0 17-.7 25.1-2.1c6.9-1.2 13.8 2.2 17 8.5s1.9 13.8-3.1 18.7c-34.5 33.6-81.7 54.4-133.6 54.4c-9.3 0-18.4-.7-27.4-1.9c-11.2-22.6-29.8-40.9-52.6-51.7c-2.7-58.5-50.3-105.3-109.2-106.7c-1.7-10.4-2.6-21-2.6-31.8C304 86.1 389.8 0 495.8 0zM447.9 431.9c0 44.2-35.8 80-80 80H96c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" />
                    </svg>}
              </div>
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
