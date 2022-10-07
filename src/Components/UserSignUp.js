import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
  const { signIn, getUser } = useContext(Context).actions;
  const url = "https://course-database-api.herokuapp.com/api/users";

  /** Attempt to create user and sign in */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser();
    if (response && response.status === 201) {
      const authHeader = {
        auth: { username: user.emailAddress, password: user.password },
      };
      const authUser = await getUser(url, authHeader);
      signIn(authUser);
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
