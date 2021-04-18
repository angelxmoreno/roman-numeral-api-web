import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/global.css';
import PageContainer from '@/layout/PageContainer';
import { NextPage } from 'next';
import { AlertsProvider } from '@/alerts';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <AlertsProvider>
    <PageContainer {...pageProps}>
      <Component {...pageProps} />
    </PageContainer>
  </AlertsProvider>
);

export default MyApp;
