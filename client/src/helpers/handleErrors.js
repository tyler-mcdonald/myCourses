export const handleErrors = (error) => {
  const handledError = {};

  if (error.response.status === 400) {
    handledError.messages = error.response.data.errors;
  }
  if (error.response.status === 401) {
    handledError.messages = "Email and/or password is incorrect";
  }
  if (error.response.status === 403) {
    handledError.route = "/forbidden";
    handledError.messages = error.response.data.message;
  }
  if (error.response.status === 404) {
    handledError.route = "/notfound";
  }
  if (error.response.status === 500) {
    handledError.route = "/error";
  }
  return handledError;
};
