export const TextArea = ({ dataValue, display, setState, type, value }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <textarea
        id={dataValue}
        name={dataValue}
        type={type}
        value={value ? value : ""}
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
