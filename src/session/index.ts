import { UserEntity } from '@/types';
import { NextApiRequest } from 'next';
import {
  applySession,
  Handler,
  Session,
  SessionOptions,
  withIronSession,
} from 'next-iron-session';

export interface AppSessionData {
  user: UserEntity | null;
  jwt: string | null;
}

export interface NextApiRequestWithSession extends NextApiRequest {
  session: AppSessionData & Session;
}

const secret = process.env.SESSION_KEY as string;
export const sessionOptions: SessionOptions = {
  password: secret,
  cookieName: `sid`,
  cookieOptions: {
    secure: false,
    httpOnly: false,
  },
};

export const sessionAware = (handler: Handler) =>
  withIronSession(handler, sessionOptions);

export interface AuthProps extends AppSessionData {
  isLoggedIn: boolean;
}

export const getAuth = async (context: {
  req: unknown;
  res: unknown;
}): Promise<AuthProps> => {
  await applySession(context.req, context.res, sessionOptions);
  const { req } = (context as unknown) as { req: NextApiRequestWithSession };
  const user: UserEntity | null = req.session.get(`user`) || null;
  const jwt: string | null = req.session.get(`jwt`) || null;
  return {
    user,
    jwt,
    isLoggedIn: !!user,
  };
};
