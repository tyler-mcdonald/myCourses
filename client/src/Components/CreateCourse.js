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
  const url = "http://localhost:5000/api/courses";

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse();
  };

  const createCourse = async () => {
    try {
      const { title, description, estimatedTime, materialsNeeded } = course;
      const response = await axios.post(
        url,
        { title, description, estimatedTime, materialsNeeded, userId: 1 },
        { auth: { username: user.emailAddress, password: user.password } }
      );
      if (response.status === 201) return navigate("/");
    } catch (err) {
      const errors = handleErrors(err);
      setErrors(errors.messages);
    }
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
