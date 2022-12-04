import styles from './Button.module.css';

interface ButtonProps {
  size?: 'small' | 'big' | 'long';
  content?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export const Button = ({ size, content, ...args }: ButtonProps) => {
  return (
    <>
      <button className={styles['button-' + size]} {...args}>
        {content && content.length < 4 ? content?.split('').join(' ') : content}
      </button>
    </>
  );
};

Button.defaultProps = {
  size: 'small',
  content: 'button',
};

// import { useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import content from '../../../globals.d';
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