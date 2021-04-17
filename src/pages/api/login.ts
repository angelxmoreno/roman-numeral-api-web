import { appSessionHandler, HandlerWithSession } from '@/session';
import {
  callRemoteLogIn,
  LogInPayload,
  logInUserFromAuthResponse,
} from '@/client';

const route: HandlerWithSession = async (req, res) => {
  const payload = req.body as LogInPayload;
  const authFormResponse = await callRemoteLogIn(payload);
  logInUserFromAuthResponse(req, res, authFormResponse);
  res.statusCode = 200;
  res.json(authFormResponse);
};
const handler = appSessionHandler.post(route);

export default handler;
