import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ValidationErrors } from "./ValidationErrors";
// import { Input } from "./Input";
// import { TextArea } from "./TextArea";
// import { SubmitButton } from "./SubmitButton";
// import { CancelButton } from "./CancelButton";
import { CourseInfoForm } from "./CourseInfoForm";

const UpdateCourse = () => {
  const [course, setCourse] = useState({});
  const [courseOwner, setCourseOwner] = useState({});
  const [errors, setErrors] = useState([]);
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
