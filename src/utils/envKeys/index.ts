const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

export const ENVS = {
  REACT_APP_TITLE: process.env.REACT_APP_TITLE || 'ZLink',
  REACT_APP_API_URL: apiUrl ?? '',
  REACT_APP_CRYPTO_SECRET: 'zlink-app-secrect',
  REACT_APP_GOOGLE_MAP_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTesting: process.env.NODE_ENV === 'test',
};
