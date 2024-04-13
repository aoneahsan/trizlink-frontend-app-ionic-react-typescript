import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
const isNative = Capacitor.isNativePlatform();
const isWeb = platform === 'web';
const isAndroid = platform === 'android';
const isIos = platform === 'ios';
// i read the docs and there they are saying the "isNative" will check if it's "android" or "ios" so i think it does not tell if it's web or a bundled app.
// const isAndroidWebApp = isAndroid && !isCapacitorBundledApp;
// const isIosWebApp = isIos && !isCapacitorBundledApp;
// const isAndroidBundledApp = isAndroid && isCapacitorBundledApp;
// const isIosBundledApp = isIos && isCapacitorBundledApp;

export const CAPACITOR_PLATFORM = {
  isNative,
  isWeb,
  isAndroid,
  isIos
  // isAndroidWebApp,
  // isIosWebApp,
  // isAndroidBundledApp,
  // isIosBundledApp
};
