// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsIonPage from 'components/ZaionsIonPage';
import InPageFooter from 'components/InPageFooter';
import ZaionsTopMenu from 'navigation/TopMenu';
import ZaionsInpageHeader from 'components/InPageComponents/ZaionsInpageHeader';
import ZaionsCardWithIcon from 'components/InPageComponents/ZaionsCard';
import ZaionsInpageCol from 'components/InPageComponents/ZaionsInpageGridsys';

import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
} from 'components/ZIonComponents';

// Recoil
import { ZaionsRTCState } from 'ZaionsStore/Resources/ZaionsRTrustCenter.recoil';

// Global Constants
import { BRACKPOINT_LG, PRODUCT_DOMAIN, PRODUCT_NAME } from 'utils/constants';

// Types
import { ZaionsCardWithIconType } from 'types/ZaionsCardWithIcon.type';

// Data
import { BrowserExtensionData } from 'data/resources/BrowserExtensions/BrowserExtensions.data';

// Styles
import classes from './styles.module.css';

// Images
import { branding2, manageLinks, QRCodeColor } from 'assets/images';

const ZaionsBrowserExtensions: React.FC = () => {
  const [zaionsBEData, setZaionsBEData] =
    useRecoilState<ZaionsCardWithIconType[]>(ZaionsRTCState);

  useLayoutEffect(() => {
    setZaionsBEData(BrowserExtensionData);
  }, [setZaionsBEData]);

  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });

  return (
    <>
      <ZaionsIonPage pageTitle='Browser Extention'>
        {/* Content */}
        <ZIonContent>
          <ZaionsTopMenu />
          <ZaionsInpageHeader
            label={'Browser Extension'}
            title={`Get the ${PRODUCT_NAME} Browser Extension`}
            subTitle={
              <ZIonText className='pt-2' style={{ lineHeight: '2.2rem' }}>
                Create a link, fast and easy, right from the page you’re
                viewing. Add ${PRODUCT_NAME}’s browser <br /> extension to boost
                your productivity.{' '}
              </ZIonText>
            }
            isPrimaryBtn={false}
            className='pb-0'
          />

          <ZIonGrid className={`${classes.zaions__bg_gray} pt-5 pb-5`}>
            <ZIonRow>
              <ZIonCol size='12' className='text-center'>
                <ZIonText>
                  <h2 className='fw-bolder' style={{ fontSize: '2.2rem' }}>
                    {PRODUCT_NAME} Browser Extensions
                  </h2>
                </ZIonText>
                <ZIonText className='mt-2 fs-5 zaions__color_gray2'>
                  The fastest, easiest way to create and share links right from
                  your browser.{' '}
                </ZIonText>
              </ZIonCol>
            </ZIonRow>
            <ZIonRow className='py-5 zaions__bg_gray'>
              <ZIonCol
                sizeXl='1'
                sizeLg='1'
                sizeMd='1'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
              <ZIonCol
                sizeXl='10'
                sizeLg='10'
                sizeMd='10'
                sizeSm='12'
                sizeXs='12'
              >
                <ZIonRow>
                  <ZaionsCardWithIcon data={zaionsBEData} />
                </ZIonRow>
              </ZIonCol>
              <ZIonCol
                sizeXl='1'
                sizeLg='1'
                sizeMd='1'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
            </ZIonRow>
          </ZIonGrid>

          <ZIonGrid
            className={`mt-4 pb-3 mb-5 ${!isLgScale ? 'ion-text-center' : ''}`}
          >
            <ZIonRow className='mb-4 pt-2'>
              <ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
              <ZIonCol
                size='10'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='ion-text-center'
              >
                <ZIonText>
                  <h2
                    className='fw-bolder zaions__color_dark mt-2 pt-1'
                    style={{ fontSize: '38px' }}
                  >
                    Browser Features to Discover
                  </h2>
                </ZIonText>
                <ZIonText className='pt-1 fs-5 zaions__color_gray2'>
                  Shorten, customize and create powerful links and scans.
                </ZIonText>
              </ZIonCol>
              <ZIonCol size='1' sizeMd='0' sizeSm='0' sizeXs='0'></ZIonCol>
            </ZIonRow>
            <ZIonRow>
              <ZIonCol
                sizeXl='1'
                sizeLg='.7'
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
              <ZIonCol sizeXl='11' sizeLg='11' sizeMd='12'>
                <ZIonGrid>
                  <ZIonRow>
                    <ZaionsInpageCol
                      icon={branding2}
                      title='Shorten Links with a Click'
                      text={
                        <ZIonText className='zaions__color_gray2'>
                          Click the {PRODUCT_NAME} button in your toolbar to
                          create a unique link to the current URL. Your shorter,
                          more memorable link is copied to your clipboard and
                          ready to paste into a post, message, or document.{' '}
                        </ZIonText>
                      }
                    />

                    <ZaionsInpageCol
                      icon={manageLinks}
                      title='Customize Click-Worthy Links'
                      text={
                        <p className='zaions__color_gray2'>
                          Is that {PRODUCT_NAME} link too generic for you?
                          Customize it by editing the back-half. Then take it to
                          the next level by upgrading your account and replacing
                          the generic “{PRODUCT_DOMAIN}” domain with your own
                          brand.{' '}
                        </p>
                      }
                    />

                    <ZaionsInpageCol
                      icon={QRCodeColor}
                      title='Generate QR Code'
                      text={
                        <ZIonText className='zaions__color_gray2'>
                          Create QR codes for print, outdoor, and other ad
                          campaigns. With {PRODUCT_NAME}, a static QR Code will
                          never get stale—just redirect it when your content
                          changes.{' '}
                        </ZIonText>
                      }
                    />
                  </ZIonRow>
                </ZIonGrid>
              </ZIonCol>
              <ZIonCol
                sizeXl='0'
                sizeLg=''
                sizeMd='0'
                sizeSm='0'
                sizeXs='0'
              ></ZIonCol>
            </ZIonRow>
          </ZIonGrid>

          <InPageFooter title={`You’ll Need a ${PRODUCT_NAME} Account`} />
        </ZIonContent>
      </ZaionsIonPage>
    </>
  );
};

export default ZaionsBrowserExtensions;
