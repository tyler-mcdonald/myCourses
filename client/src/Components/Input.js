export const Input = ({ dataValue, display, setUser }) => {
  return (
    <>
      <label htmlFor={dataValue}>{display}</label>
      <input
        id={dataValue}
        name={dataValue}
        type="text"
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
