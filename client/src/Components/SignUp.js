import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

const SignUp = ({ signUp }) => {
  const [errors, setErrors] = useState([]); // do we need state for this?
  const [firstName, setFirstName] = useState(); // refactor these into a single user state?
  const [lastName, setLastName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const createUser = () => {
    axios
      .post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        emailAddress,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          signUp(firstName, lastName, emailAddress, password);
          console.log("New user successfully created!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        const validationErrors = err.response.data.errors;
        if (validationErrors) setErrors(validationErrors);
      });
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
        <p>
          Already have a user account? Click here to
          <Link to="/signin"> sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignUp;
