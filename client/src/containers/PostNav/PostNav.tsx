import { More } from '@/components';
import styles from './PostNav.module.css';
import Link from 'next/link';
import { UserProfile, Button } from '@/components';
import { useState } from 'react';

interface PostNavProps {
  author: {
    _id: string;
    userId: string;
    imageURL?: string;
  };
  myPost: boolean;
  editMode: boolean;
  handleEditMode: () => void;
  handleSubmit: () => void;
  handleRemove: () => void;
}

export const PostNav = ({
  author,
  editMode,
  myPost,
  handleEditMode,
  handleSubmit,
  handleRemove,
}: PostNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <Link href={`${author._id}`} aria-label={`${author.userId} 페이지 이동`}>
        <UserProfile
          size="small"
          id={author.userId}
          imageURL={author.imageURL}
        />
      </Link>
      {myPost && (
        <button onClick={handleOpen} aria-label="더보기">
          <More />
        </button>
      )}
      {isOpen && (
        <div className={styles.nav}>
          {!editMode ? (
            <>
              <Button size="small" content="수정" onClick={handleEditMode} />
              <Button
                size="small"
                content="삭제"
                className="text-rose-600"
                onClick={handleRemove}
              />
            </>
          ) : (
            <>
              <Button
                size="small"
                content="완료"
                onClick={() => {
                  handleSubmit();
                  setIsOpen(false);
                }}
              />
              <Button
                size="small"
                content="취소"
                onClick={() => {
                  handleEditMode();
                  setIsOpen(false);
                }}
                className="text-rose-600"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
