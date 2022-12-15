import { BigProfile, SmallProfile } from '@/components';
import styles from './UserProfile.module.css';
import classNames from 'classnames';
import Image from 'next/image';

interface UserProfileProps {
  size: 'big' | 'small';
  id: string;
  imageURL?: string;
  // 해당 유저 페이지로 이동하는 함수
  [key: string]: unknown;
}

export const UserProfile = ({
  id,
  size,
  imageURL,
  ...props
}: UserProfileProps) => (
  <div
    className={classNames(styles.container, size === 'big' && 'flex-col')}
    {...props}>
    {size === 'big' ? (
      imageURL ? (
        <div className={styles.bigBox}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${imageURL}`}
            alt=""
            width={68}
            height={68}
            unoptimized={true}
          />
        </div>
      ) : (
        <BigProfile />
      )
    ) : imageURL ? (
      <div className={styles.smallBox}>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${imageURL}`}
          alt=""
          width={24}
          height={24}
          unoptimized={true}
        />
      </div>
    ) : (
      <SmallProfile />
    )}
    <span className={styles.id}>{id}</span>
  </div>
);
