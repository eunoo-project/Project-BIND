import { useAuth } from '@/hooks';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';
import { Logo } from '../Icon';

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

  if (isLoading)
    return (
      <div className="transition-all bg-gradient w-screen h-screen flex justify-center items-center">
        <Logo />
      </div>
    );

  return <>{children}</>;
};
