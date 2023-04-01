// Core Import
import React, { useEffect } from 'react';

// Packages Imports
import { IonApp } from '@ionic/react';
import { ToastContainer } from 'react-toastify';

// Custom Imports
import AppRoutes from './AppRoutes';
import TestingPackagesAndLogic from './Testing';
import { useSetRecoilState } from 'recoil';

// helpers
import { STORAGE } from '@/utils/helpers';

// global constants
import { LOCALSTORAGE_KEYS } from '@/utils/constants';

// Recoil State
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRState,
} from 'ZaionsStore/UserAccount/index.recoil';

/* Theme variables */
import './theme/variables.css';
import { UserAccountType } from '@/types/UserAccount/index.type';

const App: React.FC = () => {
  const setAuthTokenState = useSetRecoilState(ZaionsAuthTokenData);
  const setUserAccountState = useSetRecoilState(ZaionsUserAccountRState);
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
        if (userData && authToken) {
          setUserAccountState((oldState) => ({
            ...oldState,
            ...userData,
          }));

          setAuthTokenState((oldState) => ({
            ...oldState,
            token: authToken,
          }));
        }
      } catch (error) {
        console.error({
          errorPlacement: 'From ZaionsApp - useEffect - tryCatch',
          error,
        });
      }
    })();
  }, [setAuthTokenState, setUserAccountState]);

  return (
    <IonApp>
      <AppRoutes />
      <TestingPackagesAndLogic />
      <ToastContainer />
    </IonApp>
  );
};

export default App;
