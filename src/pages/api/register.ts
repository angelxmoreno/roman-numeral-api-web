import { appSessionHandler, HandlerWithSession } from '@/session';
import {
  callRemoteRegister,
  logInUserFromAuthResponse,
  RegisterPayload,
} from '@/client';

const route: HandlerWithSession = async (req, res) => {
  const payload = req.body as RegisterPayload;
  const authFormResponse = await callRemoteRegister(payload);
  logInUserFromAuthResponse(req, res, authFormResponse);
  res.statusCode = 200;
  res.json(authFormResponse);
};
const handler = appSessionHandler.post(route);

export default handler;
