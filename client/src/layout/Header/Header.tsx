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
import { useSearchUsers } from '../../hooks';

const darkHeader = 'dark:shadow-dark';

interface searchUsersProps {
  _id: string;
  userId: string;
  imageURL: string;
}

export const Header = () => {
  const [isDark] = useRecoilState(themeState);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { data: searchUsers } = useSearchUsers(inputValue);

  const handleChange = (e: React.SyntheticEvent) => {
    const searchInput = e.target as HTMLInputElement;
    setInputValue(searchInput.value.trim());

    if (searchInput.value.trim() !== '') setIsOpen(true);
    else setIsOpen(false);
  };

  const handleClick = (e: React.SyntheticEvent) => {
    const target = e.nativeEvent.target as HTMLElement;
    setInputValue(target.querySelector('span')?.textContent as string);
    setIsOpen(false);
  };

  return (
    <header className={classNames(styles.header, darkHeader)}>
      <div className={styles.container}>
        <h1 className="sr-only">친구와 묶이다! BIND</h1>
        <Link href="/" aria-label="로고">
          {isDark ? <LogoWhite /> : <LogoBlack />}
        </Link>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
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
              {searchUsers?.length > 0 ? (
                <ul className={styles.list}>
                  {searchUsers.map(
                    ({ _id, userId, imageURL }: searchUsersProps) => (
                      <li key={_id}>
                        <Link href={`/${_id}`} onClick={handleClick}>
                          <UserProfile
                            size="small"
                            id={userId}
                            img={imageURL}
                          />
                        </Link>
                      </li>
                    )
                  )}
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
