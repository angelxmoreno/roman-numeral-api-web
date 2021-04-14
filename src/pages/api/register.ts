import { NextApiResponse } from 'next';
import { RegisterPayload, RegisterResponse, UserEntity } from '@/types';
import client from '@/utils/beClient';
import { NextApiRequestWithSession, sessionAware } from '@/session';

const saveUserSession = async (
  req: NextApiRequestWithSession,
  user: UserEntity,
  jwt: string,
) => {
  req.session.set(`user`, user);
  req.session.set(`jwt`, jwt);
  await req.session.save();
};
const callRemote = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await client.post<RegisterResponse>(
    `/auth/v1/register`,
    payload,
  );
  return data;
};

const registerRoute = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const payload = req.body as RegisterPayload;
  const registerResponse = await callRemote(payload);
  const { isValid, user, jwt } = registerResponse;
  if (isValid && user && jwt) {
    await saveUserSession(req, user, jwt);
  }
  res.statusCode = 200;
  res.json(registerResponse);
};

export default sessionAware(registerRoute);
