const _env = import.meta.env;

const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? '';

export const ENVS = {
	appTitle:
		_env.VITE_TITLE ||
		'ZLink - Url Shortener, Link-in-bio & Social Media Management SAAS APP - Zaions',
	apiUrl,
	cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'zlink-app-secrect',
	googleMapApiKey: _env.VITE_GOOGLE_MAP_API_KEY || '',
	isProduction: _env.PROD,
	isDevelopment: _env.DEV,
	isTesting: _env.MODE === 'testing',
	timezone: _env.VITE_DEFAULT_TIME_ZONE,
	country: _env.VITE_DEFAULT_COUNTRY,
	defaultShortUrlDomain: _env.PROD
		? _env.VITE_DEFAULT_SHORT_URL_DOMAIN_PROD
		: _env.VITE_DEFAULT_SHORT_URL_DOMAIN_LOCAL,
};
