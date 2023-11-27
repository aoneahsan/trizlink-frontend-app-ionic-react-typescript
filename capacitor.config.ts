import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zaions_tappk.app',
  appName: 'zaions_tappk',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '1098579848404-v2emjb5nh94rancq1jhp2t9gljog3ken.apps.googleusercontent.com', // sir ahsan say to paste directly
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
