import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api';

export const usePosts = () => {
  return useQuery(['posts'], getPosts);
};
