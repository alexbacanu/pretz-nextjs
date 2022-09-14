export const convertToNumber = (value: string): number => {
  if (value === null || value === undefined) {
    return 0;
  }
  return parseInt(value, 10);
};
