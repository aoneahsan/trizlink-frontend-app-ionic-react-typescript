import { CAPACITOR_PLATFORM } from '@/utils/constants/capacitorApiConstants';

const _env = import.meta.env;

const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? null;

if (!apiUrl) {
  throw new Error('API URL is not defined.');
}

const googleClientId = CAPACITOR_PLATFORM.isWeb
  ? _env.PROD
    ? _env.VITE_GOOGLE_CLIENT_ID_PROD
    : _env.VITE_GOOGLE_CLIENT_ID
  : CAPACITOR_PLATFORM.isAndroid
  ? _env.VITE_GOOGLE_CLIENT_ID_ANDROID
  : '';
const googleApiKey = CAPACITOR_PLATFORM.isWeb
  ? _env.PROD
    ? _env.VITE_GOOGLE_API_KEY_PROD
    : _env.VITE_GOOGLE_API_KEY
  : CAPACITOR_PLATFORM.isAndroid
  ? _env.VITE_GOOGLE_API_KEY_ANDROID
  : '';

if (!CAPACITOR_PLATFORM.isIos && (!googleApiKey || !googleClientId)) {
  throw new Error(
    'Google API Key or Client ID is not defined - and platform is not IOS.'
  );
}

export const ENVS = {
  // Environment
  isProduction: _env.PROD,
  isDevelopment: _env.DEV,
  isTesting: _env.MODE === 'testing',

  // General App
  appTitle:
    _env.VITE_TITLE ??
    'Trizlink - Url Shortener, Link-in-bio & Social Media Management SAAS APP - Zaions',
  apiUrl,
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'trizlink-app-secret',
  timezone: _env.VITE_DEFAULT_TIME_ZONE ?? 'Asia/Karachi',
  country: _env.VITE_DEFAULT_COUNTRY ?? 'Pakistan',
  defaultShortUrlDomain: _env.PROD
    ? _env.VITE_DEFAULT_SHORT_URL_DOMAIN_PROD ?? 'trizlink.com'
    : _env.VITE_DEFAULT_SHORT_URL_DOMAIN_LOCAL ?? 'localhost:5173',

  // Firebase & Google Cloud Console
  firebaseAppId: _env.VITE_FIREBASE_APP_ID ?? null,
  firebaseAppKey: googleApiKey, // as right now i think these two are same, but if needed i will add a new ENV key and separate them.
  firebaseProductId: _env.VITE_FIREBASE_PROJECT_ID ?? null,
  firebaseMeasurementId: _env.VITE_FIREBASE_MEASUREMENT_ID ?? null,
  googleClientId: _env.VITE_GOOGLE_CLIENT_ID ?? null,
  googleApiKey,

  // Third Party Services
  // Sentry
  sentryErrorLoggingDNS: _env.VITE_SENTRY_DNS ?? null
};

if (!ENVS.googleApiKey) {
  console.error('Google Map API Key is not defined.');
}

if (
  !ENVS.firebaseAppId ||
  !ENVS.firebaseAppKey ||
  !ENVS.firebaseProductId ||
  !ENVS.firebaseMeasurementId
) {
  console.error('Firebase App details not defined.');
}

if (!ENVS.sentryErrorLoggingDNS) {
  console.error('Sentry DNS is not defined.');
}

if (!ENVS.googleClientId) {
  console.error('Google Client ID is not defined.');
}
