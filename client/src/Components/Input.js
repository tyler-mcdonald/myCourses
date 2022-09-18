export const Input = ({ dataValue, display, setState, type }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <input
        id={dataValue}
        name={dataValue}
        type={type}
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              [dataValue]: e.target.value,
            };
          })
        }
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
};
