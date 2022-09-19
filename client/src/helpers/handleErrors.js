export const handleErrors = (error) => {
  const handledError = {};
  console.log(error);
  if (error.response.status === 400) {
    handledError.messages = error.response.data.errors;
  }
  if (error.response.status === 403) {
    handledError.messages = error.response.data.message;
  }
  if (error.response.status === 404) {
    handledError.route = "/notfound";
  }
  if (error.response.status === 500) {
    handledError.route = "/forbidden";
  }
  return handledError;
};
