import styles from './Post.module.css';
import { PostInfo } from '@/components';
import { PostNav } from '@/containers';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';
import Image from 'next/image';

export interface postProps {
  _id: string;
  author: {
    _id: string;
    userId: string;
    posts: [string];
    imageURL: string;
  };
  imageURL: string;
  likeCnt: string;
  publishDate: Date;
  description: string;
  [key: string]: unknown;
}

export const Post = ({ post }: { post: postProps }) => {
  const [user] = useRecoilState(userState);
  const [editmode, setEditMode] = useState(false);

  const handleEditMode = () => setEditMode(!editmode);

  console.log(user);

  return (
    <li className={styles.conatiner}>
      <PostNav
        author={post.author}
        editMode={editmode}
        myPost={post.author._id === user?._id}
        handleEditMode={handleEditMode}
      />
      <figure className={styles.figure}>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${post.imageURL}`}
          alt=""
          width={0}
          height={0}
          unoptimized={true}
        />
        <figcaption className="sr-only">{`${post.author.userId} 님의 게시물`}</figcaption>
      </figure>
      {!editmode ? <PostInfo /> : <textarea />}
    </li>
  );
};
