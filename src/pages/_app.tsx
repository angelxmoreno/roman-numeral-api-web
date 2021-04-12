import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/global.css';
import PageContainer from '@/layout/PageContainer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageContainer>
      <Component {...pageProps} />
    </PageContainer>
  );
}
