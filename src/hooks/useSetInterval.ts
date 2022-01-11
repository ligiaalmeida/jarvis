import { useEffect, DependencyList } from 'react';

type SetTimeoutProps = {
  condition: boolean;
  callback: () => void;
  delay?: number;
  deps?: DependencyList;
};

export const useSetInterval = ({
  condition = true,
  callback,
  delay = 30000,
}: SetTimeoutProps) => {
  useEffect(() => {
    let clear: NodeJS.Timeout;
    (function timeout() {
      callback();
      if (condition) {
        clear = setTimeout(timeout, delay);
      }
    })();

    return () => {
      clearInterval(clear);
    };
  });
};

/*
    callback();

    if (condition) {
      console.log('Test condition');
      clear = setInterval(() => {
        callback();
      }, delay);
    }
*/
