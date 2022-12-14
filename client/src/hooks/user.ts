import { useQuery } from '@tanstack/react-query';
import { getSearchUsers, getUser, auth } from '@/api';

export const useAuth = () => {
  return useQuery(['auth'], auth, {
    retry: false,
  });
};

export const useUser = (id: string) => {
  return useQuery(['user', id], () => getUser(id), {
    enabled: !!id,
  });
};

// 검색된 유저 반환 훅
export const useSearchUsers = (searchText: string) => {
  return useQuery(
    ['searchUsers', searchText],
    () => getSearchUsers(searchText),
    {
      enabled: !!searchText,
    }
  );
};
