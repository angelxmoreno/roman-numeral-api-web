import Head from 'next/head';
import { Container } from 'reactstrap';
import RegisterForm from '@/forms/RegisterForm';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { AuthProps, getSessionRequestByContext } from '@/session';

const Register: FC<AuthProps> = ({ user, isLoggedIn }) => (
  <div>
    <Head>
      <title>Register</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <h1>Register Page</h1>
      <hr />
      {isLoggedIn && user ? (
        `Welcome ${user.name}`
      ) : (
        <>
          <p>This is the register page</p>
          <hr />
          <RegisterForm />
        </>
      )}
    </Container>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqWithSession = await getSessionRequestByContext(context);
  const { user, jwt, isLoggedIn } = reqWithSession.session;
  return {
    props: { user, jwt, isLoggedIn },
  };
};

export default Register;
