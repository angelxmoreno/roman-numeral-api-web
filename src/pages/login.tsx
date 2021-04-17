import Head from 'next/head';
import { Container } from 'reactstrap';
import { GetServerSideProps } from 'next';
import { getSessionRequestByContext } from '@/session';
import { FC } from 'react';
import LogInForm from '@/forms/LogInForm';

const LogIn: FC = () => (
  <div>
    <Head>
      <title>Log In</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <h1>Log In Page</h1>
      <hr />
      <LogInForm />
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
        props: { isLoggedIn: !!isLoggedIn },
      };
};

export default LogIn;
