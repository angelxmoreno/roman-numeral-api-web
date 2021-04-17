import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/global.css';
import PageContainer from '@/layout/PageContainer';
import { NextPage } from 'next';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <PageContainer {...pageProps}>
    <Component {...pageProps} />
  </PageContainer>
);

export default MyApp;
