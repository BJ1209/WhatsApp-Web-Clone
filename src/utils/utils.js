export const spliceString = (str, n1, n2) => {
  return str.slice(0, n1) + " " + str.slice(n2, str.length);
};
