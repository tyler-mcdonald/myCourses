import { Link } from "react-router-dom";

export const ActionsBar = ({ courseId, handleDelete }) => {
  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link className="button" to={`/courses/${courseId}/update`}>
          Update Course
        </Link>
        <Link className="button" onClick={() => handleDelete()}>
          Delete Course
        </Link>
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};
