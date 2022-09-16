import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // get course data
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data));
  }, []);

  console.log(course);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">
            Update Course
          </a>
          <a className="button" href="#">
            Delete Course
          </a>
          <a className="button button-secondary" href="index.html">
            Return to List
          </a>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>#Course Owner</p>

              <p>#Course description paragraph.</p>

              <p>
                #The specifications that follow will produce a bookcase with
                overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in.
                tall. While the depth of the case is directly tied to the 1 x 10
                stock, you can vary the height, width and shelf spacing to suit
                your needs. Keep in mind, though, that extending the width of
                the cabinet may require the addition of central shelf supports.
              </p>

              <p>#Course description paragraph.</p>

              <p>#Course description paragraph.</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>#time</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>#materials</li>
                <li>#materials</li>
                <li>#materials</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
