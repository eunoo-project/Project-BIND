import Head from 'next/head';
import styles from '@/styles/signup.module.css';
import { RegisterForm } from '@/containers';
import Logo from '@/../public/assets/logo-big.svg';

const Signup = () => (
  <>
    <Head>
      <title>BIND - SignUp</title>
    </Head>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Logo />
          <span className="sr-only">바인드 회원가입 페이지</span>
        </h1>
        <RegisterForm />
      </div>
    </main>
  </>
);
export default Signup;
