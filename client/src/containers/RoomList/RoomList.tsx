import { useRooms } from '../../hooks/chat';
import { Room, RoomProps } from '@/components';
import styles from './RoomList.module.css';

export const RoomList = () => {
  const { data: rooms } = useRooms();

  if (!rooms) return <></>;
  return (
    <>
      {rooms?.length > 0 && rooms.every((room: RoomProps) => room?.lastChat) ? (
        <ul className={styles.container}>
          {rooms.map((room: RoomProps) => (
            <Room key={room.roomId} {...room} />
          ))}
        </ul>
      ) : (
        <div className={styles.empty + ' h-full'}>
          <p>BIND</p>
          <p>대화중인 상대가 없습니다...</p>
        </div>
      )}
    </>
  );
};
