import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CoursePlayer from "./Component/CoursePlayer/CoursePlayer";

function App() {
  const title = "Javascript Data Structures and Algorithms";
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/course" element={<CoursePlayer title={title} />} />
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <h1>
                  {title}
                </h1>
                <Link to="/course">Start Course</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
