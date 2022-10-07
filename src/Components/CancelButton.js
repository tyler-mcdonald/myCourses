import { Link } from "react-router-dom";

export const CancelButton = ({ route = "/", display = "Cancel" }) => {
  return (
    <Link className="button button-secondary" to={route}>
      {display}
    </Link>
  );
};
