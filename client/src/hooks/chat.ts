import { useQuery } from '@tanstack/react-query';
import { getRooms, getRoom, getAlarm } from '@/api';

export const useRooms = () => {
  return useQuery(['rooms'], getRooms, {
    retry: false,
    refetchInterval: 3000,
  });
};

export const useRoom = (id: string) => {
  return useQuery(['room', id], () => getRoom(id), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useAlarm = () => {
  return useQuery(['alarm'], getAlarm, {
    refetchInterval: 3000,
  });
};
