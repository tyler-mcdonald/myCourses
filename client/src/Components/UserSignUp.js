import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { handleErrors } from "../helpers/handleErrors";

export const UserSignUp = ({ signIn }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users";

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser();
  };

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
            value={user.firstName}
          />
          <Input
            dataValue={"lastName"}
            display={"Last Name"}
            setState={setUser}
            value={user.lastName}
          />
          <Input
            dataValue={"emailAddress"}
            display={"Email Address"}
            setState={setUser}
            value={user.emailAddress}
          />
          <Input
            dataValue={"password"}
            display={"Password"}
            type={"password"}
            setState={setUser}
            value={user.password}
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
