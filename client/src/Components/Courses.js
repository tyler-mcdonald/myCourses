import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleErrors } from "../helpers/handleErrors";
import { CourseTile } from "./CourseTile";
import { NewCourseButton } from "./NewCourseButton";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/courses";

  /** GET courses request, set courses state */
  useEffect(() => {
    (async function fetchCoursesData() {
      try {
        const response = await axios.get(url);
        setCourses(response.data);
      } catch (error) {
        const handledError = handleErrors(error);
        navigate(handledError.route);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <CourseTile key={course.id} id={course.id} title={course.title} />
        ))}
        <NewCourseButton />
      </div>
    </main>
  );
};
