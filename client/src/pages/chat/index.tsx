import { RoomList } from '@/containers';
import { Header, Nav } from '@/layout';
import Head from 'next/head';
import styles from '@/styles/chat.module.css';
import { Auth, userState } from '@/states/index';
import { GetServerSidePropsContext } from 'next';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

const ChatRooms = ({ auth }: { auth: Auth }) => {
  const [, setUser] = useRecoilState(userState);

  useEffect(() => setUser(auth));

  return (
    <>
      <Head>
        <title>BIND - chat</title>
      </Head>
      <Header />
      <Nav />
      <main className={styles.main}>
        <RoomList />
      </main>
    </>
  );
};

export default ChatRooms;

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
