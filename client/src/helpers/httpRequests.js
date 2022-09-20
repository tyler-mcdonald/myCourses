import axios from "axios";

const handleApiRequest = async (
  method,
  url,
  body,
  successCode,
  successMethod
) => {
  const response = await axios[method](url, body);
  if (response && response.status === successCode) {
    successMethod();
  }
};

// GET user (UserSignIn)
// function (method, url, requestBody, successCode, successMethodObjects)
// function (get, url, requestBody, successCode, successMethodObjects)
const fetchUserData = async () => {
  try {
    const response = await axios.get(url, {
      auth: { username: user.emailAddress, password: user.password },
    });
    const data = response.data;
    data.password = user.password;
    return data;
  } catch (err) {
    const error = handleErrors(err);
    setErrors([error.messages]);
  }
};

const formatData = (response) => {
  const data = response.data;
  data.password = user.password;
  return data;
};

handleApiRequest(
  "get",
  "http://localhost:5000/api/users",
  {
    auth: { username: user.emailAddress, password: user.password },
  },
  200
);

// GET course (CourseDetail)
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

// GET course (UpdateCourse)
(async function fetchCourseData() {
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
})();

// GET courses (Courses)
(async function fetchCoursesData() {
  try {
    const response = await axios.get(url);
    setCourses(response.data);
  } catch (error) {
    const handledError = handleErrors(error);
    navigate(handledError.route);
  }
})();

// DELETE course (CourseDetail)
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

// POST user (UserSignUp)
// function (method, url, requestBody, successCode, successMethodObjects)
const createUser = async () => {
  const { firstName, lastName, emailAddress, password } = user;
  try {
    const response = await axios.post(url, {
      firstName,
      lastName,
      emailAddress,
      password,
    });
    if (response.status === 201) {
      signIn(user);
      navigate("/");
    }
  } catch (err) {
    const handledError = handleErrors(err);
    setErrors(handledError.messages);
  }
};

// POST course (CreateCourse)
const createCourse = async () => {
  try {
    const { title, description, estimatedTime, materialsNeeded } = course;
    const response = await axios.post(
      url,
      { title, description, estimatedTime, materialsNeeded, userId: 1 },
      { auth: { username: user.emailAddress, password: user.password } }
    );
    console.log(response);
    if (response.status === 201) return navigate("/");
  } catch (err) {
    const errors = handleErrors(err);
    setErrors(errors.messages);
  }
};

// PUT course (UpdateCourse)
const updateCourseData = async () => {
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
