import { SpacesCSS } from 'types';

export const formatSpaceSize = (value: SpacesCSS | []): [string] => {
  const unit = value[(value as []).length - 1] as string;
  const numbers = value.filter((item) => typeof item !== 'string') as number[];
  const format = numbers.map((item) => `${item}${item !== 0 ? unit : ''}`).join(' ');

  return [format];
};
