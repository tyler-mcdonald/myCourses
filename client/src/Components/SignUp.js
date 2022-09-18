import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

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
          <Input
            dataValue={"firstName"}
            display={"First Name"}
            setState={setUser}
          />
          <Input
            dataValue={"lastName"}
            display={"Last Name"}
            setState={setUser}
          />
          <Input
            dataValue={"emailAddress"}
            display={"Email Address"}
            setState={setUser}
          />
          <Input
            dataValue={"password"}
            display={"Password"}
            type={"password"}
            setState={setUser}
          />
          <SubmitButton display={"Sign Up"} />
          <CancelButton />
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
