import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { Nav, Header } from '@/layout';
import { Post } from '@/containers';
import { usePosts } from '@/hooks';
import { postProps } from '@/containers';
import { Authorization } from '@/components';

const Main = () => {
  const { data: posts, isLoading } = usePosts();

  return (
    <Authorization>
      <Head>
        <title>BIND</title>
      </Head>
      <Header />
      <Nav />
      <main className={styles.main}>
        {isLoading ? (
          <></>
        ) : posts?.length > 0 ? (
          <ul className={styles.container}>
            {posts.map((post: postProps) => (
              <Post key={post._id} post={post} />
            ))}
          </ul>
        ) : (
          <div className={styles.empty + ' h-full'}>
            <p>BIND</p>
            <p>포스트가 없습니다...</p>
          </div>
        )}
      </main>
    </Authorization>
  );
};

export default Main;
