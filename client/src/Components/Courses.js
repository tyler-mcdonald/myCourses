import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleErrors } from "../helpers/handleErrors";
import { CourseTile } from "./CourseTile";
import { NewCourseButton } from "./NewCourseButton";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoursesData("http://localhost:5000/api/courses");
  }, []);

  const fetchCoursesData = async (url) => {
    try {
      const response = await axios.get(url);
      setCourses(response.data);
    } catch (error) {
      const errorRoute = handleErrors(error.response.status);
      return navigate(errorRoute);
    }
  };

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

export default Courses;
