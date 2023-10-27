import { ENVS } from '@/utils/envKeys';

const appId = String(ENVS.firebaseAppId);
const firebaseAppIdValueArr = appId.split(':');
const messagingSenderId =
  firebaseAppIdValueArr.length > 1 ? firebaseAppIdValueArr[1] : '';

export const firebaseConfig = {
  apiKey: String(ENVS.firebaseAppKey),
  authDomain: `${ENVS.firebaseProductId}.firebaseapp.com`,
  projectId: String(ENVS.firebaseProductId),
  storageBucket: `${ENVS.firebaseProductId}.appspot.com`,
  messagingSenderId,
  appId,
  measurementId: String(ENVS.firebaseMeasurementId)
};
