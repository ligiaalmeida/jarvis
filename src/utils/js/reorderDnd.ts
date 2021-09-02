// a little function to help us with reordering the result
export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  console.log('list >> ', list);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
