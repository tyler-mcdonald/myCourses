/** Dependencies */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/** Components */
import Head from "./Components/Head";
import Header from "./Components/Header";
import CourseDetail from "./Components/CourseDetail";
import Courses from "./Components/Courses";

// create CreateCourse
// create UpdateCourse
// create UseSignIn
// create UserSignUp
// create UserSignOut (stateless)

// CourseDetail
//  when course button is clicked on index page
//    navigate browser to '/courses/:id'
//    get id from the url, and GET the course info
//    display that info on the screen

function App() {
  return (
    <Router>
      <Head />
      {/* <body> */}
      <div id="root">
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </div>
      {/* </body> */}
    </Router>
  );
}

export default App;
