import { useEffect, useState } from 'react';

type LocalStorage = [string, (value: string) => void];

type UseLocalStorageProps = (key: string, initialState: string, isRemove?: boolean) => LocalStorage;

export const useLocalStorage: UseLocalStorageProps = (key, initialState, isRemove) => {
  const getItem = localStorage.getItem(key);
  const [item, setItem] = useState(getItem || initialState);

  useEffect(() => {
    localStorage.setItem(key, item);
    if (isRemove) localStorage.removeItem(key);
  });

  return [item, setItem];
};
