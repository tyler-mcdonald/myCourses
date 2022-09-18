export const Input = ({ dataValue, display, setUser, type }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <input
        id={dataValue}
        name={dataValue}
        type={type}
        onChange={(e) =>
          setUser((prevState) => {
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
