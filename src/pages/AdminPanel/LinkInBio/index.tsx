// Core Imports
import React, { lazy, Suspense, useEffect, useState } from 'react';

// Packages Imports
import {
  type ItemReorderEventDetail,
  type RefresherEventDetail
} from '@ionic/react';
import { filterOutline, refresh } from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import { menuController } from '@ionic/core/components';

// Custom Imports
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonItem,
  ZIonInput,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonMenuToggle,
  ZIonButtons,
  ZIonButton,
  ZIonRefresher,
  ZIonRefresherContent
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZaionsAddLinkInBioModal from '@/components/InPageComponents/ZaionsModals/AddNewLinkInBioModal';
import FolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/FoldersActionPopover';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZPageLoader from '@/components/InPageComponents/ZPageLoader';
import ZLinkInBioFilterMenu from '@/navigation/AdminPanel/LinkInBio/FilterMenu';
//
import ZCan from '@/components/Can';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

// Types
import {
  AdminPanelSidebarMenuPageEnum,
  folderState,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';
import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type LinkFolderType } from '@/types/AdminPanel/linksType';

// Recoil States
import { LinkInBiosFilterOptionsRStateAtom } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

// Global Contents
import {
  useZInvalidateReactQueries,
  useZRQGetRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings,
  zStringify
} from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

// Styles
import classes from './styles.module.css';
import ZReachedLimitModal from '@/components/InPageComponents/ZaionsModals/UpgradeModals/ReachedLimit';
import ZRequiredWsDataHOC from '@/components/WorkspacesComponents/RequiredWsDataHOC';
import {
  ZWsLimitsRStateAtom,
  ZWsRemainingLimitsRStateSelectorFamily
} from '@/ZaionsStore/UserDashboard/Workspace/index.recoil';

// Lazy loads
const ZaionsLinkInBioLinksTable = lazy(
  () =>
    import(
      '@/components/InPageComponents/ZaionsTable/LinkInBioTables/LinkInBioTable'
    )
);
const ZDashboardFolderMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/FolderMenu')
);
const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

const ZLinkInBiosListPage: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Component state.
  const [compState, setCompState] = useState<{
    isProcessing: boolean;
    LinkInBioFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    isProcessing: true,
    LinkInBioFoldersReorder: {
      isEnable: false
    }
  });
  // #endregion

  // #region Custom hooks.
  const { is2XlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region Recoils.
  const ZDashboardState = useRecoilValue(ZDashboardRState);

  const setZWsLimitsRState = useSetRecoilState(ZWsLimitsRStateAtom);

  const ZWsRemainingLibFoldersLimitsRState = useRecoilValue(
    ZWsRemainingLimitsRStateSelectorFamily(planFeaturesEnum.linksInBioFolder)
  );
  // #endregion

  // #region APIS requests.
  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
  const {
    isFetching: isGetMemberRolePermissionsFetching
    // isError: isGetMemberRolePermissionsError
  } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !((shareWSMemberId?.trim()?.length ?? 0) > 0),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // If owned workspace then this api will fetch this owned workspace data.
  const { isFetching: isSelectedWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId ?? ''
      ],
      _authenticated: true,
      _itemsIds: [workspaceId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !((workspaceId?.trim()?.length ?? 0) > 0),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // If share-workspace then this api will fetch share-workspace data.
  // const { isFetching: isSWSFetching } = useZRQGetRequest<workspaceInterface>({
  //   _key: [
  //     CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
  //     wsShareId ?? ''
  //   ],
  //   _url: API_URL_ENUM.ws_share_info_data,
  //   _shouldFetchWhenIdPassed: !((shareWSMemberId?.trim()?.length ?? 0) > 0),
  //   _itemsIds: [shareWSMemberId ?? ''],
  //   _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
  //   _extractType: ZRQGetRequestExtractEnum.extractItem,
  //   _showLoader: false
  // });

  const {
    data: libFoldersData,
    isFetching: isLibFoldersDataFetching,
    isError: isLibFoldersDataError
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.folders_list,
    _key:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
            workspaceId,
            folderState.linkInBio
          ]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
            wsShareId,
            shareWSMemberId,
            folderState.linkInBio
          ]
        : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
    _itemsIds:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [ZWSTypeEum.personalWorkspace, workspaceId, folderState.linkInBio]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [ZWSTypeEum.shareWorkspace, shareWSMemberId, folderState.linkInBio]
        : [],
    _shouldFetchWhenIdPassed: !(
      ((wsShareId?.trim()?.length ?? 0) === 0 &&
        (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
      (workspaceId?.trim()?.length ?? 0) === 0
    ),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.workspace.modal
    ]
  });

  const {
    data: libData,
    isFetching: isLibDataFetching,
    isError: isLibDataError
  } = useZRQGetRequest<{
    items: LinkInBioType[];
    itemsCount: string;
  }>({
    _url: API_URL_ENUM.linkInBio_create_list,
    _key:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN, workspaceId]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
            wsShareId,
            shareWSMemberId
          ]
        : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN],
    _itemsIds:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [workspaceId, ZWSTypeEum.personalWorkspace]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [shareWSMemberId, ZWSTypeEum.shareWorkspace]
        : [],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.workspace.type
    ],
    _shouldFetchWhenIdPassed: !(
      ((wsShareId?.trim()?.length ?? 0) === 0 &&
        (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
      (workspaceId?.trim()?.length ?? 0) === 0
    ),
    _extractType: ZRQGetRequestExtractEnum.extractData
  });

  // Update Link-in-bio folders reorder API
  const { mutateAsync: libFoldersReorderAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ShortLinks_folders_reorder,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
      workspaceId,
      folderState.linkInBio
    ]
  });
  // #endregion

  // #region Popovers.
  const { presentZIonPopover: presentLinkInBioFolderActionIonPopover } =
    useZIonPopover(FolderActionsPopoverContent, {
      workspaceId,
      shareWSMemberId,
      wsShareId,
      state: folderState.linkInBio
    });

  // const { presentZIonPopover: presentLinkInBioDomainsFilterModal } =
  //   useZIonPopover(LinkInBiosDomainsFiltersPopover);

  // #endregion

  // #region Modals.
  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);

  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      state: folderState.linkInBio,
      workspaceId,
      wsShareId,
      shareWSMemberId
    }
  );
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      // Workspace.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId ?? ''
      ]);

      // Link in bio.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
        workspaceId ?? ''
      ]);

      // Folder.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
        workspaceId ?? '',
        folderState.linkInBio
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  // Link-in-bio folders reorder function.
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>): void => {
    event.detail.complete();

    setTimeout(() => {
      const _linkInBioFoldersEls = document.querySelectorAll(
        '.zaions-link-in-bio-folder'
      );
      const _linkInBioFoldersIds: string[] = [];
      for (let i = 0; i < _linkInBioFoldersEls.length; i++) {
        const _block = _linkInBioFoldersEls[i];
        _linkInBioFoldersIds.push(
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_linkInBioFoldersIds.length > 0) {
        setCompState(oldValues => ({
          ...oldValues,
          LinkInBioFoldersReorder: {
            Ids: _linkInBioFoldersIds,
            isEnable: _linkInBioFoldersIds.length > 1
          }
        }));
      }
    }, 100);
  };

  //
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

  const linkInBioFoldersReOrderHandler = async (): Promise<void> => {
    try {
      // The update api...
      const _result = await libFoldersReorderAsyncMutate({
        requestData: zStringify({
          folders: compState.LinkInBioFoldersReorder.Ids
        }),
        itemIds: [],
        urlDynamicParts: []
      });

      // if _result of the UpdateShortLinksFoldersReorder api is success this showing success notification else not success then error notification.
      await validateRequestResponse({
        resultObj: _result
      });

      // hiding the reorder button by assigning isEnable to false
      setCompState(oldValues => ({
        ...oldValues,
        shortLinksFoldersReorder: {
          Ids: oldValues.LinkInBioFoldersReorder.Ids,
          isEnable: false
        }
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  // #region useEffect.
  useEffect(() => {
    if (libFoldersData !== undefined && libFoldersData !== null) {
      setZWsLimitsRState(oldValues => ({
        ...oldValues,
        [planFeaturesEnum.linksInBioFolder]: libFoldersData?.length
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, shareWSMemberId, wsShareId, isLibFoldersDataFetching]);

  useEffect(() => {
    if (libData !== undefined && libData !== null) {
      setZWsLimitsRState(oldValues => ({
        ...oldValues,
        [planFeaturesEnum.linkInBio]: libData?.items?.length
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, shareWSMemberId, wsShareId, libData]);

  useEffect(() => {
    try {
      if (
        ((wsShareId !== undefined &&
          wsShareId !== null &&
          shareWSMemberId !== null) ||
          (workspaceId !== undefined && workspaceId !== null)) &&
        !isLibDataFetching &&
        !isLibDataError &&
        !isLibFoldersDataError &&
        !isLibFoldersDataFetching
      ) {
        setCompState(oldValues => ({
          ...oldValues,
          isProcessing: false
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [
    wsShareId,
    shareWSMemberId,
    workspaceId,
    isLibDataFetching,
    isLibDataError,
    isLibFoldersDataError,
    isLibFoldersDataFetching
  ]);
  // #endregion

  const isZFetching =
    isLibFoldersDataFetching ||
    isLibDataFetching ||
    isSelectedWorkspaceFetching;

  return (
    <>
      {libData?.items !== undefined &&
        libData?.items !== null &&
        libData?.items?.length > 0 && <ZLinkInBioFilterMenu />}

      <ZIonPage
        pageTitle='Zaions link-in-bio list page'
        id={CONSTANTS.PAGE_IDS.AD_LIB_LIST_PAGE}>
        <ZRequiredWsDataHOC>
          {compState?.isProcessing ? (
            <ZPageLoader>
              {workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
                ? isSelectedWorkspaceFetching
                  ? 'Setting workspace data'
                  : isLibDataFetching
                  ? 'Fetching workspace link-in-bio'
                  : isLibFoldersDataFetching
                  ? 'Fetching workspace link-in-bio folders'
                  : null
                : wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? isGetMemberRolePermissionsFetching
                  ? 'Getting & setting your permissions in this workspace'
                  : isSelectedWorkspaceFetching
                  ? 'Setting share workspace data'
                  : isLibDataFetching
                  ? 'Fetching share workspace link-in-bio'
                  : isLibFoldersDataFetching
                  ? 'Fetching share workspace link-in-bio folders'
                  : null
                : null}
            </ZPageLoader>
          ) : (
            <ZIonContent>
              {/* Page Navigation */}
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
                      activePage={AdminPanelSidebarMenuPageEnum.linkInBio}
                    />
                  </Suspense>

                  {/* Col-2 Right-side Main Container */}
                  <ZIonCol
                    sizeXl={
                      ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                        ? is2XlScale
                          ? '10.5'
                          : '10'
                        : is2XlScale
                        ? '11.4'
                        : '11.2'
                    }
                    sizeLg={
                      ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                        ? is2XlScale
                          ? '10.5'
                          : '10'
                        : is2XlScale
                        ? '11.4'
                        : '11.2'
                    }
                    sizeMd='12'
                    sizeSm='12'
                    sizeXs='12'
                    className='h-screen zaions-transition'>
                    <ZIonGrid className='h-full ion-no-padding'>
                      {/* Col-2 Row-1 Top bar. */}
                      <Suspense
                        fallback={
                          <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                            <ZFallbackIonSpinner2 />
                          </ZIonRow>
                        }>
                        <ZAdminPanelTopBar workspaceId={workspaceId} />
                      </Suspense>

                      {/* Col-2 Row-2 */}
                      <ZIonRow className='h-[calc(100%-4rem)]'>
                        {isLgScale && (
                          <ZCan
                            shareWSId={wsShareId}
                            permissionType={
                              wsShareId !== undefined &&
                              wsShareId !== null &&
                              wsShareId?.trim()?.length > 0 &&
                              shareWSMemberId !== undefined &&
                              shareWSMemberId !== null &&
                              shareWSMemberId?.trim()?.length > 0
                                ? permissionsTypeEnum.shareWSMemberPermissions
                                : permissionsTypeEnum.loggedInUserPermissions
                            }
                            havePermissions={
                              wsShareId !== undefined &&
                              wsShareId !== null &&
                              wsShareId?.trim()?.length > 0 &&
                              shareWSMemberId !== undefined &&
                              shareWSMemberId !== null &&
                              shareWSMemberId?.trim()?.length > 0
                                ? [shareWSPermissionEnum.viewAny_sws_folder]
                                : [permissionsEnum.viewAny_folder]
                            }>
                            <Suspense
                              fallback={
                                <ZIonCol className='h-full border-e-[1px] zaions-transition'>
                                  <ZFallbackIonSpinner2 />
                                </ZIonCol>
                              }>
                              <ZDashboardFolderMenu
                                showSkeleton={isZFetching}
                                type={AdminPanelSidebarMenuPageEnum.linkInBio}
                                foldersData={libFoldersData ?? []}
                                showFoldersSaveReorderButton={
                                  compState?.LinkInBioFoldersReorder?.isEnable
                                }
                                handleFoldersReorder={handleReorder}
                                addNewFolderButtonOnClickHandler={() => {
                                  if (
                                    ZWsRemainingLibFoldersLimitsRState === false
                                  ) {
                                    presentZReachedLimitModal({
                                      _cssClass: 'reached-limit-modal-size'
                                    });
                                  } else {
                                    presentFolderModal({
                                      _cssClass: 'folder-form-modal'
                                    });
                                  }
                                }}
                                foldersSaveReorderButtonOnClickHandler={() => {
                                  void linkInBioFoldersReOrderHandler();
                                }}
                                folderActionsButtonOnClickHandler={(
                                  event: unknown
                                ) => {
                                  presentLinkInBioFolderActionIonPopover({
                                    _event: event as Event,
                                    _cssClass: classNames(
                                      classes.zaions_present_folder_Action_popover_width
                                    )
                                  });
                                }}
                              />
                            </Suspense>
                          </ZCan>
                        )}

                        {/* Col-2 Row-2 col-2 Table & filters etc. */}
                        <ZIonCol
                          className='h-full zaions-transition'
                          sizeXl='9.2'
                          sizeLg='9.2'
                          sizeMd='12'
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
          )}
        </ZRequiredWsDataHOC>
      </ZIonPage>
    </>
  );
};

const ZInpageMainContent: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { isXlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Recoils.
  const ZWsLibLimitsRState = useRecoilValue(
    ZWsRemainingLimitsRStateSelectorFamily(planFeaturesEnum.linkInBio)
  );
  // #endregion

  // #region Apis.
  // If share-workspace then this api will fetch role & permissions of current user in this share-workspace.
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
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  const { data: libData } = useZRQGetRequest<{
    items: LinkInBioType[];
    itemsCount: string;
  }>({
    _url: API_URL_ENUM.linkInBio_create_list,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyString(workspaceId) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId])
    ),
    _extractType: ZRQGetRequestExtractEnum.extractData,
    _showLoader: false
  });
  // #endregion

  // #region Modals & popovers.
  const { presentZIonModal: presentAddLinkInBioModal } = useZIonModal(
    ZaionsAddLinkInBioModal,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId
    }
  );

  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      // Workspace.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId ?? ''
      ]);

      // Link in bio.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
        workspaceId ?? ''
      ]);

      // Folder.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
        workspaceId ?? '',
        folderState.linkInBio
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <div className='flex flex-col gap-4 ion-no-margin ion-no-padding'>
      {/* Switch it button & page heading */}
      <ZIonRow
        className={classNames({
          'ion-align-items-center border rounded-lg zaions__light_bg': true,
          'mt-4 ion-padding': isLgScale,
          'mt-2 p-2': !isLgScale
        })}>
        {!isLgScale && (
          <ZIonCol
            size='max-content'
            sizeSm='max-content'
            sizeXs='12'
            className={classNames({
              'order-3': !isMdScale
            })}>
            <ZIonMenuToggle
              autoHide={false}
              menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID}>
              <ZIonButton
                className={classNames({
                  'normal-case': true,
                  'open-folder-menu-button': isLgScale || isSmScale,
                  'mt-4 ms-0': !isMdScale
                })}
                expand={!isSmScale ? 'block' : undefined}
                // menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID}
                // autoHide={false}
              >
                Open folders menu
              </ZIonButton>
            </ZIonMenuToggle>
          </ZIonCol>
        )}

        <ZIonCol
          className={classNames({
            'order-1': !isLgScale
          })}>
          <ZIonText
            className={classNames({
              'block font-bold ion-no-padding': true,
              'text-2xl': isXlScale,
              'text-xl': !isXlScale,
              'ion-text-center': !isLgScale
            })}
            // color='medium'
          >
            {workspaceId !== undefined
              ? "Create a New link-in-bio's or Manage Your Existing Ones!"
              : wsShareId !== undefined
              ? getMemberRolePermissions?.memberPermissions?.includes(
                  shareWSPermissionEnum.create_sws_shortLink
                ) ?? false
                ? "Create a New link-in-bio's or Manage Existing Ones!"
                : 'Explore Existing Links'
              : null}
          </ZIonText>
          <ZIonText
            className={classNames({
              'block mt-1': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}
            // color='medium'
          >
            {workspaceId !== undefined
              ? "Craft fresh link-in-bio's or take a peek at your existing ones. The choice is yours!"
              : wsShareId !== undefined
              ? getMemberRolePermissions?.memberPermissions?.includes(
                  shareWSPermissionEnum.create_sws_shortLink
                ) ?? false
                ? "Craft fresh link-in-bio's or take a peek at your existing ones. The choice is yours!"
                : "As new member, dive into link-in-bio's world and oversee existing creations."
              : null}
          </ZIonText>
        </ZIonCol>

        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? [shareWSPermissionEnum.create_sws_shortLink]
              : [permissionsEnum.create_shortLink]
          }>
          <ZIonCol
            sizeXl='4'
            sizeLg='5'
            sizeMd='5'
            sizeSm='12'
            sizeXs='12'
            className={classNames({
              'mt-4 order-2': !isMdScale
            })}>
            {/* This will create short link (not link-in-bio) */}
            <ZaionsCreateShortLinkUrlInput />
          </ZIonCol>
        </ZCan>
      </ZIonRow>

      {/* filter input, export, import, & create short links buttons */}
      <ZIonRow className='mt-1 border rounded-lg ion-align-items-center zaions__light_bg ion-padding'>
        <ZIonCol
          sizeXl='4'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <SearchQueryInputComponent />
        </ZIonCol>

        <ZIonCol
          className={classNames({
            'justify-content-end': isXlScale,
            'justify-content-start mt-4': !isXlScale,
            'gap-y-4': !isLgScale
          })}>
          <ZIonButtons
            className={classNames({
              'w-full': true,
              'ion-justify-content-between': !isXlScale,
              'ion-justify-content-end gap-3': isXlScale,
              block: !isSmScale
            })}>
            {/* Filter button */}
            {(workspaceId !== undefined || wsShareId !== undefined) &&
              libData?.items !== undefined &&
              libData?.items?.length > 0 && (
                <ZIonButton
                  fill='outline'
                  color='primary'
                  expand={!isSmScale ? 'block' : undefined}
                  height={isLgScale ? '39px' : '20px'}
                  className={classNames({
                    'my-2 normal-case': true,
                    'text-xs w-[25%]': !isLgScale,
                    'w-full': !isSmScale
                  })}
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.filterBtn
                  }
                  onClick={() => {
                    void (async () => {
                      await menuController.enable(
                        true,
                        CONSTANTS.MENU_IDS.LIB_FILTERS_MENU_ID
                      );
                      await menuController.open(
                        CONSTANTS.MENU_IDS.LIB_FILTERS_MENU_ID
                      );
                    })();
                  }}>
                  <ZIonIcon
                    icon={filterOutline}
                    className='pr-1'
                  />
                  Filter
                </ZIonButton>
              )}

            {!isLgScale ? (
              <ZIonButton
                fill='outline'
                color='primary'
                expand={!isSmScale ? 'block' : undefined}
                height={isLgScale ? '39px' : '20px'}
                className={classNames({
                  'my-2 normal-case': true,
                  'text-xs w-[25%]': !isLgScale,
                  'w-full': !isSmScale
                })}
                onClick={() => {
                  void (async () => {
                    await menuController.enable(
                      true,
                      CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
                    );
                    await menuController.open(
                      CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
                    );
                  })();
                }}>
                Open folders menu
              </ZIonButton>
            ) : null}

            {/* Refetch data button */}
            <ZIonButton
              color='primary'
              fill='outline'
              height='39px'
              expand={!isMdScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.linkInBio.listPage.refetchBtn
              }
              className={classNames({
                'ms-auto': isXlScale,
                'my-2': !isMdScale
              })}
              onClick={() => {
                void invalidedQueries();
              }}>
              <ZIonIcon
                slot='start'
                icon={refresh}
              />
              Refetch
            </ZIonButton>

            <ZCan
              shareWSId={wsShareId}
              permissionType={
                wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
                  ? permissionsTypeEnum.shareWSMemberPermissions
                  : permissionsTypeEnum.loggedInUserPermissions
              }
              havePermissions={
                wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
                  ? [shareWSPermissionEnum.create_sws_linkInBio]
                  : [permissionsEnum.create_linkInBio]
              }>
              <ZIonButton
                color='primary'
                fill='solid'
                height='39px'
                expand={!isSmScale ? 'block' : undefined}
                testingselector={
                  CONSTANTS.testingSelectors.linkInBio.listPage.createBtn
                }
                onClick={() => {
                  if (ZWsLibLimitsRState === false) {
                    presentZReachedLimitModal({
                      _cssClass: 'reached-limit-modal-size'
                    });
                  } else {
                    presentAddLinkInBioModal({
                      _cssClass: 'lib-create-modal-size'
                    });
                  }
                }}
                // className={classNames({
                // 'my-2': true,
                // })}
              >
                Create a new Link In Bio
              </ZIonButton>
            </ZCan>
          </ZIonButtons>
        </ZIonCol>
      </ZIonRow>

      {/* link-in-bio Table */}
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
            ? [shareWSPermissionEnum.viewAny_sws_linkInBio]
            : [permissionsEnum.viewAny_linkInBio]
        }>
        <ZaionsLinkInBioLinksTable />
      </ZCan>
    </div>
  );
};

// const LinkInBiosDomainsFiltersPopover = () => {
//   // For getting all domains data
//   const { domains: _LinkInBiosFieldsDataDomainsSelector } = useRecoilValue(
//     LinkInBiosFieldsDataRStateSelector
//   );

//   // For getting filter.
//   const [linkInBiosFilterOptions, setLinkInBiosFilterOptions] = useRecoilState(
//     LinkInBiosFilterOptionsRStateAtom
//   );

//   // function for generating initialValue for formik below.
//   const generateInitialValueOfDomainsFormik = (
//     allDomains: string[],
//     filteredDomains: string[] = []
//   ): {
//     _filteredDomains?: {
//       [key: string]: boolean;
//     };
//     _allDomains?: boolean;
//   } => {
//     try {
//       const _filteredDomains: {
//         [key: string]: boolean;
//       } = {};
//       let _allDomains = true;
//       if (allDomains.length) {
//         allDomains.forEach((domain, i) => {
//           const _domain = domain.replace('.', '_');
//           if (filteredDomains.includes(_domain)) {
//             _filteredDomains[_domain] = true;
//           } else {
//             _filteredDomains[_domain] = false;
//             _allDomains = false;
//           }
//         });
//       }
//       return { _filteredDomains, _allDomains };
//     } catch (error) {
//       reportCustomError(error);
//       return {};
//     }
//   };

//   return (
//     <ZRScrollbars  className={classNames({
// 'w-[300px] h-[300px]': true
// })}>
//       <Formik
//         initialValues={generateInitialValueOfDomainsFormik(
//           _LinkInBiosFieldsDataDomainsSelector,
//           linkInBiosFilterOptions.domains as string[]
//         )}
//         onSubmit={(values) => {
//           try {
//             if (values._filteredDomains) {
//               const _domains: string[] = [];
//               for (const [key, value] of Object.entries(
//                 values._filteredDomains
//               )) {
//                 if (value === true) {
//                   const _key = key.replace('_', '.');
//                   _domains.push(_key);
//                 }
//               }

//               setLinkInBiosFilterOptions((oldVales) => ({
//                 ...oldVales,
//                 domains: [..._domains],
//               }));
//             }
//           } catch (error) {
//             reportCustomError(error);
//           }
//         }}
//         enableReinitialize
//       >
//         {({ values, submitForm, handleBlur, setFieldValue }) => (
//           <>
//             <ZIonButton
//               expand='block'
//               className='m-0 ion-text-capitalize'
//               onClick={() => void submitForm()}
//             >
//               <ZIonIcon icon={filterOutline} className='me-1' />
//               <ZIonText>filter</ZIonText>
//             </ZIonButton>
//             <ZIonItem className='ion-no-padding'>
//               <ZIonText className='font-bold ms-3 text-[14px] zaions__color_gray2'>
//                 All Domains
//               </ZIonText>
//               {/* <IonCheckbox
// slot='end'
// checked={values._allDomains}
// onIonChange={({ target }) => {
// setFieldValue('_allDomains', target.checked, false);
// }}
// onIonBlur={handleBlur}
// /> */}
//               <ZRCheckbox
//                 checkedValue={values._allDomains}
//                 handleChange={(checked) => {
//                   setFieldValue('_allDomains', checked, false);
//                   _LinkInBiosFieldsDataDomainsSelector.forEach((el) => {
//                     const domain = el.replace('.', '_');
//                     setFieldValue(`_filteredDomains.${domain}`, checked, false);
//                   });
//                 }}
//                 className='ms-auto'
//               />
//             </ZIonItem>
//             <IonList lines='none'>
//               {_LinkInBiosFieldsDataDomainsSelector.map((_domain, i) => {
//                 const domain = _domain.replace('.', '_');
//                 return (
//                   <ZIonItem key={i}>
//                     <IonChip className='m-0 text-[14px]'>{_domain}</IonChip>
//                     <IonCheckbox
//                       slot='end'
//                       checked={
//                         values._filteredDomains &&
//                         values._filteredDomains[domain]
//                       }
//                       name={domain}
//                       onIonChange={({ target }) => {
//                         if (!target.checked && values._allDomains) {
//                           setFieldValue('_allDomains', false, false);
//                         }
//                         setFieldValue(
//                           `_filteredDomains.${domain}`,
//                           target.checked,
//                           false
//                         );
//                       }}
//                       onIonBlur={handleBlur}
//                     />
//                   </ZIonItem>
//                 );
//               })}
//             </IonList>
//           </>
//         )}
//       </Formik>
//     </ZRScrollbars>
//   );
// };

const SearchQueryInputComponent: React.FC = () => {
  const setLinkInBiosFilterOptionsState = useSetRecoilState(
    LinkInBiosFilterOptionsRStateAtom
  );
  const formikInitialValues = {
    searchValue: ''
  };
  const zIonItemStyle = { '--padding-start': '10px' };

  return (
    <Formik
      initialValues={formikInitialValues}
      onSubmit={values => {
        try {
          if (values?.searchValue?.trim()?.length > 0) {
            setLinkInBiosFilterOptionsState(oldValues => ({
              ...oldValues,
              searchQuery: values.searchValue
            }));
          } else {
            setLinkInBiosFilterOptionsState(oldValues => ({
              ...oldValues,
              searchQuery: null
            }));
          }
        } catch (error) {
          reportCustomError(error);
        }
      }}>
      {({ submitForm, handleChange }) => (
        <ZIonItem
          className='ion-item-start-no-padding z-inner-padding-end-0'
          lines='none'
          minHeight='40px'>
          <ZIonInput
            aria-label='search'
            clearInput={true}
            type='text'
            name='searchValue'
            onIonChange={handleChange}
            placeholder='Search link by title, domain...'
            fill='outline'
            counter={false}
            className='zaions__bg_white z-ion-border-radius-0'
            minHeight='40px'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.searchInput
            }
            style={zIonItemStyle}
          />
          <ZIonButton
            onClick={() => {
              void submitForm();
            }}
            slot='end'
            className='h-full ion-no-margin ion-text-capitalize z-ion-border-radius-0'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.searchBtn
            }>
            <ZIonIcon
              icon={filterOutline}
              className='me-2'
            />
            <ZIonText>Filter</ZIonText>
          </ZIonButton>
        </ZIonItem>
      )}
    </Formik>
  );
};

export default ZLinkInBiosListPage;
