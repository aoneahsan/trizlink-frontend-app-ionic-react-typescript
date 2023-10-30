/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  albumsOutline,
  chevronBackOutline,
  chevronForwardOutline,
  idCardOutline,
  linkOutline,
  settingsOutline
} from 'ionicons/icons';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonRouterLink,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonSegment,
  ZIonSegmentButton
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceParams, replaceRouteParams } from '@/utils/helpers';
import { API_URL_ENUM } from '@/utils/enums';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

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

const AdminPanelSidebarMenu: React.FC<{
  activePage: AdminPanelSidebarMenuPageEnum;
}> = ({ activePage }) => {
  const { isLgScale } = useZMediaQueryScale();
  const [ZDashboardState, setZDashboardState] =
    useRecoilState(ZDashboardRState);

  // getting workspace ids from url with the help of useParams.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // get workspace data api.
  const { data: selectedWorkspace, isFetching: isSelectedWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET, workspaceId],
      _authenticated: true,
      _itemsIds: [workspaceId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !(workspaceId?.length > 0),
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  const {
    data: selectedShareWorkspace,
    isFetching: isSelectedShareWorkspaceFetching
  } = useZRQGetRequest<workspaceInterface>({
    _url: API_URL_ENUM.ws_share_info_data,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
      wsShareId
    ],
    _authenticated: true,
    _itemsIds: [shareWSMemberId],
    _shouldFetchWhenIdPassed: !(shareWSMemberId?.length > 0),
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // Made this constant for readability.
  const isExpand = ZDashboardState.dashboardMainSidebarIsCollabes.isExpand;

  const { zNavigatePushRoute } = useZNavigate();

  // is fetching.
  let isZFetching = isSelectedWorkspaceFetching;

  if (wsShareId?.length > 0) {
    isZFetching = isSelectedShareWorkspaceFetching;
  }

  let _content = <></>;

  if (isLgScale) {
    _content = (
      <ZIonCol
        size={isExpand ? '2' : '.8'}
        className='h-full zaions__medium_bg zaions-transition'>
        <ZIonContent color='dark'>
          {/* Toggler menu button */}
          <ZIonButton
            slot='fixed'
            className={classNames(classes['zaions-ap-msm-toggle-button'], {
              'zaions-transition z-20 w-11 h-11 ion-no-padding ion-no-margin':
                true
            })}
            shape='round'
            onClick={() => {
              setZDashboardState(oldValues => ({
                ...oldValues,
                dashboardMainSidebarIsCollabes: {
                  ...oldValues.dashboardMainSidebarIsCollabes,
                  isExpand: !isExpand
                }
              }));
            }}
            style={{ right: isExpand ? '-9%' : '-25%', top: '7%' }}>
            <ZIonIcon
              icon={isExpand ? chevronBackOutline : chevronForwardOutline}
            />
          </ZIonButton>

          <ZIonGrid className='h-full'>
            <ZIonRow className='h-full ion-align-items-start'>
              <ZIonCol
                size='12'
                className='flex py-4 ion-justify-content-center'>
                {!isZFetching && (
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}>
                    <ZIonImg
                      src={
                        wsShareId != null
                          ? selectedShareWorkspace?.workspaceImage != null
                            ? selectedShareWorkspace?.workspaceImage
                            : getUiAvatarApiUrl({
                                name: selectedShareWorkspace?.workspaceName
                              })
                          : selectedWorkspace?.workspaceImage != null
                          ? selectedWorkspace?.workspaceImage
                          : getUiAvatarApiUrl({
                              name: selectedWorkspace?.workspaceName
                            })
                      }
                      alt={`${PRODUCT_NAME} logo`}
                      className={classNames(classes['zaions-ap-msm-logo'], {
                        'rounded-full zaions-transition': true
                      })}
                      style={{
                        width: isExpand ? '80px' : '42px',
                        height: isExpand ? '80px' : '42px'
                      }}
                    />
                  </ZIonRouterLink>
                )}

                {isZFetching && (
                  <div
                    className='rounded-full zaions-transition'
                    style={{
                      width: isExpand ? '80px' : '42px',
                      height: isExpand ? '80px' : '42px'
                    }}>
                    <ZIonSkeletonText
                      width='100%'
                      height='100%'
                      animated={true}
                    />
                  </div>
                )}
              </ZIonCol>

              {/* Short Links */}
              <ZCan
                shareWSId={wsShareId}
                permissionType={
                  wsShareId != null
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }
                havePermissions={
                  wsShareId != null
                    ? [shareWSPermissionEnum.viewAny_sws_shortLink]
                    : [permissionsEnum.viewAny_shortLink]
                }>
                <ZIonCol
                  size='12'
                  className='my-3'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className={classNames({
                      'ion-no-padding ion-no-margin normal-case': true,
                      zaions__primary_set:
                        activePage === AdminPanelSidebarMenuPageEnum.shortLink
                    })}
                    routerLink={
                      workspaceId != null
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShortLinks.Main,
                            [
                              CONSTANTS.RouteParams.workspace.workspaceId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                          )
                        : wsShareId != null && shareWSMemberId != null
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            [
                              wsShareId,
                              shareWSMemberId,
                              CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                            ]
                          )
                        : ''
                    }>
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand
                      })}>
                      <ZIonIcon
                        icon={linkOutline}
                        size='large'
                      />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          hidden: !isExpand
                        })}>
                        Short Links
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol>
              </ZCan>

              {/* Link-in-bio */}
              <ZCan
                shareWSId={wsShareId}
                permissionType={
                  wsShareId != null
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }
                havePermissions={
                  wsShareId != null
                    ? [shareWSPermissionEnum.viewAny_sws_linkInBio]
                    : [permissionsEnum.viewAny_linkInBio]
                }>
                <ZIonCol
                  size='12'
                  className='my-3'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className={classNames({
                      'ion-no-padding ion-no-margin normal-case': true,
                      zaions__primary_set:
                        activePage === AdminPanelSidebarMenuPageEnum.linkInBio
                    })}
                    routerLink={
                      workspaceId != null
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.LinkInBio.Main,
                            [
                              CONSTANTS.RouteParams.workspace.workspaceId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                          )
                        : wsShareId != null
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            [
                              wsShareId,
                              shareWSMemberId,
                              CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                            ]
                          )
                        : ''
                    }>
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand
                      })}>
                      <ZIonIcon
                        icon={idCardOutline}
                        size='large'
                      />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          hidden: !isExpand
                        })}>
                        Links-in-bio
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol>
              </ZCan>

              {/* Chrome extension */}
              {/* <ZIonCol size='12' title='Extension'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className='normal-case ion-no-padding ion-no-margin'
                  >
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand,
                      })}
                    >
                      <ZIonIcon icon={logoChrome} size='large' />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          'hidden': !isExpand,
                        })}
                      >
                        Extension
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol> */}

              {/* Integrations */}
              {/* <ZIonCol size='12'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className='normal-case ion-no-padding ion-no-margin'
                  >
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand,
                      })}
                    >
                      <ZIonIcon icon={fileTrayStackedOutline} size='large' />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          'hidden': !isExpand,
                        })}
                      >
                        Integrations
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol> */}

              {/* Workspaces */}
              <ZIonCol
                size='12'
                className='my-3'>
                <ZIonButton
                  fill='clear'
                  color='light'
                  expand='block'
                  className={classNames({
                    'ion-no-padding ion-no-margin normal-case': true,
                    zaions__primary_set:
                      activePage === AdminPanelSidebarMenuPageEnum.workspaces
                  })}
                  routerLink={replaceRouteParams(
                    ZaionsRoutes.AdminPanel.Workspaces.View,
                    [CONSTANTS.RouteParams.workspace.workspaceId],
                    [workspaceId]
                  )}>
                  <ZIonText
                    className={classNames({
                      'flex ion-align-items-center': true,
                      'ps-3 me-auto': isExpand
                    })}>
                    <ZIonIcon
                      icon={albumsOutline}
                      size='large'
                    />

                    <ZIonText
                      className={classNames({
                        'ps-2 zaions-transition': true,
                        'inline-block': isExpand,
                        hidden: !isExpand
                      })}>
                      Workspace detail
                    </ZIonText>
                  </ZIonText>
                </ZIonButton>
              </ZIonCol>

              {/* Help center */}
              {/* <ZIonCol size='12' className='my-3'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className='normal-case ion-no-padding ion-no-margin'
                  >
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand,
                      })}
                    >
                      <ZIonIcon icon={helpCircleOutline} size='large' />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          'hidden': !isExpand,
                        })}
                      >
                        Help center
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol> */}

              {/* Account */}
              {/* <ZIonCol size='12' className='my-3'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className='normal-case ion-no-padding ion-no-margin'
                  >
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand,
                      })}
                    >
                      <ZIonIcon icon={personOutline} size='large' />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          hidden: !isExpand,
                        })}
                      >
                        Account
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol> */}

              {/* Settings */}
              <ZCan
                shareWSId={wsShareId}
                checkMode={permissionCheckModeEnum.any}
                permissionType={
                  wsShareId != null
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }
                havePermissions={
                  wsShareId != null
                    ? [
                        shareWSPermissionEnum.viewAny_sws_linkInBio,
                        shareWSPermissionEnum.viewAny_sws_pixel,
                        shareWSPermissionEnum.viewAny_sws_utmTag,
                        shareWSPermissionEnum.viewAny_sws_embededWidget
                      ]
                    : [
                        permissionsEnum.viewAny_ws_member,
                        permissionsEnum.viewAny_pixel,
                        permissionsEnum.viewAny_utmTag,
                        permissionsEnum.viewAny_embededWidget
                      ]
                }>
                <ZIonCol
                  size='12'
                  className='my-3'>
                  <ZIonButton
                    fill='clear'
                    color='light'
                    expand='block'
                    className={classNames({
                      'ion-no-padding ion-no-margin normal-case': true,
                      zaions__primary_set:
                        activePage === AdminPanelSidebarMenuPageEnum.settings
                    })}
                    routerLink={
                      workspaceId != null
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .Members,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId != null && shareWSMemberId != null
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
                    <ZIonText
                      className={classNames({
                        'flex ion-align-items-center': true,
                        'ps-3 me-auto': isExpand
                      })}>
                      <ZIonIcon
                        icon={settingsOutline}
                        size='large'
                      />

                      <ZIonText
                        className={classNames({
                          'ps-2 zaions-transition': true,
                          'inline-block': isExpand,
                          hidden: !isExpand
                        })}>
                        Settings
                      </ZIonText>
                    </ZIonText>
                  </ZIonButton>
                </ZIonCol>
              </ZCan>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
      </ZIonCol>
    );
  } else {
    _content = (
      <ZIonCol
        size='12'
        className='ion-align-items-center zaions__light_bg'>
        <ZIonSegment
          scrollable={true}
          value={activePage}
          // color='secondary'
          className='zaions_pretty_scrollbar'>
          {/* Short Links */}
          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId != null
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId != null
                ? [shareWSPermissionEnum.viewAny_sws_shortLink]
                : [permissionsEnum.viewAny_shortLink]
            }>
            <ZIonSegmentButton
              value={AdminPanelSidebarMenuPageEnum.shortLink}
              className='normal-case'
              onClick={() => {
                zNavigatePushRoute(
                  replaceRouteParams(
                    ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                  )
                );
              }}>
              Short links
            </ZIonSegmentButton>
          </ZCan>

          {/* Link-in-bio */}
          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId != null
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId != null
                ? [shareWSPermissionEnum.viewAny_sws_linkInBio]
                : [permissionsEnum.viewAny_linkInBio]
            }>
            <ZIonSegmentButton
              value={AdminPanelSidebarMenuPageEnum.linkInBio}
              className='normal-case'
              onClick={() => {
                zNavigatePushRoute(
                  replaceRouteParams(
                    ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE]
                  )
                );
              }}>
              Link-in-bio
            </ZIonSegmentButton>
          </ZCan>

          {/* Extension */}
          <ZIonSegmentButton
            value='extension'
            className='normal-case'
            onClick={() => {
              zNavigatePushRoute(
                replaceParams(
                  ZaionsRoutes.AdminPanel.ShortLinks.Main,
                  CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
                  CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                )
              );
            }}>
            Extension
          </ZIonSegmentButton>

          {/* Integrations */}
          <ZIonSegmentButton
            value='integrations'
            className='normal-case'
            onClick={() => {
              zNavigatePushRoute(
                replaceParams(
                  ZaionsRoutes.AdminPanel.ShortLinks.Main,
                  CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
                  CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                )
              );
            }}>
            Integrations
          </ZIonSegmentButton>

          {/* Workspaces */}
          <ZIonSegmentButton
            value='Workspaces'
            className='normal-case'
            onClick={() => {
              zNavigatePushRoute(
                replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Workspaces.View,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )
              );

              // zNavigatePushRoute();
            }}>
            Workspaces
          </ZIonSegmentButton>

          {/* Help center */}
          <ZIonSegmentButton
            value='help-center'
            className='normal-case'
            onClick={() => {
              zNavigatePushRoute(
                replaceParams(
                  ZaionsRoutes.AdminPanel.ShortLinks.Main,
                  CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
                  CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                )
              );
            }}>
            Help center
          </ZIonSegmentButton>

          {/* Settings */}
          <ZCan
            shareWSId={wsShareId}
            checkMode={permissionCheckModeEnum.any}
            permissionType={
              wsShareId != null
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId != null
                ? [
                    shareWSPermissionEnum.viewAny_sws_linkInBio,
                    shareWSPermissionEnum.viewAny_sws_pixel,
                    shareWSPermissionEnum.viewAny_sws_utmTag,
                    shareWSPermissionEnum.viewAny_sws_embededWidget
                  ]
                : [
                    permissionsEnum.viewAny_ws_member,
                    permissionsEnum.viewAny_pixel,
                    permissionsEnum.viewAny_utmTag,
                    permissionsEnum.viewAny_embededWidget
                  ]
            }>
            <ZIonSegmentButton
              value='settings'
              className='normal-case'
              onClick={() => {
                zNavigatePushRoute(
                  replaceRouteParams(
                    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members,
                    [CONSTANTS.RouteParams.workspace.workspaceId],
                    [workspaceId]
                  )
                );
              }}>
              Settings
            </ZIonSegmentButton>
          </ZCan>
        </ZIonSegment>
      </ZIonCol>
    );
  }

  return _content;
};

export default AdminPanelSidebarMenu;
