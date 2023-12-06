/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

import {
  barChartOutline,
  flash,
  linkOutline,
  megaphoneOutline,
  pieChartOutline,
  settingsOutline,
  shareSocialOutline
} from 'ionicons/icons';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonRouterLink,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { BRACKPOINT_LG } from '@/utils/constants';

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
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { blogAdWeelHero, linktreeLogoSymbol } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioNavigation: React.FC = () => {
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });

  return (
    <ZIonGrid
      className={classNames({
        'ion-no-padding': !isLgScale
      })}>
      <ZIonRow
        className={classNames({
          'zaions__bg_white py-1 border-bottom__sand': true,
          'border-radius__100vmax mx-2': isLgScale,
          'flex-col-reverse': !isLgScale
        })}>
        <ZIonCol
          className={classNames({
            'flex ion-align-items-center ion-text-center': true,
            'ps-3 ms-1': isLgScale
          })}
          sizeXl='8'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          {isLgScale && (
            <ZIonRouterLink
              routerLink={
                ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive
              }>
              <ZIonImg
                src={linktreeLogoSymbol}
                alt='linktree Logo Symbol'
                className='me-2 w-[25px]'
              />
            </ZIonRouterLink>
          )}
          <div
            className={classNames({
              'w-full flex ion-justify-content-between': !isLgScale
            })}>
            <ZIonButton
              className={classNames(
                classes['z-link-in-bio-navigation__buttons'],
                {
                  'ion-text-capitalize mx-2 mb-3 font-bolder': true
                }
              )}
              size='small'
              fill='clear'
              color='dark'>
              <ZIonIcon
                icon={linkOutline}
                className='me-1'
              />{' '}
              Links
            </ZIonButton>
            <ZIonButton
              className={classNames(
                classes['z-link-in-bio-navigation__buttons'],
                {
                  'ion-text-capitalize mx-2 mb-3 font-bolder': true
                }
              )}
              size='small'
              fill='clear'
              color='dark'>
              <ZIonIcon
                icon={pieChartOutline}
                className='me-1'
              />{' '}
              Appearance
            </ZIonButton>
            <ZIonButton
              className={classNames(
                classes['z-link-in-bio-navigation__buttons'],
                {
                  'ion-text-capitalize mx-2 mb-3 font-bolder': true
                }
              )}
              size='small'
              fill='clear'
              color='dark'>
              <ZIonIcon
                icon={barChartOutline}
                className='me-1'
              />{' '}
              Analytics
            </ZIonButton>
            <ZIonButton
              className={classNames(
                classes['z-link-in-bio-navigation__buttons'],
                {
                  'ion-text-capitalize mx-2 mb-3 font-bolder': true
                }
              )}
              size='small'
              fill='clear'
              color='dark'>
              <ZIonIcon
                icon={settingsOutline}
                className='me-1'
              />{' '}
              Settings
            </ZIonButton>
          </div>
        </ZIonCol>
        <ZIonCol
          sizeXl='3.9'
          sizeLg='4.9'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'flex ion-align-items-center': true,
            'ion-justify-content-end': isLgScale,
            'border-bottom__sand pb-2': !isLgScale
          })}>
          {!isLgScale && (
            <ZIonRouterLink
              routerLink={
                ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive
              }
              className={classNames({
                'me-auto ms-3': !isLgScale
              })}>
              <ZIonImg
                src={linktreeLogoSymbol}
                alt='linktree Logo Symbol'
                className='me-2 w-[25px]'
              />
            </ZIonRouterLink>
          )}
          <ZIonButton
            fill='clear'
            className='mx-2 mb-3 ion-text-capitalize w-[2.5rem] h-[2.5rem] ion-no-padding'
            shape='round'
            color='dark'
            size='small'>
            <ZIonIcon icon={megaphoneOutline} />
          </ZIonButton>
          <ZIonButton
            className='ion-text-capitalize me-2 w-[2.5rem] h-[2.5rem] ion-no-padding'
            shape='round'
            color='light'>
            <ZIonIcon
              icon={flash}
              size='small'
              className='me-2'
            />{' '}
            <ZIonText>
              <h6 className='font-bold ion-no-margin'>Upgrade</h6>
            </ZIonText>
          </ZIonButton>
          <ZIonButton
            className='ion-text-capitalize me-2 w-[2.5rem] h-[2.5rem] ion-no-padding z-ion-box-shadow z-ion-border-width'
            shape='round'
            color='medium'
            fill='outline'>
            <ZIonIcon
              icon={shareSocialOutline}
              size='small'
              color='dark'
              className='me-1'
            />
            <ZIonText
              color='dark'
              className='ms-1'>
              <h6 className='font-bold ion-no-margin'>Share</h6>
            </ZIonText>
          </ZIonButton>
          {isLgScale && (
            <ZIonButton
              fill='clear'
              className='mx-2 mb-0 ion-text-capitalize ion-no-padding hover:outline-sand w-[2.5rem] h-[2.5rem]'
              shape='round'
              color='dark'
              size='small'>
              <ZIonImg
                src={blogAdWeelHero}
                className='border-radius__100vmax'
              />
            </ZIonButton>
          )}
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZLinkInBioNavigation;
