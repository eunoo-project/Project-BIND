import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { Suspense } from 'react';

const queryclient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryclient}>
        {/* <Suspense fallback="로딩중..."> */}
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
        {/* </Suspense> */}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
