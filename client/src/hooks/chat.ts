import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/post';

export const usePosts = () => {
  return useQuery(['posts'], getPosts);
};
