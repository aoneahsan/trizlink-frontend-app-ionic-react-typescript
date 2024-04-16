// Core Imports
import React from 'react';

// Packages Imports
// Custom Imports

import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Global Constant
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonImg,
  ZIonRouterLink,
  ZIonRow
} from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

// Styles
import classes from './styles.module.css';

// Images
import { ProductLogo } from '@/assets/images';

// Recoil
import { IsAuthenticatedRStateSelector } from '@/ZaionsStore/UserAccount/index.recoil';

const ZaionsTopMenu: React.FC = () => {
  const { isMdScale } = useZMediaQueryScale();

  const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);
  const { zNavigatePushRoute } = useZNavigate();

  return (
    <ZIonGrid
      className={classNames(classes.z_index_1000, {
        'sticky zaions__bg_white w-full pb-0 pt-0 top-0': true
      })}>
      <ZIonRow className='ion-justify-content-between'>
        <ZIonCol
          size='2.5'
          className='pb-0'>
          <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
            <ZIonImg
              src={ProductLogo}
              alt={`${PRODUCT_NAME} Logo`}
              className={`h-[50px] w-max ${
                isMdScale
                  ? 'ion-margin-horizontal ion-padding-horizontal'
                  : 'px-0'
              }`}
            />
          </ZIonRouterLink>
        </ZIonCol>
        <ZIonCol size='auto' />
        <ZIonCol
          className='flex pb-0 ion-align-items-center ion-justify-content-end'
          size='4'>
          {loggedIn ? (
            <ZIonButton
              onClick={() => {
                zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
              }}
              className={`${classes.zaions_nav_button} ion-text-capitalize ms-2 mb-4`}
              color='tertiary'>
              {CONSTANTS.ZHomePageAccountBtnText}
            </ZIonButton>
          ) : (
            <>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.LoginRoute}
                testingselector={
                  CONSTANTS.testingSelectors.homePage.loginButton
                }>
                <ZIonButton
                  className={`${classes.zaions_nav_button} ion-text-capitalize ms-2`}
                  fill='outline'
                  color='tertiary'>
                  Login
                </ZIonButton>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.SignUpRoute}
                testingselector={
                  CONSTANTS.testingSelectors.homePage.signupButton
                }>
                <ZIonButton
                  className={`${classes.zaions_nav_button} ion-text-capitalize ms-2`}
                  color='tertiary'>
                  Sign up Free
                </ZIonButton>
              </ZIonRouterLink>
            </>
          )}
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZaionsTopMenu;
