/**
 * Takes error object and returns a new object containing error messages and/or redirect routes
 * @param {object} error - the error object
 * @returns
 */
export const handleErrors = (error) => {
  const handledError = {};
  const statusCode = error.response.status;
  console.error(error);

  switch (statusCode) {
    case 400:
      handledError.messages = error.response.data.errors;
      break;
    case 401:
      handledError.messages = "Email and/or password is incorrect";
      break;
    case 403:
      handledError.route = "/forbidden";
      handledError.messages = error.response.data.message;
      break;
    case 404:
      handledError.route = "/notfound";
      break;
    case 500:
      handledError.route = "/error";
      break;
    default:
      handledError.route = "/error";
  }

  return handledError;
};
