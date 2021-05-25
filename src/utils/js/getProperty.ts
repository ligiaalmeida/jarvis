export const getProperty = <T, K extends keyof T>(obj: T, propertyName: K): T[K] => {
  return obj[propertyName];
};
