// Core Import
import React, { useCallback, useEffect } from 'react';

// Packages Imports
import { IonApp } from '@ionic/react';
import { ToastContainer } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { App as CapacitorApp } from '@capacitor/app';

// Custom Imports
import AppRoutes from '@/AppRoutes';
import ZaionsGlobalComponent from '@/ZaionsGlobalComponents';

// helpers
import { STORAGE } from '@/utils/helpers';

// global constants
import { LOCALSTORAGE_KEYS } from '@/utils/constants';

// Recoil State
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';

/* Theme variables */
import '@/theme/variables.css';
import { type UserAccountType } from '@/types/UserAccount/index.type';
import { reportCustomError } from '@/utils/customErrorType';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useLocation } from 'react-router';

const App: React.FC = () => {
  const setAuthTokenState = useSetRecoilState(ZaionsAuthTokenData);
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const navigate = useZNavigate();
  const location = useLocation();

  // check for userData and authtoken in localstorage set that in recoil state and redirect user to authenticated screen (like dashboard), from guest screen, (mean user can not visit login screen, he is already logged in)
  useEffect(() => {
    void (async () => {
      try {
        const userData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.USERDATA
        )) as UserAccountType | null;
        const authToken = (await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN)) as
          | string
          | null;
        if (userData !== null && authToken !== null) {
          setUserAccountStateAtom(oldState => ({
            ...oldState,
            ...userData
          }));

          setAuthTokenState(oldState => ({
            ...oldState,
            token: authToken
          }));
        }
      } catch (error) {
        reportCustomError({
          errorPlacement: 'From ZaionsApp - useEffect - tryCatch',
          error
        });
      }
    })();
  }, [setAuthTokenState, setUserAccountStateAtom]);

  useEffect(() => {
    CapacitorApp.addListener('appUrlOpen', event => {
      try {
        console.log('App opened with URL: ', event.url);

        // example of how to handle custom URL scheme
        if (event.url) {
          // as we are using the domain for deep linking
          const path = event.url.split('trizlink.com')[1];
          if (path) {
            navigate.zNavigatePushRoute(path);
          }
        }
      } catch (error) {
        reportCustomError({
          errorPlacement: 'From ZaionsApp - useEffect - tryCatch',
          error
        });
      }
    });
  }, []);

  // remove dark mode
  const handleDarkMode = useCallback(() => {
    try {
      const shouldEnableDark = false;
      document.documentElement.setAttribute(
        'data-theme',
        shouldEnableDark ? 'dark' : 'light'
      );
      if (shouldEnableDark) {
        document.documentElement.setAttribute('native-dark-active', '');
      } else {
        document.documentElement.removeAttribute('native-dark-active');
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      handleDarkMode(); // Initial check
      window.addEventListener('change', handleDarkMode); // Example: Listen to changes
    } catch (error) {}

    return () => {
      try {
        window.removeEventListener('change', handleDarkMode);
      } catch (error) {}
    };
  }, [handleDarkMode]);

  useEffect(() => {
    handleDarkMode();
  }, [location.pathname, handleDarkMode]);

  useEffect(() => {
    try {
      CapacitorApp.addListener('appStateChange', state => {
        if (state.isActive) {
          handleDarkMode();
        }
      });
    } catch (error) {}

    try {
      CapacitorApp.addListener('resume', () => {
        handleDarkMode();
      });
    } catch (error) {}
  }, [handleDarkMode]);

  return (
    <IonApp>
      <AppRoutes />
      {/* <TestingPackagesAndLogic /> */}
      <ToastContainer />
      <ZaionsGlobalComponent />
    </IonApp>
  );
};

export default App;
