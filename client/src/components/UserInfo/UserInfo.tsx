import styles from './UserInfo.module.css';
import { Modal } from '../Modal/Modal';
import { UserList } from '../UserList/UserList';
import { useState } from 'react';

interface UserInfoProps {
  binder: [{ _id: string; userId: string; imageURL?: string }];
  binding: [{ _id: string; userId: string; imageURL?: string }];
  postCnt?: string;
  [key: string]: unknown;
}

// cnt 값이 4자리를 초과할 경우 축소 표현을 유틸 함수로 만들어 사용할까?

export const UserInfo = ({ binder, binding, postCnt }: UserInfoProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<null | typeof binder>(null);

  const handleClick = (clicked: string) => {
    if (clicked === 'binder' && binder.length <= 0) return;
    if (clicked === 'binding' && binding.length <= 0) return;
    clicked === 'binder' ? setSelected(binder) : setSelected(binding);
    setModalOpen(true);
  };

  return (
    <>
      <ul className={styles.container}>
        <li className={styles.list}>
          <span>{postCnt}</span> 포스트
        </li>
        <li className={styles.list}>
          <button
            className={styles.button}
            onClick={() => handleClick('binder')}>
            <span>{binder.length}</span> 바인더
          </button>
        </li>
        <li className={styles.list}>
          <button
            className={styles.button}
            onClick={() => handleClick('binding')}>
            <span>{binding.length}</span> 바인딩
          </button>
        </li>
      </ul>
      {modalOpen && (
        <Modal onClick={() => setModalOpen(false)}>
          <UserList
            users={selected as typeof binder}
            onClick={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};
