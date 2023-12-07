// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsKeyFeatures from '@/components/InPageComponents/ZaionsKeyFeatures';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsHPBrandList from '@/components/ZaionsHomePage/HPBrandList';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import InPageFooter from '@/components/InPageFooter';
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import Zaions4By4GridSystem from '@/components/InPageComponents/Zaions4By4GridSystem';

import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';

// Recoil States
import { ZaionsSPSocialMarketersState } from '@/ZaionsStore/SolutionPages/SocialMarketers/ZaionsSPSocialMarketers.recoil';
import { ZaionsSPSMKeyFeaturesState } from '@/ZaionsStore/SolutionPages/SocialMedia/ZaionsSPSM.recoil';

// Types
import { type ZaionsKeyFeatureType } from '@/types/InPageComponentTypes/ZaionsKeyFeature.type';
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Images
import {
  customerSupportMobile2,
  iconLargeCloudServersMin,
  iconLargeCustomerServersMin,
  iconLargePasswordSecurityMin
} from '@/assets/images';
import classNames from 'classnames';

const ZaionsCustomerService: React.FC = () => {
  const keyFeaturesData = useRecoilValue<ZaionsKeyFeatureType[]>(
    ZaionsSPSMKeyFeaturesState
  );
  const SocialMarketersData = useRecoilValue<Zaions4By4GridSysType[]>(
    ZaionsSPSocialMarketersState
  );

  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });

  return (
    <ZIonPage pageTitle='Social Marketers Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          lgImg={customerSupportMobile2}
          label='Customer Service'
          title={
            <ZIonText
              className={classNames({
                'leading-[3rem]': !isMdScale
              })}>
              Quick resolutions in <br /> fewer characters
            </ZIonText>
          }
          subTitle={
            <ZIonText>
              Enhance your customer service with powerful links and analytics.
            </ZIonText>
          }
          primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
          seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
          primaryBtnText='Get Started'
          isSecondaryBtn={true}
          secondaryBtnText='Get a Qoute'
          className={`${classes.zaions__customer_service_bg}`}
          colClassName='ms-0'
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
            <ZIonCol
              size='10.5'
              sizeLg='10.5'
              sizeMd='11.8'
              sizeSm='12'
              sizeXs='12'>
              <ZaionsKeyFeatures data={keyFeaturesData} />
            </ZIonCol>
            <ZIonCol
              size='.5'
              sizeLg='.5'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
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

        <ZaionsHPBrandList />

        <ZIonGrid
          className={`mt-4 pb-3 mb-5 ${!isLgScale ? 'ion-text-center' : ''}`}>
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
                <h2 className='pt-1 mt-2 font-bolder zaions__color_dark text-[38px]'>
                  The world’s leading link management platform
                </h2>
              </ZIonText>
              <ZIonText className='pt-1 text-lg zaions__color_gray2'>
                Get the connections, security, and support you need from the
                brand you can trust.
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
                    icon={iconLargeCloudServersMin}
                    title='Seamless integrations'
                    text={
                      <ZIonText className='zaions__color_gray2'>
                        Integrate {PRODUCT_NAME} with your preferred social
                        media management tools to easily share branded links in
                        all of your social content.
                      </ZIonText>
                    }
                  />

                  <ZaionsInpageCol
                    icon={iconLargeCustomerServersMin}
                    title='Seamless integrations'
                    text={
                      <ZIonText className='zaions__color_gray2'>
                        If you have questions, you’ll have full access to
                        {PRODUCT_NAME}’s extensive knowledge base and resource
                        library. If you’re an Enterprise customer, you’ll also
                        be paired up with a customer success manager.
                      </ZIonText>
                    }
                  />

                  <ZaionsInpageCol
                    icon={iconLargePasswordSecurityMin}
                    title='Seamless integrations'
                    text={
                      <ZIonText className='zaions__color_gray2'>
                        {PRODUCT_NAME} handles over 10 billion clicks a month—no
                        other platform comes close—and built the industry
                        security standard for link management. Our 24 hour
                        on-call teams monitor the availability and performance
                        of your links all day, every day.
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
        </ZIonGrid>

        <Zaions4By4GridSystem data={SocialMarketersData} />

        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsCustomerService;
