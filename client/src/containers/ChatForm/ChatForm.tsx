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

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    setMessage(() => (e.target as HTMLInputElement).value + '\n');
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const [input] = e.target as HTMLFormElement;
    submit(message);
    setMessage('');
    (input as HTMLInputElement).focus();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        // type="text"
        aria-label="메세지 입력창"
        className={styles.texterea}
        value={message}
        id="message"
        autoComplete="off"
        placeholder="메세지를 입력하세요..."
        onChange={handleChange}
        onKeyDown={handleEnterKey}
      />
      <button aria-label="전송" className={styles.button}>
        <Send />
      </button>
    </form>
  );
};
