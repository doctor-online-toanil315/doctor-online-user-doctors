export const getFirstLetter = (name: string): string => {
  const arr = name.split(' ');
  return arr[arr.length - 1][0];
};
