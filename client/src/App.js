/** Dependencies */
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
/** Components */
import { PrivateRoute } from "./PrivateRoute";
import Head from "./components/Head";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
// import SignOut from "./components/SignOut";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import { NotFound } from "./components/NotFound";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const handleSignIn = (user) => setUser(user);
  const handleSignOut = () => setUser(null);

  return (
    <Router>
      <Head />
      <div id="root">
        <UserContext.Provider value={user}>
          <Header signOut={handleSignOut} />
          <Routes>
            <Route exact path="/" element={<Courses />} />
            <Route
              exact
              path="/courses/create"
              element={<PrivateRoute Component={CreateCourse} />}
            />
            {/* need to handle not found ids */}
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route
              path="/courses/:id/update"
              element={<PrivateRoute Component={UpdateCourse} />}
            />
            <Route
              path="/signup"
              element={<UserSignUp signIn={handleSignIn} />}
            />
            <Route
              path="/signin"
              element={<UserSignIn signIn={handleSignIn} />}
            />
            <Route path="/signout" element={<Navigate replace to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
