/** Dependencies */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import { ContextProvider } from "./Context";

function App() {
  return (
    <Router>
      <Head />
      <ContextProvider>
        <Header />
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
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn replace />} />
          <Route path="/signout" element={<Navigate replace to="/" />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
