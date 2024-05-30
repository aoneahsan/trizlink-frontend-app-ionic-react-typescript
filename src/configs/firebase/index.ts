import { ENVS } from '@/utils/envKeys';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';

const appId = String(ENVS.firebaseAppId);
const firebaseAppIdValueArr = appId.split(':');
const messagingSenderId =
  firebaseAppIdValueArr.length > 1 ? firebaseAppIdValueArr[1] : '';

if (!messagingSenderId) {
  throw new Error('Firebase Messaging Sender ID is not defined.');
}

const firebaseConfig = {
  apiKey: String(ENVS.firebaseAppKey),
  authDomain: `${ENVS.firebaseProductId}.firebaseapp.com`,
  projectId: String(ENVS.firebaseProductId),
  storageBucket: `${ENVS.firebaseProductId}.appspot.com`,
  messagingSenderId,
  appId,
  measurementId: String(ENVS.firebaseMeasurementId)
};

export const firebaseApp = initializeFirebaseApp(firebaseConfig, {
  name: firebaseConfig.projectId,
  automaticDataCollectionEnabled: false
});
