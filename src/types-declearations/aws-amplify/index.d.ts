export declare const Amplify: {
  configure(config: AmplifyConfig): void;
  Auth: AmplifyAuth;
  Analytics: AmplifyAnalytics;
  Storage: AmplifyStorage;
  API: AmplifyAPI;
  Cache: AmplifyCache;
  I18n: AmplifyI18n;
  Logger: AmplifyLogger;
  Hub: AmplifyHub;
  Interactions: AmplifyInteractions;
  XR: AmplifyXR;
  Predictions: AmplifyPredictions;
  PubSub: AmplifyPubSub;
};

type AmplifyConfig = {
  Auth?: AuthOptions;
  Analytics?: AnalyticsOptions;
  Storage?: StorageOptions;
  API?: APIOptions;
  Cache?: CacheOptions;
  I18n?: I18nOptions;
  Logger?: LoggerOptions;
  Hub?: HubOptions;
  Interactions?: InteractionsOptions;
  XR?: XROptions;
  Predictions?: PredictionsOptions;
  PubSub?: PubSubOptions;
};

type AuthOptions = {
  identityPoolId?: string;
  region?: string;
  userPoolId?: string;
  userPoolWebClientId?: string;
  oauth?: OAuthOptions;
};

type AnalyticsOptions = {
  disabled?: boolean;
  appId?: string;
  region?: string;
  // ... and so on
};

// ... and so on for the rest of the options types
