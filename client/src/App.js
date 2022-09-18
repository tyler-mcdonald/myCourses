/** Dependencies */
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
/** Components */
import Head from "./components/Head";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
// import SignOut from "./components/SignOut";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";

export const UserContext = createContext();

/** Login */
//  Get user login credentials from the form ✅
//  Check email against database
//      If no user is returned
//        Persist new user info
//        Display a success message
//        Redirect to login page
//      Else username exists, display a warning

function App() {
  const [user, setUser] = useState(null);

  // refactor this to look like handleSignIn
  // const handleSignUp = (firstName, lastName, emailAddress, password) => {
  //   if (firstName && lastName && emailAddress && password) {
  //     const user = { firstName, lastName, emailAddress, password };
  //     setUser(user);
  //     console.log(user);
  //   }
  // };

  const handleSignIn = (user) => {
    setUser(user);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <Router>
      <Head />
      <div id="root">
        <UserContext.Provider value={user}>
          <Header signOut={handleSignOut} />
          <Routes>
            <Route exact path="/" element={<Courses />} />
            <Route exact path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route
              path="/signup"
              element={<UserSignUp signIn={handleSignIn} />}
            />
            <Route
              path="/signin"
              element={<UserSignIn signIn={handleSignIn} />}
            />
            <Route path="/signout" element={<Navigate replace to="/" />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
