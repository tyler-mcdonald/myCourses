import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

/** Refactor this to useContext */
const UpdateCourse = () => {
  /** State */
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  /** Misc */
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  // get course data
  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:5000/api/courses/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          setCourse(data);
          setCourseOwner(data.User);
        });
    }
    fetchData();
  }, [courseId]);

  // set default values
  useEffect(() => {
    async function setDefaultValues() {
      setTitle(await course.title);
      setDescription(await course.description);
      setEstimatedTime(await course.estimatedTime);
      setMaterialsNeeded(await course.materialsNeeded);
    }
    setDefaultValues();
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/courses/${courseId}`,
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
        if (response.status === 204) {
          return navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          // this may not be necessary because of user auth????
          return setErrors(() => [err.response.data.message]);
        }
        return setErrors(() => err.response.data.errors);
      });
  };

  // refactor to switch case?
  const handleChange = (e) => {
    const inputField = e.target.id;
    if (inputField === "courseTitle") return setTitle(e.target.value);
    if (inputField === "courseDescription")
      return setDescription(e.target.value);
    if (inputField === "estimatedTime") return setEstimatedTime(e.target.value);
    if (inputField === "materialsNeeded")
      return setMaterialsNeeded(e.target.value);
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title || ""}
                onChange={(e) => handleChange(e)} // how to make this work better?
              />

              <p>
                Instructor: {`${courseOwner.firstName} ${courseOwner.lastName}`}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description || ""}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime || ""}
                onChange={(e) => handleChange(e)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded || ""}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <Link className="button button-secondary" to={`/courses/${courseId}`}>
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
