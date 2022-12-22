import { UserProfile } from '@/components';
import { useRouter } from 'next/navigation';
import styles from './UserList.module.css';

interface UserListProps {
  users: [
    {
      _id: string;
      userId: string;
      imageURL?: string;
    }
  ];
  onClick: () => void;
}

export const UserList = ({ users, onClick }: UserListProps) => {
  const router = useRouter();
  return (
    <ul className={styles.list}>
      {users.map(user => (
        <li key={user._id}>
          <button
            onClick={() => {
              router.push(`${user._id}`);
              onClick();
            }}>
            <UserProfile
              size="small"
              id={user.userId}
              imageURL={user?.imageURL}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
