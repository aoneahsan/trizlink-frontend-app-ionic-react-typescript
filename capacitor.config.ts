import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trizlink.app',
  appName: 'trizlink',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
