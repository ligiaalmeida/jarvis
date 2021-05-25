export const getTime = (timestamp: number | string) => {
  return `${new Date(timestamp).toString().split(' ')[4].replace(/(:)/, 'h ').replace(/(:)/, "' ")}"`;
};
