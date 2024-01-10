// Core Import
import React, { useEffect } from 'react';

// Packages Imports
import { IonApp } from '@ionic/react';
import { ToastContainer } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

// Custom Imports
import AppRoutes from '@/AppRoutes';
import TestingPackagesAndLogic from '@/Testing';
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
import './theme/variables.css';
import { type UserAccountType } from '@/types/UserAccount/index.type';
import { reportCustomError } from './utils/customErrorType';

const App: React.FC = () => {
  const setAuthTokenState = useSetRecoilState(ZaionsAuthTokenData);
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonApp>
      <AppRoutes />
      <TestingPackagesAndLogic />
      <ToastContainer />
      <ZaionsGlobalComponent />
    </IonApp>
  );
};

export default App;
