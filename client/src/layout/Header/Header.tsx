import LogoBlack from '@/../public/assets/logo-black.svg';
import LogoWhite from '@/../public/assets/logo-white.svg';
import Chat from '@/../public/assets/chat.svg';
import User from '@/../public/assets/user.svg';
import Search from '@/../public/assets/search.svg';
import styles from './Header.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { themeState } from '@/states';
import { useRecoilState } from 'recoil';
import { UserProfile } from '@/components';
import { useState } from 'react';
import axios from 'axios';

const darkHeader = 'dark:shadow-dark';

export const Header = () => {
  const [isDark] = useRecoilState(themeState);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = async (e: React.SyntheticEvent) => {
    const searchInput = e.target as HTMLInputElement;
    setInputValue(searchInput.value.trim());

    if (searchInput.value.trim() !== '') {
      setIsOpen(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${searchInput.value}`
      );
      setSearchResult(data);
    } else setIsOpen(false);
  };

  return (
    <header className={classNames(styles.header, darkHeader)}>
      <div className={styles.container}>
        <h1 className="sr-only">친구와 묶이다! BIND</h1>
        <Link href="/" aria-label="로고">
          {isDark ? <LogoWhite /> : <LogoBlack />}
        </Link>
        <form className={styles.form}>
          <label className={styles.label}>
            <Search aria-label="검색" />
            <input
              type="text"
              name="search"
              id="search"
              className={styles.search}
              value={inputValue}
              autoComplete="off"
              placeholder="검색"
              onChange={handleChange}
            />
          </label>
          {isOpen && (
            <output className={styles.output}>
              {searchResult.length !== 0 ? (
                <ul className={styles.list}>
                  {searchResult.map(({ _id, userId, imageURL }) => (
                    <li key={_id}>
                      <Link href={`/${_id}`}>
                        <UserProfile size="small" id={userId} img={imageURL} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>검색 결과가 없습니다.</p>
              )}
            </output>
          )}
        </form>
        <Link href="/chat" aria-label="채팅">
          <Chat />
        </Link>
        <Link href="/user/[]" aria-label="마이페이지">
          <User />
        </Link>
      </div>
    </header>
  );
};
