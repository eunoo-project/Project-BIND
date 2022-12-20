import styles from './ChatForm.module.css';
import { Send } from '@/components';
import { useState } from 'react';

interface ChatFormProps {
  submit: (message: string) => void;
}

export const ChatForm = ({ submit }: ChatFormProps) => {
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent) => {
    setMessage((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    submit(message);
    setMessage('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="message">
        메세지 입력창
      </label>
      <input
        type="text"
        className={styles.input}
        value={message}
        id="message"
        autoComplete="off"
        placeholder="메세지를 입력하세요..."
        onChange={handleChange}
      />
      <button aria-label="전송" className={styles.button}>
        <Send />
      </button>
    </form>
  );
};
