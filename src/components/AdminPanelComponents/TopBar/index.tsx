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
  helpCircleOutline,
  menu,
  notificationsOutline,
  refresh
} from 'ionicons/icons';
import classNames from 'classnames';
import { useParams, useRouteMatch } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZHelpCenterPopover from '@/components/InPageComponents/ZaionsPopovers/HelpCenterPopover';
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow
} from '@/components/ZIonComponents';
import ZUserProfileButton from '../UserProfileButton';
import ZNotificationPopover from '@/components/InPageComponents/ZaionsPopovers/NotificationPopover';
import ZWorkspaceSwitcher from '../Workspace/WorkspaceSwitcher';
import ZCan from '@/components/Can';
import ZCreateWorkspaceBtn from '../Workspace/ZCreateWorkspaceBtn';
import ZInviteButton from '../InviteButton';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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
const ZAdminPanelTopBar: React.FC<{
  workspaceId?: string;
  showRefreshBtn?: boolean;
  showWSSwitcherBtn?: boolean;
  showInviteBtn?: boolean;
  menuOnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
  refreshBtnOnClick?: React.MouseEventHandler<HTMLIonButtonElement>;
}> = ({
  workspaceId,
  showRefreshBtn = false,
  refreshBtnOnClick,
  showWSSwitcherBtn = true,
  showInviteBtn = true,
  menuOnClickFn
}) => {
  const { isMdScale, isLgScale } = useZMediaQueryScale();

  // getting current share workspace id form params.
  const { wsShareId, shareWSMemberId } = useParams<{
    workspaceId?: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region popovers.
  const { presentZIonPopover: presentZHelpCenterPopover } =
    useZIonPopover(ZHelpCenterPopover);
  const { presentZIonPopover: presentZNotificationPopover } = useZIonPopover(
    ZNotificationPopover,
    {
      workspaceId
    }
  );
  // #endregion

  return (
    <ZIonRow
      className={classNames({
        'zaions__light_bg shadow-[0_3px_6px_#00000029] relative z-10': true,
        'px-3 h-[4rem]': isMdScale,
        'px-2 py-2': !isMdScale
      })}>
      {/*  */}
      <ZADTopBarColOne
        workspaceId={workspaceId}
        shareWSMemberId={shareWSMemberId}
        wsShareId={wsShareId}
        showWSSwitcherBtn={showWSSwitcherBtn}
        showInviteBtn={showInviteBtn}
        menuOnClickFn={menuOnClickFn}
      />

      {/*  */}
      <ZIonCol
        sizeXl='6'
        sizeLg='6'
        sizeMd='6'
        sizeSm='8'
        sizeXs='7.5'
        className={classNames({
          'h-full gap-2 ion-align-items-center': true,
          'ion-justify-content-end flex': true
          // 'mt-1': !isMdScale
        })}>
        {showRefreshBtn && (
          <ZIonButton
            fill='outline'
            color='primary'
            // expand={!isSmScale ? 'block' : undefined}
            height={isLgScale ? '2.3rem' : '1.9rem'}
            className={classNames({
              'normal-case': true,
              'text-xs': !isLgScale,
              'w-full': false
            })}
            onClick={refreshBtnOnClick}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.refetchBtn
            }>
            <ZIonIcon
              slot='start'
              icon={refresh}
            />
            Refetch
          </ZIonButton>
        )}

        {/* Upgrade button */}
        {isMdScale && (
          <ZIonButton
            color='secondary'
            expand={!isMdScale ? 'block' : undefined}
            size={!isLgScale ? 'small' : undefined}
            height={isLgScale ? '2.3rem' : '1.9rem'}
            className={classNames({
              'text-xs': !isLgScale
              // 'ms-4': showRefreshBtn
            })}
            testingselector={CONSTANTS.testingSelectors.topBar.upgradeBtn}>
            Upgrade
          </ZIonButton>
        )}

        {/* Help button */}
        {isMdScale && (
          <ZIonButton
            color='tertiary'
            size='small'
            expand={!isMdScale ? 'block' : undefined}
            height={isLgScale ? '2.3rem' : '1.9rem'}
            className={classNames({
              'text-xs': !isLgScale
            })}
            testingselector={CONSTANTS.testingSelectors.topBar.helpBtn}
            onClick={(event: unknown) => {
              presentZHelpCenterPopover({
                _event: event as Event,
                _cssClass: 'z-help-center-popover-size',
                _dismissOnSelect: false
              });
            }}>
            <ZIonIcon
              icon={helpCircleOutline}
              className='w-7 h-7'
            />
            {/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
          </ZIonButton>
        )}

        {/* Notification button */}
        {isMdScale && (
          <ZIonButton
            color='tertiary'
            size='small'
            expand={!isMdScale ? 'block' : undefined}
            height={isLgScale ? '2.3rem' : '1.9rem'}
            testingselector={CONSTANTS.testingSelectors.topBar.notificationBtn}
            className={classNames({
              'me-3': isMdScale,
              'text-xs': !isLgScale
            })}
            onClick={(event: unknown) => {
              presentZNotificationPopover({
                _event: event as Event,
                _cssClass: 'z-notification-popover-size',
                _dismissOnSelect: false
              });
            }}>
            <ZIonIcon
              icon={notificationsOutline}
              className='w-6 h-6'
            />
            {/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
          </ZIonButton>
        )}

        {!isMdScale && showWSSwitcherBtn && (
          <ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
            <ZWorkspaceSwitcher workspaceId={workspaceId} />
          </ZCan>
        )}

        {/* User profile button */}
        <ZUserProfileButton
          width={!isLgScale ? '35px' : '44pxs'}
          height={!isLgScale ? '35px' : '44pxs'}
        />
      </ZIonCol>
    </ZIonRow>
  );
};

const ZADTopBarColOne: React.FC<{
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  showWSSwitcherBtn?: boolean;
  showInviteBtn?: boolean;
  menuOnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}> = ({
  workspaceId,
  shareWSMemberId,
  wsShareId,
  showWSSwitcherBtn = true,
  showInviteBtn = true,
  menuOnClickFn
}) => {
  const isWorkspaceListPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Workspaces.Main
  )?.isExact;

  const { isLgScale, isMdScale } = useZMediaQueryScale();

  return (
    <ZIonCol
      sizeXl='6'
      sizeLg='6'
      sizeMd='6'
      sizeSm='4'
      sizeXs='4.5'
      className='flex h-full ion-align-items-center'>
      {isWorkspaceListPage === false
        ? isMdScale && (
            <ZIonButton
              color='secondary'
              size={!isLgScale ? 'small' : undefined}
              height={isLgScale ? '2.3rem' : '1.9rem'}
              className='normal-case ion-no-margin me-2'
              testingselector={
                CONSTANTS.testingSelectors.topBar.goToWorkspacesBtn
              }
              routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}>
              Go to workspaces
            </ZIonButton>
          )
        : null}
      {isWorkspaceListPage === true && (
        <>
          <ZCreateWorkspaceBtn />
        </>
      )}

      {isWorkspaceListPage === false && (
        <>
          {isMdScale && showWSSwitcherBtn && (
            <ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
              <ZWorkspaceSwitcher
                workspaceId={workspaceId}
                shareWSMemberId={shareWSMemberId}
                wsShareId={wsShareId}
              />
            </ZCan>
          )}

          {!isMdScale && (
            <ZIonButton
              minHeight='2rem'
              color='tertiary'
              fill='clear'
              className='w-[2rem] rounded-full overflow-hidden ion-no-padding ion-no-margin'
              onClick={menuOnClickFn}
              testingselector={
                CONSTANTS.testingSelectors.topBar.openInpageMenuBtn
              }>
              <ZIonIcon
                icon={menu}
                className='w-6 h-6'
              />
            </ZIonButton>
          )}

          <ZCan
            shareWSId={wsShareId}
            havePermissions={
              wsShareId !== null
                ? [shareWSPermissionEnum.create_sws_member]
                : [permissionsEnum.create_ws_member]
            }
            permissionType={
              wsShareId !== null
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }>
            {isMdScale && showInviteBtn && (
              <ZInviteButton
                className='ms-2'
                workspaceId={workspaceId}
                wsShareId={wsShareId}
                shareWSMemberId={shareWSMemberId}
              />
            )}
          </ZCan>
        </>
      )}
    </ZIonCol>
  );
};

export default ZAdminPanelTopBar;
