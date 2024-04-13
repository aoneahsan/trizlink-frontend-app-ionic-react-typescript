// Core Import
import React, { useEffect } from 'react';

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

const App: React.FC = () => {
  const setAuthTokenState = useSetRecoilState(ZaionsAuthTokenData);
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const navigate = useZNavigate();

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
