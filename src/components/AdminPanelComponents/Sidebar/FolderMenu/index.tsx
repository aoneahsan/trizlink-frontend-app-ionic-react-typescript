/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
/**
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { appsOutline, ellipsisVertical, fileTrayOutline } from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  AdminPanelSidebarMenuPageEnum,
  FormMode,
  type ZDashboardFolderMenuInterface
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
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

const ZDashboardFolderMenu: React.FC<ZDashboardFolderMenuInterface> = ({
  type,
  foldersData,
  showFoldersSaveReorderButton,
  showSkeleton = false,
  handleFoldersReorder,
  addNewFolderButtonOnClickHandler,
  foldersSaveReorderButtonOnClickHandler,
  folderActionsButtonOnClickHandler
}) => {
  // Custom Hooks
  const { zNavigatePushRoute } = useZNavigate();
  const { isXlScale } = useZMediaQueryScale();

  // getting current workspace id form params.
  const { workspaceId, wsShareId, shareWSMemberId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  //
  const setFolderFormState = useSetRecoilState(FolderFormState);

  // Request for getting short links folders.
  // const { data: shortLinksFoldersData } = useZRQGetRequest<LinkFolderType[]>({
  // _url: API_URL_ENUM.folders_create_list,
  // _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
  // _key: ['make'],
  // });

  return (
    <ZIonCol
      className='border-e-[1px] zaions-transition h-full'
      // size={
      // ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? '2' : '2.4'
      // }
    >
      <ZCustomScrollable
        className={classNames({
          'w-full h-full': true,
          'ion-padding': isXlScale,
          'px-3': !isXlScale
        })}
        scrollY={true}>
        <ZIonList
          lines='none'
          className={classNames({
            'w-full': true,
            'ion-padding': isXlScale
          })}>
          <ZIonItem className='ion-no-padding'>
            <ZIonText
              color='primary'
              className={classNames({
                'block font-bold': true,
                'text-xl': isXlScale,
                'text-lg': !isXlScale
              })}>
              {type === AdminPanelSidebarMenuPageEnum.shortLink
                ? 'All short links '
                : type === AdminPanelSidebarMenuPageEnum.linkInBio
                ? 'All link in bios '
                : ''}
              folders
            </ZIonText>
          </ZIonItem>

          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId != null
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId !== null &&
              wsShareId !== undefined &&
              wsShareId?.trim()?.length > 0
                ? type === AdminPanelSidebarMenuPageEnum.shortLink
                  ? [shareWSPermissionEnum.viewAny_sws_sl_folder]
                  : type === AdminPanelSidebarMenuPageEnum.linkInBio
                  ? [shareWSPermissionEnum.viewAny_sws_lib_folder]
                  : []
                : workspaceId !== null &&
                  workspaceId !== undefined &&
                  workspaceId?.trim()?.length > 0
                ? type === AdminPanelSidebarMenuPageEnum.shortLink
                  ? [permissionsEnum.viewAny_sl_folder]
                  : type === AdminPanelSidebarMenuPageEnum.linkInBio
                  ? [permissionsEnum.viewAny_lib_folder]
                  : []
                : []
            }>
            <ZIonItem
              minHeight='2.2rem'
              className='cursor-pointer ion-activatable ripple-parent'
              testingselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-default-${type}`}
              style={
                !isXlScale
                  ? {
                      '--padding-start': '8px',
                      '--padding-end': '8px'
                    }
                  : undefined
              }
              onClick={() => {
                switch (type) {
                  case AdminPanelSidebarMenuPageEnum.shortLink:
                    // if there is workspaceId means it's a owned workspace then redirect to short link of that workspace
                    if (workspaceId != null) {
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                          params: [
                            CONSTANTS.RouteParams.workspace.workspaceId,
                            CONSTANTS.RouteParams
                              .folderIdToGetShortLinksOrLinkInBio
                          ],
                          values: [
                            workspaceId,
                            CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                          ]
                        })
                      );
                    } else if (wsShareId != null && shareWSMemberId != null) {
                      // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to short link of that share workspace
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId,
                            CONSTANTS.RouteParams
                              .folderIdToGetShortLinksOrLinkInBio
                          ],
                          values: [
                            wsShareId,
                            shareWSMemberId,
                            CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                          ]
                        })
                      );
                    }
                    break;

                  case AdminPanelSidebarMenuPageEnum.linkInBio:
                    // if there is workspaceId means it's a owned workspace then redirect to link-in-bio of that workspace
                    if (workspaceId != null) {
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                          params: [
                            CONSTANTS.RouteParams.workspace.workspaceId,
                            CONSTANTS.RouteParams
                              .folderIdToGetShortLinksOrLinkInBio
                          ],
                          values: [
                            workspaceId,
                            CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                          ]
                        })
                      );
                    } else if (wsShareId != null && shareWSMemberId != null) {
                      // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to link-in-bio of that share workspace
                      zNavigatePushRoute(
                        createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId,
                            CONSTANTS.RouteParams
                              .folderIdToGetShortLinksOrLinkInBio
                          ],
                          values: [
                            wsShareId,
                            shareWSMemberId,
                            CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                          ]
                        })
                      );
                    }
                    break;
                }
              }}>
              <ZIonLabel className='ion-no-margin'>Default</ZIonLabel>
              <ZIonIcon
                slot='start'
                icon={appsOutline}
                className='w-4 h-4 me-3'
              />
            </ZIonItem>
          </ZCan>

          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId !== null &&
              wsShareId !== undefined &&
              wsShareId?.trim()?.length > 0
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId !== null &&
              wsShareId !== undefined &&
              wsShareId?.trim()?.length > 0
                ? type === AdminPanelSidebarMenuPageEnum.shortLink
                  ? [shareWSPermissionEnum.viewAny_sws_sl_folder]
                  : type === AdminPanelSidebarMenuPageEnum.linkInBio
                  ? [shareWSPermissionEnum.viewAny_sws_lib_folder]
                  : []
                : workspaceId !== null &&
                  workspaceId !== undefined &&
                  workspaceId?.trim()?.length > 0
                ? type === AdminPanelSidebarMenuPageEnum.shortLink
                  ? [permissionsEnum.viewAny_sl_folder]
                  : type === AdminPanelSidebarMenuPageEnum.linkInBio
                  ? [permissionsEnum.viewAny_lib_folder]
                  : []
                : []
            }>
            {!showSkeleton && foldersData?.length > 0 && (
              <ZIonReorderGroup
                disabled={false}
                onIonItemReorder={handleFoldersReorder}>
                {foldersData.map(el => (
                  <ZCan
                    key={el.id}
                    shareWSId={wsShareId}
                    permissionType={
                      wsShareId !== null &&
                      wsShareId !== undefined &&
                      wsShareId?.trim()?.length > 0
                        ? permissionsTypeEnum.shareWSMemberPermissions
                        : permissionsTypeEnum.loggedInUserPermissions
                    }
                    havePermissions={
                      wsShareId !== null &&
                      wsShareId !== undefined &&
                      wsShareId?.trim()?.length > 0
                        ? type === AdminPanelSidebarMenuPageEnum.shortLink
                          ? [shareWSPermissionEnum.view_sws_sl_folder]
                          : type === AdminPanelSidebarMenuPageEnum.linkInBio
                          ? [shareWSPermissionEnum.view_sws_lib_folder]
                          : []
                        : workspaceId !== null &&
                          workspaceId !== undefined &&
                          workspaceId?.trim()?.length > 0
                        ? type === AdminPanelSidebarMenuPageEnum.shortLink
                          ? [permissionsEnum.view_sl_folder]
                          : type === AdminPanelSidebarMenuPageEnum.linkInBio
                          ? [permissionsEnum.view_lib_folder]
                          : []
                        : []
                    }>
                    <ZIonItem
                      data-folder-id={el.id}
                      minHeight='2.2rem'
                      style={
                        !isXlScale
                          ? {
                              '--padding-start': '8px',
                              '--padding-end': '8px'
                            }
                          : undefined
                      }
                      className={classNames({
                        'cursor-pointer ion-activatable ripple-parent': true,
                        'zaions-short-link-folder':
                          type === AdminPanelSidebarMenuPageEnum.shortLink,
                        'zaions-link-in-bio-folder':
                          type === AdminPanelSidebarMenuPageEnum.linkInBio
                      })}>
                      <ZIonLabel
                        className='ion-no-margin'
                        testingselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-${type}`}
                        testinglistselector={`${CONSTANTS.testingSelectors.folder.singleFolder}-${type}-${el.id}`}
                        onClick={() => {
                          if (el.id !== undefined) {
                            switch (type) {
                              case AdminPanelSidebarMenuPageEnum.shortLink:
                                // if there is workspaceId means it's a owned workspace then redirect to short link folder of that workspace
                                if (workspaceId !== null) {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.ShortLinks
                                        .Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [workspaceId ?? '', el?.id]
                                    })
                                  );
                                } else if (
                                  wsShareId !== null &&
                                  shareWSMemberId !== null
                                ) {
                                  // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to short link folder of that share workspace
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.ShareWS
                                        .Short_link.Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .wsShareId,
                                        CONSTANTS.RouteParams.workspace
                                          .shareWSMemberId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [
                                        wsShareId ?? '',
                                        shareWSMemberId ?? '',
                                        el.id
                                      ]
                                    })
                                  );
                                }
                                break;

                              case AdminPanelSidebarMenuPageEnum.linkInBio:
                                // if there is workspaceId means it's a owned workspace then redirect to link-in-bio folder of that workspace
                                if (workspaceId !== null) {
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.LinkInBio
                                        .Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .workspaceId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [workspaceId ?? '', el.id]
                                    })
                                  );
                                } else if (
                                  wsShareId !== null &&
                                  shareWSMemberId !== null
                                ) {
                                  // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to link-in-bio folder of that share workspace
                                  zNavigatePushRoute(
                                    createRedirectRoute({
                                      url: ZaionsRoutes.AdminPanel.ShareWS
                                        .Link_in_bio.Main,
                                      params: [
                                        CONSTANTS.RouteParams.workspace
                                          .wsShareId,
                                        CONSTANTS.RouteParams.workspace
                                          .shareWSMemberId,
                                        CONSTANTS.RouteParams
                                          .folderIdToGetShortLinksOrLinkInBio
                                      ],
                                      values: [
                                        wsShareId ?? '',
                                        shareWSMemberId ?? '',
                                        el.id
                                      ]
                                    })
                                  );
                                }
                                break;
                            }
                          }
                        }}>
                        {el.title}
                      </ZIonLabel>

                      <ZCan
                        shareWSId={wsShareId}
                        checkMode={permissionCheckModeEnum.any}
                        permissionType={
                          wsShareId !== null &&
                          wsShareId !== undefined &&
                          wsShareId?.trim()?.length > 0
                            ? permissionsTypeEnum.shareWSMemberPermissions
                            : permissionsTypeEnum.loggedInUserPermissions
                        }
                        havePermissions={
                          wsShareId !== null &&
                          wsShareId !== undefined &&
                          wsShareId?.trim()?.length > 0
                            ? type === AdminPanelSidebarMenuPageEnum.shortLink
                              ? [
                                  shareWSPermissionEnum.create_sws_sl_folder,
                                  shareWSPermissionEnum.delete_sws_sl_folder
                                ]
                              : type === AdminPanelSidebarMenuPageEnum.linkInBio
                              ? [
                                  shareWSPermissionEnum.create_sws_lib_folder,
                                  shareWSPermissionEnum.delete_sws_lib_folder
                                ]
                              : []
                            : workspaceId !== null &&
                              workspaceId !== undefined &&
                              workspaceId?.trim()?.length > 0
                            ? type === AdminPanelSidebarMenuPageEnum.shortLink
                              ? [
                                  permissionsEnum.create_sl_folder,
                                  permissionsEnum.delete_sl_folder
                                ]
                              : type === AdminPanelSidebarMenuPageEnum.linkInBio
                              ? [
                                  permissionsEnum.create_lib_folder,
                                  permissionsEnum.delete_lib_folder
                                ]
                              : []
                            : []
                        }>
                        <ZIonButton
                          fill='clear'
                          color='dark'
                          size='small'
                          value={el.id}
                          className='ion-no-padding w-[2rem] h-[2rem] rounded-full overflow-hidden ms-auto'
                          testingselector={`${CONSTANTS.testingSelectors.folder.actionPopoverBtn}-${type}`}
                          testinglistselector={`${CONSTANTS.testingSelectors.folder.actionPopoverBtn}-${type}-${el.id}`}
                          onClick={event => {
                            folderActionsButtonOnClickHandler != null &&
                              folderActionsButtonOnClickHandler(event);

                            setFolderFormState(oldVal => ({
                              ...oldVal,
                              id: el.id,
                              name: el.title,
                              formMode: FormMode.EDIT
                            }));
                          }}>
                          <ZIonIcon icon={ellipsisVertical} />
                        </ZIonButton>
                      </ZCan>

                      <ZIonReorder
                        slot='start'
                        className='me-3'>
                        <ZIonIcon icon={appsOutline} />
                      </ZIonReorder>
                    </ZIonItem>
                  </ZCan>
                ))}
              </ZIonReorderGroup>
            )}
          </ZCan>

          {!showSkeleton && foldersData?.length === 0 && (
            <ZIonItem
              style={{
                '--inner-padding-end': '0px',
                '--padding-start': '0px'
              }}>
              <ZIonLabel className='w-full text-md ion-text-center'>
                <ZIonIcon
                  icon={fileTrayOutline}
                  className='w-6 h-6'
                  color='medium'
                />
                <ZIonText
                  className='block'
                  color='medium'>
                  No folder found!
                </ZIonText>
              </ZIonLabel>
            </ZIonItem>
          )}

          {showSkeleton &&
            [1, 2, 3].map(el => (
              <ZIonItem
                key={el}
                style={
                  !isXlScale
                    ? {
                        '--padding-start': '8px',
                        '--padding-end': '8px'
                      }
                    : undefined
                }
                className={classNames({
                  'cursor-pointer ': true,
                  'zaions-short-link-folder':
                    type === AdminPanelSidebarMenuPageEnum.shortLink,
                  'zaions-link-in-bio-folder':
                    type === AdminPanelSidebarMenuPageEnum.linkInBio
                })}>
                <ZIonText
                  slot='start'
                  className='me-3'>
                  <ZIonSkeletonText
                    height='1rem'
                    width='1rem'
                    animated={true}
                  />
                </ZIonText>
                <ZIonLabel>
                  <ZIonSkeletonText
                    height='1rem'
                    width='7rem'
                    animated={true}
                  />
                </ZIonLabel>
                <ZIonButton
                  fill='clear'
                  color='dark'
                  size='small'
                  className='ion-no-padding ms-auto'>
                  <ZIonSkeletonText
                    height='1rem'
                    width='1rem'
                    animated={true}
                  />
                </ZIonButton>
              </ZIonItem>
            ))}
        </ZIonList>

        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0
              ? type === AdminPanelSidebarMenuPageEnum.shortLink
                ? [shareWSPermissionEnum.create_sws_sl_folder]
                : type === AdminPanelSidebarMenuPageEnum.linkInBio
                ? [shareWSPermissionEnum.create_sws_lib_folder]
                : []
              : workspaceId !== null &&
                workspaceId !== undefined &&
                workspaceId?.trim()?.length > 0
              ? type === AdminPanelSidebarMenuPageEnum.shortLink
                ? [permissionsEnum.create_sl_folder]
                : type === AdminPanelSidebarMenuPageEnum.linkInBio
                ? [permissionsEnum.create_lib_folder]
                : []
              : []
          }>
          <ZIonButton
            className={classNames({
              'ion-text-capitalize': true,
              'ion-margin-horizontal': isXlScale
            })}
            fill='outline'
            expand='block'
            onClick={addNewFolderButtonOnClickHandler}
            testingselector={`${CONSTANTS.testingSelectors.folder.create}-${type}`}>
            New Folder
          </ZIonButton>
        </ZCan>

        {showFoldersSaveReorderButton !== null &&
          showFoldersSaveReorderButton !== undefined &&
          showFoldersSaveReorderButton && (
            <ZCan
              shareWSId={wsShareId}
              permissionType={
                wsShareId !== null &&
                wsShareId !== undefined &&
                wsShareId?.trim()?.length > 0
                  ? permissionsTypeEnum.shareWSMemberPermissions
                  : permissionsTypeEnum.loggedInUserPermissions
              }
              havePermissions={
                wsShareId !== null &&
                wsShareId !== undefined &&
                wsShareId?.trim()?.length > 0
                  ? type === AdminPanelSidebarMenuPageEnum.shortLink
                    ? [shareWSPermissionEnum.sort_sws_sl_folder]
                    : type === AdminPanelSidebarMenuPageEnum.linkInBio
                    ? [shareWSPermissionEnum.sort_sws_lib_folder]
                    : []
                  : workspaceId !== null &&
                    workspaceId !== undefined &&
                    workspaceId?.trim()?.length > 0
                  ? type === AdminPanelSidebarMenuPageEnum.shortLink
                    ? [permissionsEnum.sort_sl_folder]
                    : type === AdminPanelSidebarMenuPageEnum.linkInBio
                    ? [permissionsEnum.sort_lib_folder]
                    : []
                  : []
              }>
              <ZIonButton
                className='absolute bottom-0 ion-text-capitalize ion-margin-horizontal'
                expand='block'
                testingselector={`${CONSTANTS.testingSelectors.folder.reorderBtn}-${type}`}
                onClick={foldersSaveReorderButtonOnClickHandler}
                style={{ width: '78%' }}>
                save reorder
              </ZIonButton>
            </ZCan>
          )}
      </ZCustomScrollable>
    </ZIonCol>
  );
};

export default ZDashboardFolderMenu;
