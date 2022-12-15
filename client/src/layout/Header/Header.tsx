import { LogoBlack, LogoWhite, Chat, User, Search } from '@/components';
import styles from './Header.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { userState, themeState } from '@/states';
import { useRecoilState } from 'recoil';
import { UserProfile } from '@/components';
import { useState, useEffect } from 'react';
import { useSearchUsers } from '../../hooks';

const darkHeader = 'dark:shadow-dark dark:bg-black';

interface searchUsersProps {
  _id: string;
  userId: string;
  imageURL?: string;
}

export const Header = () => {
  const [user] = useRecoilState(userState);
  const [isDark] = useRecoilState(themeState);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { data: searchUsers } = useSearchUsers(inputValue);

  useEffect(() => {
    document.body.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isOpen && target.matches('input')) return;
      setIsOpen(false);
    });
    return document.body.removeEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isOpen && target.matches('input')) return;
      setIsOpen(false);
    });
  }, []);

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
        <Link href="/" aria-label="메인페이지">
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
                            imageURL={imageURL}
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
        <Link href="/chat" aria-label="채팅페이지">
          <Chat />
        </Link>
        <Link href={`/${user._id}`} aria-label="마이페이지">
          <User />
        </Link>
      </div>
    </header>
  );
};
