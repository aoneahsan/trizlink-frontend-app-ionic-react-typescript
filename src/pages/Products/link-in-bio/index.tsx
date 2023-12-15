// Core Import
import React from 'react';

// Package Imports
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsInpageBrandsList from '@/components/InPageComponents/ZaionsBrandsList';
import ZaionsHPUsersFeedBack from '@/components/ZaionsHomePage/HPFeedback';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsTwoByTwoLeftCols from '@/components/InPageComponents/Zaions2By2LeftCols';
import ZaionsTwoByTwoRightCols from '@/components/InPageComponents/Zaions2By2RightCols';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import {
  BRACKPOINT_LG,
  BRACKPOINT_MD,
  BRACKPOINT_XL,
  PRODUCT_NAME
} from '@/utils/constants';

// Styles
import classes from './styles.module.css';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  brandingLIB,
  chartInspect,
  checkVector,
  customDomain,
  libMobile,
  linkInBioDriveTraffic,
  ManageLinksLIB,
  redirectLink1
} from '@/assets/images';

const ZaionsLinkInBio: React.FC = () => {
  const isXlScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XL})`
  });
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });

  return (
    <ZIonPage pageTitle='Link In Bio Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          lgImg={libMobile}
          label='Link-in-bio'
          title={
            <ZIonText
              className={classNames({
                'leading-[3rem]': !isMdScale
              })}>
              Make your social <br /> media profiles work <br /> harder
            </ZIonText>
          }
          subTitle={
            <ZIonText>
              Curate, organize, and track all your best links, so audiences{' '}
              <br />
              can discover and engage with more of your content.
            </ZIonText>
          }
          primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
          primaryBtnText='Start for Free'
          isSecondaryBtn={false}
          className={classNames({
            [classes.zaions__link_in_bio_bg]: isXlScale
          })}
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='12'
              sizeXs='12'>
              <ZIonText className='font-bold'>Drive Traffic</ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title text-3xl ${
                    !isXlScale ? 'text-5xl' : ''
                  }`}>
                  Drive more views, sales, subscribers and leads
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'text-lg' : ''
                  }`}>
                  Make it easy for your audience to discover your best, most
                  relevant content and take action that leads to bigger results
                  and deeper engagement.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoLeftCols
          text={
            <ZIonList
              lines='none'
              className='pt-0'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Create and share clickable URLs from any social media
                        profile
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Extend your reach and use your personalized{' '}
                        {PRODUCT_NAME} Link-in-bio and landing page everywhere
                        you want to share your most important links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Create a QR Code for your {PRODUCT_NAME} Link-in-bio and
                        let followers scan to experience your customized landing
                        page
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <div>
                  <ZIonButton
                    fill='clear'
                    className={`${classes.zaions__101_secondarybtn} mt-3 ion-text-capitalize`}
                    size='large'>
                    Start For Free
                  </ZIonButton>
                </div>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colLeftImage={linkInBioDriveTraffic}
          bottomHr={true}
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='12'
              sizeXs='12'>
              <ZIonText className='font-bold'>Branding</ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title text-3xl ${
                    !isXlScale ? 'text-5xl' : ''
                  }`}>
                  Build personalized experiences without coding
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'text-lg' : ''
                  }`}>
                  Our user-friendly interface makes it easy to quickly design
                  your landing page to match your brand’s signature elements, no
                  technical skills required.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoRightCols
          text={
            <ZIonList
              lines='none'
              className='pt-0'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Upload an image or logo, choose preset colors for your
                        background or use your own custom colors
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Choose preset shapes and shadows for your link buttons;
                        preset colors or use your own custom ones
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Add and edit social profile icons without sacrificing
                        link space
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Edit and manage your links on your phone with the{' '}
                        {PRODUCT_NAME}
                        mobile app
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <div>
                  <ZIonButton
                    fill='clear'
                    className={`${classes.zaions__101_secondarybtn} mt-3 ion-text-capitalize`}
                    size='large'>
                    Start For Free
                  </ZIonButton>
                </div>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colRightImage={brandingLIB}
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='12'
              sizeXs='12'>
              <ZIonText className=''>
                <strong>Manage Links & Pages</strong>
              </ZIonText>
              <h1
                className={`zaions__page_title text-3xl ${
                  !isXlScale ? 'text-5xl' : ''
                }`}>
                Everything in one place
              </h1>
              <h3
                className={`zaions__page_subtitle mt-1 ${
                  isLgScale ? 'text-lg' : ''
                }`}>
                Aggregate, manage, and track all of your {PRODUCT_NAME}{' '}
                Link-in-bio links from a single, centralized location.
              </h3>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoLeftCols
          text={
            <ZIonList
              lines='none'
              className='pt-0'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Search, find, and add your existing {PRODUCT_NAME} links
                        to your landing page without having to copy and paste
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Track total views and clicks, as well as devices,
                        referrals and geos driving the most traffic
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Easily update and change links if content expires or is
                        incorrect
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol
                      sizeXl='.9'
                      size='1'
                      sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        className='mt-1 w-[25px]'
                      />
                    </ZIonCol>
                    <ZIonCol
                      size='11'
                      sizeXs='10'>
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Schedule links to appear and stop on specific dates and
                        times for advanced event and promotion planning
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <div>
                  <ZIonButton
                    fill='clear'
                    className={`${classes.zaions__101_secondarybtn} mt-3 ion-text-capitalize`}
                    size='large'>
                    Start For Free
                  </ZIonButton>
                </div>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colLeftImage={ManageLinksLIB}
          bottomHr={false}
        />

        <ZIonGrid
          className={`mt-4 pb-3 mb-5 pt-5 zaions-ion-bg-color-light ${
            !isLgScale ? 'ion-text-center' : ''
          }`}>
          <ZIonRow className='pt-2 mb-4'>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              size='10'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-text-center'>
              <ZIonText>
                <b>Advanced Link-in-bio</b>
              </ZIonText>
              <h2 className='pt-1 mt-2 font-bolder zaions__color_dark text-[38px]'>
                Make your {PRODUCT_NAME} Link-in-bio even more powerful
              </h2>
              <ZIonText className='pt-1 text-lg zaions__color_gray2'>
                Access advanced {PRODUCT_NAME} Link Management features and the
                ability to analyze all of your links from a single dashboard.
              </ZIonText>
            </ZIonCol>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='.7'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              sizeXl='11'
              sizeLg='11'
              sizeMd='12'>
              <ZIonGrid>
                <ZIonRow>
                  <ZaionsInpageCol
                    icon={customDomain}
                    text={
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Create a custom domain for your {PRODUCT_NAME}{' '}
                        Link-in-bio with your own name or brand
                      </ZIonText>
                    }
                  />

                  <ZaionsInpageCol
                    icon={chartInspect}
                    text={
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Analyze the performance of your existing {PRODUCT_NAME}{' '}
                        links across all channels, beyond your {PRODUCT_NAME}{' '}
                        Link-in-bio landing page
                      </ZIonText>
                    }
                  />

                  <ZaionsInpageCol
                    icon={redirectLink1}
                    text={
                      <ZIonText className='text-lg zaions__color_gray2'>
                        Redirect links to different content if something changes
                        or becomes outdated
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
              sizeXs='0'></ZIonCol>
          </ZIonRow>

          <ZIonRow className='pt-1 mb-4'>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              size='10'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='ion-text-center'>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.HomeRoute}
                className='pb-0'>
                <ZIonButton
                  className='ion-text-capitalize'
                  color='primary'
                  fill='solid'
                  size='large'
                  expand={!isXlScale ? 'block' : undefined}>
                  Get Started
                </ZIonButton>
              </ZIonRouterLink>
            </ZIonCol>
            <ZIonCol
              size='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZaionsHPUsersFeedBack />

        <ZaionsInpageBrandsList
          title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
          className='pb-3 mt-5'
        />
        <div className='pb-5 mb-1'></div>

        {/* Page Footer */}
        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsLinkInBio;
