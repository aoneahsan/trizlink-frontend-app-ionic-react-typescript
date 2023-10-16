/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { RefresherEventDetail } from '@ionic/react';
import { useParams, useRouteMatch } from 'react-router';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { menuController } from '@ionic/core/components';
import { closeOutline } from 'ionicons/icons';

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
  ZIonList,
  ZIonMenu,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZWSTeamCreateModal from '@/components/InPageComponents/ZaionsModals/Workspace/Team/CreateModal';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);
const ZWSSettingsMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/WSSettingsMenu')
);
const ZWSSettingTeamsListPage = lazy(() => import('./Team'));
const ZWSSettingPixelListPage = lazy(() => import('./Pixel'));
const ZWSSettingUtmTagListPage = lazy(() => import('./UTMTag'));
const ZWSSettingEmbedWidgetListPage = lazy(() => import('./EmbedWidget'));
import ZPixelsFilterMenu from '@/navigation/AdminPanel/Pixels/FilterMenu';
import ZUtilityButtonGroup from '@/components/AdminPanelComponents/UtilityButtonGroup';
import ZUTMTagsFilterMenu from '@/navigation/AdminPanel/UTMTags/FilterMenu';
import ZMembersFilterMenu from '@/navigation/AdminPanel/Members/FilterMenu';

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
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceRouteParams } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';
import {
  workspaceTeamInterface,
  WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import {
  PixelAccountType,
  UTMTagTemplateType
} from '@/types/AdminPanel/linksType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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
 * About: (User settings page)
 * @type {*}
 * */
const ZWorkspaceSettings: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();
  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Recoils.
  // Recoil state that control the dashboard.
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  // #endregion

  // #region APIS
  // If owned workspace then this api is used to fetch workspace member.
  const { data: wsTeamMembersData } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS, workspaceId],
    _itemsIds: [workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If owned workspace then this api is used to fetch workspace member.
  const { data: swsTeamMembersData } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS, workspaceId],
    _itemsIds: [workspaceId],
    _shouldFetchWhenIdPassed: wsShareId || shareWSMemberId ? false : true,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If owned workspace then this api is used to fetch workspace utm tags.
  const { data: UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If share workspace then this api is used to fetch share workspace utm tags.
  const { data: swsUTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
      shareWSMemberId
    ],
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If owned workspace then this api is used to fetch workspace pixels.
  const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN, workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId]
  });

  // If share workspace then this api is used to fetch share workspace pixels.
  const { data: swsPixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
      wsShareId
    ],
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId]
  });

  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
  const {
    data: getMemberRolePermissions,
    isFetching: isGetMemberRolePermissionsFetching,
    isError: isGetMemberRolePermissionsError
  } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Popovers & Modals.
  const { presentZIonModal: presentZWSTeamCreateModal } = useZIonModal(
    ZWSTeamCreateModal,
    {
      workspaceId: workspaceId
    }
  );
  // #endregion

  // #region checking the route.
  let isMembersPage: boolean | undefined;
  if (workspaceId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Members
    )?.isExact;
  }

  const isReferralProgramPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
  )?.isExact;

  const isBillingPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
  )?.isExact;

  const isUserPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
  )?.isExact;

  let isPixelPage: boolean | undefined;
  if (workspaceId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Pixel
    )?.isExact;
  }

  let isUTMTagPage: boolean | undefined;
  if (workspaceId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.UTMTag
    )?.isExact;
  }
  let isEmbedWidgetPage: boolean | undefined;
  if (workspaceId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.EmbedWidget
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.EmbedWidget
    )?.isExact;
  }
  // #endregion

  // #region Functions.
  const invalidedQueries = async () => {
    try {
      if (isMembersPage) {
        // Invalidating RQ members cache.
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
          workspaceId
        ]);
      }
      if (isPixelPage) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
          workspaceId
        ]);
      }

      if (isUTMTagPage) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN
        ]);
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };

  // #endregion

  return (
    <ZCan
      shareWSId={wsShareId}
      checkMode={permissionCheckModeEnum.any}
      permissionType={
        wsShareId && shareWSMemberId
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        workspaceId
          ? [
              permissionsEnum.viewAny_WSTeamMember,
              permissionsEnum.viewAny_utmTag,
              permissionsEnum.viewAny_pixel,
              permissionsEnum.viewAny_embededWidget
            ]
          : wsShareId && shareWSMemberId
          ? [
              shareWSPermissionEnum.viewAny_sws_member,
              shareWSPermissionEnum.viewAny_sws_utmTag,
              shareWSPermissionEnum.viewAny_sws_pixel,
              shareWSPermissionEnum.viewAny_sws_embededWidget
            ]
          : []
      }
      returnPermissionDeniedView={true}>
      {/* Menu to show in small screen. */}
      {!isMdScale && (
        <ZIonMenu
          side='start'
          menuId={CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID}
          contentId={CONSTANTS.MENU_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID}>
          {/* Header */}
          <ZIonHeader className='flex px-3 py-2 border-b shadow-none ion-align-items-center ion-no-padding ion-justify-content-between'>
            <ZIonTitle
              className={classNames({
                'block font-semibold ion-no-padding': true,
                'text-xl': isLgScale,
                'text-lg': !isLgScale
              })}>
              Settings
            </ZIonTitle>

            <ZIonIcon
              icon={closeOutline}
              className='w-6 h-6 pt-[1px] cursor-pointer'
              onClick={async () => {
                await menuController.close(
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
              }}
            />
          </ZIonHeader>

          <ZIonContent
            style={{
              '--padding-start': '.6rem',
              '--padding-end': '.6rem'
            }}>
            {/* Account Settings */}
            <ZIonText className='block mt-2 font-semibold text-md ion-no-padding'>
              Account settings
            </ZIonText>
            <ZIonList lines='none'>
              {/* Members */}
              <ZCan
                shareWSId={wsShareId}
                permissionType={
                  wsShareId && shareWSMemberId
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }
                havePermissions={
                  workspaceId
                    ? [permissionsEnum.viewAny_WSTeamMember]
                    : wsShareId && shareWSMemberId
                    ? [shareWSPermissionEnum.viewAny_sws_member]
                    : []
                }>
                <ZIonItem
                  minHeight='2rem'
                  className={classNames({
                    'mt-1 cursor-pointer': true,
                    'zaions__light_bg font-normal': isMembersPage
                  })}
                  routerLink={
                    workspaceId
                      ? replaceRouteParams(
                          ZaionsRoutes.AdminPanel.Setting.AccountSettings
                            .Members,
                          [CONSTANTS.RouteParams.workspace.workspaceId],
                          [workspaceId]
                        )
                      : wsShareId && shareWSMemberId
                      ? replaceRouteParams(
                          ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          [wsShareId, shareWSMemberId]
                        )
                      : ''
                  }>
                  Members
                </ZIonItem>
              </ZCan>

              {/* Referral program */}
              <ZIonItem
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  'zaions__light_bg font-normal': isReferralProgramPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.referralBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .ReferralProgram,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .ReferralProgram,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                Referral program
              </ZIonItem>

              {/* Billing */}
              <ZIonItem
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  'zaions__light_bg font-normal': isBillingPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.billingBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Billing,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                Billing
              </ZIonItem>

              {/* User */}
              <ZIonItem
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  'zaions__light_bg font-normal': isUserPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.userBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings.User,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.User,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                User
              </ZIonItem>
            </ZIonList>

            {/* Workspace settings */}
            <ZCan
              shareWSId={wsShareId}
              checkMode={permissionCheckModeEnum.any}
              permissionType={
                wsShareId && shareWSMemberId
                  ? permissionsTypeEnum.shareWSMemberPermissions
                  : permissionsTypeEnum.loggedInUserPermissions
              }
              havePermissions={
                workspaceId
                  ? [
                      permissionsEnum.viewAny_pixel,
                      permissionsEnum.viewAny_utmTag,
                      permissionsEnum.viewAny_embededWidget
                    ]
                  : wsShareId && shareWSMemberId
                  ? [
                      shareWSPermissionEnum.viewAny_sws_pixel,
                      shareWSPermissionEnum.viewAny_sws_utmTag,
                      shareWSPermissionEnum.viewAny_sws_embededWidget
                    ]
                  : []
              }>
              <ZIonText className='block mt-1 font-semibold text-md ion-no-padding'>
                Workspace settings
              </ZIonText>
              <ZIonList lines='none'>
                {/* Pixels */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_pixel]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_pixel]
                      : []
                  }>
                  <ZIonItem
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      'zaions__light_bg font-normal': false
                    })}
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .Pixel,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .Pixel,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    Pixels
                  </ZIonItem>
                </ZCan>

                {/* Utm tags */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_utmTag]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_utmTag]
                      : []
                  }>
                  <ZIonItem
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      'zaions__light_bg font-normal': false
                    })}
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .UTMTag,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .UTMTag,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    Utm tags
                  </ZIonItem>
                </ZCan>

                {/* Embed widgets */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_embededWidget]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_embededWidget]
                      : []
                  }>
                  <ZIonItem
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      'zaions__light_bg font-normal': false
                    })}
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .EmbedWidget,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .EmbedWidget,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    Embed widgets
                  </ZIonItem>
                </ZCan>
              </ZIonList>
            </ZCan>

            {!isMdScale ? <ZUtilityButtonGroup /> : null}
          </ZIonContent>
        </ZIonMenu>
      )}

      {isPixelPage &&
        ((pixelAccountsData && pixelAccountsData?.length > 0) ||
          (swsPixelAccountsData && swsPixelAccountsData?.length > 0)) && (
          <ZPixelsFilterMenu />
        )}

      {isUTMTagPage &&
        ((UTMTagsData && UTMTagsData?.length > 0) ||
          (swsUTMTagsData && swsUTMTagsData?.length > 0)) && (
          <ZUTMTagsFilterMenu />
        )}

      {isMembersPage &&
        ((wsTeamMembersData && wsTeamMembersData?.length > 0) ||
          (swsTeamMembersData && swsTeamMembersData?.length > 0)) && (
          <ZMembersFilterMenu />
        )}

      {/*  */}
      <ZIonPage
        pageTitle='Workspace settings page'
        id={CONSTANTS.MENU_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID}>
        {/* Content */}
        <ZIonContent>
          {/* IonRefresher */}
          <ZIonRefresher onIonRefresh={event => void handleRefresh(event)}>
            <ZIonRefresherContent />
          </ZIonRefresher>

          {/* Grid-1 */}
          <ZIonGrid
            className={classNames({
              'h-screen ion-no-padding': true,
              'max-w-[200rem] mx-auto': false
            })}>
            {/* Row-1 */}
            <ZIonRow className='h-full'>
              {/* Col-1 Side bar */}
              <Suspense
                fallback={
                  <ZIonCol
                    size='.8'
                    className='h-full zaions__medium_bg zaions-transition'>
                    <ZFallbackIonSpinner2 />
                  </ZIonCol>
                }>
                <AdminPanelSidebarMenu
                  activePage={AdminPanelSidebarMenuPageEnum.settings}
                />
              </Suspense>

              {/* Col-2 Right-side Main Container */}
              <ZIonCol
                sizeXl={
                  ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                    ? '10'
                    : '11.2'
                }
                sizeLg={
                  ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                    ? '10'
                    : '11.2'
                }
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='h-screen zaions-transition'>
                <ZIonGrid
                  className={classNames({
                    'h-full ion-no-padding': true,
                    'mt-2': !isLgScale
                  })}>
                  {/* Col-2 Row-1 Top bar. */}
                  <Suspense
                    fallback={
                      <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                        <ZFallbackIonSpinner2 />
                      </ZIonRow>
                    }>
                    <ZAdminPanelTopBar
                      workspaceId={workspaceId}
                      menuOnClickFn={async () => {
                        // Open the menu by menu-id
                        await menuController.enable(
                          true,
                          CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                        );
                        await menuController.open(
                          CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                        );
                      }}
                    />
                  </Suspense>

                  {/* Col-2 Row-2 */}
                  <ZIonRow style={{ height: 'calc(100% - 4rem)' }}>
                    {/* Col-2 Row-2 col-1 Folder menu */}
                    {isMdScale ? (
                      <Suspense
                        fallback={
                          <ZIonCol className='h-full border-e-[1px] zaions-transition'>
                            <ZFallbackIonSpinner2 />
                          </ZIonCol>
                        }>
                        <ZWSSettingsMenu />
                      </Suspense>
                    ) : null}

                    {/* Col-2 Row-2 col-2 Table & filters etc. */}
                    <ZIonCol
                      className='h-full zaions-transition'
                      sizeXl='9.2'
                      sizeLg='9'
                      sizeMd='9'
                      sizeSm='12'
                      sizeXs='12'>
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
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
      </ZIonPage>
    </ZCan>
  );
};

const ZInpageMainContent: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Custom hooks.
  const { isMdScale } = useZMediaQueryScale();
  // #endregion

  // #region checking the route.
  let isMembersPage: boolean | undefined;
  if (workspaceId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Members
    )?.isExact;
  }

  const isReferralProgramPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
  )?.isExact;

  const isBillingPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
  )?.isExact;

  const isUserPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
  )?.isExact;

  let isPixelPage: boolean | undefined;
  if (workspaceId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Pixel
    )?.isExact;
  }

  let isUTMTagPage: boolean | undefined;
  if (workspaceId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.UTMTag
    )?.isExact;
  }
  let isEmbedWidgetPage: boolean | undefined;
  if (workspaceId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.EmbedWidget
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.EmbedWidget
    )?.isExact;
  }
  // #endregion

  return (
    <div
      className={classNames({
        'flex flex-col ion-no-margin ion-no-padding': true,
        'gap-8': isMdScale,
        'gap-3 py-3 px-2': !isMdScale
      })}>
      <Suspense
        fallback={
          <ZIonCol className='w-full h-full'>
            <ZFallbackIonSpinner2 />
          </ZIonCol>
        }>
        {isMembersPage ? <ZWSSettingTeamsListPage /> : null}
        {isPixelPage ? <ZWSSettingPixelListPage /> : null}
        {isUTMTagPage ? <ZWSSettingUtmTagListPage /> : null}
        {isEmbedWidgetPage ? <ZWSSettingEmbedWidgetListPage /> : null}
      </Suspense>
    </div>
  );
};

export default ZWorkspaceSettings;
