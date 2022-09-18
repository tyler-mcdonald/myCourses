import { Link } from "react-router-dom";

export const CancelButton = () => {
  return (
    <Link className="button button-secondary" to={`/`}>
      Cancel
    </Link>
  );
};
