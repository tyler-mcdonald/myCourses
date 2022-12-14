import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ActionsBar } from "./ActionsBar";
import { handleErrors } from "../helpers/handleErrors";
import { Context } from "../Context";

export const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const user = useContext(Context).user;
  const navigate = useNavigate();
  const courseId = useParams().id;
  const url = `https://course-database-api.herokuapp.com/api/courses/${courseId}`;

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line
  }, []);

  /** GET course request, set course state */
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setCourse(data);
    } catch (err) {
      const handled = handleErrors(err);
      navigate(handled.route);
    }
  };

  /** DELETE course request */
  const handleDelete = async () => {
    try {
      const response = await axios.delete(url, {
        auth: { username: user.emailAddress, password: user.password },
      });
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
