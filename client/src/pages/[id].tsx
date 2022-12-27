import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { Nav, Header } from '@/layout';
import { Post, postProps, User } from '@/containers';
import { useUser } from '@/hooks';
// import { Authorization } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';
import { useEffect } from 'react';
import { Auth } from '@/states/index';

const UserPage = ({ auth, userId }: { auth: Auth; userId: string }) => {
  const { data } = useUser(userId as string);
  const [, setUser] = useRecoilState(userState);

  useEffect(() => setUser(auth));

  return (
    <>
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
    </>
  );
};

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { cookie } = context.req.headers;
  const { id }: any = context.params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie as string,
      },
    }
  );
  const data = await response.json();

  if (!data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { auth: { ...data }, userId: id },
  };
}
