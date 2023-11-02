// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import {
  type FirebaseApp,
  initializeApp as initializeFirebaseApp
} from 'firebase/app';
import { useRecoilState } from 'recoil';
import {
  frbAnalyticsRState,
  frbAppRStateAtom,
  frbRemoteConfigRStateAtom
} from '@/ZaionsStore/firebaseRStore';
import { reportCustomError } from '@/utils/customErrorType';
import { firebaseConfig } from '@/configs';
import {} from 'firebase/analytics';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z500View from '@/components/Errors/500';
import { fetchAndSetupFrbRemoteConfigKeys } from './frbRemoteConfigFeatureSetup';
import { setupFrbAnalytics } from './frbAnalyticsFeatureSetup';

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
  const [frbAnalyticsState, setFrbAnalyticsState] =
    useRecoilState(frbAnalyticsRState);

  useEffect(() => {
    // Initialize Firebase App and It's Services
    try {
      void (async () => {
        setCompState(oldState => ({
          ...oldState,
          isProcessing: true
        }));

        // Firebase App Initialization
        const _firebaseApp = initializeAndSetupFirebaseApp();

        // Firebase Remote Config Keys Setup
        await fetchAndSetupFrbRemoteConfigKeys(
          _firebaseApp,
          setFrbRemoteConfigRState
        );

        // Setup Firebase Analytics Feature
        await setupFrbAnalytics(_firebaseApp, setFrbAnalyticsState);

        setCompState(oldState => ({
          ...oldState,
          isProcessing: false
        }));
      })();
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeAndSetupFirebaseApp = (): FirebaseApp => {
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

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    !compState.isProcessing &&
    frbAppRState.frbAppInitialized &&
    frbRemoteConfigRState.isInitialized &&
    frbAnalyticsState.isInitialized
  ) {
    return <>{children}</>;
  } else {
    return <Z500View />;
  }
};

export default FirebaseHOC;
