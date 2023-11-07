// Core Imports
import React from 'react';

// Packages Imports
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonImg,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent,
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonButton
} from '@/components/ZIonComponents';

// Type
import { type ZaionsTeamType } from '@/types/Company/AboutZaionsPage/OurTeam.type';
import { type ZaionsOurCoreValuesType } from '@/types/Company/AboutZaionsPage/OurCoreValues.types';

// Recoil State
import { ZaionsOurTeamState } from '@/ZaionsStore/CompanySection/AboutZaions/OurTeam.recoil';
import { ZaionsOurCoreValuesState } from '@/ZaionsStore/CompanySection/AboutZaions/OurCoreValue.recoil';

// Images
import { ChaunceyExcitingImage } from '@/assets/images';

// Global Constant
import { BRACKPOINT_LG, BRACKPOINT_SM, PRODUCT_NAME } from '@/utils/constants';
import ZaionsTopMenu from '@/navigation/TopMenu';

const ZaionsAbout: React.FC = () => {
  const OurCoreValuesStateData = useRecoilValue<ZaionsOurCoreValuesType[]>(
    ZaionsOurCoreValuesState
  );
  const OurTeamData = useRecoilValue<ZaionsTeamType[]>(ZaionsOurTeamState);
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });
  const isSmScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_SM})`
  });
  return (
    <ZIonPage pageTitle='About Page'>
      <ZIonContent>
        <ZaionsTopMenu />
        <ZIonGrid>
          <ZIonRow className='pt-5 my-5'>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='10'
              sizeSm='11'
              sizeXs='12'
              className={`${!isLgScale ? 'ion-text-center' : ''}`}>
              <ZIonText className='font-bold'>About {PRODUCT_NAME}</ZIonText>
              <ZIonText>
                <h1 className='zaions__page_title'>Our company</h1>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='zaions__bg_gray'>
          <ZIonRow className='pt-4 my-5'>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='10'
              sizeSm='11'
              sizeXs='12'
              className={`${!isLgScale ? 'ion-text-center' : ''}`}>
              <ZIonText className='mb-2 text-lg zaions__color_gray2'>
                Our Mission
              </ZIonText>
              <ZIonText>
                <h2 className='font-extrabold zaions__color_dark'>
                  Our mission is to turn every link and scan into a catalyst for
                  connections.
                </h2>
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol className='mt-5 mb-4 text-center'>
              <ZIonText>
                <h2 className='font-extrabold zaions__color_dark'>
                  Our core values
                </h2>
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol
              sizeXl='11'
              sizeLg='11'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='mx-auto'>
              <ZIonRow>
                {OurCoreValuesStateData.map(el => {
                  return (
                    <ZIonCol
                      sizeXl='3.5'
                      sizeLg='4'
                      sizeMd='6'
                      sizeSm='12'
                      sizeXs='12'
                      // className={`${!isLgScale && 'ion-text-center mb-3'} ${
                      // !isXlScale ? '' : 'ms-3'
                      // }`}
                      className={classNames({
                        'ion-text-center mb-3': !isLgScale,
                        'ms-3': isLgScale
                      })}
                      key={el.id}>
                      <h6 className='font-extrabold zaions__color_dark'>
                        {el.title}
                      </h6>
                      <p className=''>{el.text}</p>
                    </ZIonCol>
                  );
                })}
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='zaions__bg_gray'>
          <ZIonRow className='pt-4 my-5'>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='10'
              sizeLg='10'
              sizeMd='10'
              sizeSm='11'
              sizeXs='12'
              className='text-center'>
              <ZIonText>
                <h2 className='font-extrabold zaions__color_dark '>
                  Help make ${PRODUCT_NAME} even stronger
                </h2>
              </ZIonText>
              <ZIonText className='mb-2 text-lg zaions__color_gray2'>
                We’re always looking to bring new talent on board.
              </ZIonText>
              <ZIonButton
                size='large'
                className={'zaions__tertiary_btn ion-text-capitalize mt-5'}
                fill='clear'>
                View Open Positions
              </ZIonButton>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol className='mt-5 text-center'>
              <ZIonText>
                <h2 className='font-extrabold zaions__color_dark '>
                  Meet the Leadership Team
                </h2>
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol
              sizeXl='11'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='mx-auto'>
              <ZIonRow>
                {OurTeamData.map(el => {
                  return (
                    <ZIonCol
                      className='px-2'
                      sizeXl='3'
                      sizeLg='3'
                      sizeMd='4'
                      sizeSm='6'
                      sizeXs='12'
                      key={el.id}>
                      <ZIonCard className='mx-0'>
                        <ZIonCardHeader className='p-0'>
                          <ZIonImg src={el.photo} />
                        </ZIonCardHeader>
                        <ZIonCardContent className={'mt-2'}>
                          <span className='text-base font-extrabold zaions__color_dark '>
                            {el.name}
                          </span>
                          <p className='text-base'>{el.position}</p>
                          <ZIonAccordionGroup>
                            <ZIonAccordion
                              value='first'
                              toggleIcon={''}
                              toggleIconSlot='start'>
                              <ZIonText
                                color='primary'
                                slot='header'
                                className='text-base'>
                                Show Bio
                              </ZIonText>
                              <div
                                className=''
                                slot='content'>
                                <ZIonRouterLink
                                  routerLink={el.LinkdinLink}
                                  color={'medium'}
                                  className='text-base'>
                                  <ZIonText className='text-base text-decoration-underline'>
                                    LinkedIn
                                  </ZIonText>
                                </ZIonRouterLink>
                                {el.BioText}
                              </div>
                            </ZIonAccordion>
                          </ZIonAccordionGroup>
                        </ZIonCardContent>
                      </ZIonCard>
                    </ZIonCol>
                  );
                })}
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='pt-0 mb-5'>
          <ZIonRow>
            <ZIonCol
              sizeXl='10.8'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='11.5'
              sizeXs='11.5'
              className='pt-5 mx-auto zaions__bg_gray ps-3'>
              <ZIonRow>
                <ZIonCol
                  sizeXl='8'
                  sizeLg='7'
                  sizeMd='6'
                  sizeSm='12'
                  sizeXs='12'
                  // className={`my-auto ${!isSmScale ? 'ion-text-center' : ''}`}
                  className={classNames({
                    'ion-text-center': !isSmScale
                  })}>
                  <ZIonText>
                    <h2 className='font-extrabold zaions__color_dark'>
                      Meet Chauncey McPufferson.
                    </h2>
                  </ZIonText>
                  <ZIonText
                    className={classNames({
                      'w-full': !isSmScale,
                      'w-[80%]': isSmScale
                    })}>
                    Chauncey McPufferson was born at {PRODUCT_NAME} HQ in 2008.
                    There are many different sides to this complex, little
                    pufferfish. Just like your links, no two puffers are the
                    same.
                  </ZIonText>
                </ZIonCol>
                <ZIonCol>
                  <ZIonImg
                    src={ChaunceyExcitingImage}
                    style={{ width: '85%' }}
                  />
                </ZIonCol>
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsAbout;
