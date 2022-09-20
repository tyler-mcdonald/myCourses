import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { ValidationErrors } from "./ValidationErrors";
import { CourseInfoForm } from "./CourseInfoForm";
import { handleErrors } from "../helpers/handleErrors";

export const CreateCourse = () => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const createCourse = async (url) => {
    try {
      const { title, description, estimatedTime, materialsNeeded } = course;
      const response = await axios.post(
        url,
        { title, description, estimatedTime, materialsNeeded, userId: 1 },
        { auth: { username: user.emailAddress, password: user.password } }
      );
      if (response.status === 200) return navigate("/");
    } catch (err) {
      // const statusCode = err.response.status;
      const errors = handleErrors(err);
      setErrors(errors.messages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCourse("http://localhost:5000/api/courses");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <ValidationErrors errors={errors} />
        <CourseInfoForm
          handleSubmit={handleSubmit}
          setCourse={setCourse}
          course={course}
          user={user}
        />
      </div>
    </main>
  );
};
