/**
 * Takes a string representing a list and splits the list into an array.
 * @param {object} data - the data object
 * @returns
 */
export const convertStringToArray = (string) => {
  if (!string) return [];
  const list = string.split(/[,*]+/g); // split by * or ,
  const array = list.filter((i) => i !== "").map((i) => i.trim());
  return array;
};
