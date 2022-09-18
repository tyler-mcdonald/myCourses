import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ValidationErrors from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

const SignIn = ({ signIn }) => {
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
            setUser={setUser}
          />
          <Input
            dataValue={"password"}
            display={"Password"}
            setUser={setUser}
            type={"password"}
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

export default SignIn;
