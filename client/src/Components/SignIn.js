import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

const SignIn = ({ signIn }) => {
  const [errors, setErrors] = useState([]);
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser();
  };

  const getUser = async () => {
    axios
      .get("http://localhost:5000/api/users", {
        auth: {
          username: emailAddress,
          password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          signIn(response.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setErrors(["Email and/or password is incorrect"]);
        }
      });
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignIn;
