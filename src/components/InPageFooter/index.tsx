// Core Imports
import React from 'react';

// Packages Imports
import {
  logoLinkedin,
  logoPinterest,
  logoTwitter,
  logoYoutube
} from 'ionicons/icons';
import dayjs from 'dayjs';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonIcon,
  ZIonFooter,
  ZIonToolbar,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import { PRODUCT_NAME, ProductExternalURL } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductLogo } from '@/assets/images';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Functional Component
const InPageFooter: React.FC<{
  title?: string;
  btnText?: string;
  blueSec?: boolean;
}> = ({ title, btnText, blueSec = true }) => {
  const { zNavigatePushRoute } = useZNavigate();

  const { isXsScale } = useZMediaQueryScale();

  return (
    <>
      <ZIonFooter
        collapse='fade'
        className='zaions__medium_set'>
        <>
          {/* {blueSec ? (
            <div className='py-3 zaions__secondary_bg'>
              <div className='flex flex-col py-5 ion-text-center ion-margin-top ion-padding-bottom ion-justify-content-center ion-align-items-center'>
                <ZIonText
                  color='light'
                  className='block text-2xl'>
                  {title === '' || title === null || title === undefined
                    ? 'Get closer to your audience and customers today'
                    : title}
                </ZIonText>

                {/*  * /}
                <ZIonButton
                  size='large'
                  className='ion-margin-vertical ion-text-capitalize'
                  expand={!isMdScale ? 'block' : undefined}
                  routerLink={ZaionsRoutes.HomeRoute}>
                  {btnText === '' || btnText === null || btnText === undefined
                    ? 'Start for Free'
                    : btnText}
                </ZIonButton>
              </div>
            </div>
          ) : (
            ''
          )} */}
        </>
        <div className=''>
          <ZIonRow>
            <ZIonCol
              sizeXl='12'
              sizeLg='2.8'
              sizeMd='2.9'
              sizeSm='3'
              sizeXs='12'
              className={classNames({
                'flex ion-align-items-center ion-justify-content-center flex-col my-3 pt-5':
                  true,
                'mb-2': !isXsScale,
                'mb-3': isXsScale
              })}>
              <ZIonImg
                src={ProductLogo}
                className='w-[17rem]'
              />
              {/* <small>
                  © 2022 {PRODUCT_NAME} | Handmade in San Francisco, Denver, New
                  York City, Bielefeld, and all over the world.
                </small>
                <br /> <br /> */}
              <div className='flex mt-1 ion-align-items-center ion-justify-content-center'>
                <ZIonRouterLink
                  href={ProductExternalURL.TwitterUrl}
                  target='_blank'>
                  <ZIonIcon
                    size='large'
                    className='ion-padding-end'
                    icon={logoTwitter}
                    color='medium'
                  />
                </ZIonRouterLink>
                <ZIonRouterLink
                  href={ProductExternalURL.YoutubeUrl}
                  target='_blank'>
                  <ZIonIcon
                    size='large'
                    color='medium'
                    className='ion-padding-end'
                    icon={logoYoutube}
                  />
                </ZIonRouterLink>
                <ZIonRouterLink
                  href={ProductExternalURL.LinkeDinUrl}
                  target='_blank'>
                  <ZIonIcon
                    size='large'
                    color='medium'
                    className='ion-padding-end'
                    icon={logoLinkedin}
                  />
                </ZIonRouterLink>
                <ZIonRouterLink
                  href={ProductExternalURL.PinterestUrl}
                  target='_blank'>
                  <ZIonIcon
                    size='large'
                    color='medium'
                    icon={logoPinterest}
                  />
                </ZIonRouterLink>
              </div>
            </ZIonCol>
          </ZIonRow>

          {/*  */}
          <ZIonToolbar className='mt-5 z-ion-bg-transparent ion-padding-horizontal'>
            <ZIonRow>
              <ZIonCol>
                <ZIonText className='tracking-wider'>
                  © {dayjs().year()} {PRODUCT_NAME}
                </ZIonText>
              </ZIonCol>

              <ZIonCol className='flex gap-3 ion-text-end ion-align-items-center ion-justify-content-end'>
                <ZIonText
                  className='transition-all border-b cursor-pointer border-b-transparent hover:border-b-current'
                  color='dark'
                  onClick={() => {
                    zNavigatePushRoute(
                      ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute
                    );
                  }}>
                  Privacy Policy
                </ZIonText>

                {/*  */}
                <ZIonText
                  className='transition-all border-b cursor-pointer border-b-transparent hover:border-b-current'
                  color='dark'
                  onClick={() => {
                    zNavigatePushRoute(ZaionsRoutes.Legal.ZaionsTermsOfService);
                  }}>
                  Terms of Service
                </ZIonText>

                {/*  */}
                <ZIonText
                  className='transition-all border-b cursor-pointer border-b-transparent hover:border-b-current'
                  color='dark'
                  onClick={() => {
                    zNavigatePushRoute(
                      ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute
                    );
                  }}>
                  Acceptable Use Policy
                </ZIonText>
              </ZIonCol>
            </ZIonRow>
          </ZIonToolbar>
          {/* <ZIonGrid className='ion-padding-top ion-margin-top'>
            </ZIonGrid> */}
        </div>
      </ZIonFooter>
    </>
  );
};

export default InPageFooter;
