import { CancelButton } from "./CancelButton";

export const Forbidden = () => {
  return (
    <>
      <h1>Forbidden</h1>
      <p>You are not authorized to view this page 😕</p>
      <CancelButton route={"/"} display={"Home"} />
    </>
  );
};
