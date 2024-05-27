import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';
import CONSTANTS, {
  BRACKPOINT_SM,
  LOCALSTORAGE_KEYS,
  encryptKeys
} from '@/utils/constants';
import { logoGoogle } from 'ionicons/icons';
import React, { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { ZCustomError, reportCustomError } from '@/utils/customErrorType';
import { isPlatform } from '@ionic/react';
import { ENVS } from '@/utils/envKeys';
import { googleAuthConfig } from '@/configs/socialAuth';
import dayjs from 'dayjs';
import {
  STORAGE,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  zAxiosApiRequest,
  zStringify
} from '@/utils/helpers';
import { type UserAuthData } from '@/types/ZaionsApis.type';
import { API_URL_ENUM } from '@/utils/enums';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { useSetRecoilState } from 'recoil';
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { AxiosError } from 'axios';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';

interface IGoogleSocialAuthProps {
  children?: React.ReactNode;
}

const GoogleSocialAuth: React.FC<IGoogleSocialAuthProps> = () => {
  const [compState, setCompState] = useState({
    processing: false
  });
  const isXsScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_SM})`
  });
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  // Store user data in ZaionsUserAccountRStateAtom recoil state.
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  // recoil state for storing auth data
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);
  const { zNavigatePushRoute } = useZNavigate(); // hook to navigate

  const googleAuthHandler = async (): Promise<void> => {
    try {
      // TODO: talha please move the message for all social auth methods in one file/object for social auth messages, and please get proper messages from chatGpt4/3.5 whatever is available
      void presentZIonLoader('Processing Google Auth Request...');
      setCompState(oldState => ({
        ...oldState,
        processing: true
      }));

      try {
        await GoogleAuth.signOut();
      } catch (error) {
        reportCustomError(error);
      }

      const gUser = await GoogleAuth.signIn();

      console.log({ ml: 'googleAuthHandler', gUser });
      setCompState(oldState => ({
        ...oldState,
        processing: false
      }));

      // yes we will only dismiss the main loader once we have completed the auth request completely and properly, or in case of error
      void dismissZIonLoader();
      if (gUser?.id?.trim()?.length > 0) {
        const data = {
          [encryptKeys.accessToken]: gUser?.authentication?.accessToken,
          [encryptKeys.time]: dayjs().add(CONSTANTS.ZRequestTimeAddM, 'minute')
        };

        // registering data
        const _response = await zAxiosApiRequest<UserAuthData>({
          _url: API_URL_ENUM.socialLogin,
          _method: 'post',
          _isAuthenticatedRequest: false,
          _data: zStringify(data)
        });
        if (
          _response !== undefined &&
          _response.success &&
          _response?.data?.token?.plainTextToken?.length > 0
        ) {
          // getting user data.
          const userData = getUserDataObjectForm(_response.data.user);

          // Storing user token at userAccountAuthToken State.
          const userToken = {
            token: _response.data.token.plainTextToken
          };

          // Set user data && user token to localstorage.
          if (
            userData !== undefined &&
            userData !== null &&
            userToken !== null
          ) {
            // store User token.
            void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
            // store auth token.
            void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

            // Storing user data in userAccount Recoil State.
            setUserAccountStateAtom(oldValues => ({
              ...oldValues,
              ...userData
            }));

            setAuthTokenDataState(oldValues => ({
              ...oldValues,
              ...userToken
            }));

            // Dismiss the ion loader
            await dismissZIonLoader();

            // If success then show the success notification.
            showSuccessNotification(MESSAGES.GENERAL.LOGIN_SUCCESSFULLY);

            // Redirect to startup page
            zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
          } else {
            // if there is any error in above then Throw Error..
            throw new ZCustomError();
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
      void dismissZIonLoader();
      setCompState(oldState => ({
        ...oldState,
        processing: false
      }));
      if (error instanceof AxiosError) {
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;

        if (_apiErrors !== undefined && _apiErrors !== null) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['email', 'message'],
            ['email', 'message'],
            _apiErrors
          ) as
            | {
                email?: string;
                message?: string;
              }
            | undefined;

          if (
            _errors?.email !== undefined &&
            _errors?.email !== null &&
            _errors?.message !== null
          ) {
            await presentZIonErrorAlert({
              message: _errors?.message,
              subHeader: _errors?.email
            });
          }
        }
      }
    }
  };

  return (
    <ZIonButton
      className='me-2 ion-text-capitalize'
      color='tertiary'
      expand={'block'}
      testingselector={CONSTANTS.testingSelectors.loginPage.googleLoginButton}
      onClick={() => {
        void googleAuthHandler();
      }}
      disabled={compState.processing}>
      <ZIonIcon
        icon={logoGoogle}
        className='font-bold me-1 '></ZIonIcon>
      Google
    </ZIonButton>
  );
};

export default GoogleSocialAuth;
