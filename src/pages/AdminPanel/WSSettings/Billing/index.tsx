/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import SupportOnPatreon from '@/components/SupportOnPatreon';
import {
  ZIonButton,
  ZIonCard,
  ZIonCardContent,
  ZIonCardTitle,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonProgressBar,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import classNames from 'classnames';
import { checkmarkCircleOutline } from 'ionicons/icons';
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
const PriceCards = [
  {
    label: 'Team',
    theme: 'light',
    price: '$39',
    button: {
      text: 'Upgrade Now',
      routerLink: ''
    },
    points: [
      {
        text: '10,000 clicks'
      },
      {
        text: '2 Domains'
      },
      {
        text: '2 Smartpages'
      },
      {
        text: '1 Team member'
      },
      {
        text: 'Deep links, Advanced links settings, Analytics.'
      }
    ]
  },
  {
    label: 'Pro',
    theme: 'light',
    price: '$69',
    button: {
      text: 'Upgrade Now',
      routerLink: ''
    },
    points: [
      {
        text: '50,000 clicks'
      },
      {
        text: '5 Domains'
      },
      {
        text: '10 Smartpages'
      },
      {
        text: '10 Team member'
      },
      {
        text: 'Deep links, Advanced links settings, Analytics.'
      }
    ]
  },
  {
    label: 'Business',
    theme: 'light',
    price: '$99',
    button: {
      text: 'Upgrade Now',
      routerLink: ''
    },
    points: [
      {
        text: '100,000 clicks'
      },
      {
        text: '15 Domains'
      },
      {
        text: '15 Smartpages'
      },
      {
        text: '15 Team member'
      },
      {
        text: 'Deep links, Advanced links settings, Analytics.'
      }
    ]
  },
  {
    label: 'Enterprise',
    theme: 'light',
    price: '$199',
    button: {
      text: 'Contact us',
      routerLink: ''
    },
    points: [
      {
        text: '300,000 clicks'
      },
      {
        text: '25 Domains'
      },
      {
        text: '30 Smartpages'
      },
      {
        text: '20 Team member'
      },
      {
        text: 'Deep links, Advanced links settings, Analytics.'
      }
    ]
  },
  {
    label: 'Corporate',
    price: '$299',
    theme: 'dark',
    points: [
      {
        text: 'Need more Clicks?'
      },
      {
        text: 'Need more Domains?'
      },
      {
        text: 'Need more Smartpages?'
      },
      {
        text: 'Need more Team member?'
      },
      {
        text: 'Need more Deep links, custom integrations?'
      }
    ]
  }
];

/**
 * Functional Component
 * About: ()
 * @type {*}
 * */
const ZBillingPage: React.FC = () => {
  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale, isXlScale, is2XlScale } =
    useZMediaQueryScale();
  // #endregion
  return (
    <>
      <SupportOnPatreon />
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
            // 'ion-justify-content-end': isLgScale,
            // 'ion-justify-content-between gap-1': !isLgScale && isSmScale,
            // 'w-full': !isSmScale
          })}>
          <div className='flex w-max'>
            <ZIonText
              className={classNames({
                'me-3 font-semibold tracking-wider': true,
                'text-sm': !isMdScale
              })}>
              Monthly
            </ZIonText>
            <ZRCSwitch />
            <ZIonText
              className={classNames({
                'ms-3 font-semibold tracking-wider': true,
                'text-sm': !isMdScale
              })}>
              Yearly
            </ZIonText>
          </div>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow
        className={classNames({
          'ion-justify-content-between': is2XlScale || isXlScale || !isLgScale,
          'gap-3': is2XlScale && isXlScale,
          'gap-2': !is2XlScale && isXlScale
        })}>
        {PriceCards.map((el, index) => {
          return (
            <ZIonCol
              sizeXl='2.8'
              sizeLg='3.8'
              sizeMd='5.8'
              sizeSm='12'
              sizeXs='12'
              key={index}>
              <ZIonCard color={el.theme === 'dark' ? 'dark' : 'light'}>
                <ZIonCardContent className='my-4'>
                  <ZIonText
                    className='block mb-3'
                    color={el.theme === 'dark' ? 'light' : 'primary'}>
                    {el.label}
                  </ZIonText>

                  <ZIonCardTitle className='mb-3'>
                    <ZIonText className='text-2xl font-semibold'>
                      {el.price}
                    </ZIonText>
                    <ZIonText
                      className='text-sm font-semibold ms-2'
                      color='medium'>
                      /mo
                    </ZIonText>
                  </ZIonCardTitle>

                  <div className=''>
                    {el.points?.map((_point, index) => {
                      return (
                        <div
                          className='flex w-full mt-3 ion-align-items-top'
                          key={index}>
                          <ZIonIcon
                            icon={checkmarkCircleOutline}
                            className='w-5 h-5 mt-[1px] me-1'
                            color={el.theme === 'dark' ? 'light' : 'primary'}
                          />
                          <ZIonText className='text-md'>{_point.text}</ZIonText>
                        </div>
                      );
                    })}
                  </div>

                  <div className='flex w-full pt-4 mt-5 ion-align-items-center ion-justify-content-center'>
                    <ZIonButton
                      className='ion-no-margin'
                      color={el.theme === 'dark' ? 'light' : 'primary'}>
                      Upgrade Now
                    </ZIonButton>
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
