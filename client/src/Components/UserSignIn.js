import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationErrors } from "./ValidationErrors";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { Context } from "../Context";

export const UserSignIn = () => {
  const [user, setUser] = useState({});
  const { errors } = useContext(Context);
  const { signIn, getUser } = useContext(Context).actions;
  const url = "http://localhost:5000/api/users";

  /** Attempt to fetch user data and sign in */
  const attemptSignIn = async (e) => {
    e.preventDefault();
    const authHeader = {
      auth: { username: user.emailAddress, password: user.password },
    };
    const data = await getUser(url, authHeader);
    if (data) signIn(data);
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={(e) => attemptSignIn(e)}>
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
