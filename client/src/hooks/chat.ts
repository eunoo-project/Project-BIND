import { useQuery } from '@tanstack/react-query';
import { getRooms, getRoom } from '@/api';

export const useRooms = () => {
  return useQuery(['rooms'], getRooms, {
    retry: false,
    staleTime: 3000,
    cacheTime: Infinity,
    // refetchInterval: 1500,
    // refetchIntervalInBackground: true,
  });
};

export const useRoom = (id: string) => {
  return useQuery(['room', id], () => getRoom(id), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
