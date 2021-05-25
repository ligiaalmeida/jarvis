import { useRef } from 'react';

export const useFocus = () => {
  const ref = useRef<HTMLDivElement>(null);

  const setFocus = () => {
    ref.current && (ref.current as HTMLDivElement).focus();
  };

  return [ref, setFocus];
};
