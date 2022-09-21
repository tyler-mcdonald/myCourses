import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { handleErrors } from "../helpers/handleErrors";

export const UserSignIn = ({ signIn }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const url = "http://localhost:5000/api/users";

  /** Fetch user data and sign in */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchUserData();
    if (data) {
      signIn(data, "/");
      return navigate(location.state || "/");
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
