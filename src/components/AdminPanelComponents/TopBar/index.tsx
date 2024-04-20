/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { menu, notificationsOutline, refresh } from 'ionicons/icons';
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
import ZHelpButton from './HelpBtn';

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
  showMenuBtn?: boolean;
  menuOnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
  refreshBtnOnClick?: React.MouseEventHandler<HTMLIonButtonElement>;
}> = ({
  workspaceId,
  showRefreshBtn = false,
  refreshBtnOnClick,
  showWSSwitcherBtn = true,
  showInviteBtn = true,
  showMenuBtn = false,
  menuOnClickFn
}) => {
  const { isMdScale, isLgScale, isSmScale } = useZMediaQueryScale();

  // getting current share workspace id form params.
  const { wsShareId, shareWSMemberId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
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

  // Workspace list page
  const isWsListPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Workspaces.Main
  )?.isExact;

  // Workspace short links list page
  const isWsSlListPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Workspaces.Main
  )?.isExact;

  return (
    <ZIonRow
      className={classNames({
        'zaions__light_bg shadow-[0_3px_6px_#00000029] relative z-10 ion-align-items-center':
          true,
        'px-3 h-[4rem]': isMdScale,
        'px-2 py-2': !isMdScale
      })}>
      <ZADTopBarColOne
        workspaceId={workspaceId}
        shareWSMemberId={shareWSMemberId}
        wsShareId={wsShareId}
        showWSSwitcherBtn={showWSSwitcherBtn}
        showInviteBtn={showInviteBtn}
        menuOnClickFn={menuOnClickFn}
        showMenuBtn={showMenuBtn}
      />

      <ZIonCol
        sizeXl='6'
        sizeLg='6'
        sizeMd='6'
        sizeSm='8'
        sizeXs='9'
        className={classNames({
          'h-full ion-align-items-center gap-2': true,
          'ion-justify-content-end flex': true
        })}>
        {/* Refresh button */}
        {isSmScale && showRefreshBtn && (
          <ZIonButton
            fill='outline'
            color='primary'
            size='small'
            expand={!isMdScale ? 'block' : undefined}
            height={isLgScale ? '2.3rem' : '1.9rem'}
            className={classNames({
              'normal-case': true,
              'text-xs': !isLgScale,
              'w-full': false
            })}
            onClick={refreshBtnOnClick}
            testingselector={
              isWsListPage === true
                ? CONSTANTS.testingSelectors.workspace.listPage.refetchBtn
                : isWsSlListPage === true
                  ? CONSTANTS.testingSelectors.shortLink.listPage.refetchBtn
                  : ''
            }>
            <ZIonIcon
              slot={isLgScale ? 'start' : 'icon-only'}
              icon={refresh}
            />
            {isLgScale && <span>Refresh</span>}
          </ZIonButton>
        )}

        {/* Help button */}
        {CONSTANTS.showIncompleteFeaturesInMobileApp && <ZHelpButton />}

        {/* Notification button */}
        {isMdScale ? (
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
        ) : null}

        {/* Workspace switcher button */}
        {!isMdScale && showWSSwitcherBtn ? (
          <ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
            <ZWorkspaceSwitcher workspaceId={workspaceId} />
          </ZCan>
        ) : null}

        {/* User profile button */}
        <ZUserProfileButton
          width={!isLgScale ? '2.1875rem' : '2.75rem'}
          height={!isLgScale ? '2.1875rem' : '2.75rem'}
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
  showMenuBtn?: boolean;
  menuOnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}> = ({
  workspaceId,
  shareWSMemberId,
  wsShareId,
  showWSSwitcherBtn = true,
  showInviteBtn = true,
  showMenuBtn = false,
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
      sizeXs='3'
      className='flex h-full ion-align-items-center'>
      {!isLgScale && showMenuBtn && (
        <ZIonButton
          minHeight='2rem'
          color='tertiary'
          fill='clear'
          className='w-[2rem] rounded-full overflow-hidden ion-no-padding ion-no-margin'
          onClick={menuOnClickFn}
          testingselector={CONSTANTS.testingSelectors.topBar.openInpageMenuBtn}>
          <ZIonIcon
            icon={menu}
            className='w-6 h-6'
          />
        </ZIonButton>
      )}

      {isWorkspaceListPage === false || isWorkspaceListPage === undefined
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
          <ZCreateWorkspaceBtn height={isLgScale ? '2.3rem' : '1.9rem'} />
        </>
      )}

      {isWorkspaceListPage === false || isWorkspaceListPage === undefined ? (
        <>
          {isMdScale && showWSSwitcherBtn ? (
            <ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
              <ZWorkspaceSwitcher
                workspaceId={workspaceId}
                shareWSMemberId={shareWSMemberId}
                wsShareId={wsShareId}
              />
            </ZCan>
          ) : null}

          <ZCan
            shareWSId={wsShareId}
            havePermissions={
              (wsShareId?.trim()?.length ?? 0) > 0
                ? [shareWSPermissionEnum.create_sws_member]
                : [permissionsEnum.create_ws_member]
            }
            permissionType={
              (wsShareId?.trim()?.length ?? 0) > 0
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
      ) : null}
    </ZIonCol>
  );
};

export default ZAdminPanelTopBar;
