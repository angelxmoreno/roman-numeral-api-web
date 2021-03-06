import Head from 'next/head';
import { Container } from 'reactstrap';
import RegisterForm from '@/forms/RegisterForm';
import { GetServerSideProps } from 'next';
import { AuthProps, getAuthPropsFromContext } from '@/session';
import { FC } from 'react';

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
  const { user, jwt, isLoggedIn } = await getAuthPropsFromContext(context);
  return {
    props: { user, jwt, isLoggedIn },
  };
};

export default Register;
