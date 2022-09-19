import { CancelButton } from "./CancelButton";

export const NotFound = () => {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <CancelButton route={"/"} display={"Home"} />
    </>
  );
};
