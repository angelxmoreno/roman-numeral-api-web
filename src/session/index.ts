import { applySession, session } from 'next-session';
import nextConnect from 'next-connect';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { Options, Session } from 'next-session/dist/types';
import { UserEntity } from '@/types';

export type AuthProps = { user: UserEntity; jwt: string; isLoggedIn: boolean };

interface RequestWithSession extends NextApiRequest {
  session: Session & AuthProps;
}

export type HandlerWithSession = (
  req: RequestWithSession,
  res: NextApiResponse,
) => any;

const options: Options = {
  name: `sess_id`,
  cookie: {
    secure: false,
    httpOnly: false,
  },
};
export const appSession = session(options);
export const appSessionHandler = nextConnect<
  RequestWithSession,
  NextApiResponse
>().use(appSession);

export const getSessionRequestByContext = async (
  context: GetServerSidePropsContext,
) => {
  const { req, res } = context;
  await applySession(req, res, options);
  return req as RequestWithSession;
};
