import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { useRouter } from 'next/router';
import { Nav, Header } from '@/layout';
import { Post, postProps, User } from '@/containers';
import { useUser } from '@/hooks';
import { Authorization } from '@/components';

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data } = useUser(id as string);

  return (
    <Authorization>
      <Head>
        <title>BIND</title>
      </Head>
      <Header />
      <Nav />
      {data && (
        <main className={styles.main}>
          <User userInfo={data.userInfo} />
          {data.posts?.length > 0 ? (
            <ul className={styles.container}>
              {data.posts.map((post: postProps) => (
                <Post key={post._id} post={post} />
              ))}
            </ul>
          ) : (
            <div className={styles.empty + ' h-3/5'}>
              <p>BIND</p>
              <p>게시글이 없습니다...</p>
            </div>
          )}
        </main>
      )}
    </Authorization>
  );
};

export default UserPage;
