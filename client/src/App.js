/** Dependencies */
import React, { createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
/** Components */
import Head from "./Components/Head";
import Header from "./Components/Header";
import CourseDetail from "./Components/CourseDetail";
import Courses from "./Components/Courses";
import UpdateCourse from "./Components/UpdateCourse";
// import SignOut from "./Components/SignOut";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import CreateCourse from "./Components/CreateCourse";

export const UserContext = createContext();

function App() {
  // const [user, setUser] = useState({});
  return (
    <Router>
      <Head />
      <div id="root">
        <UserContext.Provider value={"Tyler's Context"}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Courses />} />
            <Route exact path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/signout" element={<Navigate replace to="/" />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
