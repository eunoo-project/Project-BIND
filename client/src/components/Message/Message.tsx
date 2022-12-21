import classNames from 'classnames';
import styles from './Message.module.css';

interface MessageProps {
  message?: string;
  time?: string;
  isMyMessage?: boolean;
  [key: string]: unknown;
}

export const Message = ({ message, time, isMyMessage }: MessageProps) => {
  return (
    <li
      className={classNames(
        styles.container,
        isMyMessage && 'flex-row-reverse'
      )}>
      <pre className={isMyMessage ? styles.myMessage : styles.othersMessage}>
        {message}
      </pre>
      <span className={styles.time}>{time}</span>
    </li>
  );
};
