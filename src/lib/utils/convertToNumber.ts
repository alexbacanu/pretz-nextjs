export const convertToNumber = (value: string | string[]): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (Array.isArray(value)) {
    return Number(value[0]);
  }

  return parseInt(value, 10);
};
