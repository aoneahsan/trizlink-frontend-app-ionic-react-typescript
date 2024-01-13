/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { checkmarkCircleOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonButton,
  ZIonCard,
  ZIonCardContent,
  ZIonCardHeader,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonProgressBar,
  ZIonRadio,
  ZIonRadioGroup,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  ZPlanTimeLine,
  type ZSubscriptionI,
  type ZaionsPricingI
} from '@/types/WhyZaions/PricingPage';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const ZBillingPage: React.FC = () => {
  // #region
  const [compState, setCompState] = useState<{
    planTimeDuration: ZPlanTimeLine;
  }>({
    planTimeDuration: ZPlanTimeLine.monthly
  });
  // #endregion

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale, isXlScale, is2XlScale } =
    useZMediaQueryScale();
  // #endregion

  // #region APIS.
  const {
    data: userSubscriptionData,
    isFetching: isZUserSubscriptionDataFetching
  } = useZRQGetRequest<ZSubscriptionI>({
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SUBSCRIPTION],
    _url: API_URL_ENUM.ws_subscription_get,
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  const { data: ZPlansData, isFetching: isZPlanDataFetching } =
    useZRQGetRequest<ZaionsPricingI[]>({
      _url: API_URL_ENUM.zPlans,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PLANS.MAIN],
      _authenticated: false,
      _checkPermissions: false
    });
  // #endregion
  return (
    <>
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
          sizeLg='5'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mb-2': !isSmScale
          })}>
          <ZIonTitle
            className={classNames({
              'block font-bold ion-no-padding': true,
              'text-2xl': isLgScale,
              'text-xl': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Workspace Subscription Details
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Billing details & invoices
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow className='gap-6 ion-justify-content-between '>
        <ZIonCol
          className='border rounded-lg zaions__light_bg ion-align-items-center'
          sizeXl='5.8'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <ZIonList
            className='bg-transparent'
            lines='full'>
            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='3.5rem'>
              <ZIonLabel>
                <ZIonText
                  className={classNames({
                    'font-semibold': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale
                    // 'ion-text-center': !isLgScale
                  })}>
                  Plan:
                </ZIonText>
                <ZIonText
                  color='primary'
                  className={classNames({
                    'ms-2': true,
                    'text-lg': isLgScale,
                    'text-md': !isLgScale
                  })}>
                  Appsumo - 1 code
                </ZIonText>
              </ZIonLabel>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='h-2 rounded-md'
              />
              <div className='w-max ps-1 ms-auto'>
                <ZIonLabel>0 / 30000 clicks</ZIonLabel>
              </div>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='h-2 rounded-md '
              />
              <div className='w-max ps-1 ms-auto'>
                <ZIonLabel>1 / 8 custom domain</ZIonLabel>
              </div>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              lines='none'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='h-2 rounded-md'
              />
              <div className='w-max ps-1 ms-auto'>
                <ZIonLabel>2 / 2 smartpages</ZIonLabel>
              </div>
            </ZIonItem>
          </ZIonList>
        </ZIonCol>

        <ZIonCol
          className='border rounded-lg zaions__light_bg ion-align-items-center'
          sizeXl='5.8'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <ZIonList
            className='bg-transparent'
            lines='full'>
            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='3.5rem'>
              <ZIonLabel>
                <ZIonText
                  className={classNames({
                    'font-semibold': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale
                  })}>
                  Add coupons:
                </ZIonText>
                <ZIonText
                  color='primary'
                  className={classNames({
                    'ms-2': true,
                    'text-lg': isLgScale,
                    'text-md': !isLgScale
                  })}>
                  1/5 codes (max)
                </ZIonText>
              </ZIonLabel>
              <ZIonButton
                slot='end'
                size='default'>
                Add
              </ZIonButton>
            </ZIonItem>
          </ZIonList>

          <div className='ion-padding'>
            <ZIonText className='block'>
              Code 1 <ZIonText color='primary'>(IYIXUXF0K5IPQCYWFQRH)</ZIonText>
            </ZIonText>

            <ZIonButton
              className='mt-4 ion-n-margin'
              expand={!isLgScale ? 'block' : undefined}>
              Want to stack? Limited-time offer
            </ZIonButton>
          </div>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='6'>
          <ZIonTitle
            className={classNames({
              'block font-bold ion-no-padding': true,
              'text-2xl': isLgScale,
              'text-xl': !isLgScale && isMdScale,
              'text-lg': !isMdScale
              // 'ion-text-center': !isLgScale
            })}>
            Subscription
          </ZIonTitle>
        </ZIonCol>

        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='6'
          className={classNames({
            'ion-justify-content-end flex': true
          })}>
          <div className='flex w-max'>
            <ZIonRadioGroup
              className='flex mt-3 gap-7 ion-align-items-start'
              value={compState.planTimeDuration}
              onIonChange={({ target }) => {
                if (isZNonEmptyString(target?.value as ZPlanTimeLine)) {
                  setCompState(oldValues => ({
                    ...oldValues,
                    planTimeDuration: target?.value
                  }));
                }
              }}>
              <ZIonRadio
                value={ZPlanTimeLine.annual}
                labelPlacement='end'>
                Pay Annually
              </ZIonRadio>

              <ZIonRadio
                value={ZPlanTimeLine.monthly}
                labelPlacement='end'>
                Pay Monthly
              </ZIonRadio>
            </ZIonRadioGroup>
          </div>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow
        className={classNames({
          'border rounded-lg zaions__light_bg ion-padding mb-5 pb-8': true,
          'ion-justify-content-between': is2XlScale || isXlScale || !isLgScale,
          'gap-2': is2XlScale && isXlScale,
          'gap-1': !is2XlScale && isXlScale
        })}>
        {isZPlanDataFetching &&
          isZUserSubscriptionDataFetching &&
          [...Array(4)].map((_, index) => {
            return (
              <ZIonCol
                sizeXl='2.8'
                sizeLg='4'
                sizeMd='5.9'
                sizeSm='5.9'
                sizeXs='12'
                key={index}>
                <ZIonCard className='h-full mx-0'>
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
          !isZUserSubscriptionDataFetching &&
          ZPlansData?.map(plan => {
            const _planDisabled =
              compState.planTimeDuration === ZPlanTimeLine.annual &&
              plan?.isAnnualOnly;
            const _currentPlan = userSubscriptionData?.name === plan?.name;
            return (
              <ZIonCol
                sizeXl='2.8'
                sizeLg='4'
                sizeMd='5.9'
                sizeSm='5.9'
                sizeXs='12'
                key={plan.id}>
                <ZIonCard
                  className={classNames({
                    'h-full mx-0': true,
                    'border-2': plan?.isMostPopular,
                    'z_border_color_success ': !_planDisabled,
                    'z_border_color_medium ': _planDisabled,
                    'opacity-80': _planDisabled || _currentPlan
                  })}>
                  <ZIonCardHeader className='relative px-0 pb-2'>
                    {plan?.isMostPopular ? (
                      <ZIonBadge
                        className='absolute px-2 py-1 font-normal tracking-wide shadow-md top-1 right-1'
                        color={_planDisabled ? 'medium' : 'success'}>
                        Most Popular
                      </ZIonBadge>
                    ) : (
                      ''
                    )}
                    <ZIonText
                      className='block pb-1 text-xl font-bold text-center border-b'
                      color='dark'>
                      {plan.displayName}
                    </ZIonText>

                    {/*  */}
                    <ZIonText className='block mt-3 mb-0 text-center'>
                      {_planDisabled ? (
                        <span className='text-2xl font-bold ps-3 zaions__color_gray2'>
                          Annual plan only
                        </span>
                      ) : (
                        <>
                          <span className='text-3xl font-bold ps-3 zaions__color_gray2'>
                            {plan?.currency}
                            {plan?.monthlyPrice}
                          </span>
                          /month
                        </>
                      )}
                    </ZIonText>
                    <ZIonText
                      className={classNames({
                        'mb-3 text-xs text-center ms-3': true,
                        'opacity-0':
                          !isZNonEmptyString(String(plan?.annualPrice)) ||
                          _planDisabled
                      })}>
                      {isZNonEmptyString(String(plan?.annualPrice))
                        ? `(${plan?.annualPrice})`
                        : '_'}
                    </ZIonText>

                    <ZIonText className='block my-1 text-sm text-center limits w-[50%] mx-auto'>
                      {plan.description}
                    </ZIonText>

                    <div
                      className={classNames({
                        'w-full h-max': true,
                        'cursor-not-allowed': _planDisabled,
                        'mt-1 flex ion-align-items-center ion-justify-content-center':
                          _currentPlan
                      })}>
                      {_currentPlan ? (
                        <ZIonBadge
                          className='w-full mx-3 text-2xl font-normal'
                          color='medium'>
                          Current Plan
                        </ZIonBadge>
                      ) : (
                        <ZIonButton
                          className='mx-3'
                          expand='block'
                          color='tertiary'
                          height='2.5rem'
                          disabled={_planDisabled}
                          onClick={() => {
                            // if (!_planDisabled) {
                            //   void getStartedClickHandler(
                            //     plan?.name,
                            //     values?.planTimeDuration
                            //   );
                            // }
                          }}>
                          Upgrade
                        </ZIonButton>
                      )}
                    </div>
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
    </>
  );
};

export default ZBillingPage;
