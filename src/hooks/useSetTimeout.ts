import { useEffect } from 'react';

type SetTimeoutProps = {
  condition: boolean;
  callback: () => void;
  timer?: number;
};

export const useSetTimeout = ({
  condition = true,
  callback,
  timer = 30000,
}: SetTimeoutProps) => {
  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    if (condition) {
      timeOut = setTimeout(() => callback(), timer);
    }

    return () => clearTimeout(timeOut);
  });
};
