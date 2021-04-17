import axios from 'axios';
import { UserEntity } from '@/types';
import { RequestWithSession } from '@/session';
import { useBEAuthCookies } from '@/cookies/auth';
import { ServerResponse } from 'http';

const client = axios.create({
  baseURL: process.env.API_DOMAIN,
});

export interface ErrorMessages {
  property: string;
  messages: string[];
}

export interface AuthFormResponse {
  isValid: boolean;
  user?: UserEntity;
  jwt?: string;
  errors: ErrorMessages[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LogInPayload {
  email: string;
  password: string;
}

export const callRemoteRegister = async (
  payload: RegisterPayload,
): Promise<AuthFormResponse> => {
  const { data } = await client.post<AuthFormResponse>(
    `/auth/v1/register`,
    payload,
  );
  return data;
};

export const callRemoteLogIn = async (
  payload: LogInPayload,
): Promise<AuthFormResponse> => {
  const { data } = await client.post<AuthFormResponse>(
    `/auth/v1/identify`,
    payload,
  );
  return data;
};

export const logInUserFromAuthResponse = (
  req: RequestWithSession,
  res: ServerResponse,
  response: AuthFormResponse,
) => {
  const [, setAuthenticated] = useBEAuthCookies(req, res);
  const { isValid, user, jwt } = response;

  if (isValid && user && jwt) {
    req.session.user = user;
    req.session.jwt = jwt;
    req.session.isLoggedIn = true;
    setAuthenticated(true);
  } else {
    setAuthenticated(false);
  }
};

export const logOutUser = (req: RequestWithSession, res: ServerResponse) => {
  const [, setAuthenticated] = useBEAuthCookies(req, res);
  req.session.user = null;
  req.session.jwt = null;
  req.session.isLoggedIn = false;
  setAuthenticated(false);
};

export default client;
