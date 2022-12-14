import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="친구와 BIND로 묶이다!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="transition-all bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
