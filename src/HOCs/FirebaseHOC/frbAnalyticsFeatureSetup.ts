import { type FrbAnalyticsRStateType } from '@/types/firebaseTypes/frbAnalytics.type';
import { reportCustomError } from '@/utils/customErrorType';
import {
  initializeAnalytics,
  isSupported as isSupportedFrbAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
  setConsent,
  setDefaultEventParameters,
  setUserId,
  setUserProperties
} from 'firebase/analytics';
import { type FirebaseApp } from 'firebase/app';
import { type SetterOrUpdater } from 'recoil';

export const setupFrbAnalytics = async (
  _frbApp: FirebaseApp,
  setFrbAnalyticsState: SetterOrUpdater<FrbAnalyticsRStateType>
): Promise<void> => {
  try {
    // checks if we are set to call initializeAnalytics
    const _isSupported = await isSupportedFrbAnalytics();

    if (_isSupported) {
      // initialize the Google Analytics SDK and returns the analytics instance
      const _frbAnalytics = initializeAnalytics(_frbApp, {
        config: {
          page_title: 'Trizlink - Page 1',
          description: 'description for initializeAnalytics'
        }
      });

      // this will set the global analytics collection to enabled
      setAnalyticsCollectionEnabled(_frbAnalytics, true);

      // show a consent modal and setting from that modal can go here (marketing cookies etc)
      setConsent({
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted'
      });

      try {
        // only useful if you need to get analytics instance for some logic, _frbAnalytics and instance from this function is same (i think :)
        // const _frbAnalytics2 = getAnalytics(_frbApp);

        // Retrieves a unique Google Analytics identifier for the web client.
        // const googleAnalyticsClientId = await getGoogleAnalyticsClientId(
        //   _frbAnalytics
        // );

        // sets default data for each and every event, on this page
        setDefaultEventParameters({
          anyCustomParamKey: {
            yes: {
              Oyes: ['YAY'],
              testing: [
                {
                  iSaid: 'O, YAY'
                },
                [
                  {
                    mean: 'we can send any data we want'
                  }
                ]
              ]
            }
          }
        });
      } catch (error) {
        reportCustomError(
          error,
          'firebase analytics setDefaultEventParameters call'
        );
      }

      try {
        // this will set the user id for current logged in user, global setting this to true will set this user id for all following analytics logs on this page
        setUserId(
          _frbAnalytics,
          'some-user-id, yes it will be the actual logged in user id',
          {
            global: true
          }
        );

        // setUserProperties
        setUserProperties(_frbAnalytics, {
          well: {
            again: {
              custom: {
                props: {
                  really: [
                    {
                      yes: ['anything we want :)']
                    }
                  ]
                }
              }
            }
          }
        });
      } catch (error) {
        reportCustomError(
          error,
          'firebase analytics setUserId & setUserProperties call'
        );
      }

      // try {
      //   // set google analytics settings for initialized SDK
      //   settings({
      //     dataLayerName:
      //       'well this is just some custom data layer name for this event',
      //     gtagName: "not sure but it says it's gtagName so we will see"
      //   });
      // } catch (error) {
      //   reportCustomError(error, 'firebase analytics settings call');
      // }

      try {
        // finally logging a analytics event
        logEvent(
          _frbAnalytics,
          'testing if i can set a custom event name from frontend just by passing one :)',
          {
            well: {
              these: {
                are: {
                  event: [
                    'params',
                    {
                      mean: [
                        'i hope',
                        {
                          any: {
                            thingWeWant: 'O YAY'
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        );
      } catch (error) {
        reportCustomError(error, 'firebase analytics logEvent call');
      }
      try {
        // finally logging a analytics event
        logEvent(_frbAnalytics, 'select_item', {
          wellThisIsNew: {
            these: {
              are: {
                event: [
                  'params',
                  {
                    mean: [
                      'i hope',
                      {
                        any: {
                          thingWeWant: 'O YAY'
                        }
                      }
                    ]
                  }
                ]
              }
            }
          }
        });
      } catch (error) {
        reportCustomError(error, 'firebase analytics logEvent call');
      }

      setFrbAnalyticsState(oldState => ({
        ...oldState,
        initializedAt: new Date().toString(),
        isInitialized: true,
        frbAnalyticsInstance: _frbAnalytics
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
