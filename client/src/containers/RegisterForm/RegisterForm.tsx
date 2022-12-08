import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styles from './RegisterForm.module.css';
import { isValidate } from '@/utils';
import { Button, FormInput } from '@/components';
import Link from 'next/link';
import axios from 'axios';
import { userState } from '@/states';
import { useRouter } from 'next/router';

export const RegisterForm = () => {
  const [, setUser] = useRecoilState(userState);
  const router = useRouter();

  const [inputs, setInputs] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`,
      { userId: id, password: pass }
    );

    if (typeof response === 'string') setErrorMessage(response);
    else {
      setUser(response.response);
      router.push('/');
    }
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
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        onChange={handleChange}
      />
      <FormInput
        type="password"
        name="confirmPassword"
        label="비밀번호 확인"
        placeholder="비밀번호를 확인합니다."
        onChange={handleChange}
      />
      <output className={styles.output}>{errorMessage}</output>
      <Button
        size="big"
        content="회원가입"
        disabled={isValidate(inputs) && 'disabled'}
      />
      <Link href="/login">
        <span className={styles.link}>로그인</span>
      </Link>
    </form>
  );
};
