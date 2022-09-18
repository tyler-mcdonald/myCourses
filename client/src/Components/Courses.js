import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { CourseTile } from "./CourseTile";
import { NewCourseButton } from "./NewCourseButton";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
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

export default Courses;
