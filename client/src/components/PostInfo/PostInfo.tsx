import { Heart, HeartFill, Modal, UserList } from '@/components';
import styles from './PostInfo.module.css';
import { useState } from 'react';

interface PostInfoProps {
  postId: string;
  isLikePost: boolean;
  like: [{ _id: string; userId: string; imageURL?: string }];
  description: string;
  publishDate: string;
  handleLike: () => void;
}

export const PostInfo = ({
  postId,
  isLikePost,
  like,
  description,
  publishDate,
  handleLike,
}: PostInfoProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState('');

  const handleClick = () => {
    if (like.length <= 0) return;
    setClickedId(postId);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.likeInfo}>
        <button onClick={handleLike}>
          {isLikePost ? <HeartFill /> : <Heart />}
        </button>
        <button onClick={handleClick}>
          <span>좋아요 {like.length}개</span>
        </button>
      </div>
      <pre className={styles.description}>{description}</pre>
      <p className={styles.date}>{publishDate}</p>
      {modalOpen && postId === clickedId && (
        <Modal onClick={() => setModalOpen(false)}>
          <UserList users={like} onClick={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};
