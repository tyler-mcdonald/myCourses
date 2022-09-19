export const handleErrors = (error) => {
  const handledError = {};
  // if (error.response.status === 500) return "/forbidden";
  if (error.response.status === 500) {
    handledError.route = "/forbidden";
  }
  if (error.response.status === 404) {
    handledError.route = "/notfound";
  }
  if (error.response.status === 400) {
    handledError.messages = error.response.data.errors;
  }
  return handledError;
};
