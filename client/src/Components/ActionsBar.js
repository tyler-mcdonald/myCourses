import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export const ActionsBar = ({ courseId, handleDelete }) => {
  const user = useContext(UserContext);

  return (
    <div className="actions--bar">
      <div className="wrap">
        {/* Display Update/Delete buttons if user is logged in */}
        {user ? (
          <>
            <Link className="button" to={`/courses/${courseId}/update`}>
              Update Course
            </Link>
            <Link className="button" onClick={() => handleDelete()}>
              Delete Course
            </Link>
          </>
        ) : null}
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};
