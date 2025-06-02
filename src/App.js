import React from "react";
import { Provider } from "react-redux";
import store from "./data/store";
import { Routers } from "./Router";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Routers />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
