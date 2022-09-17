import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

const CreateCourse = () => {
  /** State */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  /** Refs */
  const titleInputRef = useRef("");
  const descriptionInputRef = useRef("");
  const estimatedTimeInputRef = useRef("");
  const materialsNeededInputRef = useRef("");
  /** Other */
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/courses",
        {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId: 1,
        },
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
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={titleInputRef}
                onChange={() => setTitle(titleInputRef.current.value)}
              />

              <p>By #user.name</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={descriptionInputRef}
                onChange={() =>
                  setDescription(descriptionInputRef.current.value)
                }
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTimeInputRef}
                onChange={() =>
                  setEstimatedTime(estimatedTimeInputRef.current.value)
                }
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeededInputRef}
                onChange={() =>
                  setMaterialsNeeded(materialsNeededInputRef.current.value)
                }
              />
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Create Course
          </button>
          <Link className="button button-secondary" to={`/`}>
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
