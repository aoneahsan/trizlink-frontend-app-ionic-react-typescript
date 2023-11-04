import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';
import CONSTANTS, { BRACKPOINT_SM } from '@/utils/constants';
import { logoGoogle } from 'ionicons/icons';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { reportCustomError } from '@/utils/customErrorType';
import { isPlatform } from '@ionic/react';
import { ENVS } from '@/utils/envKeys';
import { googleAuthConfig } from '@/configs/socialAuth';
const isWeb = !isPlatform('capacitor');

if (isWeb) {
  try {
    GoogleAuth.initialize({
      clientId: ENVS.googleClientId,
      grantOfflineAccess: googleAuthConfig.grantOfflineAccess,
      scopes: googleAuthConfig.scopes
    });
  } catch (error) {
    reportCustomError(error);
  }
}

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

  const googleAuthHandler = async () => {
    try {
      // TODO: talha please move the message for all social auth methods in one file/object for social auth messages, and please get proper messages from chatGpt4/3.5 whatever is available
      presentZIonLoader('Processing Google Auth Request...');
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
      setCompState(oldState => ({
        ...oldState,
        processing: false
      }));

      // yes we will only dismiss the main loader once we have completed the auth request completely and properly, or in case of error
      dismissZIonLoader();
      if (gUser?.id) {
        console.log({ gUser });
      } else {
        presentZIonErrorAlert();
      }
    } catch (e) {
      reportCustomError(e);
      dismissZIonLoader();
      setCompState(oldState => ({
        ...oldState,
        processing: false
      }));
    }
  };
  return (
    <ZIonButton
      className='me-2 ion-text-capitalize'
      color='tertiary'
      expand={!isXsScale ? 'block' : undefined}
      testingselector={CONSTANTS.testingSelectors.loginPage.googleLoginButton}
      onClick={googleAuthHandler}
      disabled={compState.processing}>
      <ZIonIcon
        icon={logoGoogle}
        className='font-bold me-1 '></ZIonIcon>
      Google
    </ZIonButton>
  );
};

export default GoogleSocialAuth;
