/** Dependencies */
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
/** Components */
import { PrivateRoute } from "./PrivateRoute";
import { Head } from "./Components/Head";
import { Header } from "./Components/Header";
import { CourseDetail } from "./Components/CourseDetail";
import { Courses } from "./Components/Courses";
import { UpdateCourse } from "./Components/UpdateCourse";
import { UserSignIn } from "./Components/UserSignIn";
import { UserSignUp } from "./Components/UserSignUp";
import { CreateCourse } from "./Components/CreateCourse";
import { NotFound } from "./Components/NotFound";
import { Forbidden } from "./Components/Forbidden";
import { UnhandledError } from "./Components/UnhandledError";

export const UserContext = createContext();

function App() {
  const userCookie = Cookies.get("authenticatedUser");
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);

  const handleSignIn = (user) => {
    setUser(user);
    Cookies.set("authenticatedUser", JSON.stringify(user));
  };
  const handleSignOut = () => {
    Cookies.remove("authenticatedUser");
    setUser(null);
  };

  return (
    <Router>
      <Head />
      <UserContext.Provider value={user}>
        <Header signOut={handleSignOut} />
        <Routes>
          <Route exact path="/" element={<Courses />} />
          <Route
            exact
            path="/courses/create"
            element={<PrivateRoute Component={CreateCourse} />}
          />
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
            element={<UserSignIn signIn={handleSignIn} replace />}
          />
          <Route path="/signout" element={<Navigate replace to="/" />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
