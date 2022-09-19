import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { ValidationErrors } from "./ValidationErrors";
import { CourseInfoForm } from "./CourseInfoForm";
import { handleErrors } from "../helpers/handleErrors";

const UpdateCourse = () => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const user = useContext(UserContext);
  const location = useLocation();
  const courseId = location.pathname.split("/")[2]; // use params instead
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseData(`http://localhost:5000/api/courses/${courseId}`);
  }, [courseId]);

  const fetchCourseData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setCourse(response.data);
      const isVerified = verifyCourseOwner(data.User);
      redirectIfForbidden(isVerified);
    } catch (err) {
      const handled = handleErrors(err);
      navigate(handled.route);
    }
  };

  // check if current loggeed in user is the course owner
  const verifyCourseOwner = (owner) => user.emailAddress === owner.emailAddress;

  const redirectIfForbidden = (verified) => {
    if (!verified) return navigate("/forbidden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourseData(`http://localhost:5000/api/courses/${courseId}`);
  };

  const updateCourseData = async (url) => {
    try {
      const { title, description, estimatedTime, materialsNeeded } = course;
      const response = await axios.put(
        url,
        { title, description, estimatedTime, materialsNeeded, userId: 1 },
        { auth: { username: user.emailAddress, password: user.password } }
      );
      if (response.status === 204) {
        return navigate(`/courses/${courseId}`);
      }
    } catch (err) {
      const handled = handleErrors(err);
      setErrors(handled.messages);
    }
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ValidationErrors errors={errors} />
        <CourseInfoForm
          handleSubmit={handleSubmit}
          setCourse={setCourse}
          course={course}
          user={course.User}
          page="Update Course"
        />
      </div>
    </main>
  );
};

export default UpdateCourse;
