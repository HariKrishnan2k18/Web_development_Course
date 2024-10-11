import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./data/store";
import { Routers } from "./Router";

function App() {
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
        <Routers theme={theme} setTheme={setTheme} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
