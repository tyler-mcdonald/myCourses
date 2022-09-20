import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ActionsBar } from "./ActionsBar";
import { UserContext } from "../App";
import { handleErrors } from "../helpers/handleErrors";

export const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const courseId = useParams().id;

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`
      );
      const data = await response.data;
      setCourse(data);
    } catch (err) {
      const handled = handleErrors(err);
      navigate(handled.route);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          auth: { username: user.emailAddress, password: user.password },
        }
      );
      if (response.status === 204) return navigate("/");
    } catch (err) {
      const handled = handleErrors(err);
      return navigate(handled.route);
    }
  };

  return (
    <main>
      <ActionsBar handleDelete={handleDelete} course={course} />
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {/* Prevent error from course.User undefined */}
              {course.User ? (
                <p>{`Instructor: ${course.User.firstName} ${course.User.lastName}`}</p>
              ) : null}
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
