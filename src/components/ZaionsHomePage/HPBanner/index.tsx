// Core Imports
import React from 'react';

// Packages Imports
import { HomePageHeroDesktopImage } from '@/assets/images';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Style
import classes from './styles.module.css';
import classNames from 'classnames';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

const ZaionsHPBanner: React.FC = () => {
  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

  return (
    <ZIonGrid
      fixed={true}
      className=''>
      <ZIonRow>
        <ZIonCol
          sizeXl='8'
          offsetXl='0'
          offsetLg='2'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={`${!isLgScale ? 'ion-text-center' : ''}`}>
          <ZIonText>
            <h1 className='ion-padding-top ion-margin-top font-bold zaions__color_dark leading-[48px] text-4xl'>
              We’ve expanded! <br /> Shorten URLs. Generate QR Codes. <br />
              And now, create Link-in-bios.
            </h1>
          </ZIonText>

          <div
            className={classNames({
              // 'ion-text-center': true,
              'w-max': !isLgScale
            })}>
            <ZIonRouterLink
              routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}>
              <ZIonButton
                className='mb-3 ion-text-capitalize ion-margin-top'
                color='primary'
                fill='solid'
                // size='default'
                size={!isSmScale ? 'default' : 'large'}
                expand={!isSmScale ? 'block' : undefined}>
                Get Started For Free
              </ZIonButton>
            </ZIonRouterLink>
            {/* <br /> */}
            <ZIonRouterLink routerLink={ZaionsRoutes.DiscoverEnterpriseRoute}>
              <ZIonText
                className={`${classes.zaions__bannerQuote_btn} ion-text-capitalize mt-1 block`}
                color='primary'>
                Get a Quote
              </ZIonText>
            </ZIonRouterLink>
          </div>
        </ZIonCol>
        <ZIonCol
          sizeXl='4'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <ZIonImg
            src={HomePageHeroDesktopImage}
            alt=''
            className={classNames({
              'mx-auto': true,
              'w-full': !isMdScale,
              'w-[460px]': isMdScale,
              'min-w-[60%]': isLgScale,
              'min-w-full': !isLgScale
            })}
          />
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZaionsHPBanner;
