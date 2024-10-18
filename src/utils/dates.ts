export const nDaysAfter = (date: Date, n: number): Date => {
  const output = new Date(date);
  output.setDate(output.getDate() + n);

  return output;
};

export const setDateToMidnight = (date: Date): void => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
};
