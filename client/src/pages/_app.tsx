import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
