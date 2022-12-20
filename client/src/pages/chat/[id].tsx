import { Message } from '@/components';
import { useRoom } from '@/hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from '@/layout';
import styles from '@/styles/chat.module.css';
import { dateToDate, dateToTime } from '@/utils';
import { ChatForm } from '@/containers';
import { Auth, userState } from '@/states';
import { GetServerSidePropsContext } from 'next';
import { useRecoilState } from 'recoil';
import { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

interface chat {
  _id: string;
  message: string;
  time: Date;
  id: string;
}

const ChatRoom = ({ auth }: { auth: Auth }) => {
  const router = useRouter();
  const id = router.query.id;
  const { data: room } = useRoom(id as string);
  const [liveMessages, setLiveMessages] = useState([] as chat[] | []);
  const [user, setUser] = useRecoilState(userState);
  const queryclient = useQueryClient();
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
  const chatting = [...(room?.chatting || []), ...liveMessages];

  useEffect(() => setUser(auth));

  useEffect(() => {
    const list = document.querySelector('ul');
    list?.scroll(0, list.scrollHeight);
  });

  useEffect((): any => {
    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId: room?._id, userId: user._id });
      socket.on('message', chat => {
        setLiveMessages([...liveMessages, chat]);
      });
    });
    if (socket) return () => socket.disconnect();
  });

  const submitMessage = (message: string) => {
    socket.emit('message', {
      roomId: room?._id,
      chat: { id: user._id, message },
    });
    queryclient.invalidateQueries(['rooms']);
  };

  return (
    <>
      <Head>
        <title>BIND - 채팅 </title>
      </Head>
      <Header />
      <main className={styles.main_room}>
        {!room ? (
          <></>
        ) : (
          <ul className={styles.container}>
            {chatting.map((chat: chat, i: number) => (
              <Fragment key={chat._id || i}>
                {dateToDate(chatting[i - 1]?.time) !==
                  dateToDate(chat.time) && (
                  <li className={styles.date}>{dateToDate(chat.time)}</li>
                )}
                <Message
                  message={chat.message}
                  time={
                    dateToTime(chatting[i + 1]?.time) !==
                      dateToTime(chat.time) || chatting[i + 1]?.id !== chat.id
                      ? dateToTime(chat.time)
                      : ''
                  }
                  isMyMessage={chat.id === user._id}
                />
              </Fragment>
            ))}
          </ul>
        )}
        <ChatForm submit={submitMessage} />
      </main>
    </>
  );
};

export default ChatRoom;

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
