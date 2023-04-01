// Core Imports
import React from 'react';

// Packages Imports
import {
  analyticsOutline,
  appsOutline,
  bookOutline,
  briefcaseOutline,
  browsersOutline,
  bulbOutline,
  callOutline,
  checkmarkCircleOutline,
  codeOutline,
  codeSlashOutline,
  codeWorkingOutline,
  earthOutline,
  eyeOutline,
  heartCircleOutline,
  homeOutline,
  informationCircleOutline,
  libraryOutline,
  link,
  lockClosedOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
  newspaperOutline,
  peopleCircleOutline,
  peopleOutline,
  personAddOutline,
  phonePortraitOutline,
  pieChartOutline,
  pricetags,
  qrCode,
  tabletPortrait,
  unlinkOutline,
  videocamOutline,
} from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonIcon,
  ZIonFooter,
  ZIonGrid,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_MD, BRACKPOINT_XS, PRODUCT_NAME } from '@/utils/constants';
import { Accordion } from 'react-bootstrap';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ProductLogo } from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';

// Functional Component
const InPageFooter: React.FC<{
  title?: string;
  btnText?: string;
  blueSec?: boolean;
}> = ({ title, btnText, blueSec = true }) => {
  const isXmScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_XS})`,
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });
  return (
    <>
      <ZIonFooter collapse='fade'>
        <>
          {blueSec === true ? (
            <div className='py-3' style={{ background: '#0b1736' }}>
              <div className='ion-text-center ion-margin-top ion-padding-bottom py-5 d-flex justify-content-center align-items-center'>
                <br />
                <ZIonText color='light'>
                  <h2 className='ion-padding-bottom ion-padding-horizontal'>
                    <b>
                      {title === '' || title === null || title === undefined
                        ? 'Get closer to your audience and customers today'
                        : title}
                    </b>
                  </h2>
                  <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                    <ZIonButton
                      size='large'
                      className='ion-margin-vertical ion-text-capitalize'
                      expand={!isMdScale ? 'block' : undefined}
                    >
                      {btnText === '' ||
                      btnText === null ||
                      btnText === undefined
                        ? 'Start for Free'
                        : btnText}
                    </ZIonButton>
                  </ZIonRouterLink>
                </ZIonText>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
        {isMdScale ? (
          <div className='ion-padding-vertical'>
            <ZIonGrid className='ion-padding-top ion-margin-top '>
              <ZIonRow>
                <ZIonCol
                  sizeXl=''
                  sizeLg='0'
                  sizeMd='0'
                  sizeSm='0'
                  sizeXs='0'
                ></ZIonCol>
                <ZIonCol
                  sizeXl='2'
                  sizeLg='2.8'
                  sizeMd='2.9'
                  sizeSm='3'
                  sizeXs='12'
                  className={`mb-2 ${isXmScale ? 'mb-4' : ''}`}
                >
                  <b className='mb-4'>Why {PRODUCT_NAME}?</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.WhyZaions.Zaions101Route}
                    color='dark'
                  >
                    <ZIonText>{PRODUCT_NAME} 101</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.WhyZaions.ZaionsIntegrationApiRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Integrations & API</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.WhyZaions.ZaionsEnterpriseClassRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Enterprise Class</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
                    color='dark'
                  >
                    <ZIonText>Pricing</ZIonText>
                  </ZIonRouterLink>
                  <br /> <br />
                  {/* PRODUCTS */}
                  <b className='mb-4'>Products</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Products.ZaionsLinkManagmentRoute}
                    color='dark'
                  >
                    <ZIonText>Link Management</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Products.ZaionsQRCodeRoute}
                    color='dark'
                  >
                    <ZIonText>QR Codes</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Products.ZaionsLinkInBioRoute}
                    color='dark'
                  >
                    <ZIonText>Link-in-bio</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  {isXmScale ? <hr /> : ''}
                </ZIonCol>
                <ZIonCol
                  sizeXl='2'
                  sizeLg='2.8'
                  sizeMd='2.9'
                  sizeSm='3'
                  sizeXs='12'
                  className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
                >
                  <b className='mb-4'>Solutions</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Solution.ZaionsSocialMediaRoute}
                    color='dark'
                  >
                    <ZIonText>Social Media</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Solution.ZaionsDigitalMarketingRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Digital Marketing</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Solution.ZaionsCustomerServiceRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Customer Service</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Solution.ZaionsForDevelopersRoute}
                    color='dark'
                  >
                    <ZIonText>For Developers</ZIonText>
                  </ZIonRouterLink>
                  <br /> <br />
                  <b className='mb-4'>Features</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Feature.ZaionsBrandedLinksRoute}
                    color='dark'
                  >
                    <ZIonText>Branded Links</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Feature.ZaionsMobileLinksRoute}
                    color='dark'
                  >
                    <ZIonText>Mobile Links</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Feature
                        .ZaionsCampaignManagementAnalyticsRoute
                    }
                    color='dark'
                  >
                    <ZIonText>
                      Campaign <br /> Management & <br /> Analytics
                    </ZIonText>
                  </ZIonRouterLink>
                  <br />
                  {isXmScale ? <hr /> : ''}
                </ZIonCol>
                <ZIonCol
                  sizeXl='2'
                  sizeLg='2.8'
                  sizeMd='2.9'
                  sizeSm='3'
                  sizeXs='12'
                  className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
                >
                  <b className='mb-4'>Resources</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Resources.ZaionsBlogsRoute}
                    color='dark'
                  >
                    <ZIonText>Blog</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Resources.ZaionsResourceLibraryRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Resource Library</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.HomeRoute}
                    color='dark'
                  >
                    <ZIonText>Developers</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.HomeRoute}
                    color='dark'
                  >
                    <ZIonText>Support</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Resources.ZaionsTrustCenterRoute}
                    color='dark'
                  >
                    <ZIonText>Trust Center</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Resources.ZaionsBrowserExtensionsRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Browser Extension</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Resources.ZaionsMobileAppsRoute}
                    color='dark'
                  >
                    <ZIonText>Mobile App</ZIonText>
                  </ZIonRouterLink>
                  <br /> <br />
                  <b className='mb-4'>Legal</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
                    color='dark'
                  >
                    <ZIonText>Privacy Policy</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
                    color='dark'
                  >
                    <ZIonText>Terms of Service</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={
                      ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute
                    }
                    color='dark'
                  >
                    <ZIonText>Acceptable Use Policy</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Legal.ZaionsCodeOfConductRoute}
                    color='dark'
                  >
                    <ZIonText>Code of Conduct</ZIonText>
                  </ZIonRouterLink>
                  <br />
                </ZIonCol>
                <ZIonCol
                  sizeXl='2'
                  sizeLg='2.8'
                  sizeMd='2.9'
                  sizeSm='3'
                  sizeXs='12'
                  className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
                >
                  <b className='mb-4'>Company</b> <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsAboutRoute}
                    color='dark'
                  >
                    <ZIonText>About {PRODUCT_NAME}</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsCareersRoute}
                    color='dark'
                  >
                    <ZIonText>Careers</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsPartnersRoute}
                    color='dark'
                  >
                    <ZIonText>Partners</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsPressRoute}
                    color='dark'
                  >
                    <ZIonText>Press</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsContactRoute}
                    color='dark'
                  >
                    <ZIonText>Contact</ZIonText>
                  </ZIonRouterLink>
                  <br />
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.Company.ZaionsReviewsRoute}
                    color='dark'
                  >
                    <ZIonText>Reviews</ZIonText>
                  </ZIonRouterLink>
                  <br />
                </ZIonCol>
                <ZIonCol
                  sizeXl='2'
                  sizeLg='2.8'
                  sizeMd='2.9'
                  sizeSm='3'
                  sizeXs='12'
                  className={`mb-2 ${isXmScale ? 'mb-3' : ''}`}
                >
                  <img src={ProductLogo} className='logo' alt='' />
                  <br />
                  <small>
                    © 2022 {PRODUCT_NAME} | Handmade in San Francisco, Denver,
                    New York City, Bielefeld, and all over the world.
                  </small>
                  <br /> <br />
                  <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                    <ZIonIcon
                      size='large'
                      className='ion-padding-end'
                      icon={logoTwitter}
                      style={{ color: '#56575b' }}
                    ></ZIonIcon>
                  </ZIonRouterLink>
                  <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                    <ZIonIcon
                      size='large'
                      className='ion-padding-end zaions__color_gray2'
                      icon={logoInstagram}
                    ></ZIonIcon>
                  </ZIonRouterLink>
                  <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                    <ZIonIcon
                      size='large'
                      className='ion-padding-end zaions__color_gray2'
                      icon={logoLinkedin}
                    ></ZIonIcon>
                  </ZIonRouterLink>
                  <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                    <ZIonIcon
                      size='large'
                      icon={logoFacebook}
                      className='zaions__color_gray2'
                    ></ZIonIcon>
                  </ZIonRouterLink>
                </ZIonCol>
                <ZIonCol
                  sizeXl=''
                  sizeLg='0'
                  sizeMd='0'
                  sizeSm='0'
                  sizeXs='0'
                ></ZIonCol>
              </ZIonRow>
            </ZIonGrid>
          </div>
        ) : (
          <Accordion defaultActiveKey={['WhyZaions']} alwaysOpen>
            {/* Why ZLink */}
            <Accordion.Item eventKey='WhyZaions'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Why {PRODUCT_NAME}?</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* 101 */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.WhyZaions.Zaions101Route}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom pb-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={bookOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        {PRODUCT_NAME} 101
                      </ZIonText>
                      <ZIonText className='fs-5 d-block'>
                        an introduction to {PRODUCT_NAME}’s features
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Integrations & API */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.WhyZaions.ZaionsIntegrationApiRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={earthOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Integrations & API
                      </ZIonText>
                      <ZIonText className='fs-5 d-block'>
                        {PRODUCT_NAME} scale of the size you need
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Enterprise Class */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.WhyZaions.ZaionsEnterpriseClassRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={codeOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Enterprise Class
                      </ZIonText>
                      <ZIonText className='fs-5 d-block'>
                        connest {PRODUCT_NAME} with the tool you love
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Pricing */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={pricetags} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Pricing
                      </ZIonText>
                      <ZIonText className='fs-5 d-block'></ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* Products */}
            <Accordion.Item eventKey='Products'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Products</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* Link Management */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Products.ZaionsLinkManagmentRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={link} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Link Management
                      </ZIonText>
                      <ZIonText className='fs-6 d-block'>
                        Customize, share, and track links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* QR Codes */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Products.ZaionsQRCodeRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={qrCode} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        QR Codes
                      </ZIonText>
                      <ZIonText className='fs-6 d-block'>
                        Dynamic solutions to fit every business need
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Link-in-bio */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Products.ZaionsLinkInBioRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={tabletPortrait} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Link-in-bio
                      </ZIonText>
                      <ZIonText className='fs-6 d-block'>
                        Curate and track links for social media profiles
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* Solution */}
            <Accordion.Item eventKey='Solutions'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Solution</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* Social Media */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Solution.ZaionsSocialMediaRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={bulbOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Social Media
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Digital Marketing */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Solution.ZaionsDigitalMarketingRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={pieChartOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Digital Marketing
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Customer Service */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Solution.ZaionsCustomerServiceRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={peopleCircleOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Customer Service
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* For Developers */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Solution.ZaionsForDevelopersRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={codeSlashOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        For Developers
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* Features */}
            <Accordion.Item eventKey='Features'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Features</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* Branded Links */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Feature.ZaionsBrandedLinksRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={unlinkOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Branded Links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Mobile Links */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Feature.ZaionsMobileLinksRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={phonePortraitOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Mobile Links
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Campaign Management & Analytics */}
                <ZIonRouterLink
                  routerLink={
                    ZaionsRoutes.Feature.ZaionsCampaignManagementAnalyticsRoute
                  }
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={analyticsOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Campaign Management & Analytics
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* Resources */}
            <Accordion.Item eventKey='Resources'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Resources</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* Blog */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Resources.ZaionsBlogsRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={videocamOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Blog
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Resource Library */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Resources.ZaionsResourceLibraryRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={libraryOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Resource Library
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Developers */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={codeOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Developers
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Support */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.HomeRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon
                        icon={informationCircleOutline}
                        className='fs-2'
                      />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Support
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Trust Center */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Resources.ZaionsTrustCenterRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={heartCircleOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Trust Center
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Browser Extension */}
                <ZIonRouterLink
                  routerLink={
                    ZaionsRoutes.Resources.ZaionsBrowserExtensionsRoute
                  }
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={browsersOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Browser Extension
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Mobile App */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Resources.ZaionsMobileAppsRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={appsOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Mobile App
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='Legal'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Legal</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* Privacy Policy */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={lockClosedOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Privacy Policy
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Terms of Service */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={peopleOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Terms of Service
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Acceptable Use Policy */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon
                        icon={checkmarkCircleOutline}
                        className='fs-2'
                      />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Acceptable Use Policy
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Code of Conduct */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsCodeOfConductRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={codeWorkingOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Code of Conduct
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* Company */}
            <Accordion.Item eventKey='Company'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>Company</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body>
                {/* About Product */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={homeOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        About {PRODUCT_NAME}
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Careers */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Company.ZaionsAboutRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={briefcaseOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Careers
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Partners */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Company.ZaionsPartnersRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={personAddOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Partners
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Press */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Company.ZaionsPressRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={newspaperOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Press
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Contact */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Company.ZaionsContactRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={callOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Contact
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>

                {/* Reviews */}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Company.ZaionsReviewsRoute}
                  color='dark'
                >
                  <ZIonRow className='ion-align-items-start border-bottom py-2'>
                    <ZIonCol size='1.5' className='pt-2 mt-1'>
                      <ZIonIcon icon={eyeOutline} className='fs-2' />
                    </ZIonCol>
                    <ZIonCol>
                      <ZIonText className='zaions__fw_750 fs-4 d-block'>
                        Reviews
                      </ZIonText>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>

            {/* ZLinks */}
            <Accordion.Item eventKey='Zaions'>
              <Accordion.Header className='d-flex'>
                <ZIonText className='mx-auto'>
                  <h5 className={`fw-bold`}>{PRODUCT_NAME}</h5>
                </ZIonText>
              </Accordion.Header>
              <Accordion.Body className='ion-text-center'>
                <img src={ProductLogo} className='logo mt-3' alt='' />
                <br />
                <small>
                  © 2022 {PRODUCT_NAME} | Handmade in San Francisco, Denver, New
                  York City, Bielefeld, and all over the world.
                </small>
                <br /> <br />
                <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                  <ZIonIcon
                    size='large'
                    className='ion-padding-end'
                    icon={logoTwitter}
                    style={{ color: '#56575b' }}
                  ></ZIonIcon>
                </ZIonRouterLink>
                <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                  <ZIonIcon
                    size='large'
                    className='ion-padding-end zaions__color_gray2'
                    icon={logoInstagram}
                  ></ZIonIcon>
                </ZIonRouterLink>
                <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                  <ZIonIcon
                    size='large'
                    className='ion-padding-end zaions__color_gray2'
                    icon={logoLinkedin}
                  ></ZIonIcon>
                </ZIonRouterLink>
                <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                  <ZIonIcon
                    size='large'
                    icon={logoFacebook}
                    className='zaions__color_gray2'
                  ></ZIonIcon>
                </ZIonRouterLink>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </ZIonFooter>
    </>
  );
};

export default InPageFooter;
