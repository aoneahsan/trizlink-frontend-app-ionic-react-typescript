const _env = import.meta.env;

const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? '';

export const ENVS = {
  appTitle:
    _env.VITE_TITLE ??
    'Trizlink - Url Shortener, Link-in-bio & Social Media Management SAAS APP - Zaions',
  apiUrl,
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'trizlink-app-secret',
  googleMapApiKey: _env.VITE_GOOGLE_MAP_API_KEY ?? '',
  isProduction: _env.PROD,
  isDevelopment: _env.DEV,
  isTesting: _env.MODE === 'testing',
  timezone: _env.VITE_DEFAULT_TIME_ZONE ?? 'Asia/Karachi',
  country: _env.VITE_DEFAULT_COUNTRY ?? 'Pakistan',
  defaultShortUrlDomain: _env.PROD
    ? _env.VITE_DEFAULT_SHORT_URL_DOMAIN_PROD ?? 'trizlink.com'
    : _env.VITE_DEFAULT_SHORT_URL_DOMAIN_LOCAL ?? 'localhost:5173',
  firebaseAppId: _env.VITE_FIREBASE_APP_ID ?? '',
  firebaseAppKey: _env.VITE_FIREBASE_APP_KEY ?? '',
  firebaseProductId: _env.VITE_FIREBASE_PROJECT_ID ?? '',
  firebaseMeasurementId: _env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
  sentryErrorLoggingDNS: _env.VITE_SENTRY_DNS ?? '',
  googleClientId: _env.VITE_GOOGLE_CLIENT_ID ?? ''
};

if (!ENVS.googleMapApiKey) {
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
