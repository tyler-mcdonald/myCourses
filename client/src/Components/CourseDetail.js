import React, { useState, useEffect } from "react";
import { useLocation, Link, redirect } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState({});
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  // get course data
  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = () => {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setCourseOwner(data.User);
        setMaterialsNeeded(convertStringToArray(data));
      });
  };

  // only works if each line begins with `*`
  const convertStringToArray = (data) => {
    const rawString = data.materialsNeeded;
    if (!rawString) return [];
    const list = rawString.split("*");
    // Remove empty strings & trim whitespace
    const materials = list.filter((i) => i !== "").map((i) => i.trim());
    return materials;
  };

  const handleDelete = async () => {
    axios
      .delete(`http://localhost:5000/api/courses/${courseId}`, {
        auth: {
          username: "joe@smith.com",
          password: "joepassword",
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 204) {
          return redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${courseId}/update`}>
            Update Course
          </Link>
          <Link className="button" onClick={() => handleDelete()}>
            Delete Course
          </Link>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`${courseOwner.firstName} ${courseOwner.lastName}`}</p>

              <p>{course.description}</p>

              <p>#another paragraph as needed</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {materialsNeeded.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
