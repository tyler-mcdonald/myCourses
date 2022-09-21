import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { handleErrors } from "../helpers/handleErrors";
import { Context } from "../Context";

export const UserSignUp = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const signIn = useContext(Context).actions.signIn;
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users";

  /** Attempt to create a new user, sign in user, and redirect to home */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser();
    if (response && response.status === 201) {
      const authUser = await fetchUserData();
      signIn(authUser);
      navigate("/");
    }
  };

  /** POST user request, sign in and navigate to `/` on success */
  const createUser = async () => {
    const { firstName, lastName, emailAddress, password } = user;
    try {
      const response = await axios.post(url, {
        firstName,
        lastName,
        emailAddress,
        password,
      });
      return response;
    } catch (err) {
      console.log(err);
      const handledError = handleErrors(err);
      setErrors(handledError.messages);
    }
  };

  /** GET user request */
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
