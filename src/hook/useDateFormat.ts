export const useDateFormat = (date: string) => {
  const d = new Date(date);
  const addedZero = (num: number) => (num < 9 ? `0${num}` : num);
  return `${addedZero(d.getDate())}.${addedZero(d.getMonth() + 1)}.${d.getFullYear()}`;
};
