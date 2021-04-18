import { GetServerSideProps } from 'next';
import { getSessionRequestByContext } from '@/session';
import { FC, useEffect } from 'react';
import { logOutUser } from '@/client';
import { useAlerts } from '@/alerts';
import { useRouter } from 'next/router';

const LogOut: FC = () => {
  const Alerts = useAlerts();
  const router = useRouter();
  useEffect(() => {
    Alerts.auth(`Successfully logged out`);

    router.push(`/login`);
  }, []);
  return <p>Logging out</p>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqWithSession = await getSessionRequestByContext(context);
  const { isLoggedIn } = reqWithSession.session;

  if (isLoggedIn) {
    logOutUser(reqWithSession, context.res);
  }
  return { props: {} };
};

export default LogOut;
