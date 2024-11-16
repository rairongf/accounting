import { refreshToken } from '@/modules/auth/infra/repositories';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { CookiesKeys } from '../../constants/cookies_keys';
import { ServerApi } from './api_interface';

export function getServerClient(ctx?: never): ServerApi {
  const { [CookiesKeys.accessToken]: accessToken } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  });

  if (accessToken) {
    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { [CookiesKeys.refreshToken]: refreshTokenData } = parseCookies(ctx);

      const config = error.config;

      if (error.response?.status === 404) {
        return Promise.reject(error);
      }

      if (error.response?.status === 403) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && refreshTokenData && !config?.sent) {
        config.sent = true;
        const { data } = await refreshToken({
          refreshToken: refreshTokenData
        });

        destroyCookie(ctx, CookiesKeys.accessToken);
        destroyCookie(ctx, CookiesKeys.refreshToken);

        if (data.accessToken) {
          const now = new Date();

          setCookie(undefined, CookiesKeys.accessToken, data.accessToken, {
            maxAge: (data.accessTokenExpiresAt.getTime() - now.getTime()) * 1000,
            path: '/'
          });

          setCookie(undefined, CookiesKeys.refreshToken, data.refreshToken, {
            maxAge: (data.refreshTokenExpiresAt.getTime() - now.getTime()) * 1000,
            path: '/'
          });

          api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;

          return await api(config);
        }
        Promise.reject(error);
        redirect('/login');
      }

      if (error.response?.status === 401 && !refreshTokenData) {
        Promise.reject(error);
        redirect('/login');
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    const { [CookiesKeys.accessToken]: accessToken } = parseCookies(ctx);

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  });

  return new ServerApi(api);
}
