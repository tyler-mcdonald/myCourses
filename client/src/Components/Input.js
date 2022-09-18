export const Input = ({ dataValue, display, setState, type, value }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <input
        id={dataValue}
        name={dataValue}
        type={type}
        value={value || ""} // prevent controlled component error
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
