/** Dependencies */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/** Components */
import Head from "./Components/Head";
import Header from "./Components/Header";
import CourseDetail from "./Components/CourseDetail";
import Courses from "./Components/Courses";
import UpdateCourse from "./Components/UpdateCourse";
import SignOut from "./Components/SignOut";
import CreateCourse from "./Components/CreateCourse";

// create CreateCourse
// create UpdateCourse
// create UseSignIn
// create UserSignUp
// create UserSignOut (stateless)

function App() {
  return (
    <Router>
      <Head />
      {/* <body> */}
      <div id="root">
        <Header />
        <Routes>
          <Route exact path="/" element={<Courses />} />
          <Route exact path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </div>
      {/* </body> */}
    </Router>
  );
}

export default App;
