import { useState } from 'react';
import Cookies, { Option } from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import * as FECookies from 'js-cookie';

const AUTH_COOKIE_NAME = `isAuthenticated`;
const serverCookieOptions: Option = {
  keys: [`auth`],
  secure: false,
};
type AuthHook = [boolean, (state: boolean) => void];

const isAuthenticatedOnFe = () => FECookies.get(AUTH_COOKIE_NAME) === `true`;
export const useFEAuthCookies = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const setAuthenticated = (state: boolean): void => {
    FECookies.set(AUTH_COOKIE_NAME, String(state), { secure: false });
    setIsAuthenticated(state);
  };

  if (isAuthenticatedOnFe() !== isAuthenticated) {
    setIsAuthenticated(isAuthenticatedOnFe());
  }

  return [Boolean(isAuthenticated), setAuthenticated];
};

export const useBEAuthCookies = (
  req: IncomingMessage,
  res: ServerResponse,
): AuthHook => {
  const cookies = new Cookies(req, res, serverCookieOptions);
  const isAuthenticated = Boolean(cookies.get(AUTH_COOKIE_NAME));
  const setAuthenticated = (state: boolean): void => {
    cookies.set(AUTH_COOKIE_NAME, String(state), {
      httpOnly: false,
      signed: false,
    });
  };

  return [Boolean(isAuthenticated), setAuthenticated];
};
