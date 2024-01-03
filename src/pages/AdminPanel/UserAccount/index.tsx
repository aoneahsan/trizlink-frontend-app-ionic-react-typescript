/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useRouteMatch } from 'react-router';
import { type RefresherEventDetail } from '@ionic/core';
import { menuController } from '@ionic/core/components';
import {
  albumsOutline,
  cardOutline,
  closeOutline,
  notificationsOutline,
  personOutline
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonHeader,
  ZIonIcon,
  ZIonItem,
  ZIonItemDivider,
  ZIonItemGroup,
  ZIonLabel,
  ZIonList,
  ZIonMenu,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZProfileSettings from './ProfileSettings';
import ZPersonalSettings from './PersonalSettings';
import ZSingleWSNotificationSettings from './SingleWSNotificationSettings';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import WorkspacesSettings from './WorkspacesSettings';
import ZAccountPlansSettings from './Plans';
const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

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
 * About: (This component provides an interface for users to customize their settings.
 It includes sections for notifications, general user settings, pixel preferences,
 and UTM tag preferences.)
 * @type {*}
 * */
const ZUserAccount: React.FC = () => {
  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  // #region checking the route.
  const isProfileSettingsPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings
  )?.isExact;

  const isNotificationSettingsPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings
  )?.isExact;

  const isWorkspacesNotificationPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.WSNotificationSettings
  )?.isExact;

  const isSingleWorkspaceNotificationPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.WorkspaceNotifications
  )?.isExact;

  const isAccountPlansSettingsPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.AccountPlansSettings
  )?.isExact;
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      //
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (
    event: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  // #endregion

  return (
    <>
      <ZIonMenu
        side='start'
        menuId={CONSTANTS.MENU_IDS.USER_SETTINGS_MENU_ID}
        contentId={CONSTANTS.PAGE_IDS.USER_SETTINGS_PAGE_ID}>
        {/* Header */}
        <ZIonHeader className='flex px-3 py-2 border-b shadow-none ion-align-items-center ion-no-padding ion-justify-content-between'>
          <ZIonTitle
            className={classNames({
              'block font-semibold ion-no-padding': true,
              'text-xl': isLgScale,
              'text-lg': !isLgScale
            })}>
            User Settings
          </ZIonTitle>

          <ZIonIcon
            icon={closeOutline}
            className='w-6 h-6 pt-[1px] cursor-pointer'
            testingselector={
              CONSTANTS.testingSelectors.userAccount.ionMenu.closeMenuBtn
            }
            onClick={() => {
              void menuController.close(
                CONSTANTS.MENU_IDS.USER_SETTINGS_MENU_ID
              );
            }}
          />
        </ZIonHeader>

        <ZIonContent>
          <ZIonGrid className='ion-no-padding'>
            <ZIonRow>
              <ZIonCol className='ion-no-padding'>
                <ZIonList
                  lines='none'
                  className='mt-3'>
                  {/* Profile settings */}
                  <ZIonItem
                    minHeight='2.2rem'
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.ionMenu
                        .profileSettings
                    }
                    routerLink={
                      ZaionsRoutes.AdminPanel.Setting.UserAccount
                        .ProfileSettings
                    }
                    className={classNames({
                      zaions__light_bg: isProfileSettingsPage
                    })}>
                    <ZIonIcon
                      icon={personOutline}
                      className='w-6 h-6 me-2'
                      color='dark'
                    />
                    <ZIonText className='block mt-1 font-semibold'>
                      Profile settings
                    </ZIonText>
                  </ZIonItem>

                  {/* Billing */}
                  <ZIonItem
                    minHeight='2.2rem'
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.ionMenu
                        .accountPlanSettings
                    }
                    routerLink={
                      ZaionsRoutes.AdminPanel.Setting.UserAccount
                        .AccountPlansSettings
                    }
                    className={classNames({
                      'mt-2': true,
                      zaions__light_bg: isAccountPlansSettingsPage
                    })}>
                    <ZIonIcon
                      icon={cardOutline}
                      className='w-6 h-6 me-2'
                      color='dark'
                    />
                    <ZIonText className='block mt-1 font-semibold'>
                      Billing
                    </ZIonText>
                  </ZIonItem>

                  {/* Notifications settings */}
                  <ZIonItemGroup className='mt-2'>
                    <ZIonItemDivider>
                      <ZIonLabel className='ion-no-margin'>
                        Notification settings
                      </ZIonLabel>
                    </ZIonItemDivider>

                    <ZIonItem
                      minHeight='2.2rem'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount.ionMenu
                          .notificationSettings
                      }
                      routerLink={
                        ZaionsRoutes.AdminPanel.Setting.UserAccount
                          .NotificationSettings
                      }
                      className={classNames({
                        zaions__light_bg: isNotificationSettingsPage
                      })}>
                      <ZIonIcon
                        icon={notificationsOutline}
                        className='w-6 h-6 me-2'
                        color='dark'
                      />
                      <ZIonText className='font-semibold'>
                        Personal settings
                      </ZIonText>
                    </ZIonItem>

                    <ZIonItem
                      minHeight='2.2rem'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount.menuBar
                          .notificationSettings
                      }
                      routerLink={
                        ZaionsRoutes.AdminPanel.Setting.UserAccount
                          .WSNotificationSettings
                      }
                      className={classNames({
                        'mt-2': true,
                        zaions__light_bg:
                          isWorkspacesNotificationPage === true ||
                          isSingleWorkspaceNotificationPage === true
                      })}>
                      <ZIonIcon
                        icon={albumsOutline}
                        className='w-6 h-6 me-2'
                        color='dark'
                      />
                      <ZIonText className='font-semibold'>
                        Workspaces Notification settings
                      </ZIonText>
                    </ZIonItem>
                  </ZIonItemGroup>
                </ZIonList>
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
      </ZIonMenu>

      {/* Main page */}
      <ZIonPage
        pageTitle='User settings page'
        id={CONSTANTS.PAGE_IDS.USER_SETTINGS_PAGE_ID}>
        <ZIonContent>
          {/* IonRefresher */}
          <ZIonRefresher
            onIonRefresh={event => {
              void handleRefresh(event);
            }}>
            <ZIonRefresherContent />
          </ZIonRefresher>

          {/* Grid-1 */}
          <ZIonGrid
            className={classNames({
              'h-screen ion-no-padding': true,
              'max-w-[200rem] mx-auto': false
            })}>
            {/* Row-1 Top bar */}
            <Suspense
              fallback={
                <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                  <ZFallbackIonSpinner2 />
                </ZIonRow>
              }>
              <ZAdminPanelTopBar
                showWSSwitcherBtn={false}
                showInviteBtn={false}
                menuOnClickFn={() => {
                  void (async () => {
                    // Open the menu by menu-id
                    await menuController.enable(
                      true,
                      CONSTANTS.MENU_IDS.USER_SETTINGS_MENU_ID
                    );
                    await menuController.open(
                      CONSTANTS.MENU_IDS.USER_SETTINGS_MENU_ID
                    );
                  })();
                }}
              />
            </Suspense>

            {/* Row-2 */}
            <ZIonRow className='h-[calc(100%-4rem)]'>
              {/* Row-2 col-1 Folder menu */}
              {isLgScale ? (
                <Suspense
                  fallback={
                    <ZIonCol className='h-full border-e-[1px] zaions-transition'>
                      <ZFallbackIonSpinner2 />
                    </ZIonCol>
                  }>
                  <ZIonCol
                    sizeXl='2.8'
                    sizeLg='3'
                    sizeMd='3'
                    sizeSm='2.8'
                    sizeXs='2.8'
                    className='border-e-[1px] zaions-transition h-full shadow-[0_3px_6px_#00000029]'>
                    <ZIonList
                      lines='none'
                      className='mt-3'>
                      {/* Profile settings */}
                      <ZIonItem
                        minHeight='2.2rem'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount.menuBar
                            .profileSettings
                        }
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.UserAccount
                            .ProfileSettings
                        }
                        className={classNames({
                          zaions__light_bg: isProfileSettingsPage
                        })}>
                        <ZIonIcon
                          icon={personOutline}
                          className='w-6 h-6 me-2'
                          color='dark'
                        />
                        <ZIonText className='block mt-1 font-semibold'>
                          Profile settings
                        </ZIonText>
                      </ZIonItem>

                      {/* Billing */}
                      <ZIonItem
                        minHeight='2.2rem'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount.menuBar
                            .accountPlanSettings
                        }
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.UserAccount
                            .AccountPlansSettings
                        }
                        className={classNames({
                          'mt-2': true,
                          zaions__light_bg: isAccountPlansSettingsPage
                        })}>
                        <ZIonIcon
                          icon={cardOutline}
                          className='w-6 h-6 me-2'
                          color='dark'
                        />
                        <ZIonText className='block mt-1 font-semibold'>
                          Billing
                        </ZIonText>
                      </ZIonItem>

                      {/* Notifications settings */}
                      <ZIonItemGroup className='mt-2'>
                        <ZIonItemDivider>
                          <ZIonLabel className='ion-no-margin'>
                            Notification settings
                          </ZIonLabel>
                        </ZIonItemDivider>

                        <ZIonItem
                          minHeight='2.2rem'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount.menuBar
                              .notificationSettings
                          }
                          routerLink={
                            ZaionsRoutes.AdminPanel.Setting.UserAccount
                              .NotificationSettings
                          }
                          className={classNames({
                            zaions__light_bg: isNotificationSettingsPage
                          })}>
                          <ZIonIcon
                            icon={notificationsOutline}
                            className='w-6 h-6 me-2'
                            color='dark'
                          />
                          <ZIonText className='font-semibold'>
                            Personal settings
                          </ZIonText>
                        </ZIonItem>

                        <ZIonItem
                          minHeight='2.2rem'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount.menuBar
                              .notificationSettings
                          }
                          routerLink={
                            ZaionsRoutes.AdminPanel.Setting.UserAccount
                              .WSNotificationSettings
                          }
                          className={classNames({
                            'mt-2': true,
                            zaions__light_bg:
                              isWorkspacesNotificationPage === true ||
                              isSingleWorkspaceNotificationPage === true
                          })}>
                          <ZIonIcon
                            icon={albumsOutline}
                            className='w-6 h-6 me-2'
                            color='dark'
                          />
                          <ZIonText className='font-semibold'>
                            Workspaces Notification settings
                          </ZIonText>
                        </ZIonItem>
                      </ZIonItemGroup>
                    </ZIonList>
                  </ZIonCol>
                </Suspense>
              ) : null}

              {/* Row-2 col-2 Table & filters etc. */}
              <ZIonCol
                className='h-full zaions-transition'
                sizeXl='9.2'
                sizeLg='9'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                testingselector={
                  CONSTANTS.testingSelectors.userAccount.mainContainer
                }>
                {!isSmScale ? (
                  <ZInpageMainContent />
                ) : (
                  <ZCustomScrollable
                    className={classNames({
                      'flex flex-col w-full h-full px-3 pt-3': true,
                      'gap-10': isMdScale,
                      'gap-5': !isMdScale
                    })}
                    scrollY={true}>
                    <ZInpageMainContent />
                  </ZCustomScrollable>
                )}
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
      </ZIonPage>
    </>
  );
};

const ZInpageMainContent: React.FC = () => {
  // #region Custom hooks.
  const { isLgScale } = useZMediaQueryScale();
  // #endregion

  // #region checking the route.
  const isProfileSettingsPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings
  )?.isExact;

  const isAccountPlansSettingsPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.AccountPlansSettings
  )?.isExact;

  const isNotificationSettings = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings
  )?.isExact;

  const isWorkspacesNotificationPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.WSNotificationSettings
  )?.isExact;

  const isSingleWorkspaceNotificationPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.UserAccount.WorkspaceNotifications
  )?.isExact;
  // #endregion

  return (
    <div
      className={classNames({
        'flex flex-col ion-no-margin ion-no-padding': true,
        'gap-8': isLgScale,
        'gap-3': !isLgScale
      })}>
      <Suspense
        fallback={
          <ZIonCol className='w-full h-full'>
            <ZFallbackIonSpinner2 />
          </ZIonCol>
        }>
        {isProfileSettingsPage === true ? <ZProfileSettings /> : null}
        {isAccountPlansSettingsPage === true ? <ZAccountPlansSettings /> : null}
        {isNotificationSettings === true ? <ZPersonalSettings /> : null}
        {isWorkspacesNotificationPage === true ? <WorkspacesSettings /> : null}
        {isSingleWorkspaceNotificationPage === true ? (
          <ZSingleWSNotificationSettings />
        ) : null}
      </Suspense>
    </div>
  );
};

export default ZUserAccount;
