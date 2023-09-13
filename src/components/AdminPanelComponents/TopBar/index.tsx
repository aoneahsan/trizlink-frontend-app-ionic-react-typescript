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
  notificationsOutline,
  refresh
} from 'ionicons/icons';
import classNames from 'classnames';
import { useRouteMatch } from 'react-router';

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

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZInviteButton from '../InviteButton';

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
  refreshBtnOnClick?: React.MouseEventHandler<HTMLIonButtonElement>;
}> = ({ workspaceId, showRefreshBtn = false, refreshBtnOnClick }) => {
  const { isMdScale, isLgScale } = useZMediaQueryScale();

  // #region popovers.
  const { presentZIonPopover: presentZHelpCenterPopover } =
    useZIonPopover(ZHelpCenterPopover);
  const { presentZIonPopover: presentZNotificationPopover } = useZIonPopover(
    ZNotificationPopover,
    {
      workspaceId: workspaceId
    }
  );
  // #endregion

  // #region APIs.
  // get workspace data api.
  const { data: currentWorkspaceData, isFetching: isCurrentWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId || ''
      ],
      _authenticated: true,
      _itemsIds: [workspaceId || ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !workspaceId ? true : false,
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // #endregion

  const isZFetching = isCurrentWorkspaceFetching;

  return (
    <ZIonRow
      className={classNames({
        'zaions__light_bg shadow-[0_3px_6px_#00000029] relative z-10': true,
        'px-3 h-[4rem]': isMdScale,
        'pe-2 py-2': !isMdScale
      })}>
      {/*  */}
      <ZADTopBarColOne workspaceId={workspaceId} />

      {/*  */}
      {/* <ZIonCol
				sizeXl='4'
				sizeLg='3'
				sizeMd='3'
				sizeSm='3'
				sizeXs='3'
				className='h-full'
			></ZIonCol> */}

      {/*  */}
      <ZIonCol
        sizeXl='6'
        sizeLg='6'
        sizeMd='6'
        sizeSm='12'
        sizeXs='12'
        className={classNames({
          'flex h-full gap-2 ion-align-items-center': true,
          'ion-justify-content-end': isMdScale
        })}>
        {showRefreshBtn ? (
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
        ) : null}

        {/* Upgrade button */}
        <ZIonButton
          color='secondary'
          size={!isLgScale ? 'small' : undefined}
          height={isLgScale ? '2.3rem' : '1.9rem'}
          className={classNames({
            'text-xs ms-4': !isLgScale
          })}
          testingselector={CONSTANTS.testingSelectors.topBar.upgradeBtn}>
          Upgrade
        </ZIonButton>

        {/* Help button */}
        <ZIonButton
          color='tertiary'
          size='small'
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

        {/* Notification button */}
        <ZIonButton
          color='tertiary'
          size='small'
          height={isLgScale ? '2.3rem' : '1.9rem'}
          testingselector={CONSTANTS.testingSelectors.topBar.notificationBtn}
          className={classNames({
            'me-3': true,
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

        {/* User profile button */}
        <ZUserProfileButton
          width={!isLgScale ? '35px' : '44pxs'}
          height={!isLgScale ? '35px' : '44pxs'}
        />
      </ZIonCol>
    </ZIonRow>
  );
};

const ZADTopBarColOne: React.FC<{ workspaceId?: string }> = ({
  workspaceId
}) => {
  const isWorkspaceListPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Workspaces.Main
  )?.isExact;

  return (
    <ZIonCol
      sizeXl='6'
      sizeLg='6'
      sizeMd='6'
      sizeSm='12'
      sizeXs='12'
      className='flex h-full ion-align-items-center'>
      {!isWorkspaceListPage ? (
        <ZIonButton
          color='secondary'
          // height='2.3rem'
          className='normal-case ion-no-margin me-2'
          testingselector={CONSTANTS.testingSelectors.topBar.goToWorkspacesBtn}
          routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}>
          Go to workspaces
        </ZIonButton>
      ) : null}
      {isWorkspaceListPage ? (
        <ZCreateWorkspaceBtn />
      ) : (
        <>
          <ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
            <ZWorkspaceSwitcher workspaceId={workspaceId} />
          </ZCan>

          <ZInviteButton
            className='ms-2'
            workspaceId={workspaceId}
          />
        </>
      )}
      {/* {!isWorkspaceListPage ? (
				<ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
					<ZWorkspaceSwitcher workspaceId={workspaceId} />
				</ZCan>
			) : null} */}
    </ZIonCol>
  );
};

export default ZAdminPanelTopBar;
