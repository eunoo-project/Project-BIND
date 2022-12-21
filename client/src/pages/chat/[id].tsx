import { Authorization, Message } from '@/components';
import { useRoom } from '@/hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header, Nav } from '@/layout';
import styles from '@/styles/chat.module.css';
import { dateToDate, dateToTime } from '@/utils';
import { ChatForm } from '@/containers';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';
import { Fragment, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Auth } from '@/states/index';
import { GetServerSidePropsContext } from 'next';
interface chat {
  _id: string;
  message: string;
  time: Date;
  id: string;
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const ChatRoom = ({ auth }: { auth: Auth }) => {
  const router = useRouter();
  const id = router.query.id;
  const { data: room } = useRoom(id as string);
  const [liveMessages, setLiveMessages] = useState([] as chat[] | []);
  const [user, setUser] = useRecoilState(userState);
  const chatting = [...(room?.chatting || []), ...liveMessages];

  useEffect(() => setUser(auth));

  useEffect(() => {
    const list = document.querySelector('ul');
    list?.scroll(0, list.scrollHeight);
  });

  useEffect((): any => {
    if (room && (!socket || !socket.connected)) {
      socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
    }
    if (socket?.connected) return () => socket.disconnect();
  }, [room]);

  useEffect((): any => {
    if (room && socket) {
      socket.emit('joinRoom', { roomId: room?._id, userId: user._id });
      socket.on('message', chat => {
        setLiveMessages([...liveMessages, chat]);
      });
    }
    return () => socket?.removeAllListeners();
  });

  const submitMessage = (message: string) => {
    if (!message.trim()) return;
    socket.emit('message', {
      roomId: room?._id,
      chat: { id: user._id, message },
    });
  };

  return (
    <>
      <Head>
        <title>BIND - 채팅 </title>
      </Head>
      <Header />
      <div className="sr-only">
        <Nav />
      </div>
      <main className={styles.main_room}>
        {!room ? (
          <></>
        ) : (
          <ul className={styles.list}>
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
