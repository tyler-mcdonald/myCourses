import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

const CreateCourse = () => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/courses",
        {
          title: course.courseTitle,
          description: course.courseDescription,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
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
              <Input
                dataValue={"courseTitle"}
                display={"Course Title"}
                setState={setCourse}
              />

              <p>
                Instructor:{" "}
                {user ? `${user.firstName} ${user.lastName}` : "USER"}
              </p>

              <TextArea
                dataValue={"courseDescription"}
                display={"Course Description"}
                setState={setCourse}
              />
            </div>
            <div>
              <Input
                dataValue={"estimatedTime"}
                display={"Estimated Time"}
                setState={setCourse}
              />

              <TextArea
                dataValue={"materialsNeeded"}
                display={"Materials Needed"}
                setState={setCourse}
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
