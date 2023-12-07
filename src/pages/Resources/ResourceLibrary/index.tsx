// Core Imports
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import ZaionsFeatureBanner from '@/components/InPageComponents/ZaionsFeatureBanner';
import ZaionsCard from '@/components/InPageComponents/ZaionsCol';

import {
  ZIonCol,
  ZIonText,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList
} from '@/components/ZIonComponents';

// Recoil
import { ZaionsSPSocialMarketersState } from '@/ZaionsStore/SolutionPages/SocialMarketers/ZaionsSPSocialMarketers.recoil';

// Data
import { RSBlogData } from '@/data/resources/blog/RSBlog.data';

// Type
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Global Constants

// Styles
import classes from './styles.module.css';

// Images
import { Webinar4waysResource } from '@/assets/images';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';

const ZaionsResourceLibrary: React.FC = () => {
  const [BlogData, setBlogData] = useRecoilState<Zaions4By4GridSysType[]>(
    ZaionsSPSocialMarketersState
  );

  useLayoutEffect(() => {
    setBlogData(RSBlogData);
  }, [setBlogData]);

  return (
    <ZIonPage pageTitle='Resource Library Page'>
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
          BtnRouteLink={CONSTANTS.ExternalURL.GenericExternalURL}
          rowShadow={false}
          textCenter={false}
          className='pt-5 mt-5 mb-5'
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
              sizeXs='12'>
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
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='11'
              sizeLg='12'>
              <ZIonRow>
                <ZIonCol
                  size='2.5'
                  sizeLg='2.6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'>
                  <ZIonText className='text-lg zaions__color_gray2 border-b border-[#eff0f2] '>
                    Filter Resources
                  </ZIonText>
                  <div className='zaions__color_gray2'>
                    <ZIonText className='block mt-4 mb-3'>By type</ZIonText>

                    <ZIonList
                      lines={'none'}
                      className='p-0 m-0'>
                      <ZIonItem className='p-0 m-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          All Types
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='p-0 m-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Case Studies
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='p-0 m-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Ebooks
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='p-0 m-0'>
                        <ZIonText className={`${classes.zaions__sidebar_btn}`}>
                          Webinars
                        </ZIonText>
                      </ZIonItem>
                      <ZIonItem className='p-0 m-0'>
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
                  className='ms-3'>
                  <ZIonRow>
                    <ZaionsCard
                      MinHeight='365px'
                      data={BlogData}
                    />
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
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsResourceLibrary;
