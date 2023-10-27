// Core Imports
import React from 'react';

// Packages Imports
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import {
  fetchAndActivate,
  isSupported,
  getAll,
  getRemoteConfig,
  setLogLevel,
  fetchConfig,
  activate,
  ensureInitialized,
  getBoolean,
  getNumber,
  getString,
  getValue
} from 'firebase/remote-config';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { frbAppRStateAtom } from '@/ZaionsStore/firebaseRStore';
import { reportCustomError } from '@/utils/customErrorType';
import { firebaseConfig } from '@/configs';
import {} from 'firebase/analytics';

// Types
interface IFirebaseHOCProps {
  children: React.ReactNode;
}

// Functional Component
const FirebaseHOC: React.FC<IFirebaseHOCProps> = ({ children }) => {
  const [frbAppRState, setFrbAppRState] = useRecoilState(frbAppRStateAtom);

  useEffect(() => {
    // Initialize Firebase App and It's Services
    try {
      (async () => {
        // Firebase App Initialization
        const firebaseApp = initializeFirebaseApp(firebaseConfig, {
          name: firebaseConfig.projectId,
          automaticDataCollectionEnabled: false
        });

        const checkRemoteConfigIsSupported = await isSupported();

        let frbRemoteConfigActivated: boolean | null = null;

        const remoteConfig = getRemoteConfig(firebaseApp);
        setLogLevel(remoteConfig, 'debug');
        if (checkRemoteConfigIsSupported) {
          await fetchAndActivate(remoteConfig);
        }
        const a = await ensureInitialized(remoteConfig);
        const remoteConfigAllValues = getAll(remoteConfig);
        const remoteConfigAllValuesObj = { ...remoteConfigAllValues };

        console.dir({
          firebaseApp,
          frbRemoteConfigActivated,
          remoteConfig,
          remoteConfigAllValues,
          k1b: getValue(remoteConfig, 'TESTING_REMOTE_CONFIG').asBoolean(),
          k1n: getValue(remoteConfig, 'TESTING_REMOTE_CONFIG').asNumber(),
          k1s: getValue(remoteConfig, 'TESTING_REMOTE_CONFIG').asString(),
          k1u: getValue(remoteConfig, 'TESTING_REMOTE_CONFIG').getSource(),
          k1s2: getString(remoteConfig, 'TESTING_REMOTE_CONFIG')
        });

        // setFrbAppRState(oldState => ({
        //   ...oldState,
        //   frbAppInitLastTriedAt: new Date().toString(),
        //   frbAppInitialized: firebaseApp != null,
        //   frbAppData: firebaseApp,
        //   frbRemoteConfigActivated
        // }));
      })();
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  console.log({ frbAppRState });
  return <>{children}</>;
};

export default FirebaseHOC;
