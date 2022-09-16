import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/** Refactor this to useContext */
const UpdateCourse = () => {
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState({});
  // const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  // get course data
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setCourseOwner(data.User);
      });
  }, []);

  /** Submit button */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit() called");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={course.title}
              />

              <p>
                Instructor: {`${courseOwner.firstName} ${courseOwner.lastName}`}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={course.description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue={course.estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue={course.materialsNeeded}
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
