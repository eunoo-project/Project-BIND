import { useQuery } from '@tanstack/react-query';
import { getSearchUsers, auth } from '@/api/user';

export const useAuth = () => {
  return useQuery(['auth'], auth);
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
