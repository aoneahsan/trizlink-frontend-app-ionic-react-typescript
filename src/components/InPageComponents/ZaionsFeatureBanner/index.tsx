// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonImg,
  ZIonGrid,
  ZIonRow,
  ZIonButton,
  ZIonTitle
} from '@/components/ZIonComponents';

// Global Imports

// Styles
import classes from './styles.module.css';

const ZaionsFeatureBanner: React.FC<{
  title?: string;
  titleBar?: boolean;
  rowShadow?: boolean;
  bannerImg: string;
  bannerLabel?: string;
  bannerColTitle: string | JSX.Element | JSX.Element[];
  bannerText: string | JSX.Element | JSX.Element[];
  isBottomRow?: boolean;
  className?: string;
  routeLink?: string;
  BtnRouteLink?: string;
  btnText?: string;
  textCenter?: boolean;
}> = ({
  title,
  titleBar = true,
  rowShadow = true,
  bannerImg,
  bannerLabel,
  bannerColTitle,
  bannerText,
  isBottomRow = true,
  className,
  routeLink,
  BtnRouteLink,
  btnText,
  textCenter = true
}) => {
  const classValue = className;
  return (
    <>
      <ZIonGrid className={classValue}>
        {titleBar && (
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='.5'
              sizeMd='.5'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='11'
              sizeMd='11'
              sizeSm='12'
              sizeXs='12'>
              <ZIonTitle className={classes.zaions__feature_banner_title}>
                {title}
              </ZIonTitle>
            </ZIonCol>
            <ZIonCol
              size='1'
              sizeLg='.5'
              sizeMd='.5'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        )}
        <ZIonRow>
          <ZIonCol
            sizeXl='1'
            sizeLg='.5'
            sizeMd='.5'
            sizeSm='0'
            sizeXs='0'></ZIonCol>
          <ZIonCol
            sizeXl='10'
            sizeLg='11'
            sizeMd='11'
            sizeSm='12'
            sizeXs='12'>
            <ZIonRow
              className={`${rowShadow ? classes.row__box_shadow : ''} p-0`}>
              <ZIonCol
                sizeXl=''
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='p-0'>
                <ZIonRouterLink routerLink={routeLink}>
                  <ZIonImg src={bannerImg} />
                </ZIonRouterLink>
              </ZIonCol>
              <ZIonCol
                sizeXl=''
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className={`${
                  textCenter
                    ? 'flex ion-justify-content-center ion-align-items-center'
                    : 'ms-5'
                }`}>
                <div className=''>
                  <span className='mb-1 text-lg zaions__color_gray2'>
                    {bannerLabel}
                  </span>
                  <ZIonRouterLink
                    routerLink={routeLink}
                    color='dark'>
                    <h2 className='font-extrabold'>{bannerColTitle}</h2>
                  </ZIonRouterLink>
                  <ZIonText className='text-base zaions__color_gray2'>
                    {bannerText}
                  </ZIonText>
                  <ZIonRouterLink
                    routerLink={
                      BtnRouteLink === '' ||
                      BtnRouteLink === undefined ||
                      BtnRouteLink === null
                        ? routeLink
                        : BtnRouteLink
                    }>
                    <ZIonButton
                      className={`${classes.zaions__feature_banner_btn} ion-text-capitalize`}
                      fill='clear'
                      size='large'>
                      {btnText === '' ||
                      btnText === undefined ||
                      btnText === null
                        ? 'Read More'
                        : btnText}
                    </ZIonButton>
                  </ZIonRouterLink>
                </div>
              </ZIonCol>
            </ZIonRow>
          </ZIonCol>
          <ZIonCol
            size='1'
            sizeLg='.5'
            sizeMd='.5'
            sizeSm='0'
            sizeXs='0'></ZIonCol>
        </ZIonRow>
      </ZIonGrid>
      {isBottomRow && (
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11.2'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              <ZaionsHr></ZaionsHr>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      )}
    </>
  );
};

export default ZaionsFeatureBanner;
