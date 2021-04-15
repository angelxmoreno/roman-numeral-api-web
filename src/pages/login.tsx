import Head from 'next/head';
import { Container } from 'reactstrap';
import { GetServerSideProps } from 'next';
import { getSessionRequestByContext } from '@/session';
import { FC } from 'react';

const LogIn: FC = () => (
  <div>
    <Head>
      <title>Log In</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <h1>Log In Page</h1>
      <hr />
      <p>This is the log In page</p>
    </Container>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqWithSession = await getSessionRequestByContext(context);
  const { isLoggedIn } = reqWithSession.session;

  return isLoggedIn
    ? {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      }
    : {
        props: { isLoggedIn },
      };
};

export default LogIn;
