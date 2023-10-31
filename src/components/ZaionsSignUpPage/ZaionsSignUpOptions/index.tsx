// Core Imports
import React from 'react';

// Packages Imports
import { logoGoogle } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonRow,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { ProductFavicon } from '@/assets/images';

// Style

const ZaionsSignUpOptions: React.FC = () => {
  return (
    <>
      <ZIonRow>
        <ZIonCol
          className='flex mx-auto ion-justify-content-center'
          sizeXl='6'
          sizeLg='6.7'
          sizeMd='7.5'
          sizeSm='10'
          sizeXs='12'>
          <div className='w-full ion-text-center'>
            <ZIonImg
              src={ProductFavicon}
              className='w-[6rem] h-[6rem] mx-auto mb-6'
            />

            <ZIonText className='block mb-3 text-2xl font-bold'>
              Sign up and start shortening
            </ZIonText>
            <ZIonText className='block'>
              <ZIonText>Already have an account? </ZIonText>
              <ZIonRouterLink
                className='underline'
                routerLink={ZaionsRoutes.LoginRoute}
                testingselector={
                  CONSTANTS.testingSelectors.signupPage.loginButton
                }>
                Login
              </ZIonRouterLink>{' '}
            </ZIonText>
          </div>
          <div></div>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow>
        {/* <ZIonCol className="ion-text-center" size="3.6"> */}
        {/* </ZIonCol> */}
        <ZIonCol
          className='mx-auto mt-3 ion-text-center'
          sizeXl='5'
          sizeLg='5.7'
          sizeMd='6.5'
          sizeSm='10'
          sizeXs='12'>
          <ZIonButton
            className='me-2 ion-text-capitalize'
            color='tertiary'
            expand='block'
            testingselector={
              CONSTANTS.testingSelectors.signupPage.googleSignupButton
            }>
            <ZIonIcon
              icon={logoGoogle}
              className='font-bold me-1'
            />
            Sign Up with Google
          </ZIonButton>
        </ZIonCol>
        {/* <ZIonCol className="ion-text-center" size="3.6"></ZIonCol> */}
      </ZIonRow>
    </>
  );
};

export default ZaionsSignUpOptions;
