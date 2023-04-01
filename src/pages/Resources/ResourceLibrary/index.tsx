// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsIonPage from 'components/ZaionsIonPage';
import InPageFooter from 'components/InPageFooter';
import ZaionsTopMenu from 'navigation/TopMenu';
import ZaionsHr from 'components/InPageComponents/Zaion_hr';
import ZaionsFeatureBanner from 'components/InPageComponents/ZaionsFeatureBanner';
import ZaionsCard from 'components/InPageComponents/ZaionsCol';

import {
  ZIonCol,
  ZIonText,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
} from 'components/ZIonComponents';

// Recoil
import { ZaionsSPSocialMarketersState } from 'ZaionsStore/SolutionPages/SocialMarketers/ZaionsSPSocialMarketers.recoil';

// Data
import { RSBlogData } from 'data/resources/blog/RSBlog.data';

// Type
import { Zaions4By4GridSysType } from 'types/InPageComponentTypes/Zaions4By4GridSys.type';

// Global Constants

// Styles
import classes from './styles.module.css';

// Images
import { Webinar4waysResource } from 'assets/images';
import CONSTANTS, { PRODUCT_NAME } from 'utils/constants';

const ZaionsResourceLibrary: React.FC = () => {
  const [BlogData, setBlogData] = useRecoilState<Zaions4By4GridSysType[]>(
    ZaionsSPSocialMarketersState
  );

  useLayoutEffect(() => {
    setBlogData(RSBlogData);
  }, [setBlogData]);

  return (
    <ZaionsIonPage pageTitle='Resource Library Page'>
      {/* Content */}
      <ZIonContent>
        <ZaionsTopMenu />
        <ZaionsFeatureBanner
          titleBar={false}
          bannerLabel='Featured Video'
          bannerColTitle={`${PRODUCT_NAME} Works Anywhere You Do`}
          bannerText={
            <>
              Watch this webinar for a step-by-step instruction on the different
              ways <br /> you can save time and be more productive by
              shortening, branding, sharing and tracking your links from the
              various places and ways you work.
            </>
          }
          bannerImg={Webinar4waysResource}
          btnText='Watch Now'
          BtnRouteLink={CONSTANTS.GenaricExternalURL}
          rowShadow={false}
          textCenter={false}
          className='mt-5 pt-5 mb-5'
          isBottomRow={false}
        />
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11.2'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
            >
              <ZaionsHr></ZaionsHr>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='0'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
            <ZIonCol sizeXl='11' sizeLg='12'>
              <ZIonRow>
                <ZIonCol
                  size='2.5'
                  sizeLg='2.6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'
                >
                  <ZIonText
                    className='fs-5 zaions__color_gray2'
                    style={{ borderBottom: '1px #eff0f2 solid' }}
                  >
                    Filter Resources
                  </ZIonText>
                  <div className='zaions__color_gray2'>
                    <ZIonText className='d-block mb-3 mt-4'>By type</ZIonText>

                    <ZIonList lines={'none'} className='m-0 p-0'>
                      <ZIonItem className='m-0 p-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          All Types
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='m-0 p-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Case Studies
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='m-0 p-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Ebooks
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='m-0 p-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Webinars
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='m-0 p-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Infographics
                        </ZIonText>
                      </ZIonItem>
                    </ZIonList>
                  </div>
                </ZIonCol>
                <ZIonCol
                  size='8'
                  sizeLg='8'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'
                  className='ms-3'
                >
                  <ZIonRow>
                    <ZaionsCard MinHeight='365px' data={BlogData} />
                  </ZIonRow>
                </ZIonCol>
              </ZIonRow>
              <ZIonCol></ZIonCol>
            </ZIonCol>
            <ZIonCol
              sizeXl='0'
              sizeLg='0'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default ZaionsResourceLibrary;
