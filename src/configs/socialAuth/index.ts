// yes these settings are being used only in one place so far, but i stored app social auth related setting here in this file for all social auth we have implemented in our app to quickly check them and also be able to check other settings for other methods.

export const googleAuthConfig = {
  grantOfflineAccess: false,
  scopes: ['profile', 'email']
};
