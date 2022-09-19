import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseTile } from "./CourseTile";
import { NewCourseButton } from "./NewCourseButton";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCoursesData("http://localhost:5000/api/courses");
  }, []);

  const fetchCoursesData = async (url) => {
    const response = await axios.get(url);
    setCourses(response.data);
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
