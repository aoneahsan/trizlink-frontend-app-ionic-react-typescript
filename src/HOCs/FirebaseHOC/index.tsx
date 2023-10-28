// Core Imports
import React from 'react';

// Packages Imports
import {
  FirebaseApp,
  initializeApp as initializeFirebaseApp
} from 'firebase/app';
import {
  fetchAndActivate,
  isSupported,
  getAll,
  getRemoteConfig,
  setLogLevel,
  ensureInitialized,
  getString,
  getValue
} from 'firebase/remote-config';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  frbAppRStateAtom,
  frbRemoteConfigRStateAtom
} from '@/ZaionsStore/firebaseRStore';
import { reportCustomError } from '@/utils/customErrorType';
import { firebaseConfig } from '@/configs';
import {} from 'firebase/analytics';
import { getRemoteConfigKeysData } from '@/utils/helpers/firebaseHelpers';
import { frbRemoteConfigSetting } from '@/utils/constants/firebaseConstants';
import { ENVS } from '@/utils/envKeys';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z500View from '@/components/Errors/500';

// Types
interface IFirebaseHOCProps {
  children: React.ReactNode;
}

// Functional Component
const FirebaseHOC: React.FC<IFirebaseHOCProps> = ({ children }) => {
  const [compState, setCompState] = React.useState<{
    isProcessing: boolean;
  }>({
    isProcessing: true
  });
  const [frbAppRState, setFrbAppRState] = useRecoilState(frbAppRStateAtom);
  const [frbRemoteConfigRState, setFrbRemoteConfigRState] = useRecoilState(
    frbRemoteConfigRStateAtom
  );

  useEffect(() => {
    // Initialize Firebase App and It's Services
    try {
      (async () => {
        setCompState(oldState => ({
          ...oldState,
          isProcessing: true
        }));

        // Firebase App Initialization
        const _firebaseApp = initializeAndSetupFirebaseApp();

        // Firebase Remote Config Keys Setup
        await fetchAndSetupFrbRemoteConfigKeys(_firebaseApp);

        setCompState(oldState => ({
          ...oldState,
          isProcessing: false
        }));
      })();
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const initializeAndSetupFirebaseApp = () => {
    const firebaseApp = initializeFirebaseApp(firebaseConfig, {
      name: firebaseConfig.projectId,
      automaticDataCollectionEnabled: false
    });

    setFrbAppRState(oldState => ({
      ...oldState,
      frbAppInitialized: true,
      frbAppInitLastTriedAt: new Date().toString(),
      frbAppData: firebaseApp
    }));

    return firebaseApp;
  };

  const fetchAndSetupFrbRemoteConfigKeys = async (
    _firebaseApp: FirebaseApp
  ) => {
    const checkRemoteConfigIsSupported = await isSupported();
    if (checkRemoteConfigIsSupported) {
      const remoteConfig = getRemoteConfig(_firebaseApp);
      setLogLevel(remoteConfig, ENVS.isProduction ? 'silent' : 'debug');

      // set the refetch/stale time for remote config keys
      remoteConfig.settings.minimumFetchIntervalMillis =
        frbRemoteConfigSetting.staleTimeInMilliseconds;

      await fetchAndActivate(remoteConfig);

      const result = getRemoteConfigKeysData(remoteConfig);

      setFrbRemoteConfigRState(oldState => ({
        ...oldState,
        isInitialized: true,
        lastFetchedAt: new Date().toString(),
        keys: result
      }));
    }
  };

  console.log({ compState, frbAppRState, frbRemoteConfigRState });

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    !compState.isProcessing &&
    frbAppRState.frbAppInitialized &&
    frbRemoteConfigRState.isInitialized
  ) {
    return <>{children}</>;
  } else {
    return <Z500View />;
  }
};

export default FirebaseHOC;
