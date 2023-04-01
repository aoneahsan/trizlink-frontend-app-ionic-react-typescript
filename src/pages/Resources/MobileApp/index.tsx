// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsCardWithIcon from '@/components/InPageComponents/ZaionsCard';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';

import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
} from '@/components/ZIonComponents';

// Recoil
import { ZaionsRTCState } from 'ZaionsStore/Resources/ZaionsRTrustCenter.recoil';

// Global Constants
import { BRACKPOINT_LG, PRODUCT_NAME } from '@/utils/constants';

// Types
import { ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

// Data
import { MobileAppData } from '@/data/resources/MobileApp/MobileApp.data';

// Styles
import classes from './styles.module.css';

// Images
import { branding2, manageLinks, QRCodeColor } from '@/assets/images';

const ZaionsMobileApps: React.FC = () => {
  const [zaionsBEData, setZaionsBEData] =
    useRecoilState<ZaionsCardWithIconType[]>(ZaionsRTCState);

  useLayoutEffect(() => {
    setZaionsBEData(MobileAppData);
  }, [setZaionsBEData]);

  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });

  return (
    <>
      <ZaionsIonPage pageTitle='Mobile App Page'>
        {/* Content */}
        <ZIonContent>
          <ZaionsTopMenu />
          <ZaionsInpageHeader
            label={'Mobile App'}
            title={`Get the ${PRODUCT_NAME} App`}
            subTitle={
              <ZIonText className='pt-2' style={{ lineHeight: '2.2rem' }}>
                Create and manage links faster and from anywhere with the{' '}
                {PRODUCT_NAME} mobile app. There’s <br /> no easier way to
                create connections on the go.{' '}
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
                    {PRODUCT_NAME} Mobile Apps
                  </h2>
                </ZIonText>
                <ZIonText className='mt-2 fs-5 zaions__color_gray2'>
                  Create, edit, share, and track performance of your links. All
                  from your own mobile device.
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
                  <ZaionsCardWithIcon data={zaionsBEData} XlSize='6' />
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
                    Mobile Features to Discover
                  </h2>
                </ZIonText>
                <ZIonText className='pt-1 fs-5 zaions__color_gray2'>
                  Create, manage, and analyze powerful links.
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
                      title='Manage Links'
                      text={
                        <ZIonText className='zaions__color_gray2'>
                          See all your links, focus on top links, or filter your
                          list by tags.
                        </ZIonText>
                      }
                    />

                    <ZaionsInpageCol
                      icon={manageLinks}
                      title='Monitor Metrics'
                      text={
                        <ZIonText className='zaions__color_gray2'>
                          Drill down into each link’s performance metrics to
                          monitor click activity.
                        </ZIonText>
                      }
                    />

                    <ZaionsInpageCol
                      icon={QRCodeColor}
                      title='Copy and Connect'
                      text={
                        <ZIonText className='zaions__color_gray2'>
                          Tap to copy and share a link with your audience, right
                          from the palm of your hand.
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

          <InPageFooter title={`Take ${PRODUCT_NAME} with You`} />
        </ZIonContent>
      </ZaionsIonPage>
    </>
  );
};

export default ZaionsMobileApps;
