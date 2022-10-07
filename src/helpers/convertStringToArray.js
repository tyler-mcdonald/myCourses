/**
 * Takes a list and splits the list into an array.
 * @param {string} string a string containing a list separated by `*` or `,`
 * @returns {array} array
 */
export const convertStringToArray = (string) => {
  if (!string) return [];
  const list = string.split(/[,*]+/g); // split by * or ,
  const array = list.filter((i) => i !== "").map((i) => i.trim());
  return array;
};
