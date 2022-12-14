import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styles from './LoginForm.module.css';
import { isValidate } from '@/utils';
import { Button, FormInput } from '@/components';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { userState } from '@/states';
import { signin } from '@/api';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [, setUser] = useRecoilState(userState);
  const router = useRouter();
  const mutation = useMutation(signin);

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      userId: { value: id },
      password: { value: pass },
    } = e.target as HTMLFormElement;

    mutation.mutate(
      { userId: id, password: pass },
      {
        onSuccess(data) {
          if (typeof data === 'string') setErrorMessage(data);
          else {
            setUser(data);
            router.push('/');
          }
        },
      }
    );
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
