// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsKeyFeatures from '@/components/InPageComponents/ZaionsKeyFeatures';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsHPBrandList from '@/components/ZaionsHomePage/HPBrandList';
import ZaionsInpageCol from '@/components/InPageComponents/ZaionsInpageGridsys';
import InPageFooter from '@/components/InPageFooter';
import ZaionsHr from '@/components/InPageComponents/Zaion_hr';
import Zaions4By4GridSystem from '@/components/InPageComponents/Zaions4By4GridSystem';

import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_LG, BRACKPOINT_MD, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Recoil State
import { ZaionsSPSocialMarketersState } from 'ZaionsStore/SolutionPages/SocialMarketers/ZaionsSPSocialMarketers.recoil';
import { ZaionsSPSMKeyFeaturesState } from 'ZaionsStore/SolutionPages/SocialMedia/ZaionsSPSM.recoil';

// types
import { ZaionsKeyFeatureType } from '@/types/InPageComponentTypes/ZaionsKeyFeature.type';
import { Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Styles
import classes from './styles.module.css';

// Images
import {
  iconLargeCloudServersMin,
  iconLargeCustomerServersMin,
  iconLargePasswordSecurityMin,
  developerHeroMobile2,
} from '@/assets/images';

const ZaionsForDevelopers: React.FC = () => {
  const keyFeaturesData = useRecoilValue<ZaionsKeyFeatureType[]>(
    ZaionsSPSMKeyFeaturesState
  );
  const SocialMarketersData = useRecoilValue<Zaions4By4GridSysType[]>(
    ZaionsSPSocialMarketersState
  );

  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`,
  });
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });

  return (
    <ZaionsIonPage pageTitle='For Developer Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          lgImg={developerHeroMobile2}
          label='Social Media'
          title={
            <ZIonText style={{ lineHeight: !isMdScale ? '3rem' : '' }}>
              Stand out and connect on <br /> social media
            </ZIonText>
          }
          subTitle={
            <ZIonText>
              Brand every post, comment and message. Branded {PRODUCT_NAME}{' '}
              links stand out and <br /> inspire trust in your audience,
              attracting more clicks.
            </ZIonText>
          }
          primaryBtnLinkTo={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
          seondaryBtnLinkTo={ZaionsRoutes.DiscoverEnterpriseRoute}
          primaryBtnText='Get Started'
          isSecondaryBtn={true}
          secondaryBtnText='Get a Qoute'
          className={`${classes.zaions__Social_Media_bg}`}
          colClassName='ms-0'
        />

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol
              sizeXl='1'
              sizeLg='1'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
            <ZIonCol
              size='10.5'
              sizeLg='10.5'
              sizeMd='11.8'
              sizeSm='12'
              sizeXs='12'
            >
              <ZaionsKeyFeatures data={keyFeaturesData} />
            </ZIonCol>
            <ZIonCol
              size='.5'
              sizeLg='.5'
              sizeMd='0'
              sizeSm='0'
              sizeXs='0'
            ></ZIonCol>
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
              sizeXs='12'
            >
              <ZaionsHr></ZaionsHr>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZaionsHPBrandList />

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
                  The world’s leading link management platform
                </h2>
              </ZIonText>
              <ZIonText className='pt-1 fs-5 zaions__color_gray2'>
                Get the connections, security, and support you need from the
                brand you can trust.
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
              sizeXs='0'
            ></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <Zaions4By4GridSystem data={SocialMarketersData} />

        <InPageFooter btnText='Start for free' />
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default ZaionsForDevelopers;
