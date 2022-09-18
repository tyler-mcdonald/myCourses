import { Link } from "react-router-dom";

export const CancelButton = ({ route }) => {
  return (
    <Link className="button button-secondary" to={route}>
      Cancel
    </Link>
  );
};

CancelButton.defaultProps = {
  route: "/",
};
