import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateCourse = () => {
  const createCourse = () => {
    axios
      .post(
        "http://localhost:5000/api/courses",
        {
          title: "#TESTING",
          description: "TESTING",
          userId: 1,
        },
        {
          auth: {
            username: "joe@smith.com",
            password: "joepassword",
          },
        }
      )
      .then((response) => console.log(response));
  };

  // useEffect(() => {
  //   // createCourse();
  // }, []);

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue=""
              />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue=""
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onClick={() => createCourse()}
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
