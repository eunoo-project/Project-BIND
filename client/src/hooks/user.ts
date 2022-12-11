import { getSearchUsers } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

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
