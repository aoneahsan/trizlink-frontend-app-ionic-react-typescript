// Core Imports
import React, { useCallback } from 'react';

// Packages Imports
import { IonPopover, IonToggle } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';

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
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent,
} from '@/components/ZIonComponents';

// Recoil State
import { ZaionsPricingSubscriptionsState } from 'ZaionsStore/PricingPage/PricingSubscriptionsData';
import { ZaionsPricingFeatureDetailState } from 'ZaionsStore/PricingPage/ZaionsPricingFeatureDetail.recoil';

// Global Imports
import { BRACKPOINT_MD } from '@/utils/constants';

// Types
import {
  ZaionsPricingFeatureDetailType,
  ZaionsPricingFeaturePlanType,
  ZaionsPricingSubscriptionsType,
} from '@/types/WhyZaions/PricingPage';
import { getRandomKey } from '@/utils/helpers';

// Styles
import classes from './styles.module.css';

// Images
import { iconInfo } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ZIonButton } from '@/components/ZIonComponents';

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

  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`,
  });

  return (
    <ZaionsIonPage pageTitle='Integration Api Page'>
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
              className='my-5'
            >
              <div className='mx-auto zaions__max_content'>
                <ZIonText>
                  <h1 className='zaions__fw_800 zaions__color_dark'>
                    Pricing for brands and businesses of all sizes
                  </h1>
                </ZIonText>
                <ZIonText>
                  <h2 className='zaions__color_gray2 fs-4'>
                    Connect to your audience with branded links, QR Codes, and a
                    Link-in-bio that will get their attention.
                  </h2>
                </ZIonText>
              </div>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        <ZIonGrid className='' style={{ backgroundColor: '#eee' }}>
          <ZIonRow>
            <ZIonCol
              sizeXl='11.5'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='mt-3'
            >
              <div className={`${!isMdScale ? '' : 'ms-5 ps-5'}`}>
                <ZIonText className='zaions__color_gray_light mb-0 d-block'>
                  Save up to 34% when you pay annually
                </ZIonText>
                <div className='d-flex ion-align-items-center'>
                  <ZIonText>Pay annually</ZIonText>{' '}
                  <IonToggle slot='end'></IonToggle>{' '}
                  <ZIonText>Pay monthly</ZIonText>
                </div>
              </div>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol sizeXl='11' sizeLg='11.5' sizeMd='12' className='mx-auto'>
              <ZIonRow>
                {subscriptionPricingData.map((el) => {
                  return (
                    <ZIonCol
                      sizeXl='2.4'
                      sizeLg='4'
                      sizeMd='6'
                      sizeSm='6'
                      sizeXs='12'
                      key={el.id}
                    >
                      <ZIonCard className='mx-0' style={{ height: '560px' }}>
                        <ZIonCardHeader className='px-0 pb-2'>
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 text-center d-block'>
                            {el.label}
                          </ZIonText>
                          <hr className='mb-2' />
                          <ZIonText className='price mb-0 d-block'>
                            <span className='fs-2 zaions__fw_750 ps-3 zaions__color_gray2'>
                              {el?.price || 0}
                            </span>
                            {el?.priceDuration || '-'}
                          </ZIonText>
                          <ZIonText className='ms-3 zaions__fs_11'>
                            {el.annualCharge
                              ? `(annual one-time charge of ${el.annualCharge})`
                              : ''}
                          </ZIonText>
                          <ZIonButton
                            className='mx-3'
                            expand='block'
                            color={'tertiary'}
                            routerLink={el.link}
                          >
                            Get Started
                          </ZIonButton>
                          <ZIonText className='limits ms-2 mt-4 pt-1 ps-1 fs-6 d-block'>
                            {el.limit_text}
                          </ZIonText>
                        </ZIonCardHeader>
                        <ZIonCardContent className='ps-2 pe-0'>
                          <ZIonText className='mb-0 zaions__fw_800 zaions__color_gray2'>
                            {el.features_title}
                          </ZIonText>

                          <ZIonList
                            lines={'none'}
                            className='zaions__list_default ms-0 ps-0 zaions__w100'
                          >
                            {el.features_included.map((feature_item) => {
                              return (
                                <ZIonItem
                                  className='d-flex my-3 ion-align-items-start'
                                  key={feature_item.feature_id}
                                >
                                  <ZIonImg
                                    className='me-2 mt-1'
                                    src={feature_item.icon}
                                  />{' '}
                                  <ZIonText>
                                    {feature_item.text}
                                    {feature_item.new === true ? (
                                      <ZIonText className='zaions__new_tag'>
                                        New
                                      </ZIonText>
                                    ) : (
                                      ''
                                    )}
                                  </ZIonText>
                                </ZIonItem>
                              );
                            })}
                          </ZIonList>
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
            <ZIonCol className='mt-5 text-center fs-5'>
              <ZIonText className='zaions__fw_800'>
                Detailed Feature Comparison
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
          <ZIonRow>
            <ZIonCol size='10.6' className='mx-auto'>
              <table className='zaions__w100'>
                <thead>
                  <tr>
                    <ZIonRow className='d-flex ion-align-items-center'>
                      <ZIonCol
                        sizeXl='4'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''
                      >
                        <th className='pe-3'>
                          <div className='my-auto'>
                            <ZIonText className='zaions__color_gray_light fw-normal mb-0 d-block'>
                              Save up to 34% when you pay annually
                            </ZIonText>
                            <div className='d-flex ion-align-items-center'>
                              <ZIonText className='fw-normal'>
                                Pay annually
                              </ZIonText>{' '}
                              <IonToggle slot='end'></IonToggle>{' '}
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
                        sizeXs=''
                      >
                        <th
                          className='text-center zaions__bg_gray'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 d-block'>
                            FREE
                          </ZIonText>
                          <ZIonText className='price mb-0 fw-normal mb-0'>
                            <ZIonText className='fs-2 zaions__color_gray2'>
                              $0
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='zaions__fs_11 opacity-0 d-block'>
                            Empty
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.SignUpRoute}
                            expand='block'
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 d-dlock'>
                            STARTER
                          </ZIonText>
                          <ZIonText className='price mb-0 fw-normal mb-0 d-block'>
                            <ZIonText className='fs-2 zaions__color_gray2'>
                              $8
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='zaions__fs_11 opacity-0'>
                            ($96 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center zaions__bg_gray'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 d-block'>
                            BASIC
                          </ZIonText>
                          <ZIonText className='price mb-0 fw-normal mb-0 d-block'>
                            <ZIonText className='fs-2 zaions__color_gray2'>
                              $29
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='zaions__fs_11 opacity-0'>
                            ($348 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 d-block'>
                            PREMIUM
                          </ZIonText>
                          <ZIonText className='price mb-0 fw-normal mb-0 d-block'>
                            <ZIonText className='fs-2 zaions__color_gray2'>
                              $199
                            </ZIonText>
                            /mo
                          </ZIonText>
                          <ZIonText className='zaions__fs_11 opacity-0'>
                            ($2,388 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center zaions__bg_gray'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonText className='label mt-1 mb-0 zaions__fw_750 fs-6 d-block'>
                            ENTERPRISE
                          </ZIonText>
                          <ZIonText className='price mb-0 fw-normal mb-0 d-block'>
                            <ZIonText className='fs-2 zaions__color_gray2'>
                              Custom
                            </ZIonText>
                          </ZIonText>
                          <ZIonText className='zaions__fs_11 opacity-0'>
                            ($2,388 annually)
                          </ZIonText>
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                      </ZIonCol>
                    </ZIonRow>
                  </tr>
                </thead>
              </table>
              {pricingFeatureDetailData.map((el) => {
                return (
                  <ZIonRow key={el.id}>
                    <ZIonCol className='' sizeXl='12'>
                      <ZIonText className='zaions__fw_800 mb-0 ms-1 d-block'>
                        {el.section_heading}{' '}
                        {el.new === true ? (
                          <span className={classes.zaions__detal_price_new_tag}>
                            New
                          </span>
                        ) : (
                          ''
                        )}
                      </ZIonText>
                      {el.features.map((item) => {
                        return (
                          <ZIonRow key={getRandomKey()}>
                            <ZIonCol sizeXl='4' className='pe-0'>
                              <hr className='m-0' />

                              {item.type === 'feature' ? (
                                <ZIonText className='my-auto pt-2 d-flex ion-align-items-center '>
                                  {item.feature_title}
                                  <button
                                    id={`hover-trigger-${el.id || '-'}-${
                                      item.feature_id || '-'
                                    }`}
                                    className={classes.zaions__popover_btn}
                                  >
                                    {!!item.destil && (
                                      <ZIonImg src={iconInfo} />
                                    )}
                                  </button>
                                  {!!item.destil && (
                                    <IonPopover
                                      trigger={`hover-trigger-${el.id || '-'}-${
                                        item.feature_id || '-'
                                      }`}
                                      triggerAction='hover'
                                      side='right'
                                      alignment='end'
                                      size='auto'
                                    >
                                      <ZIonContent
                                        className={`${classes.zaions__popover_box} ion-padding`}
                                      >
                                        {item.destil}
                                      </ZIonContent>
                                    </IonPopover>
                                  )}
                                </ZIonText>
                              ) : item.type === 'info' ? (
                                <>
                                  <ZIonText
                                    className={`my-auto d-flex ion-align-items-center ${classes.zaions__info}`}
                                  >
                                    <ZIonText className='mt-3'>
                                      {item.info?.text}{' '}
                                      <ZIonRouterLink
                                        routerLink={item.info?.link?.text}
                                      >
                                        {item.info?.link?.text}
                                      </ZIonRouterLink>
                                    </ZIonText>{' '}
                                  </ZIonText>
                                </>
                              ) : (
                                ''
                              )}
                            </ZIonCol>
                            <ZIonCol size='7.5' className='ps-0'>
                              <hr className='m-0' />
                              <ZIonRow className='ps-2'>
                                <ZIonCol sizeXl='2.3' className='text-center'>
                                  {getPlanFeatureContent(item?.plan1)}
                                </ZIonCol>
                                <ZIonCol sizeXl='2.3' className='text-center'>
                                  {getPlanFeatureContent(item.plan2)}
                                </ZIonCol>
                                <ZIonCol sizeXl='2.3' className='text-center'>
                                  {getPlanFeatureContent(item.plan3)}
                                </ZIonCol>
                                <ZIonCol sizeXl='2.3' className='text-center'>
                                  {getPlanFeatureContent(item.plan4)}
                                </ZIonCol>
                                <ZIonCol sizeXl='2.3' className='text-center'>
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
              <table className='zaions__w100'>
                <thead>
                  <tr>
                    <ZIonRow className='d-flex ion-align-items-center'>
                      <ZIonCol
                        sizeXl='4'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''
                      ></ZIonCol>
                      <ZIonCol
                        sizeXl='7.3'
                        sizeLg=''
                        sizeMd=''
                        sizeSm=''
                        sizeXs=''
                        className='d-flex justify-content-center align-items-center'
                      >
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.SignUpRoute}
                            expand='block'
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
                            Get Started
                          </ZIonButton>
                        </th>
                        <th
                          className='text-center'
                          style={{ color: '#464c50' }}
                        >
                          <ZIonButton
                            className='mx-3 ion-text-capitalize'
                            color={'tertiary'}
                            routerLink={ZaionsRoutes.HomeRoute}
                          >
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

        <ZIonGrid className='mt-5 pt-5 mb-5'>
          <ZIonRow>
            <ZIonCol className='text-center'>
              <ZIonText className='d-block'>
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
    </ZaionsIonPage>
  );
};

export default ZaionsPricing;
