import SmallProfile from '@/../public/assets/profile-small.svg';
import BigProfile from '@/../public/assets/profile-big.svg';
import styles from './UserProfile.module.css';
import classNames from 'classnames';
import Image from 'next/image';

interface UserProfileProps {
  size?: 'big' | 'small';
  id: string;
  img?: string;
  // 해당 유저 페이지로 이동하는 함수
  onClick?: () => void;
  [key: string]: unknown;
}

//prettier-ignore
export const UserProfile = ({ id, size, img, ...props }: UserProfileProps) => (
  <button className={classNames(styles.button, size === 'big' && 'flex-col') } {...props}>
    {size === 'big' ? (
      img ?  '이미지' : <BigProfile fill="#222222" />
    ) : (
      img ?  '이미지' : <SmallProfile fill="#222222" />
    )}
    <span className={styles.id}>{id}</span>
  </button>
);

UserProfile.defaultProps = {
  id: 'empty',
  size: 'small',
};
