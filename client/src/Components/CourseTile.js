import { Link } from "react-router-dom";

export const CourseTile = ({ id, title }) => {
  return (
    <Link
      key={id}
      className="course--module course--link"
      to={`/courses/${id}`}
    >
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{title}</h3>
    </Link>
  );
};
