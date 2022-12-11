import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/main.module.css';
import { Nav, Header } from '@/layout';

const Main = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className={styles.main} />
    </>
  );
};

export default Main;
