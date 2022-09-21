import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

export const CourseInfoForm = ({
  handleSubmit,
  setCourse,
  course,
  user,
  page = "Create Course",
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="main--flex">
        <div>
          <Input
            dataValue={"title"}
            display={"Course Title"}
            setState={setCourse}
            value={course ? course.title : ""}
          />
          <p>
            Instructor: {user ? `${user.firstName} ${user.lastName}` : null}
          </p>
          <TextArea
            dataValue={"description"}
            display={"Course Description"}
            setState={setCourse}
            value={course ? course.description : ""}
          />
        </div>
        <div>
          <Input
            dataValue={"estimatedTime"}
            display={"Estimated Time"}
            setState={setCourse}
            value={course ? course.estimatedTime : ""}
          />
          <TextArea
            dataValue={"materialsNeeded"}
            display={"Materials Needed"}
            setState={setCourse}
            value={course ? course.materialsNeeded : ""}
          />
        </div>
      </div>
      <SubmitButton display={page} />
      <CancelButton />
    </form>
  );
};
