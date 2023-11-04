import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';
import CONSTANTS, { BRACKPOINT_SM } from '@/utils/constants';
import { logoGoogle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import { reportCustomError } from '@/utils/customErrorType';
import { isPlatform } from '@ionic/react';
const isWeb = !isPlatform('capacitor');

if (isWeb) {
  try {
    GoogleAuth.initialize({
      clientId:
        '1098579848404-v2emjb5nh94rancq1jhp2t9gljog3ken.apps.googleusercontent.com',
      grantOfflineAccess: false,
      scopes: ['profile', 'email']
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

  const googleAuthHandler = async () => {
    try {
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
      if (gUser?.id) {
        console.log({ gUser });
      } else {
        presentZIonErrorAlert();
      }
    } catch (e) {
      reportCustomError(e);
    }
  };
  return (
    <ZIonButton
      className='me-2 ion-text-capitalize'
      color='tertiary'
      expand={!isXsScale ? 'block' : undefined}
      testingselector={CONSTANTS.testingSelectors.loginPage.googleLoginButton}
      onClick={googleAuthHandler}>
      <ZIonIcon
        icon={logoGoogle}
        className='font-bold me-1 '></ZIonIcon>
      Google
    </ZIonButton>
  );
};

export default GoogleSocialAuth;
