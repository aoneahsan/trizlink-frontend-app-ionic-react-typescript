// Core Import
import React from 'react';

// Package Imports
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';

// Custom Imports
import ZaionsIonPage from 'components/ZaionsIonPage';
import InPageFooter from 'components/InPageFooter';
import ZaionsInpageHeader from 'components/InPageComponents/ZaionsInpageHeader';
import ZaionsInpageBrandsList from 'components/InPageComponents/ZaionsBrandsList';
import ZaionsHPUsersFeedBack from 'components/ZaionsHomePage/HPFeedback';
import ZaionsTopMenu from 'navigation/TopMenu';
import ZaionsTwoByTwoLeftCols from 'components/InPageComponents/Zaions2By2LeftCols';
import ZaionsTwoByTwoRightCols from 'components/InPageComponents/Zaions2By2RightCols';
import {
  ZIonCol,
  ZIonText,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonList,
  ZIonImg,
} from 'components/ZIonComponents';

// Global Constants
import {
  BRACKPOINT_LG,
  BRACKPOINT_MD,
  BRACKPOINT_XL,
  PRODUCT_DOMAIN,
  PRODUCT_NAME,
} from 'utils/constants';

// Styles
import classes from './styles.module.css';
import ZaionsRoutes from 'utils/constants/RoutesConstants';
import {
  brandingLinkManagement,
  campaignManagementLinkMangement,
  checkVector,
  linkManagementMobile,
  lmLinkManagement,
  reportingLinkManagement,
  smsLinkManagement,
} from 'assets/images';

const ZaionsLinkManagment: React.FC = () => {
  const isXlScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XL})`,
  });
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });

  return (
    <ZaionsIonPage pageTitle='Link Managment'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          lgImg={linkManagementMobile}
          label='Link Management'
          title={
            <ZIonText
              className='d-block'
              style={{ lineHeight: !isMdScale ? '3rem' : '' }}
            >
              Connect and ignite <br /> action with every link
            </ZIonText>
          }
          primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
          subTitle={
            <ZIonText className='d-block'>
              Whether you’re sharing one link or millions, {PRODUCT_NAME} lets
              you <br /> personalize, share, and track your content links, while{' '}
              <br />
              capturing data with every click.
            </ZIonText>
          }
          primaryBtnText='Get Started'
          isSecondaryBtn={false}
          className={classNames({
            [classes.zaions__link_Management_bg]: isXlScale,
            [classes.zaions__pb]: isXlScale,
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
              sizeXs='12'
            >
              <ZIonText className='fw-bold'></ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title fs-2 ${
                    !isXlScale ? 'fs-1' : ''
                  }`}
                >
                  Turn your links into brand assets
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'fs-5' : ''
                  }`}
                >
                  Build links that are more readable, trustworthy and likely to
                  be clicked.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoRightCols
          text={
            <ZIonList lines='none'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Create custom domains, and replace “{PRODUCT_DOMAIN}”
                        with your own brand name
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <span className='fs-5 zaions__color_gray2'>
                        Customize link back-halves (often called “URL slugs”) so
                        people know where you’re sending them
                      </span>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <span className='fs-5 zaions__color_gray2'>
                        Automatically brand links with your custom domain
                        whenever someone shortens a long URL using{' '}
                        {PRODUCT_NAME}
                      </span>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colRightImage={brandingLinkManagement}
          className='mt-0'
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='12'
              sizeXs='12'
            >
              <ZIonText className='fw-bold'>Manage Links & Pages</ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title fs-2 ${
                    !isXlScale ? 'fs-1' : ''
                  }`}
                >
                  Get more engagement with your customer text notifications
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'fs-5' : ''
                  }`}
                >
                  Use branded short links to personalize 1:1 messages to
                  customers and prospects.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoLeftCols
          text={
            <ZIonList lines='none'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Create custom domains and link back-halves to show
                        customers they’re from a trusted source
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Securely shorten links so they don’t take up valuable
                        character count
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Use {PRODUCT_NAME}’s API to programmatically generate
                        millions of short branded links per day
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colLeftImage={smsLinkManagement}
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
              sizeXs='12'
            >
              <ZIonText className='fw-bold'>Campaign Management</ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title fs-2 ${
                    !isXlScale ? 'fs-1' : ''
                  }`}
                >
                  All your links in one place
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'fs-5' : ''
                  }`}
                >
                  Aggregate, manage, and track all of your links from a single,
                  centralized location.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoRightCols
          text={
            <ZIonList lines='none'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Create, manage, and track marketing campaigns from email
                        and social media, to digital ads and offline media, all
                        in one place
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Build UTM parameters and create links in bulk for
                        marketing channels and campaigns, all at once
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        View performance across paid, earned and owned channels,
                        down to city-level and organic shares
                        {PRODUCT_NAME}
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colRightImage={campaignManagementLinkMangement}
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
              sizeXs='12'
            >
              <ZIonText className='fw-bold'>Link Management</ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title fs-2 ${
                    !isXlScale ? 'fs-1' : ''
                  }`}
                >
                  Stay flexible and agile
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'fs-5' : ''
                  }`}
                >
                  Organize, configure, and edit links to grow with your
                  audience.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZaionsTwoByTwoLeftCols
          text={
            <ZIonList lines='none'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Use tags to organize links and make searching easy.
                        Track channels you share them on, as well as configure
                        them for marketing campaigns
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Search and browse existing links by name and date or
                        further filter them by tags, custom branding, or hidden
                        links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Assign and redirect a new URL to any of your links,
                        including QR Codes, to correct a destination error,
                        update a destination, or expire old links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colLeftImage={lmLinkManagement}
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
              sizeXs='12'
            >
              <ZIonText className='fw-bold'>
                Marketing Reporting & Analytics
              </ZIonText>
              <ZIonText>
                <h1
                  className={`zaions__page_title fs-2 ${
                    !isXlScale ? 'fs-1' : ''
                  }`}
                >
                  Understand what’s resonating with your audience
                </h1>
              </ZIonText>
              <ZIonText>
                <h3
                  className={`zaions__page_subtitle mt-1 ${
                    isLgScale ? 'fs-5' : ''
                  }`}
                >
                  Capture data with every click; make smarter decisions about
                  which content and platforms to focus your efforts and dollars
                  on.
                </h3>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <ZaionsTwoByTwoRightCols
          text={
            <ZIonList lines='none'>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Track organic shares across earned media, including
                        links other {PRODUCT_NAME} users create that point to
                        your content
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Customize link back-halves (often called “URL slugs”) so
                        people know where you’re sending them
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
              <ZIonItem>
                <ZIonGrid>
                  <ZIonRow>
                    <ZIonCol sizeXl='.9' size='1' sizeXs='1.5'>
                      <ZIonImg
                        src={checkVector}
                        style={{ width: '25px' }}
                        className='mt-1'
                      ></ZIonImg>
                    </ZIonCol>
                    <ZIonCol size='11' sizeXs='10'>
                      <ZIonText className='fs-5 zaions__color_gray2'>
                        Automatically brand links with your custom domain
                        whenever someone shortens a long URL using{' '}
                        {PRODUCT_NAME}
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonItem>
            </ZIonList>
          }
          Btn={false}
          colRightImage={reportingLinkManagement}
          bottomHr={true}
        />

        <ZaionsHPUsersFeedBack />

        <ZaionsInpageBrandsList
          title={`The most recognized brands in the world love ${PRODUCT_NAME}`}
          className='pb-3'
        />
        <div className='pb-5 mb-1'></div>

        {/* Page Footer */}
        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default ZaionsLinkManagment;
