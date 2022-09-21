import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context";

export const ActionsBar = ({ course, handleDelete }) => {
  const user = useContext(Context).user;

  /** Verify that user is course creator */
  const userIsCourseOwner = () => {
    const courseOwner = course.User;
    if (user && courseOwner) {
      return user.emailAddress === courseOwner.emailAddress;
    } else return false;
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        {/* Display Update/Delete buttons if user is logged in */}
        {user && userIsCourseOwner() ? (
          <>
            <Link className="button" to={`/courses/${course.id}/update`}>
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
