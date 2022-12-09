import SmallProfile from '@/../public/assets/profile-small.svg';
import BigProfile from '@/../public/assets/profile-big.svg';
import styles from './UserProfile.module.css';
import classNames from 'classnames';
import Image from 'next/image';

interface UserProfileProps {
  size: 'big' | 'small';
  id: string;
  img?: string;
  // 해당 유저 페이지로 이동하는 함수
  [key: string]: unknown;
}

//prettier-ignore
export const UserProfile = ({ id, size, img, ...props }: UserProfileProps) => (
  <div className={classNames(styles.container, size === 'big' && 'flex-col') } {...props}>
    {size === 'big' ? (
      img ?  '이미지' : <BigProfile  />
    ) : (
      img ?  '이미지' : <SmallProfile  />
    )}
    <span className={styles.id}>{id}</span>
  </div>
);
