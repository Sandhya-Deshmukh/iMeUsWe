export const IsValidString = (inputString) => {
  if (inputString === undefined) {
    return false;
  }
  if (inputString === null) {
    return false;
  }

  let input = String(inputString);

  return input.trim().length > 0;
};

export const IsValidStatusCode = (input) => {
  if (input === undefined) {
    return false;
  }
  return input !== null;
};
