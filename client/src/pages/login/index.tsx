import Head from 'next/head';
import styles from '@/styles/login.module.css';
import { LoginForm } from '@/containers';
import Logo from '@/../public/assets/logo-big.svg';

const Login = () => (
  <>
    <Head>
      <title>BIND - Login</title>
    </Head>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Logo />
          <span className="sr-only">바인드 로그인 페이지</span>
        </h1>
        <p className={styles.description}>
          지금 친구들과 함께 BIND로 묶여보세요!
        </p>
        <LoginForm />
      </div>
    </main>
  </>
);
export default Login;
