export const TextArea = ({ dataValue, display, setState, type }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <textarea
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

TextArea.defaultProps = {
  type: "text",
};
