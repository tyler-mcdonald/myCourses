import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="main--flex">
            <div>
              <Input
                dataValue={"title"}
                display={"Course Title"}
                setState={setCourse}
                value={course.title}
              />

              <p>
                Instructor: {`${courseOwner.firstName} ${courseOwner.lastName}`}
              </p>

              <TextArea
                dataValue={"description"}
                display={"Course Description"}
                setState={setCourse}
                value={course.description}
              />
            </div>
            <div>
              <Input
                dataValue={"estimatedTime"}
                display={"Estimated Time"}
                setState={setCourse}
                value={course.estimatedTime}
              />
              <TextArea
                dataValue={"materialsNeeded"}
                display={"Materials Needed"}
                setState={setCourse}
                value={course.materialsNeeded}
              />
            </div>
          </div>
          <SubmitButton display={"Update Course"} />
          <CancelButton route={`/courses/${courseId}`} />
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
