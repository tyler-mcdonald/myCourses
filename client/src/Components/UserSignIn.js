import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

const UserSignIn = ({ signIn }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser();
  };

  const getUser = async () => {
    axios
      .get("http://localhost:5000/api/users", {
        auth: {
          username: user.emailAddress,
          password: user.password,
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
          <Input
            dataValue={"emailAddress"}
            display={"Email Address"}
            setState={setUser}
            value={user.emailAddress}
          />
          <Input
            dataValue={"password"}
            display={"Password"}
            setState={setUser}
            type={"password"}
            value={user.password}
          />
          <SubmitButton display={"Sign In"} />
          <CancelButton />
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
