import { useEffect, useState } from 'react';

type SessionStorage = [string, (value: string) => void];

type UseSessionStorageProps = (
  key: string,
  initialState: string,
  isRemove?: boolean
) => SessionStorage;

export const useSessionStorage: UseSessionStorageProps = (
  key,
  initialState,
  isRemove
) => {
  const getItem = sessionStorage.getItem(key);
  const [item, setItem] = useState(getItem || initialState);

  useEffect(() => {
    sessionStorage.setItem(key, item);
    if (isRemove) sessionStorage.removeItem(key);
  }, [item, key, initialState, isRemove]);

  return [item, setItem];
};
