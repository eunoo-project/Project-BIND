import { Sun, Moon, Plus, Write, Logout } from '@/components';
import styles from './Nav.module.css';
import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { userState, themeState } from '@/states';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const Nav = () => {
  const [user, setUser] = useRecoilState(userState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    !localStorage.getItem('BIND_THEME') &&
      localStorage.setItem(
        'BIND_THEME',
        `${window.matchMedia('(prefers-color-scheme: dark)').matches}`
      );
    const isDark = localStorage.getItem('BIND_THEME') === 'true';

    isDark && document.documentElement.classList.add('dark');
    setTheme(isDark);
  }, []);

  const handleNavOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signout`, {
      user,
    });
    setUser({ _id: null, userId: null, imageURL: null });
    router.push('/login');
  };

  const handleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('BIND_THEME', `${!theme}`);
    setTheme(!theme);
  };

  const haldleWrite = () => {
    router.push('/write');
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
        {theme ? <Sun /> : <Moon />}
      </button>
      <button
        type="button"
        className={classNames(!isOpen && 'hidden', styles.logout)}
        aria-label="로그아웃"
        onClick={handleLogout}>
        <Logout />
      </button>
    </nav>
  );
};
