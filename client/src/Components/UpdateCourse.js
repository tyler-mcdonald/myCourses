import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { ValidationErrors } from "./ValidationErrors";
import { CourseInfoForm } from "./CourseInfoForm";

const UpdateCourse = () => {
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState();
  const [errors, setErrors] = useState([]);
  const user = useContext(UserContext);
  const location = useLocation();
  const courseId = location.pathname.split("/")[2]; // use params instead
  const navigate = useNavigate();

  // check if current loggeed in user is the course owner
  const verifyCourseOwner = (owner) => {
    if (owner) return user.emailAddress === owner.emailAddress;
  };

  const redirectIfForbidden = (result) => {
    if (!result) return navigate("/forbidden");
  };

  // get course data
  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:5000/api/courses/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          setCourse(data);
          return data;
        })
        .then((data) => {
          setCourseOwner(data.User);
          return data.User;
        })
        .then((owner) => verifyCourseOwner(owner))
        .then((result) => redirectIfForbidden(result));
    }
    fetchData();
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          title: course.title,
          description: course.description,
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

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ValidationErrors errors={errors} />
        <CourseInfoForm
          handleSubmit={handleSubmit}
          setCourse={setCourse}
          course={course}
          user={courseOwner}
          page="Update Course"
        />
      </div>
    </main>
  );
};

export default UpdateCourse;
