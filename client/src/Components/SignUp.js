import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";
import { TextInputField } from "./TextInputField";

const SignUp = ({ signIn }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]); // do we need state for this?
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const createUser = () => {
    axios
      .post("http://localhost:5000/api/users", {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        password: user.password,
      })
      .then((response) => {
        if (response.status === 201) {
          signIn(user);
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
          <TextInputField
            dataValue={"firstName"}
            display={"First Name"}
            setUser={setUser}
          />
          <TextInputField
            dataValue={"lastName"}
            display={"Last Name"}
            setUser={setUser}
          />
          <TextInputField
            dataValue={"emailAddress"}
            display={"Email Address"}
            setUser={setUser}
          />
          <TextInputField
            dataValue={"password"}
            display={"Password"}
            setUser={setUser}
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
