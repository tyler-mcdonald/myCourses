export const handleErrors = (statusCode) => {
  if (statusCode === 500) return "/forbidden";
  if (statusCode === 404) return "/notfound";
};
