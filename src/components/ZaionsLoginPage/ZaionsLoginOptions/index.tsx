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
import ZaionsSeparator from '@/components/InPageComponents/ZaionsSepatator/ZaionsSeparator';

// Style

const ZaionsLoginOptions: React.FC = () => {
  return (
    <>
      <ZIonRow className='mb-10'>
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
        </ZIonCol>
      </ZIonRow>
      {/* <ZIonRow>
        <ZIonCol
          className='mx-auto ion-text-center'
          size='4.2'
          sizeLg='5'
          sizeMd='6.2'
          sizeSm='8.2'
          sizeXs='11.5'>
          <ZIonText
            className='block w-full mt-2 mb-3 text-[16px]'
            color='medium'>
            Log in with:
          </ZIonText>
          <GoogleSocialAuth />
        </ZIonCol>
      </ZIonRow>
      <ZaionsSeparator className='py-2 my-6' /> */}
    </>
  );
};

export default ZaionsLoginOptions;
