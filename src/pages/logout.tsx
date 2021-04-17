import { GetServerSideProps } from 'next';
import { getSessionRequestByContext } from '@/session';
import { FC } from 'react';
import { logOutUser } from '@/client';

const LogOut: FC = () => <div />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqWithSession = await getSessionRequestByContext(context);
  const { isLoggedIn } = reqWithSession.session;

  if (isLoggedIn) {
    logOutUser(reqWithSession, context.res);
  }
  return {
    redirect: {
      permanent: true,
      destination: `/login`,
    },
  };
};

export default LogOut;
