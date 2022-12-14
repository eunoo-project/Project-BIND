import { useAuth } from '@/hooks';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';

export const Authorization = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useAuth();
  const [, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push('/login');
    }
    if (!isLoading && data) {
      setUser(data);
    }
  }, [isLoading, data]);

  if (isLoading) return <>로딩중....</>;

  return <>{children}</>;
};
