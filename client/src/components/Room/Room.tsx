import { UserProfile, Exit } from '@/components';
import styles from './Room.module.css';
import { dateToString } from '@/utils';
import Link from 'next/link';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { exitRoom } from '@/api';

export interface RoomProps {
  roomId: string;
  opponent: {
    _id: string;
    userId: string;
    imageURL?: string;
  };
  lastChat: {
    _id: string;
    message?: string;
    time?: Date;
    [key: string]: unknown;
  };
  unreadCnt: string;
}

export const Room = ({ roomId, opponent, lastChat, unreadCnt }: RoomProps) => {
  // const queryClient = useQueryClient();
  // const mutaion = useMutation(exitRoom);

  // const handleExit = () => {
  //   if (confirm('채팅방을 나가시겠습니까?')) {
  //     mutaion.mutate(roomId, {
  //       onSuccess() {
  //         queryClient.invalidateQueries();
  //       },
  //     });
  //   }
  // };

  if (!lastChat) return <></>;

  return (
    <li className={styles.conatiner}>
      <Link href={`chat/${opponent._id}`} className={styles.room}>
        <UserProfile
          size="small"
          id={opponent.userId}
          imageURL={opponent.imageURL}
        />
        <span className={styles.date}>
          {dateToString(lastChat?.time as Date)}
        </span>
        <p className={styles.message}>{lastChat?.message}</p>
        {Number(unreadCnt) > 0 && (
          <p className={styles.count}>
            {Number(unreadCnt) > 100 ? '99+' : unreadCnt}
          </p>
        )}
      </Link>
      {/* <button
        aria-label="나가기"
        className={styles.button}
        onClick={handleExit}>
        <Exit />
      </button> */}
    </li>
  );
};
