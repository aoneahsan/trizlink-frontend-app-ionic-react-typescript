// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductFavicon } from '@/assets/images';
import GoogleSocialAuth from '@/components/SocialAuth/GoogleAuth';

// Style

const ZaionsLoginOptions: React.FC = () => {
  return (
    <>
      <ZIonRow>
        <ZIonCol className='flex ion-justify-content-center'>
          <div className='w-full ion-text-center'>
            <ZIonImg
              src={ProductFavicon}
              className='w-[6rem] h-[6rem] mx-auto mb-6'
            />

            <ZIonText className='block mb-3 text-2xl font-bold ion-text-center'>
              Log in and start sharing
            </ZIonText>
            <ZIonText className='block'>
              <ZIonText>Don't have an account? </ZIonText>
              <ZIonRouterLink
                className='underline'
                routerLink={ZaionsRoutes.SignUpRoute}
                testingselector={
                  CONSTANTS.testingSelectors.loginPage.signupButton
                }>
                Sign up
              </ZIonRouterLink>
            </ZIonText>
          </div>
          <div></div>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow>
        {/* <ZIonCol className="ion-text-center" size="3.6"> */}
        {/* </ZIonCol> */}
        <ZIonCol className='ion-text-center'>
          <ZIonText
            className='block w-full mt-2 mb-3 text-[16px]'
            color='medium'>
            Log in with:
          </ZIonText>
          {/* Google Social Auth Component */}
          <GoogleSocialAuth />

          {/* <ZIonButton
            className='me-2 ion-text-capitalize'
            color='tertiary'
            expand={!isXsScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.loginPage.twitterLoginButton
            }>
            <ZIonIcon
              icon={logoTwitter}
              className='font-bold me-1'></ZIonIcon>{' '}
            Twitter
          </ZIonButton>
          <ZIonButton
            className='me-2 ion-text-capitalize'
            color='tertiary'
            expand={!isXsScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.loginPage.facebookLoginButton
            }>
            <ZIonIcon
              icon={logoFacebook}
              className='font-bold me-1'></ZIonIcon>{' '}
            Facebook
          </ZIonButton>
          <ZIonButton
            className='me-2 ion-text-capitalize'
            color='tertiary'
            expand={!isXsScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.loginPage.appleLoginButton
            }>
            <ZIonIcon
              icon={logoApple}
              className='font-bold me-1'></ZIonIcon>{' '}
            Apple
          </ZIonButton> */}
        </ZIonCol>
        {/* <ZIonCol className="ion-text-center" size="3.6"></ZIonCol> */}
      </ZIonRow>
    </>
  );
};

export default ZaionsLoginOptions;
