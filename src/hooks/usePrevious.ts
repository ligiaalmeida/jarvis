import { useEffect, useRef } from 'react';

export const usePrevious = (value: number | string) => {
  const ref = useRef(0);

  useEffect(() => {
    ref.current = value as number;
  });

  return ref.current;
};
