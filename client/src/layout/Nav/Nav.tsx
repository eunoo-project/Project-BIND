import Sun from '@/../public/assets/sun.svg';
import Moon from '@/../public/assets/moon.svg';
import Plus from '@/../public/assets/plus.svg';
import Write from '@/../public/assets/write.svg';
import Logout from '@/../public/assets/logout.svg';
import styles from './Nav.module.css';
import { useState, useCallback } from 'react';
import classNames from 'classnames';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const Nav = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  // const router = useRouter();

  const handleNavOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`, {
      ...user,
    });
    setUser({});
    // router.push('/login');
  };

  const handleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const haldleWrite = () => {
    // router.push('/write');
  };

  return (
    <nav className={classNames(styles.nav, isOpen && styles.openNav)}>
      <button
        type="button"
        className={classNames(styles.open, isOpen && styles.close)}
        aria-label="더보기"
        onClick={handleNavOpen}>
        <Plus />
      </button>
      <button
        type="button"
        className={classNames(!isOpen && 'hidden', styles.logout)}
        aria-label="로그아웃"
        onClick={handleLogout}>
        <Logout />
      </button>
      <button
        type="button"
        aria-label="게시글 작성"
        className={classNames(!isOpen && 'hidden', styles.write)}
        onClick={haldleWrite}>
        <Write />
      </button>
      <button
        type="button"
        aria-label="테마 변경"
        className={classNames(!isOpen && 'hidden', styles.theme)}
        onClick={handleTheme}>
        {isDark ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};
