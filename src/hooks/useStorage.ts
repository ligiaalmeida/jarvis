import { useEffect, useState } from 'react';
import { StorageType } from 'types';

type Storage = [string, (payload: string) => void];

type UseStorageProps = {
  storageType: StorageType;
  key: string;
  state: string;
  isRemove?: boolean;
};

export const useStorage = ({
  storageType,
  key,
  state,
  isRemove,
}: UseStorageProps): Storage => {
  const getItemLocal = localStorage.getItem(key);
  const getItemSession = sessionStorage.getItem(key);
  const [item, setItem] = useState(
    storageType === 'local' ? getItemLocal || state : getItemSession || state
  );

  const switchStorage = () => {
    switch (storageType) {
      case 'local':
        localStorage.setItem(key, item);
        if (isRemove) localStorage.removeItem(key);
        break;
      case 'session':
        sessionStorage.setItem(key, item);
        if (isRemove) sessionStorage.removeItem(key);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switchStorage();
  });

  return [item, setItem];
};
