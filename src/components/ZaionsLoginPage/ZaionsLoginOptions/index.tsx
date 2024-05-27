// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductFavicon } from '@/assets/images';
import GoogleSocialAuth from '@/components/SocialAuth/GoogleAuth';

// Style

const ZaionsLoginOptions: React.FC = () => {
  const { isMdScale, isSmScale } = useZMediaQueryScale();

  return (
    <>
      <ZIonRow>
        <ZIonCol className='flex ion-justify-content-center'>
          <div className='w-full ion-text-center'>
            <ZIonImg
              src={ProductFavicon}
              className={classNames('mx-auto', {
                'w-[6rem] h-[6rem] mb-6': isMdScale,
                'w-[4rem] h-[4rem] mb-4': !isMdScale && isSmScale,
                'w-[3.5rem] h-[3.5rem] mb-2': !isSmScale
              })}
            />

            <ZIonText
              className={classNames('block mb-3 font-bold ion-text-center', {
                'text-2xl': isMdScale,
                'text-xl': !isMdScale && isSmScale,
                'text-lg': !isSmScale
              })}>
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
      <ZIonRow className='mb-10'>
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
      {/* 
      <ZaionsSeparator className='py-2 my-6' /> */}
    </>
  );
};

export default ZaionsLoginOptions;
