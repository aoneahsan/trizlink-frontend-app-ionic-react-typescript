// Core Imports
import React, { useCallback } from 'react';

// Packages Imports
import { IonPopover } from '@ionic/react';
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';

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
  ZIonButton
} from '@/components/ZIonComponents';

// Recoil State
import { ZaionsPricingSubscriptionsState } from '@/ZaionsStore/PricingPage/PricingSubscriptionsData';
import { ZaionsPricingFeatureDetailState } from '@/ZaionsStore/PricingPage/ZaionsPricingFeatureDetail.recoil';

// Global Imports

// Types
import {
  type ZaionsPricingFeatureDetailType,
  type ZaionsPricingFeaturePlanType,
  type ZaionsPricingSubscriptionsType
} from '@/types/WhyZaions/PricingPage';
import { getRandomKey } from '@/utils/helpers';

// Styles
import classes from './styles.module.css';

// Images
import { iconInfo } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

const ZaionsPricing: React.FC = () => {
  const subscriptionPricingData = useRecoilValue<
    ZaionsPricingSubscriptionsType[]
  >(ZaionsPricingSubscriptionsState);
  const pricingFeatureDetailData = useRecoilValue<
    ZaionsPricingFeatureDetailType[]
  >(ZaionsPricingFeatureDetailState);

  const getPlanFeatureContent = useCallback(
    (val: ZaionsPricingFeaturePlanType) => {
      if (typeof val === 'string') {
        return val;
      } else if (typeof val === 'boolean' && val) {
        // return <ZIonIcon name={checkmarkDoneOutline} color='dark'></ZIonIcon>;
        return '✔';
      } else {
        return '-';
      }
    },
    []
  );

  return (
    <ZIonPage pageTitle='Integration Api Page'>
      {/* Constant */}
      <ZIonContent>
        <ZaionsTopMenu />
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol
              sizeXl='11.5'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='my-5'>
              <div className='mx-auto w-max'>
                <ZIonText className='block text-4xl font-extrabold zaions__color_dark'>
                  Pricing for brands and businesses of all sizes
                </ZIonText>
                <ZIonText className='block text-xl zaions__color_gray2'>
                  Connect to your audience with branded links, QR Codes, and a
                  Link-in-bio that will get their attention.
                </ZIonText>
              </div>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='pt-4 pb-10 zaions__light_bg'>
          <ZIonRow>
            <ZIonCol
              sizeXl='11.5'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='flex flex-col ion-align-items-center ion-justify-content-center'>
              <ZIonText className='block mb-0 zaions__color_gray_light'>
                Save up to 34% when you pay annually
              </ZIonText>
              <div className='flex ion-align-items-center'>
                <ZIonText>Pay annually</ZIonText>
                <ZIonText className='mx-2'>
                  <ZRCSwitch />
                </ZIonText>
                <ZIonText>Pay monthly</ZIonText>
              </div>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol
              sizeXl='11'
              sizeLg='11.5'
              sizeMd='12'
              className='mx-auto'>
              <ZIonRow>
                {subscriptionPricingData.map(el => {
                  return (
                    <ZIonCol
                      sizeXl='2.4'
                      sizeLg='4'
                      sizeMd='6'
                      sizeSm='6'
                      sizeXs='12'
                      key={el.id}>
                      <ZIonCard className='h-full mx-0 '>
                        <ZIonCardHeader className='px-0 pb-2'>
                          <ZIonText
                            className='block pb-1 text-xl font-bold text-center border-b'
                            color='dark'>
                            {el.label}
                          </ZIonText>

                          {/*  */}
                          <ZIonText className='block mt-3 mb-0 text-center'>
                            <span className='text-3xl font-bold ps-3 zaions__color_gray2'>
                              {el?.price ?? 0}
                            </span>
                            {el?.priceDuration ?? '-'}
                          </ZIonText>
                          <ZIonText className='mb-3 text-xs text-center ms-3'>
                            {el.annualCharge ??
                              `(annual one-time charge of ${el.annualCharge})`}
                          </ZIonText>
                          <ZIonButton
                            className='mx-3'
                            expand='block'
                            color='tertiary'
                            height='2.5rem'
                            routerLink={el.link}>
                            Get Started
                          </ZIonButton>
                          {/* <ZIonText className='block my-2 text-base text-center limits'>
                            {el.limit_text}
                          </ZIonText> */}
                        </ZIonCardHeader>
                        <ZIonCardContent className='mx-3 ps-1 pe-0'>
                          <ZIonText className='mb-0 text-lg font-extrabold zaions__color_gray2'>
                            {el.features_title}
                          </ZIonText>

                          <div className='flex flex-col mt-2'>
                            {el.features_included.map(featureItem => {
                              return (
                                <div
                                  className='flex my-2 ion-align-items-start'
                                  key={featureItem.feature_id}>
                                  <ZIonImg
                                    className='mt-1 me-1'
                                    src={featureItem.icon}
                                  />
                                  <ZIonText>
                                    {featureItem.text}
                                    {featureItem.new === true ? (
                                      <ZIonText className='zaions__new_tag'>
                                        New
                                      </ZIonText>
                                    ) : (
                                      ''
                                    )}
                                  </ZIonText>
                                </div>
                              );
                            })}
                          </div>
                        </ZIonCardContent>
                      </ZIonCard>
                    </ZIonCol>
                  );
                })}
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid>
          <ZIonRow>
            <ZIonCol className='mt-5 text-lg text-center'>
              <ZIonText className='font-extrabold'>
                Detailed Feature Comparison
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol
              size='10.6'
              className='mx-auto'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <ZIonRow className='flex ion-align-items-center'>
                      <ZIonCol
                        sizeXl='4'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''>
                        <th className='pe-3'>
                          <div className='my-auto'>
                            <ZIonText className='block mb-0 zaions__color_gray_light fw-normal'>
                              Save up to 34% when you pay annually
                            </ZIonText>
                            <div className='flex ion-align-items-center'>
                              <ZIonText className='fw-normal'>
                                Pay annually
                              </ZIonText>
                              <ZIonText slot='end'>
                                <ZRCSwitch />
                              </ZIonText>
                              <ZIonText className='fw-normal'>
                                Pay monthly
                              </ZIonText>
                            </div>
                          </div>
                        </th>
                      </ZIonCol>
                      <ZIonCol
                        sizeXl='7'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''>
                        <th className='text-center zaions__bg_gray text-[#464c50]'>
                          <ZIonText className='block mt-1 mb-0 text-base font-bold label'>
                            FREE
                          </ZIonText>
                          <ZIonText className='mb-0 price fw-normal'>
                            <ZIonText className='text-3xl zaions__color_gray2'>
                              $0
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='block text-xs opacity-0'>
                            Empty
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.SignUpRoute}
                            expand='block'>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonText className='block mt-1 mb-0 text-base font-bold label'>
                            STARTER
                          </ZIonText>
                          <ZIonText className='block mb-0 price fw-normal'>
                            <ZIonText className='text-3xl zaions__color_gray2'>
                              $8
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='text-xs opacity-0'>
                            ($96 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center zaions__bg_gray text-[#464c50]'>
                          <ZIonText className='block mt-1 mb-0 text-base font-bold label'>
                            BASIC
                          </ZIonText>
                          <ZIonText className='block mb-0 price fw-normal'>
                            <ZIonText className='text-3xl zaions__color_gray2'>
                              $29
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='text-xs opacity-0'>
                            ($348 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonText className='block mt-1 mb-0 text-base font-bold label'>
                            PREMIUM
                          </ZIonText>
                          <ZIonText className='block mb-0 price fw-normal'>
                            <ZIonText className='text-3xl zaions__color_gray2'>
                              $199
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='text-xs opacity-0'>
                            ($2,388 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center zaions__bg_gray text-[#464c50]'>
                          <ZIonText className='block mt-1 mb-0 text-base font-bold label'>
                            ENTERPRISE
                          </ZIonText>
                          <ZIonText className='block mb-0 price fw-normal'>
                            <ZIonText className='text-3xl zaions__color_gray2'>
                              Custom
                            </ZIonText>
                          </ZIonText>
                          <ZIonText className='text-xs opacity-0'>
                            ($2,388 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                      </ZIonCol>
                    </ZIonRow>
                  </tr>
                </thead>
              </table>
              {pricingFeatureDetailData.map(el => {
                return (
                  <ZIonRow key={el.id}>
                    <ZIonCol
                      className=''
                      sizeXl='12'>
                      <ZIonText className='block mb-0 font-extrabold ms-1'>
                        {el.section_heading}{' '}
                        {el.new === true ? (
                          <span className={classes.zaions__detal_price_new_tag}>
                            New
                          </span>
                        ) : (
                          ''
                        )}
                      </ZIonText>
                      {el.features.map(item => {
                        return (
                          <ZIonRow key={getRandomKey()}>
                            <ZIonCol
                              sizeXl='4'
                              className='pe-0'>
                              <hr className='m-0' />

                              {item.type === 'feature' ? (
                                <ZIonText className='flex pt-2 my-auto ion-align-items-center '>
                                  {item.feature_title}
                                  <button
                                    id={`hover-trigger-${el.id ?? '-'}-${
                                      item.feature_id ?? '-'
                                    }`}
                                    className={classes.zaions__popover_btn}>
                                    {item?.destil !== undefined &&
                                      item?.destil?.trim()?.length > 0 && (
                                        <ZIonImg src={iconInfo} />
                                      )}
                                  </button>
                                  {item?.destil !== undefined &&
                                    item?.destil?.trim()?.length > 0 && (
                                      <IonPopover
                                        trigger={`hover-trigger-${
                                          el.id ?? '-'
                                        }-${item.feature_id ?? '-'}`}
                                        triggerAction='hover'
                                        side='right'
                                        alignment='end'
                                        size='auto'>
                                        <ZIonContent
                                          className={`${classes.zaions__popover_box} ion-padding`}>
                                          {item.destil}
                                        </ZIonContent>
                                      </IonPopover>
                                    )}
                                </ZIonText>
                              ) : item.type === 'info' ? (
                                <>
                                  <ZIonText
                                    className={`my-auto flex ion-align-items-center ${classes.zaions__info}`}>
                                    <ZIonText className='mt-3'>
                                      {item.info?.text}{' '}
                                      <ZIonRouterLink
                                        routerLink={item.info?.link?.text}>
                                        {item.info?.link?.text}
                                      </ZIonRouterLink>
                                    </ZIonText>{' '}
                                  </ZIonText>
                                </>
                              ) : (
                                ''
                              )}
                            </ZIonCol>
                            <ZIonCol
                              size='7.5'
                              className='ps-0'>
                              <hr className='m-0' />
                              <ZIonRow className='ps-2'>
                                <ZIonCol
                                  sizeXl='2.3'
                                  className='text-center'>
                                  {getPlanFeatureContent(item?.plan1)}
                                </ZIonCol>
                                <ZIonCol
                                  sizeXl='2.3'
                                  className='text-center'>
                                  {getPlanFeatureContent(item.plan2)}
                                </ZIonCol>
                                <ZIonCol
                                  sizeXl='2.3'
                                  className='text-center'>
                                  {getPlanFeatureContent(item.plan3)}
                                </ZIonCol>
                                <ZIonCol
                                  sizeXl='2.3'
                                  className='text-center'>
                                  {getPlanFeatureContent(item.plan4)}
                                </ZIonCol>
                                <ZIonCol
                                  sizeXl='2.3'
                                  className='text-center'>
                                  {getPlanFeatureContent(item.plan5)}
                                </ZIonCol>
                              </ZIonRow>
                            </ZIonCol>
                          </ZIonRow>
                        );
                      })}
                    </ZIonCol>
                  </ZIonRow>
                );
              })}
              <hr />
              <table className='w-full'>
                <thead>
                  <tr>
                    <ZIonRow className='flex ion-align-items-center'>
                      <ZIonCol
                        sizeXl='4'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''></ZIonCol>
                      <ZIonCol
                        sizeXl='7.3'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''
                        className='flex ion-justify-content-center align-items-center'>
                        <th className='text-center text-[#464c50]'>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.SignUpRoute}
                            expand='block'>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                        <th className='text-center text-[#464c50]'>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}>
                            Get Started
                          </ZIonButton>
                        </th>
                      </ZIonCol>
                    </ZIonRow>
                  </tr>
                </thead>
              </table>

              <hr />
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='pt-5 mt-5 mb-5'>
          <ZIonRow>
            <ZIonCol className='text-center'>
              <ZIonText className='block'>
                *Custom domain registration included with subscription
              </ZIonText>
              <ZIonText className=''>
                Your purchase may be subject to sales tax and will automatically
                renew every <br /> month or year, depending on the payment plan
                you’ve chosen. All amounts <br /> shown are in USD.
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <InPageFooter />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsPricing;
