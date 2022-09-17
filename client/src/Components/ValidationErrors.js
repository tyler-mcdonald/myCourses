const ValidationErrors = ({ errors }) => {
  if (errors.length > 0) {
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ValidationErrors;
