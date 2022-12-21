import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="친구와 BIND로 묶이다!" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="BIND" />
        <meta property="og:description" content="친구와 BIND로 묶이다!" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="BIND" />
        <meta
          property="og:image"
          content="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3fe625e8-1f6d-4da9-ad5e-6f3724a5c9bd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T080241Z&X-Amz-Expires=86400&X-Amz-Signature=98ac185cccf5bddd58b95177f3c6fce3fd91a157d996da4e27330c54ce70141b&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject"
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image" content="300" />
      </Head>
      <body className="transition-all bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
