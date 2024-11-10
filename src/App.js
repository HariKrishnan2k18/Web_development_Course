import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./data/store";
import { Routers } from "./Router";
import { darkTheme, lightTheme } from "./utils/theme";

function App() {
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
