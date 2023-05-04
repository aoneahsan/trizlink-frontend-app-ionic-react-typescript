// Core Imports
import React from 'react';

// Packages Imports
import {
  bookOutline,
  codeOutline,
  earthOutline,
  link,
  qrCode,
  tabletPortrait,
} from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import ZaionsDropDown from '@/components/InPageComponents/ZaionsDropdown';

// Global Constant
import { BRACKPOINT_LG, BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '../../utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Images
import { ProductLogo } from '@/assets/images';
import classNames from 'classnames';
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonImg,
  ZIonMenuButton,
  ZIonRouterLink,
  ZIonRow,
} from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';

const ZaionsTopMenu: React.FC = () => {
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });
  return (
    <ZIonGrid
      className={classNames(classes.z_index_1000, {
        'position-sticky zaions__bg_white zaions__w100 pb-0 pt-3 top-0': true,
      })}
    >
      <ZIonRow>
        <ZIonCol
          sizeXl='.5'
          sizeLg='.2'
          sizeMd='0'
          sizeSm='0'
          sizeXs='0'
          className='pb-0'
        ></ZIonCol>
        <ZIonCol
          sizeXl='2.5'
          sizeLg='2.5'
          sizeMd='3'
          sizeSm='9'
          sizeXs='9'
          className='pb-0'
        >
          <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
            <ZIonImg
              src={ProductLogo}
              alt={`${PRODUCT_NAME} Logo`}
              className={`logo ${
                isMdScale
                  ? 'ion-margin-horizontal ion-padding-horizontal'
                  : 'px-0'
              }`}
            />
          </ZIonRouterLink>
        </ZIonCol>
        {isLgScale && (
          <ZIonCol
            className='d-flex ion-justify-content-between pb-0 mt-2 pt-2'
            size='4'
          >
            <ZaionsDropDown
              title={`Why ${PRODUCT_NAME}?`}
              className='zaions__nav_item '
              items={[
                {
                  id: '1',
                  title: `${PRODUCT_NAME} 101`,
                  link: `${ZaionsRoutes.WhyZaions.Zaions101Route}`,
                  text: `An Introduction to ${PRODUCT_NAME}’s features`,
                  icon: bookOutline,
                },
                {
                  id: '2',
                  title: `Enterprise Class`,
                  link: `${ZaionsRoutes.WhyZaions.ZaionsEnterpriseClassRoute}`,
                  text: `${PRODUCT_NAME} scale of the size you need`,
                  icon: earthOutline,
                },
                {
                  id: '3',
                  title: `Integrations & API`,
                  link: `${ZaionsRoutes.WhyZaions.ZaionsIntegrationApiRoute}`,
                  text: `connect ${PRODUCT_NAME} with the tool you love`,
                  icon: codeOutline,
                },
              ]}
            />

            <ZaionsDropDown
              title={`Products`}
              className='zaions__nav_item '
              items={[
                {
                  id: '1',
                  title: 'Link Managment',
                  link: `${ZaionsRoutes.Products.ZaionsLinkManagmentRoute}`,
                  text: `Customize, share, and track links`,
                  icon: link,
                },
                {
                  id: '2',
                  title: 'QR Code',
                  link: `${ZaionsRoutes.Products.ZaionsQRCodeRoute}`,
                  text: `Dynamic solutions to fit every business need`,
                  icon: qrCode,
                },
                {
                  id: '3',
                  title: 'Link-in-bio',
                  link: `${ZaionsRoutes.Products.ZaionsLinkInBioRoute}`,
                  text: `Curate and track links for social media profiles`,
                  icon: tabletPortrait,
                },
              ]}
            />

            <ZIonRouterLink
              // routerLink={`${ZaionsRoutes.WhyZaions.ZaionsPricingRoute}`}
              routerLink={`${ZaionsRoutes.AdminPanel.ShortLinks.Main}`}
              className={`zaions__nav_item  mb-4`}
              color='dark'
            >
              <span>Pricing</span>
            </ZIonRouterLink>

            <ZaionsDropDown
              title={`Resources`}
              className='zaions__nav_item '
              items={[
                {
                  id: '1',
                  title: 'Developers',
                  link: `${ZaionsRoutes.HomeRoute}`,
                  text: 'API documentation and resources',
                  width: 'max-content',
                },
                {
                  id: '2',
                  title: 'Resource Library',
                  link: `${ZaionsRoutes.Resources.ZaionsResourceLibraryRoute}`,
                  text: 'Ebooks and webinars',
                },
                {
                  id: '3',
                  title: 'Blog',
                  link: `${ZaionsRoutes.Resources.ZaionsBlogsRoute}`,
                  text: 'Tips, best practices and more',
                },
                {
                  id: '4',
                  title: 'Support',
                  link: `${ZaionsRoutes.HomeRoute}`,
                  text: 'FAQs and help articles',
                },
              ]}
            />
          </ZIonCol>
        )}
        {isMdScale && (
          <ZIonCol
            className='d-flex ion-align-items-center ion-justify-content-end pb-0'
            sizeXl='4'
            sizeLg='4.4'
            sizeMd='5'
            sizeSm='5'
            sizeXs='5'
          >
            <ZIonRouterLink routerLink={ZaionsRoutes.LoginRoute} color='dark'>
              <ZIonTitle className={`${classes.zaions_nav_button} mb-4`}>
                Login
              </ZIonTitle>
            </ZIonRouterLink>
            <ZIonRouterLink routerLink={ZaionsRoutes.SignUpRoute}>
              <ZIonTitle
                className={classNames({
                  'mb-4': true,
                  [classes.zaions_nav_button]: true,
                })}
              >
                Sign up Free
              </ZIonTitle>
            </ZIonRouterLink>
            <ZIonRouterLink routerLink={ZaionsRoutes.DiscoverEnterpriseRoute}>
              <ZIonButton
                className={`${classes.zaions_nav_button} ion-text-capitalize ms-2 mb-4`}
                color='tertiary'
              >
                Get a Quote
              </ZIonButton>
            </ZIonRouterLink>
          </ZIonCol>
        )}
        {!isLgScale && (
          <ZIonCol
            sizeXl='2.5'
            sizeLg='2.5'
            sizeMd='3.5'
            sizeSm='2.5'
            sizeXs='2.5'
            className='d-flex ion-align-items-center ion-justify-content-end pb-0'
          >
            <ZIonMenuButton className='mb-3'></ZIonMenuButton>
          </ZIonCol>
        )}
        <ZIonCol
          sizeXl='.5'
          sizeLg='0'
          sizeMd='0'
          sizeSm='0'
          sizeXs='0'
          className='pb-0'
        ></ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZaionsTopMenu;
