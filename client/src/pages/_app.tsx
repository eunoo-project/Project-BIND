import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </RecoilRoot>
  );
}
