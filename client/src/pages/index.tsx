import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { Nav, Header } from '@/layout';
import { Post } from '@/containers';
import { usePosts } from '@/hooks/chat';
import { postProps } from '@/containers';

const Main = () => {
  const { data: posts } = usePosts();
  return (
    <>
      <Head>
        <title>BIND</title>
      </Head>
      <Header />
      <Nav />
      <main className={styles.main}>
        <ul className={styles.container}>
          {posts?.map((post: postProps) => (
            <Post key={post._id} post={post} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default Main;
