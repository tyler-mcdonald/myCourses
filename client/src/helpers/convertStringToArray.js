/**
 * Takes a string representing a list and splits the list into an array.
 * @param {object} data - the data object
 * @param {*} key - the key holding the string to be converted
 * @returns
 */
export const convertStringToArray = (data) => {
  const rawString = data.materialsNeeded;
  if (!rawString) return [];
  // (only works if each line begins with `*`)
  const list = rawString.split("*");
  // Remove empty strings & trim whitespace
  const array = list.filter((i) => i !== "").map((i) => i.trim());
  return array;
};
