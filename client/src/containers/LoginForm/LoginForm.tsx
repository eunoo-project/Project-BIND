import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styles from './LoginForm.module.css';
import { isValidate } from '@/utils';
import { Button, FormInput } from '@/components';
import Link from 'next/link';
import axios from 'axios';
import { userState } from '@/states';

export const LoginFrom = () => {
  const [, setUser] = useRecoilState(userState);

  const [inputs, setInputs] = useState({
    userId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback(
    (e: React.SyntheticEvent) => {
      const { name, value } = e.target as HTMLInputElement;
      setInputs({ ...inputs, [name]: value });
      setErrorMessage('');
    },
    [inputs]
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      userId: { value: id },
      password: { value: pass },
    } = e.target as HTMLFormElement;

    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signin`,
      { userId: id, password: pass }
    );

    if (typeof response === 'string') setErrorMessage(response);
    else setUser(response.response);
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <FormInput
        type="text"
        name="userId"
        label="아이디"
        placeholder="아이디를 입력하세요."
        onChange={handleChange}
      />
      <FormInput
        type="password"
        name="password"
        label="패스워드"
        placeholder="패스워드를 입력하세요."
        onChange={handleChange}
      />
      <output className={styles.output}>{errorMessage}</output>
      <Button
        size="big"
        content="로그인"
        disabled={isValidate(inputs) && 'disabled'}
      />
      <Link href="/signup">
        <span className={styles.link}>회원가입</span>
      </Link>
    </form>
  );
};
