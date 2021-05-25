import { theme } from '../../../styles/theme';

export const getGridSize = (props: Record<string, any>, key: string): number => {
  return Object.entries(props)
    .filter((item) => theme.breakpoints.keySizes.includes(item[0]))
    .map((arr) => ({ [arr[0]]: arr[1] }))
    .map((item) => item[key])
    .filter((item) => item !== undefined)[0];
};
