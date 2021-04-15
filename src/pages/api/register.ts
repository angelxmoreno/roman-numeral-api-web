import { RegisterPayload, RegisterResponse } from '@/types';
import client from '@/utils/beClient';
import { appSessionHandler, HandlerWithSession } from '@/session';

const callRemote = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await client.post<RegisterResponse>(
    `/auth/v1/register`,
    payload,
  );
  return data;
};

const route: HandlerWithSession = async (req, res) => {
  const payload = req.body as RegisterPayload;
  const registerResponse = await callRemote(payload);
  const { isValid, user, jwt } = registerResponse;
  if (isValid && user && jwt) {
    req.session.user = user;
    req.session.jwt = jwt;
    req.session.isLoggedIn = true;
  }
  res.statusCode = 200;
  res.json(registerResponse);
};
const handler = appSessionHandler.post(route);

export default handler;
