import { useAuth } from '@/hooks';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';

export const Authorization = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useAuth();
  const router = useRouter();
  const [, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log(data);
    if (router && !data) router.push('/login');
  }, [router]);

  if (isLoading || !data) return <></>;

  setUser(data);

  return <>{children}</>;
};
