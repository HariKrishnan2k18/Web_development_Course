// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CoursePlayer from "./Component/CoursePlayer/CoursePlayer";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/course" element={<CoursePlayer />} />
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
                <h1>Javascript Data Structures and Algorithms</h1>
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
