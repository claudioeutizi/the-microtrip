import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io.connect(url);
    setSocket(socket);
    socket.on('disconnect', handleDisconnect);
    
    return () => {
      socket.disconnect();
      socket.off('disconnect', handleDisconnect);
    }
  }, [url]);

  const handleDisconnect = () => {
    console.log('Disconnected from server');
  }

  return socket;
};