// Core Import
import React, { useLayoutEffect } from 'react';

// Packages Imports
import { useRecoilState } from 'recoil';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';
import ZaionsInpageHeader from '@/components/InPageComponents/ZaionsInpageHeader';
import ZaionsCardWithIcon from '@/components/InPageComponents/ZaionsCard';
import ZaionsHPFAQuestions from '@/components/ZaionsHomePage/HPQuestions';
import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonImg,
} from '@/components/ZIonComponents';

// Type
import { ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

// Data
import { TrustAndSafetyResourcesData } from '@/data/resources/TrustCenter/TrustAndSafetyResources.data';

// Recoil
import { ZaionsRTCState } from '@/ZaionsStore/Resources/ZaionsRTrustCenter.recoil';

// Global Contents

// Styles
import classes from './styles.module.css';

// Images
import { trustAndSafety } from '@/assets/images';
import { PRODUCT_NAME } from '@/utils/constants';

const ZaionsTrustCenter: React.FC = () => {
  const [zaionsTCData, setZaionsTCData] =
    useRecoilState<ZaionsCardWithIconType[]>(ZaionsRTCState);

  useLayoutEffect(() => {
    setZaionsTCData(TrustAndSafetyResourcesData);
  }, [setZaionsTCData]);

  return (
    <ZaionsIonPage pageTitle='Trust Center Page'>
      {/* Content */}
      <ZIonContent>
        <ZaionsTopMenu />
        <ZaionsInpageHeader
          label={'Trust and Safety'}
          title={'Our commitment to your safety'}
          subTitle={
            <>
              We have a mission to make every click and scan a safe connection
              between the millions of <br /> people who use {PRODUCT_NAME}.
            </>
          }
          isPrimaryBtn={false}
          className='pb-0'
        />

        <ZIonGrid className='mt-4 mb-5 pb-2'>
          <ZIonRow>
            <ZIonCol className='text-center'>
              <ZIonImg
                className='mx-auto'
                style={{ maxWidth: '100%', width: '100px' }}
                src={trustAndSafety}
              />
              <ZIonText>
                <h2
                  className='zaions__color_dark mt-3'
                  style={{ fontWeight: '800' }}
                >
                  About Trust and Safety at {PRODUCT_NAME}
                </h2>
              </ZIonText>
              <ZIonText className='fs-5 zaions__color_gray2 d-flex'>
                Millions of links and QR codes are created by {PRODUCT_NAME}{' '}
                users every single day–that translates into billions of
                connections per <br />
                month. Our Trust & Safety team works tirelessly to make these
                experiences as safe as possible, doing our best to balance{' '}
                <br />
                internet safety with the right to free expression. This Trust
                Center contains policies, resources, tools and tips to help you
                <br />
                understand how important your safety is to us.
              </ZIonText>
              <ZIonText className={classes.zaions__tertiary}>
                Read our blog post
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className={`zaions__bg_gray pt-5 pb-5`}>
          <ZIonRow>
            <ZIonCol size='12' className='text-center'>
              <ZIonText>
                <h2 className='fw-bolder' style={{ fontSize: '2.2rem' }}>
                  Trust & Safety Resources
                </h2>
              </ZIonText>
              <ZIonText className='mt-2 d-block'>
                Resources to help you feel confident in using our service
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
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
                <ZaionsCardWithIcon data={zaionsTCData} />
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

        <ZaionsHPFAQuestions className='mt-5' />

        <InPageFooter title='We’re committed to your safety' />
      </ZIonContent>
    </ZaionsIonPage>
  );
};

export default ZaionsTrustCenter;
