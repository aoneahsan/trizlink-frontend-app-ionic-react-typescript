import { firebaseApp } from '@/configs';
import { type FrbAnalyticsRStateType } from '@/types/firebaseTypes/frbAnalytics.type';
import { reportCustomError } from '@/utils/customErrorType';
import {
  initializeAnalytics,
  isSupported as isSupportedFrbAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
  setConsent,
  EventNameString
} from 'firebase/analytics';
import { type SetterOrUpdater } from 'recoil';

// checks if we are set to call initializeAnalytics
const _isSupported = await isSupportedFrbAnalytics();

if (!_isSupported) {
  reportCustomError(
    new Error('Firebase Analytics is not supported in this browser'),
    'Firebase Analytics Feature Initialization Function Frontend',
    false
  );
  throw new Error('Firebase Analytics is not supported in this browser');
}

// initialize the Google Analytics SDK and returns the analytics instance
export const firebaseAnalytics = initializeAnalytics(firebaseApp, {
  config: {
    page_title: 'Trizlink - Page 1',
    description: 'description for initializeAnalytics'
  }
});

export const setupFrbAnalytics = async (
  setFrbAnalyticsState: SetterOrUpdater<FrbAnalyticsRStateType>
): Promise<void> => {
  try {
    if (_isSupported) {
      // this will set the global analytics collection to enabled
      setAnalyticsCollectionEnabled(firebaseAnalytics, true);

      // show a consent modal and setting from that modal can go here (marketing cookies etc)
      setConsent({
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted'
      });

      try {
        // finally logging a analytics event
        logEvent(firebaseAnalytics, 'App Loaded');
      } catch (error) {
        reportCustomError(error, 'firebase analytics logEvent call');
      }

      setFrbAnalyticsState(oldState => ({
        ...oldState,
        initializedAt: new Date().toString(),
        isInitialized: true,
        frbAnalyticsInstance: firebaseAnalytics
      }));
    }
  } catch (error) {
    reportCustomError(
      error,
      'Firebase Analytics Feature Initialization Function Frontend',
      false
    );
  }
};

export const logFirebaseAnalyticsEvent = async (
  eventName: EventNameString = 'page_view',
  eventParams: Record<string, unknown>
): Promise<void> => {
  try {
    if (_isSupported) {
      logEvent(firebaseAnalytics, eventName.toString(), eventParams);
    }
  } catch (error) {
    reportCustomError(error, 'firebase analytics logEvent call');
  }
};
