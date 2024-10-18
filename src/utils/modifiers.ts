export const NumberRange = (numbers: string): Array<number> => {
  return numbers.split("-").map((value) => Number(value) || 0);
};

export const NumberRangeString = (numbers: Array<number>): string => {
  return numbers.join("-");
};
