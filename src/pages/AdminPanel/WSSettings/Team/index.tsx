/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import { filterOutline, refresh } from 'ionicons/icons';
import { menuController } from '@ionic/core/components';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  WorkspaceSharingTabEnum,
  type WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

const ZMembersListTable = lazy(
  () =>
    import(
      '@/components/InPageComponents/ZaionsTable/Workspace/Team/MembersListTable'
    )
);

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
 * About: (Workspace team list page)
 * @type {*}
 * */

const ZWSSettingTeamsListPage: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Popovers & Modals.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite,
      workspaceId, // if owned workspace then workspaceId will be passed.
      shareWSMemberId, // if share workspace then shareWSMemberId will be passed.
      wsShareId // if share workspace then wsShareId will be passed.
    }
  );
  // #endregion

  // #region APIS
  // If owned workspace then this api is used to fetch workspace members.
  const { data: wsTeamMembersData } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined && (workspaceId?.trim()?.length ?? '') > 0
    )
  });

  // If share workspace then this api is used to fetch share workspace members.
  const { data: swsWSTeamMembersData } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.sws_member_getAllInvite_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
      wsShareId ?? ''
    ],
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    )
  });

  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
  const { data: getMemberRolePermissions } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      wsShareId?.trim()?.length > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId?.trim()?.length > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      if (workspaceId !== undefined) {
        // Invalidating RQ members cache.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
          workspaceId
        ]);
      } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
          wsShareId
        ]);

        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS
            .MEMBER_ROLE_AND_PERMISSIONS,
          wsShareId
        ]);
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZCan
      shareWSId={wsShareId}
      havePermissions={
        workspaceId !== undefined
          ? [permissionsEnum.viewAny_ws_member]
          : wsShareId !== undefined && shareWSMemberId !== undefined
          ? [shareWSPermissionEnum.viewAny_sws_member]
          : []
      }
      permissionType={
        wsShareId !== undefined && shareWSMemberId !== undefined
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }>
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='5'
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
              'ion-text-center': !isSmScale
            })}>
            Members
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isSmScale
            })}>
            {[
              shareWSPermissionEnum.send_invitation_sws_member,
              shareWSPermissionEnum.create_sws_member,
              shareWSPermissionEnum.update_sws_member
            ].some(el =>
              getMemberRolePermissions?.memberPermissions?.includes(el)
            ) ?? workspaceId !== undefined
              ? 'Team Building Zone: Add, Organize, and Manage Your Members'
              : 'Your Member Dashboard: Stay Connected with Your Teammates'}
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='7'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': true,
            'ion-justify-content-between flex gap-1': !isLgScale && isSmScale,
            'w-full': !isSmScale
          })}>
          {((workspaceId !== undefined &&
            wsTeamMembersData !== undefined &&
            (wsTeamMembersData?.length ?? 0) > 0) ||
            (wsShareId !== undefined &&
              swsWSTeamMembersData !== undefined &&
              (swsWSTeamMembersData?.length ?? 0) > 0)) && (
            <ZIonButton
              fill='outline'
              color='primary'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.timeFilterBtn
              }
              className={classNames({
                'my-2': true,
                'me-2': isLgScale,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale,
                'ion-no-margin': !isSmScale
              })}
              onClick={() => {
                void (async () => {
                  // Open the menu by menu-id
                  await menuController.enable(
                    true,
                    CONSTANTS.MENU_IDS.MEMBER_FILTERS_MENU_ID
                  );
                  await menuController.open(
                    CONSTANTS.MENU_IDS.MEMBER_FILTERS_MENU_ID
                  );
                })();
              }}>
              <ZIonIcon
                slot='start'
                icon={filterOutline}
                className={classNames({
                  'me-1': true,
                  'w-4 h-4': !isLgScale
                })}
              />
              Filters
            </ZIonButton>
          )}

          {/* Refetch data button */}
          <ZIonButton
            fill='outline'
            color='primary'
            minHeight={isLgScale ? '39px' : '2rem'}
            expand={!isLgScale ? 'block' : undefined}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.refetchBtn
            }
            className={classNames({
              'my-2': true,
              'me-2': isLgScale,
              'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                !isLgScale && isSmScale,
              'w-full': !isSmScale,
              'ion-no-margin': !isSmScale
            })}
            onClick={() => {
              void invalidedQueries();
            }}>
            <ZIonIcon
              slot='start'
              icon={refresh}
              className={classNames({
                'me-1': true,
                'w-4 h-4': !isLgScale
              })}
            />
            Refetch
          </ZIonButton>

          <ZCan
            shareWSId={wsShareId}
            havePermissions={
              workspaceId !== undefined
                ? [permissionsEnum.send_invitation_ws_member]
                : wsShareId !== undefined && shareWSMemberId !== undefined
                ? [shareWSPermissionEnum.send_invitation_sws_member]
                : []
            }
            permissionType={
              wsShareId !== undefined && shareWSMemberId !== undefined
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }>
            <ZIonButton
              color='primary'
              fill='solid'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.createTeamBtn
              }
              className={classNames({
                'my-2': true,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale
              })}
              onClick={() => {
                // if (!isWorkspacesDataFetching)
                presentWorkspaceSharingModal({
                  _cssClass: 'workspace-sharing-modal-size'
                });
              }}>
              Invite member
            </ZIonButton>
          </ZCan>

          {/* {!isMdScale ? (
            <ZIonButton
              expand={!isSmScale ? 'block' : undefined}
              height={isLgScale ? '39px' : '20px'}
              className={classNames({
                'my-2': true,
                'text-xs': !isLgScale,
                'ion-no-margin': !isSmScale
              })}
              onClick={async () => {
                // Open the menu by menu-id
                await menuController.enable(
                  true,
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
                await menuController.open(
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
              }}>
              Open menu
            </ZIonButton>
          ) : null} */}
        </ZIonCol>
      </ZIonRow>

      {/* Teams Table */}
      <ZCan
        shareWSId={wsShareId}
        havePermissions={
          workspaceId !== undefined
            ? [permissionsEnum.viewAny_ws_member]
            : wsShareId !== undefined && shareWSMemberId !== undefined
            ? [shareWSPermissionEnum.viewAny_sws_member]
            : []
        }
        permissionType={
          wsShareId !== undefined && shareWSMemberId !== undefined
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }>
        <Suspense
          fallback={
            <ZIonRow className='h-full'>
              <ZFallbackIonSpinner2 />
            </ZIonRow>
          }>
          <ZMembersListTable />
        </Suspense>
      </ZCan>
    </ZCan>
  );
};

export default ZWSSettingTeamsListPage;
