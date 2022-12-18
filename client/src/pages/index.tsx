import Head from 'next/head';
import styles from '@/styles/main.module.css';
import { Nav, Header } from '@/layout';
import { Post } from '@/containers';
import { usePosts } from '@/hooks';
import { postProps } from '@/containers';
import { GetServerSidePropsContext } from 'next';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';
import { useEffect } from 'react';
import { Auth } from '@/states/index';

const Main = ({ auth }: { auth: Auth }) => {
  const { data: posts, isLoading } = usePosts();
  const [, setUser] = useRecoilState(userState);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth`
  //     );
  //     console.log(data);
  //   };
  //   fetchData();
  // });

  useEffect(() => setUser(auth));

  return (
    <>
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
    </>
  );
};

export default Main;

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
  //   {
  //     headers: {
  //       Cookie: cookie,
  //       'Content-type': 'application/json; charset=UTF-8',
  //       Accept: '*/*',
  //     },
  //   }
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
