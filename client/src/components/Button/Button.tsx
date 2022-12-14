import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  size?: 'small' | 'big' | 'long';
  content?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}

const darkMode = 'dark:bg-black dark:shadow-dark';

export const Button = ({
  size,
  content,
  className,
  as,
  ...args
}: ButtonProps) => {
  const TagName = as || 'button';
  return (
    <>
      <TagName
        className={classNames(
          styles.button,
          styles['button-' + size],
          className,
          darkMode
        )}
        {...args}>
        {content && content.length < 4 ? content?.split('').join(' ') : content}
      </TagName>
    </>
  );
};

// import { useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import content from '../../../globals.d';
// import { classNames } from 'classnames';
// useEffect((): any => {
// const fetch = async () => {
//   const { data } = await axios.get('http://localhost:5500/');
//   console.log(data);
//   return data;
// };
// fetch();
// const socket = io('http://localhost:5500', {
//   path: '/chat',
// });
// console.log(socket);
// socket.on('connect', () => {
//   console.log('연결 성공', socket, socket.id);
// });
// if (socket) return () => socket.disconnect();
// });
