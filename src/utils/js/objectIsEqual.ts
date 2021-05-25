import { UDynamicProperties } from 'types';

export const objectIsEqual = (prevProps: UDynamicProperties, nextProps: UDynamicProperties) => {
  const aKeys = Object.getOwnPropertyNames(prevProps);
  const bKeys = Object.getOwnPropertyNames(nextProps);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((el) => prevProps[el] === nextProps[el]);
};
