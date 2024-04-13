import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trizlink.app',
  appName: 'Trizlink',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '1098579848404-agkui3kbus8ml8skfo1qgcqpsk205jqv.apps.googleusercontent.com', // sir ahsan say to paste directly
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
