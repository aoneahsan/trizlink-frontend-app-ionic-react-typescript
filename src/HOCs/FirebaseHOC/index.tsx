// Core Imports
import React, { useEffect } from 'react';

// Packages Imports
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  frbAnalyticsRState,
  frbAppRStateAtom,
  frbRemoteConfigRStateAtom
} from '@/ZaionsStore/firebaseRStore';
import { reportCustomError } from '@/utils/customErrorType';
import {} from 'firebase/analytics';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z500View from '@/components/Errors/500';
import { fetchAndSetupFrbRemoteConfigKeys } from './frbRemoteConfigFeatureSetup';
import {
  logFirebaseAnalyticsEvent,
  setupFrbAnalytics
} from './frbAnalyticsFeatureSetup';

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

        // Firebase Remote Config Keys Setup
        await fetchAndSetupFrbRemoteConfigKeys(setFrbRemoteConfigRState);

        // Setup Firebase Analytics Feature
        await setupFrbAnalytics(setFrbAnalyticsState);

        logFirebaseAnalyticsEvent('page_view', {
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_search: window.location.search
        });

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

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    !compState.isProcessing &&
    frbRemoteConfigRState.isInitialized &&
    frbAnalyticsState.isInitialized
  ) {
    return <>{children}</>;
  } else {
    return <Z500View />;
  }
};

export default FirebaseHOC;
