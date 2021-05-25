import { useEffect, useState } from 'react';
const io = require('socket.io-client/dist/socket.io');

type UseSocketParams = { uri: string; namespace: string };
type UseSocketReturn<T> = { data: T; isConnected: boolean };

export const useSocket = <Data>({ uri, namespace }: UseSocketParams): UseSocketReturn<Data> => {
  const [data, setData] = useState(null!);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(uri + namespace, {
      autoConnect: true,
      forceNew: false,
    });

    socket.on('connect', () => setConnected(true));

    socket.on('message', (data: string) => {
      setData(JSON.parse(data));
    });

    return () => {
      socket.disconnect();
      socket.on('disconnect', () => setConnected(false));
    };
  }, [isConnected, namespace]);

  return { data, isConnected };
};
