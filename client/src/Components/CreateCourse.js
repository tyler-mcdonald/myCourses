import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { ValidationErrors } from "./ValidationErrors";
import { CourseInfoForm } from "./CourseInfoForm";

const CreateCourse = () => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = course;
    axios
      .post(
        "http://localhost:5000/api/courses",
        { title, description, estimatedTime, materialsNeeded, userId: 1 },
        {
          auth: {
            username: "joe@smith.com",
            password: "joepassword",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return navigate("/");
        }
      })
      .catch((err) => setErrors(() => err.response.data.errors));
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

export default CreateCourse;
