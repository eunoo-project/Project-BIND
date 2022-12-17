import styles from './Post.module.css';
import { PostInfo } from '@/components';
import { PostNav } from '@/containers';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userState } from '@/states';
import { updatePost, deletePost } from '@/api';
import Image from 'next/image';
import { dateToString } from '@/utils';

export interface postProps {
  _id: string;
  author: {
    _id: string;
    userId: string;
    imageURL?: string;
  };
  imageURL: string;
  like: [string];
  likeCnt: string;
  publishDate: Date;
  description: string;
  [key: string]: unknown;
}

export const Post = ({ post }: { post: postProps }) => {
  const [user] = useRecoilState(userState);
  const [editmode, setEditMode] = useState(false);
  const [editValue, setEditvalue] = useState(post.description);
  const patch = useMutation(updatePost);
  const remove = useMutation(deletePost);
  const queryClient = useQueryClient();

  const handleEditMode = () => setEditMode(!editmode);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setEditvalue(target.value);
  };

  const handleSubmit = () => {
    if (!editValue.trim()) {
      setEditMode(false);
      return;
    }
    patch.mutate(
      { postId: post._id, payload: { description: editValue } },
      {
        onSuccess() {
          queryClient.invalidateQueries();
          setEditMode(false);
          setEditvalue(editValue);
        },
      }
    );
  };

  const handleLike = () => {
    patch.mutate(
      {
        postId: post._id,
        payload: {
          like: post.like.includes(user._id as string) ? 'remove' : 'add',
        },
      },
      {
        onSuccess() {
          queryClient.invalidateQueries();
        },
      }
    );
  };

  const handleRemove = () => {
    remove.mutate(
      {
        postId: post._id,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries();
        },
      }
    );
  };

  return (
    <li className={styles.conatiner}>
      <PostNav
        author={post.author}
        editMode={editmode}
        myPost={post.author._id === user._id}
        handleEditMode={handleEditMode}
        handleSubmit={handleSubmit}
        handleRemove={handleRemove}
      />
      <figure className={styles.figure}>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${post.imageURL}`}
          alt=""
          width={0}
          height={0}
          unoptimized={true}
          priority
        />
        <figcaption className="sr-only">{`${post.author.userId} 님의 게시물`}</figcaption>
      </figure>
      {!editmode ? (
        <PostInfo
          isLikePost={post.like.includes(user._id as string)}
          likeCnt={post.likeCnt}
          description={post.description}
          publishDate={dateToString(post.publishDate)}
          handleLike={handleLike}
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={editValue}
          placeholder="포스트의 내용을 입력하세요."
          onChange={handleChange}
        />
      )}
    </li>
  );
};
