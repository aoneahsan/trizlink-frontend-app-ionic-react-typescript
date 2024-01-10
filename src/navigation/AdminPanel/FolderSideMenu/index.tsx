/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type IonReorderGroupCustomEvent } from '@ionic/core';
import { menuController } from '@ionic/core/components';
import {
  appsOutline,
  closeOutline,
  ellipsisVertical,
  fileTrayOutline
} from 'ionicons/icons';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonMenu,
  ZIonText,
  ZIonReorder,
  ZIonReorderGroup,
  ZIonButton,
  ZIonHeader,
  ZIonTitle,
  ZIonContent,
  ZIonFooter
} from '@/components/ZIonComponents';
import ZUtilityButtonGroup from '@/components/AdminPanelComponents/UtilityButtonGroup';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { type PAGE_MENU_SIDE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { createRedirectRoute, replaceRouteParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkFolderType } from '@/types/AdminPanel/linksType';
import {
  folderState,
  FormMode,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import ZCan from '@/components/Can';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  ZUserCurrentLimitsRStateAtom,
  ZUserCurrentLimitsRStateSelectorFamily
} from '@/ZaionsStore/UserAccount/index.recoil';
import ZReachedLimitModal from '@/components/InPageComponents/ZaionsModals/UpgradeModals/ReachedLimit';

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
interface AdminPanelFoldersSidebarMenuInterface {
  menuSide?: PAGE_MENU_SIDE;
  contentId?: string;
  foldersData?: LinkFolderType[];
  state?: folderState;
  showSaveReorderButton?: boolean;
  handleReorderFn?: (
    event: IonReorderGroupCustomEvent<{
      from: number;
      to: number;
      complete: (data?: boolean | unknown[]) => unknown;
    }>
  ) => void;
  menuId?: string;
  folderActionHandlerFn?: React.MouseEventHandler<HTMLIonButtonElement>;
  saveReorderButtonFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AdminPanelFoldersSidebarMenu: React.FC<
  AdminPanelFoldersSidebarMenuInterface
> = ({
  menuSide,
  contentId,
  foldersData,
  state,
  showSaveReorderButton,
  menuId,
  handleReorderFn,
  folderActionHandlerFn,
  saveReorderButtonFn
}) => {
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isLgScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  const setFolderFormState = useSetRecoilState(FolderFormState);

  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );

  const ZUserCurrentLimitsRState = useRecoilValue(
    ZUserCurrentLimitsRStateSelectorFamily(planFeaturesEnum.shortLinksFolder)
  );

  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      workspaceId,
      shareWSMemberId,
      wsShareId,
      state: folderState.shortlink
    }
  );

  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);

  const _zIonContentStyle = { '--padding-top': '7px' };

  useEffect(() => {
    if (foldersData !== undefined && foldersData !== null) {
      if (state === folderState.shortlink) {
        setZUserCurrentLimitsRState(oldValues => ({
          ...oldValues,
          [planFeaturesEnum.shortLinksFolder]: foldersData?.length
        }));
      } else if (state === folderState.linkInBio) {
        setZUserCurrentLimitsRState(oldValues => ({
          ...oldValues,
          [planFeaturesEnum.linksInBioFolder]: foldersData?.length
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, shareWSMemberId, wsShareId, foldersData?.length]);

  return (
    <ZIonMenu
      contentId={contentId}
      side={menuSide ?? 'end'}
      menuId={menuId}>
      {/* Header */}
      <ZIonHeader className='flex px-3 py-2 border-b shadow-none ion-align-items-center ion-no-padding ion-justify-content-between'>
        <ZIonTitle
          className={classNames({
            'block font-semibold ion-no-padding': true,
            'text-xl': isLgScale,
            'text-lg': !isLgScale
          })}>
          Short links folders
        </ZIonTitle>

        <ZIonIcon
          icon={closeOutline}
          className='w-6 h-6 pt-[1px] cursor-pointer'
          onClick={() => {
            void (async () => {
              await menuController.close(
                CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
              );
            })();
          }}
        />
      </ZIonHeader>

      {/* Content */}
      <ZIonContent style={_zIonContentStyle}>
        <div className='flex flex-col h-full gap-1'>
          <div className='max-h-[66%] min-h-max'>
            <ZCustomScrollable
              className='w-full h-full'
              scrollY={true}>
              <ZIonList
                lines='none'
                className='w-full py-0'>
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId !== undefined
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    wsShareId !== undefined
                      ? state === folderState.shortlink
                        ? [shareWSPermissionEnum.viewAny_sws_sl_folder]
                        : state === folderState.linkInBio
                        ? [shareWSPermissionEnum.viewAny_sws_lib_folder]
                        : []
                      : state === folderState.shortlink
                      ? [permissionsEnum.viewAny_sl_folder]
                      : state === folderState.linkInBio
                      ? [permissionsEnum.viewAny_lib_folder]
                      : []
                  }>
                  <ZIonItem
                    minHeight='2rem'
                    className='cursor-pointer ms-2'
                    onClick={() => {
                      switch (state) {
                        case folderState.shortlink:
                          // if there is workspaceId means it's a owned workspace then redirect to short link of that workspace
                          if (workspaceId !== undefined) {
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
                          } else if (
                            wsShareId !== undefined &&
                            shareWSMemberId !== undefined
                          ) {
                            // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to short link of that share workspace
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel.ShareWS.Short_link
                                  .Main,
                                params: [
                                  CONSTANTS.RouteParams.workspace.wsShareId,
                                  CONSTANTS.RouteParams.workspace
                                    .shareWSMemberId,
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

                        case folderState.linkInBio:
                          // if there is workspaceId means it's a owned workspace then redirect to link-in-bio of that workspace
                          if (workspaceId !== undefined) {
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
                          } else if (
                            wsShareId !== undefined &&
                            shareWSMemberId !== undefined
                          ) {
                            // if there is wsShareId && shareWSMemberId means it's a share workspace then redirect to link-in-bio of that share workspace
                            zNavigatePushRoute(
                              createRedirectRoute({
                                url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio
                                  .Main,
                                params: [
                                  CONSTANTS.RouteParams.workspace.wsShareId,
                                  CONSTANTS.RouteParams.workspace
                                    .shareWSMemberId,
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
                    <ZIonText>Default</ZIonText>
                  </ZIonItem>
                </ZCan>

                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId !== undefined
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    wsShareId !== undefined
                      ? state === folderState.shortlink
                        ? [shareWSPermissionEnum.viewAny_sws_sl_folder]
                        : state === folderState.linkInBio
                        ? [shareWSPermissionEnum.viewAny_sws_lib_folder]
                        : []
                      : state === folderState.shortlink
                      ? [permissionsEnum.viewAny_sl_folder]
                      : state === folderState.linkInBio
                      ? [permissionsEnum.viewAny_lib_folder]
                      : []
                  }>
                  {foldersData !== undefined ? (
                    <ZIonReorderGroup
                      disabled={false}
                      onIonItemReorder={handleReorderFn}>
                      {foldersData.map(el => (
                        <ZCan
                          key={el.id}
                          shareWSId={wsShareId}
                          permissionType={
                            wsShareId !== undefined
                              ? permissionsTypeEnum.shareWSMemberPermissions
                              : permissionsTypeEnum.loggedInUserPermissions
                          }
                          havePermissions={
                            wsShareId !== undefined
                              ? state === folderState.shortlink
                                ? [shareWSPermissionEnum.view_sws_sl_folder]
                                : state === folderState.linkInBio
                                ? [shareWSPermissionEnum.view_sws_lib_folder]
                                : []
                              : state === folderState.shortlink
                              ? [permissionsEnum.view_sl_folder]
                              : state === folderState.linkInBio
                              ? [permissionsEnum.view_lib_folder]
                              : []
                          }>
                          <ZIonItem
                            key={el.id}
                            data-folder-id={el.id}
                            minHeight='2.3rem'
                            className={`cursor-pointer zaions-short-link-folder-${
                              state != null || ''
                            }`}>
                            <ZIonLabel
                              className='my-0'
                              onClick={() => {
                                zNavigatePushRoute(
                                  replaceRouteParams(
                                    ZaionsRoutes.AdminPanel.ShortLinks.Main,
                                    [
                                      CONSTANTS.RouteParams.workspace
                                        .workspaceId,
                                      CONSTANTS.RouteParams
                                        .folderIdToGetShortLinksOrLinkInBio
                                    ],
                                    [workspaceId ?? '', el?.id ?? '']
                                  )
                                );
                              }}>
                              {el.title}
                            </ZIonLabel>
                            <ZIonButton
                              fill='clear'
                              color='dark'
                              size='small'
                              value={el.id}
                              onClick={event => {
                                folderActionHandlerFn !== undefined &&
                                  folderActionHandlerFn(event);
                                setFolderFormState(oldVal => ({
                                  ...oldVal,
                                  id: el.id,
                                  name: el.title,
                                  formMode: FormMode.EDIT
                                }));
                              }}
                              className='ion-no-padding ms-auto'>
                              <ZIonIcon icon={ellipsisVertical} />
                            </ZIonButton>
                            <ZIonReorder
                              slot='start'
                              className='me-3'>
                              <ZIonIcon icon={appsOutline} />
                            </ZIonReorder>
                          </ZIonItem>
                        </ZCan>
                      ))}
                    </ZIonReorderGroup>
                  ) : (
                    ''
                  )}
                </ZCan>

                {foldersData?.length === 0 && (
                  <ZIonItem className='z-inner-padding-end-0 ion-item-start-no-padding'>
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
              </ZIonList>
            </ZCustomScrollable>
          </div>

          <div className='px-1 mx-3 mb-1'>
            <ZCan
              shareWSId={wsShareId}
              permissionType={
                wsShareId !== undefined
                  ? permissionsTypeEnum.shareWSMemberPermissions
                  : permissionsTypeEnum.loggedInUserPermissions
              }
              havePermissions={
                wsShareId !== undefined
                  ? state === folderState.shortlink
                    ? [shareWSPermissionEnum.create_sws_sl_folder]
                    : state === folderState.linkInBio
                    ? [shareWSPermissionEnum.create_sws_lib_folder]
                    : []
                  : state === folderState.shortlink
                  ? [permissionsEnum.create_sl_folder]
                  : state === folderState.linkInBio
                  ? [permissionsEnum.create_lib_folder]
                  : []
              }>
              <ZIonButton
                className='mt-3 mb-2 ion-text-capitalize ion-no-margin ion-no-padding'
                minHeight='1.9rem'
                fill='outline'
                expand='block'
                onClick={() => {
                  if (ZUserCurrentLimitsRState === false) {
                    presentZReachedLimitModal({
                      _cssClass: 'reached-limit-modal-size'
                    });
                  } else {
                    setFolderFormState(oldVal => ({
                      ...oldVal,
                      id: '',
                      name: '',
                      formMode: FormMode.ADD
                    }));
                    presentFolderModal({
                      _cssClass: 'folder-form-modal'
                    });
                  }
                }}>
                New Folder
              </ZIonButton>
            </ZCan>

            {!isMdScale ? <ZUtilityButtonGroup /> : null}
          </div>
        </div>
      </ZIonContent>

      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined
            ? state === folderState.shortlink
              ? [shareWSPermissionEnum.sort_sws_sl_folder]
              : state === folderState.linkInBio
              ? [shareWSPermissionEnum.sort_sws_lib_folder]
              : []
            : state === folderState.shortlink
            ? [permissionsEnum.sort_sl_folder]
            : state === folderState.linkInBio
            ? [permissionsEnum.sort_lib_folder]
            : []
        }>
        <ZIonFooter className='py-1'>
          {showSaveReorderButton !== undefined && (
            <ZIonButton
              className='ion-margin-horizontal ion-no-padding'
              expand='block'
              color='tertiary'
              minHeight='1.9rem'
              onClick={event => {
                saveReorderButtonFn !== undefined && saveReorderButtonFn(event);
              }}>
              save reorder
            </ZIonButton>
          )}
        </ZIonFooter>
      </ZCan>
    </ZIonMenu>
  );
};

export default AdminPanelFoldersSidebarMenu;
