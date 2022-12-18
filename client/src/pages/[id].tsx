import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { useRouter } from 'next/router';
import { Nav, Header } from '@/layout';
import { Post, postProps, User } from '@/containers';
import { useUser } from '@/hooks';
import { Auth, userState } from '@/states/index';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GetServerSidePropsContext } from 'next';

const UserPage = ({ auth }: { auth: Auth }) => {
  const router = useRouter();
  const id = router.query.id;
  const [, setUser] = useRecoilState(userState);
  const { data } = useUser(id as string);

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

  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth`,
  //   { headers: { Cookie: cookie } }
  // );

  if (!data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { auth: { ...data } },
  };
}
