import styles from '@/styles/write.module.css';
import { Button, PlusBig } from '@/components';
import { Header } from '@/layout';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { addPost } from '@/api';
import { GetServerSidePropsContext } from 'next';
import axios from '@/utils/axios';
import { Auth, userState } from '@/states';
import { useRecoilState } from 'recoil';

const Write = ({ auth }: { auth: Auth }) => {
  const [imageURL, setImageURL] = useState('');
  const [value, setValue] = useState('');
  const router = useRouter();
  const mutation = useMutation(addPost);
  const queryClient = new QueryClient();
  const [, setUser] = useRecoilState(userState);

  useEffect(() => setUser(auth));

  const handleInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const [imageFile] = target.files as FileList;
    if (!imageFile) return;
    const fileReader = new FileReader();
    fileReader.onload = ({ target }) => {
      setImageURL(target?.result as string);
    };
    fileReader.readAsDataURL(imageFile);
  };

  const handleTextArea = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const [input, textarea] = e.target as HTMLFormElement;
    const [post] = (input as HTMLInputElement).files as FileList;
    const description = (textarea as HTMLTextAreaElement).value;

    const formData = new FormData();
    formData.append('post', post);
    formData.append('description', description);
    mutation.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries();
        (input as HTMLInputElement).files = null;
        router.push('/');
      },
    });
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.container} onSubmit={handleSubmit}>
          <div className={styles.imageArea}>
            <label className={styles.label} aria-label="포스트 이미지 등록">
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onInput={handleInput}
              />
              <PlusBig />
            </label>
            {imageURL && (
              <Image
                src={imageURL}
                alt=""
                width={0}
                height={0}
                unoptimized={true}
                priority
                className={styles.preview}
              />
            )}
          </div>
          <textarea
            className={styles.description}
            value={value}
            placeholder="내용을 입력하세요!"
            onChange={handleTextArea}
          />
          <div className={styles.buttonArea}>
            <Button
              type="button"
              size="big"
              content="취소"
              onClick={() => router.back()}
            />
            <Button type="submit" size="big" content="등록" />
          </div>
        </form>
      </main>
    </>
  );
};

export default Write;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { cookie } = context.req.headers;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth`,
    { headers: { Cookie: cookie } }
  );

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
