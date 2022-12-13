import Heart from '@/../public/assets/heart.svg';
import HeartFill from '@/../public/assets/heart-fill.svg';
import styles from './PostInfo.module.css';

interface PostInfoProps {
  isLikePost: boolean;
  likeCnt: string;
  description: string;
  publishDate: string;
  handleLike: () => void;
}

export const PostInfo = ({
  isLikePost,
  likeCnt,
  description,
  publishDate,
  handleLike,
}: PostInfoProps) => {
  return (
    <>
      <div className={styles.likeInfo}>
        <button onClick={handleLike}>
          {isLikePost ? <HeartFill /> : <Heart />}
        </button>
        <span>좋아요 {likeCnt}개</span>
      </div>
      <pre className={styles.description}>{description}</pre>
      <p className={styles.date}>{publishDate}</p>
    </>
  );
};
