import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionsBar } from "./ActionsBar";
// helpers
import { convertStringToArray } from "../helpers/convertStringToArray";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState({});
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const getCourseData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`
      );
      const data = await response.json();
      setCourse(data);
      setCourseOwner(data.User);
    };
    getCourseData();
  }, []);

  const handleDelete = async () => {
    axios
      .delete(`http://localhost:5000/api/courses/${courseId}`, {
        auth: {
          username: "joe@smith.com",
          password: "joepassword",
        },
      })
      .then((response) => {
        if (response.status === 204) {
          return navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <ActionsBar
        courseId={courseId}
        handleDelete={handleDelete}
        courseOwner={courseOwner}
      />

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`${courseOwner.firstName} ${courseOwner.lastName}`}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {convertStringToArray(course.materialsNeeded).map(
                  (material, index) => (
                    <li key={index}>{material}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
