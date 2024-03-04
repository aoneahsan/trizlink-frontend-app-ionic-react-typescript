// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import {
  checkmarkCircleOutline,
  informationCircleOutline
} from 'ionicons/icons';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import InPageFooter from '@/components/InPageFooter';
import ZaionsTopMenu from '@/navigation/TopMenu';

import {
  ZIonCol,
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonCard,
  ZIonCardHeader,
  ZIonCardContent,
  ZIonButton,
  ZIonRadioGroup,
  ZIonRadio,
  ZIonIcon,
  ZIonSkeletonText
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

// Recoil State

// Global Imports
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { isZNonEmptyString } from '@/utils/helpers';

// Types
import { type ZaionsPricingI } from '@/types/WhyZaions/PricingPage';

// Styles

// Images

const ZaionsPricing: React.FC = () => {
  const { is2XlScale } = useZMediaQueryScale();

  // const subscriptionPricingData = useRecoilValue<
  //   ZaionsPricingSubscriptionsType[]
  // >(ZaionsPricingSubscriptionsState);
  // const pricingFeatureDetailData = useRecoilValue<
  //   ZaionsPricingFeatureDetailType[]
  // >(ZaionsPricingFeatureDetailState);

  // const getPlanFeatureContent = useCallback(
  //   (val: ZaionsPricingFeaturePlanType) => {
  //     if (typeof val === 'string') {
  //       return val;
  //     } else if (typeof val === 'boolean' && val) {
  //       // return <ZIonIcon name={checkmarkDoneOutline} color='dark'></ZIonIcon>;
  //       return '✔';
  //     } else {
  //       return '-';
  //     }
  //   },
  //   []
  // );

  // #region APIs
  const { data: ZPlansData, isFetching: isZPlanDataFetching } =
    useZRQGetRequest<ZaionsPricingI[]>({
      _url: API_URL_ENUM.zPlans,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PLANS.MAIN],
      _authenticated: false,
      _checkPermissions: false
    });
  // #endregion

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
              <ZIonRow className='ion-justify-content-center'>
                {isZPlanDataFetching &&
                  [...Array(4)].map((_, index) => {
                    return (
                      <ZIonCol
                        sizeXl='2.4'
                        sizeLg='4'
                        sizeMd='6'
                        sizeSm='6'
                        sizeXs='12'
                        key={index}>
                        <ZIonCard className='h-full mx-0 '>
                          <ZIonCardHeader className='px-0 pb-2'>
                            <ZIonText
                              className='block pb-1 text-xl font-bold text-center border-b'
                              color='dark'>
                              <ZIonSkeletonText className='w-20 h-5 mx-auto' />
                            </ZIonText>

                            {/*  */}
                            <ZIonText className='block mb-0 text-center'>
                              <span className='font-bold ps-3 zaions__color_gray2'>
                                <ZIonSkeletonText className='w-20 h-5 mx-auto' />
                              </span>
                            </ZIonText>
                            <ZIonText
                              className={classNames({
                                'mb-3 text-xs text-center ms-3': true
                              })}>
                              <ZIonSkeletonText className='w-[10rem] mx-auto' />
                            </ZIonText>
                            <ZIonSkeletonText className='w-[93%] rounded-md h-[2.5rem] mx-auto' />
                          </ZIonCardHeader>
                          <ZIonCardContent className='mx-3 ps-1 pe-0'>
                            <ZIonText className='mb-0 text-lg font-extrabold zaions__color_gray2'>
                              <ZIonSkeletonText className='w-[8rem] h-4' />
                            </ZIonText>

                            <div className='flex flex-col mt-2'>
                              {[...Array(3)]?.map((_, index) => {
                                return (
                                  <div
                                    className='flex my-2 mt-2 ion-align-items-start'
                                    key={index}>
                                    <ZIonSkeletonText className='w-3 me-1' />

                                    <ZIonSkeletonText className='w-[90%]' />
                                  </div>
                                );
                              })}
                            </div>
                          </ZIonCardContent>
                        </ZIonCard>
                      </ZIonCol>
                    );
                  })}
                {!isZPlanDataFetching &&
                  ZPlansData?.map(plan => {
                    return (
                      <ZIonCol
                        sizeXl='2.4'
                        sizeLg='4'
                        sizeMd='6'
                        sizeSm='6'
                        sizeXs='12'
                        key={plan.id}>
                        <ZIonCard className='h-full mx-0 '>
                          <ZIonCardHeader className='px-0 pb-2'>
                            <ZIonText
                              className='block pb-1 text-xl font-bold text-center border-b'
                              color='dark'>
                              {plan.displayName}
                            </ZIonText>

                            {/*  */}
                            <ZIonText className='block mt-3 mb-0 text-center'>
                              <span className='text-3xl font-bold ps-3 zaions__color_gray2'>
                                {plan?.currency}
                                {plan?.monthlyPrice}
                              </span>
                              /month
                            </ZIonText>
                            <ZIonText
                              className={classNames({
                                'mb-3 text-xs text-center ms-3': true,
                                'opacity-0': !isZNonEmptyString(
                                  String(plan?.annualPrice)
                                )
                              })}>
                              {isZNonEmptyString(String(plan?.annualPrice))
                                ? `(${plan?.annualPrice})`
                                : '_'}
                            </ZIonText>
                            <ZIonButton
                              className='mx-3'
                              expand='block'
                              color='tertiary'
                              height='2.5rem'>
                              Get Started
                            </ZIonButton>
                            {/* <ZIonText className='block my-2 text-base text-center limits'>
                            {el.limit_text}
                          </ZIonText> */}
                          </ZIonCardHeader>
                          <ZIonCardContent className='mx-3 ps-1 pe-0'>
                            <ZIonText className='mb-0 text-lg font-extrabold zaions__color_gray2'>
                              {plan.featureListTitle}
                            </ZIonText>

                            <div className='flex flex-col mt-2'>
                              {plan.features?.map((featureItem, index) => {
                                return (
                                  <div
                                    className='flex my-2 ion-align-items-start'
                                    key={index}>
                                    {/* <ZIonImg
                                    className='mt-1 me-1'
                                    src={featureItem.icon}
                                  /> */}
                                    <ZIonIcon
                                      color='success'
                                      icon={checkmarkCircleOutline}
                                      className='mt-[3px] me-1'
                                    />
                                    <ZIonText>
                                      {featureItem.text}
                                      {/* {featureItem.new === true ? (
                                      <ZIonText className='zaions__new_tag'>
                                        New
                                      </ZIonText>
                                    ) : (
                                      ''
                                    )} */}
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

        <ZIonGrid className='my-8'>
          <ZIonText className='block mb-6 text-xl font-bold ion-text-center'>
            Detailed Feature Comparison
          </ZIonText>
          <ZIonRow
            className={classNames({
              'w-[85%] mx-auto': is2XlScale
            })}>
            <ZIonCol
              size='3'
              className='ion-no-padding'>
              <div className='ion-padding w-full h-[12rem] flex flex-col ion-align-items-start ion-justify-content-center'>
                <ZIonText
                  color='medium'
                  className='block'>
                  Save up to 34% when you pay annually
                </ZIonText>

                <ZIonRadioGroup
                  value='payAnnually'
                  className='flex flex-col gap-3 mt-3 ion-align-items-start'>
                  <ZIonRadio
                    value='payAnnually'
                    labelPlacement='end'>
                    Pay Annually
                  </ZIonRadio>

                  <ZIonRadio
                    value='payMonthly'
                    labelPlacement='end'>
                    Pay Monthly
                  </ZIonRadio>
                </ZIonRadioGroup>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  Link Management
                </ZIonText>

                <ZIonText className='flex w-full px-2 py-2 ion-align-items-center text-md border-bottom-medium-point-5'>
                  Link Management
                  <div className='flex h-max w-max'>
                    <ZIonIcon
                      id='infoIconPlanLimit'
                      icon={informationCircleOutline}
                      className='w-5 h-5 cursor-pointer ms-1'
                      color='medium'
                    />
                  </div>
                  <ZRTooltip
                    anchorSelect='#infoIconPlanLimit'
                    place='right'
                    className='w-[14rem!important] text-xs p-[.3rem!important]'>
                    <ZIonText className='text-xs'>
                      Total number of URLs you can shorten on a monthly basis
                    </ZIonText>
                  </ZRTooltip>
                </ZIonText>
              </div>
            </ZIonCol>
            {/* Feature list (header) */}
            <ZIonCol className='zaions__light_bg ion-no-padding'>
              <div className='ion-padding pt-2 w-full h-[12rem] flex flex-col gap-2 ion-align-items-center ion-justify-content-start'>
                <ZIonText
                  color='dark'
                  className='block text-xl font-semibold uppercase'>
                  FREE
                </ZIonText>

                <ZIonText
                  color='medium'
                  className='block font-medium'>
                  <ZIonText className='text-3xl'>$0</ZIonText>
                  <ZIonText className='text-sm'>/mo</ZIonText>
                </ZIonText>
                <ZIonText
                  color='medium'
                  className='block text-xs font-semibold'>
                  _
                </ZIonText>

                <div className='w-full mt-5'>
                  <ZIonButton
                    className='w-full'
                    height='2.5rem'>
                    Get Stated
                  </ZIonButton>
                </div>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  _
                </ZIonText>

                <ZIonText className='block w-full px-2 py-2 ion-text-center text-md border-bottom-medium-point-5'>
                  10/mo
                </ZIonText>
              </div>
            </ZIonCol>

            {/* plans */}
            <ZIonCol className='ion-no-padding'>
              <div className='ion-padding pt-2 w-full h-[12rem] flex flex-col gap-2 ion-align-items-center ion-justify-content-start'>
                <ZIonText
                  color='dark'
                  className='block text-xl font-semibold uppercase'>
                  FREE
                </ZIonText>

                <ZIonText
                  color='medium'
                  className='block font-medium'>
                  <ZIonText className='text-3xl'>$0</ZIonText>
                  <ZIonText className='text-sm'>/mo</ZIonText>
                </ZIonText>
                <ZIonText
                  color='medium'
                  className='block text-xs font-semibold'>
                  _
                </ZIonText>

                <div className='w-full mt-5'>
                  <ZIonButton
                    className='w-full'
                    height='2.5rem'>
                    Get Stated
                  </ZIonButton>
                </div>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  _
                </ZIonText>

                <ZIonText className='block w-full px-2 py-2 ion-text-center text-md border-bottom-medium-point-5'>
                  10/mo
                </ZIonText>
              </div>
            </ZIonCol>

            <ZIonCol className='zaions__light_bg ion-no-padding'>
              <div className='ion-padding pt-2 w-full h-[12rem] flex flex-col gap-2 ion-align-items-center ion-justify-content-start'>
                <ZIonText
                  color='dark'
                  className='block text-xl font-semibold uppercase'>
                  FREE
                </ZIonText>

                <ZIonText
                  color='medium'
                  className='block font-medium'>
                  <ZIonText className='text-3xl'>$0</ZIonText>
                  <ZIonText className='text-sm'>/mo</ZIonText>
                </ZIonText>
                <ZIonText
                  color='medium'
                  className='block text-xs font-semibold'>
                  _
                </ZIonText>

                <div className='w-full mt-5'>
                  <ZIonButton
                    className='w-full'
                    height='2.5rem'>
                    Get Stated
                  </ZIonButton>
                </div>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  _
                </ZIonText>

                <ZIonText className='block w-full px-2 py-2 ion-text-center text-md border-bottom-medium-point-5'>
                  10/mo
                </ZIonText>
              </div>
            </ZIonCol>

            <ZIonCol className='ion-no-padding'>
              <div className='ion-padding pt-2 w-full h-[12rem] flex flex-col gap-2 ion-align-items-center ion-justify-content-start'>
                <ZIonText
                  color='dark'
                  className='block text-xl font-semibold uppercase'>
                  FREE
                </ZIonText>

                <ZIonText
                  color='medium'
                  className='block font-medium'>
                  <ZIonText className='text-3xl'>$0</ZIonText>
                  <ZIonText className='text-sm'>/mo</ZIonText>
                </ZIonText>
                <ZIonText
                  color='medium'
                  className='block text-xs font-semibold'>
                  _
                </ZIonText>

                <div className='w-full mt-5'>
                  <ZIonButton
                    className='w-full'
                    height='2.5rem'>
                    Get Stated
                  </ZIonButton>
                </div>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  _
                </ZIonText>

                <ZIonText className='block w-full px-2 py-2 ion-text-center text-md border-bottom-medium-point-5'>
                  10/mo
                </ZIonText>
              </div>
            </ZIonCol>

            <ZIonCol className='zaions__light_bg ion-no-padding'>
              <div className='ion-padding pt-2 w-full h-[12rem] flex flex-col gap-2 ion-align-items-center ion-justify-content-start'>
                <ZIonText
                  color='dark'
                  className='block text-xl font-semibold uppercase'>
                  FREE
                </ZIonText>

                <ZIonText
                  color='medium'
                  className='block font-medium'>
                  <ZIonText className='text-3xl'>$0</ZIonText>
                  <ZIonText className='text-sm'>/mo</ZIonText>
                </ZIonText>
                <ZIonText
                  color='medium'
                  className='block text-xs font-semibold'>
                  _
                </ZIonText>

                <div className='w-full mt-5'>
                  <ZIonButton
                    className='w-full'
                    height='2.5rem'>
                    Get Stated
                  </ZIonButton>
                </div>
              </div>

              <div className='mb-2 mt-7'>
                <ZIonText className='block px-2 pb-1 text-lg font-semibold border-bottom-medium-point-5'>
                  _
                </ZIonText>

                <ZIonText className='block w-full px-2 py-2 ion-text-center text-md border-bottom-medium-point-5'>
                  10/mo
                </ZIonText>
              </div>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>

        {/* <ZIonGrid>
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
        </ZIonGrid> */}
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
