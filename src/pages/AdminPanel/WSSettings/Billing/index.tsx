/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  ZIonButton,
  ZIonCol,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonProgressBar,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import classNames from 'classnames';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();
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
            Account
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

      <ZIonRow className='gap-6'>
        <ZIonCol className='border rounded-lg zaions__light_bg ion-align-items-center'>
          <ZIonList
            className='bg-transparent'
            lines='full'>
            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='3.5rem'>
              <ZIonLabel>
                <ZIonText className='text-xl font-semibold'>Plan:</ZIonText>
                <ZIonText
                  className='text-lg ms-2'
                  color='primary'>
                  Appsumo - 1 code
                </ZIonText>
              </ZIonLabel>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='w-[75%] h-2 rounded-md'
              />
              <ZIonText className='ms-auto'>0 / 30000 clicks</ZIonText>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='w-[75%] h-2 rounded-md'
              />
              <ZIonText className='ms-auto'>1 / 8 custom domain</ZIonText>
            </ZIonItem>

            <ZIonItem
              className='z-ion-bg-transparent'
              lines='none'
              minHeight='4rem'>
              <ZIonProgressBar
                value={0.5}
                className='w-[75%] h-2 rounded-md'
              />
              <ZIonText className='ms-auto'>2 / 2 smartpages</ZIonText>
            </ZIonItem>
          </ZIonList>
        </ZIonCol>

        <ZIonCol className='border rounded-lg zaions__light_bg ion-align-items-center'>
          <ZIonList
            className='bg-transparent'
            lines='full'>
            <ZIonItem
              className='z-ion-bg-transparent'
              minHeight='3.5rem'>
              <ZIonLabel>
                <ZIonText className='text-xl font-semibold'>
                  Add coupons:
                </ZIonText>
                <ZIonText
                  className='text-lg ms-2'
                  color='primary'>
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

            <ZIonButton className='mt-4 ion-n-margin'>
              Want to stack? Limited-time offer
            </ZIonButton>
          </div>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZBillingPage;
