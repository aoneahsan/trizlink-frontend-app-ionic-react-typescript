/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import { menuController } from '@ionic/core/components';
import { ItemReorderEventDetail, RefresherEventDetail } from '@ionic/react';
import { filterOutline, refresh, searchOutline } from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
import ZaionsShortLinkTable from '@/components/InPageComponents/ZaionsTable/ShortLinkListTable';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonItem,
  ZIonInput,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonButton,
  ZIonButtons,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonSpinner
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZShortLinksFilterMenu from '@/navigation/AdminPanel/ShortLinks/FilterMenu';
import FolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/FoldersActionPopover';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import AdminPanelShortLinksFolderSideMenu from '@/navigation/AdminPanel/ShortLinks/FolderSideMenu';
//
//
import ZCan from '@/components/Can';
// const ZCan = lazy(() => import('@/components/Can'));

// const ZCustomScrollable = lazy(
// 	() => import('@/components/CustomComponents/ZScrollable')
// );
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

const ZDashboardFolderMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/FolderMenu')
);

const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);

const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZInvalidateReactQueries,
  useZRQGetRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

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
import { API_URL_ENUM } from '@/utils/enums';
import { replaceParams, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkFolderType, ShortLinkType } from '@/types/AdminPanel/linksType';
import {
  AdminPanelSidebarMenuPageEnum,
  folderState,
  FormMode,
  messengerPlatformsBlockEnum
} from '@/types/AdminPanel/index.type';
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import {
  NewShortLinkFormState,
  NewShortLinkSelectTypeOption
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import {
  ShortLinksFilterOptionsRStateAtom,
  ShortLinksRStateAtom
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';

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
 * About: (Share workspace shortLink list page...)
 * @type {*}
 * */
const ZSWSShortLinksListPage: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Component state.
  const [compState, setCompState] = useState<{
    shortLinksFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
    isProcessing: boolean;
  }>({
    shortLinksFoldersReorder: {
      isEnable: false
    },
    isProcessing: true
  });
  // #endregion

  // #region Custom hooks.
  const { isMdScale, isLgScale, isSmScale } = useZMediaQueryScale(); // media query hook.
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region Recoils.
  // Recoil state that control the dashboard.
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  //
  const setFolderFormState = useSetRecoilState(FolderFormState);
  // #endregion

  // #region APIS requests.
  // get share-workspace data api.
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
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  const { isFetching: isSWSFetching, isError: isSWSError } =
    useZRQGetRequest<workspaceInterface>({
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId
      ],
      _url: API_URL_ENUM.ws_share_info_data,
      _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
      _itemsIds: [shareWSMemberId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  // Request for getting short links data.
  const {
    data: swsShortLinksData,
    isFetching: isSWSShortLinksDataFetching,
    isError: isSWSShortLinksDataError
  } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.sws_sl_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN, wsShareId],
    _itemsIds: [shareWSMemberId],
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // Request for getting short links folders.
  const {
    data: swsShortLinksFoldersData,
    isFetching: isSWSShortLinksFoldersDataFetching,
    isError: isSWSShortLinksFoldersDataError
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.ws_share_folder_sl_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
      wsShareId,
      folderState.shortlink
    ],
    _itemsIds: [shareWSMemberId],
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // Update shortLinks folders reorder API
  const { mutateAsync: UpdateSWSShortLinksFoldersReorder } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.ws_share_folder_reorder,
      _queriesKeysToInvalidate: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
        wsShareId,
        folderState.shortlink
      ]
    });

  // #endregion

  // #region Popovers.
  //
  const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
    FolderActionsPopoverContent,
    {
      workspaceId,
      shareWSMemberId,
      wsShareId,
      state: folderState.shortlink
    }
  );
  // #endregion

  // #region Modals.
  //
  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      state: folderState.shortlink,
      workspaceId,
      shareWSMemberId: shareWSMemberId,
      wsShareId: wsShareId
    }
  );
  // #endregion

  // #region Functions.
  // Short links folders reorder function.
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete();

    setTimeout(() => {
      const _shortLinksFoldersEls = document.querySelectorAll(
        '.zaions-short-link-folder'
      );
      const _shortLinksFoldersIds: string[] = [];
      for (let i = 0; i < _shortLinksFoldersEls.length; i++) {
        const _block = _shortLinksFoldersEls[i];
        _shortLinksFoldersIds.push(
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_shortLinksFoldersIds.length) {
        setCompState(oldValues => ({
          ...oldValues,
          shortLinksFoldersReorder: {
            Ids: _shortLinksFoldersIds,
            isEnable: _shortLinksFoldersIds.length > 1
          }
        }));
      }
    }, 100);
  };

  const invalidedQueries = async () => {
    try {
      // Share workspace.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId
      ]);

      // Share workspace shorts links.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN,
        wsShareId
      ]);

      // Share workspace Folder.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
        wsShareId,
        folderState.shortlink
      ]);

      // Member role & permissions Folder.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
        wsShareId
      ]);
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

  const shortLinksFoldersReOrderHandler = async () => {
    try {
      // The update api...
      const _result = await UpdateSWSShortLinksFoldersReorder({
        requestData: zStringify({
          folders: compState.shortLinksFoldersReorder.Ids
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
          Ids: oldValues.shortLinksFoldersReorder.Ids,
          isEnable: false
        }
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  useEffect(() => {
    try {
      if (
        isSWSFetching === false &&
        isSWSError === false &&
        isSWSShortLinksFoldersDataFetching === false &&
        isSWSShortLinksFoldersDataError === false &&
        isSWSShortLinksDataFetching === false &&
        isSWSShortLinksDataError === false &&
        isGetMemberRolePermissionsFetching === false &&
        isGetMemberRolePermissionsError === false
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
    isSWSFetching,
    isSWSError,
    isSWSShortLinksFoldersDataFetching,
    isSWSShortLinksFoldersDataError,
    isSWSShortLinksDataFetching,
    isSWSShortLinksDataError,
    isGetMemberRolePermissionsFetching,
    isGetMemberRolePermissionsError
  ]);

  const isZFetching =
    isSWSShortLinksFoldersDataFetching ||
    isSWSShortLinksDataFetching ||
    isSWSFetching;
  if (compState.isProcessing) {
    return (
      <ZIonPage>
        <ZIonContent>
          <div className='flex flex-col w-full h-full pt-4 ion-align-items-center ion-justify-content-center'>
            <ZIonSpinner className='w-10 h-10' />

            {isGetMemberRolePermissionsFetching
              ? 'Getting & setting your permissions in this workspace'
              : isSWSFetching
              ? 'Setting share workspace data'
              : isSWSShortLinksDataFetching
              ? 'Fetching share workspace short links'
              : isSWSShortLinksFoldersDataFetching
              ? 'Fetching share workspace short links folders'
              : null}
          </div>

          {/* <ZFallbackIonSpinner /> */}
        </ZIonContent>
      </ZIonPage>
    );
  } else {
    return (
      <>
        {swsShortLinksData && swsShortLinksData?.length > 0 && (
          <ZShortLinksFilterMenu />
        )}

        {!isLgScale ? (
          <AdminPanelShortLinksFolderSideMenu workspaceId={workspaceId} />
        ) : null}

        {/*  */}
        <ZIonPage
          pageTitle='Zaions share workspace short-links list page'
          id={CONSTANTS.MENU_IDS.AD_SL_LIST_PAGE}>
          <ZCan
            shareWSId={wsShareId}
            permissionType={permissionsTypeEnum.shareWSMemberPermissions}
            havePermissions={[shareWSPermissionEnum.viewAny_sws_shortLink]}
            returnPermissionDeniedView={true}>
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
                  'max-w-[200rem] mx-auto': true
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
                      activePage={AdminPanelSidebarMenuPageEnum.shortLink}
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
                        <ZAdminPanelTopBar workspaceId={workspaceId} />
                      </Suspense>

                      {/* Col-2 Row-2 */}
                      <ZIonRow style={{ height: 'calc(100% - 4rem)' }}>
                        {/* Col-2 Row-2 col-1 Folder menu */}
                        {isLgScale && (
                          <ZCan
                            shareWSId={wsShareId}
                            permissionType={
                              permissionsTypeEnum.shareWSMemberPermissions
                            }
                            havePermissions={[
                              shareWSPermissionEnum.viewAny_sws_sl_folder
                            ]}>
                            <Suspense
                              fallback={
                                <ZIonCol className='h-full border-e-[1px] zaions-transition'>
                                  <ZFallbackIonSpinner2 />
                                </ZIonCol>
                              }>
                              <ZDashboardFolderMenu
                                showSkeleton={isZFetching}
                                type={AdminPanelSidebarMenuPageEnum.shortLink}
                                foldersData={
                                  swsShortLinksFoldersData
                                    ? swsShortLinksFoldersData
                                    : []
                                }
                                showFoldersSaveReorderButton={
                                  compState?.shortLinksFoldersReorder?.isEnable
                                }
                                handleFoldersReorder={handleReorder}
                                addNewFolderButtonOnClickHandler={() => {
                                  setFolderFormState(oldVal => ({
                                    ...oldVal,
                                    id: '',
                                    name: '',
                                    formMode: FormMode.ADD
                                  }));
                                  presentFolderModal({
                                    _cssClass: 'link-in-bio-folder-modal'
                                  });
                                }}
                                foldersSaveReorderButtonOnClickHandler={() => {
                                  void shortLinksFoldersReOrderHandler();
                                }}
                                folderActionsButtonOnClickHandler={(
                                  event: unknown
                                ) => {
                                  presentFolderActionIonPopover({
                                    _event: event as Event,
                                    _cssClass:
                                      'zaions_present_folder_Action_popover_width'
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
          </ZCan>
        </ZIonPage>
      </>
    );
  }
};

const ZInpageMainContent: React.FC = () => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    shortLinksFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    shortLinksFoldersReorder: {
      isEnable: false
    }
  });
  // #endregion

  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Custom hooks.
  const { isXlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale(); // media query hook.
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Recoils.
  // Recoil state for shortLinks.
  const shortLinksStateAtom = useRecoilValue(ShortLinksRStateAtom);
  //
  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
    NewShortLinkSelectTypeOption
  );
  // #endregion

  // #region APIS requests.
  // get workspace data api.
  const { isFetching: isSWSFetching } = useZRQGetRequest<workspaceInterface>({
    _url: API_URL_ENUM.ws_share_info_data,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
      wsShareId
    ],
    _authenticated: true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _shouldFetchWhenIdPassed: !workspaceId ? true : false,
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // Request for getting short links folders.
  const { isFetching: isSWSShortLinksFoldersDataFetching } = useZRQGetRequest<
    LinkFolderType[]
  >({
    _url: API_URL_ENUM.ws_share_folder_sl_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
      wsShareId,
      folderState.shortlink
    ],
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId]
  });

  // Update shortLinks folders reorder API
  const { mutateAsync: UpdateSWSShortLinksFoldersReorder } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.ws_share_folder_reorder,
      _queriesKeysToInvalidate: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
        wsShareId,
        folderState.shortlink
      ]
    });

  // Request for getting short links data.
  const { data: swsShortLinksData, isFetching: isSWSShortLinksDataFetching } =
    useZRQGetRequest<ShortLinkType[]>({
      _url: API_URL_ENUM.sws_sl_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN,
        wsShareId
      ],
      _itemsIds: [shareWSMemberId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId]
    });

  const {
    data: getMemberRolePermissions,
    isFetching: isGetMemberRolePermissionsFetching
  } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Popovers.

  // #endregion

  // #region Functions.
  const invalidedQueries = async () => {
    try {
      // Share workspace.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId
      ]);

      // Share workspace shorts links.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN,
        wsShareId
      ]);

      // Share workspace Folder.
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
        wsShareId,
        folderState.shortlink
      ]);

      // Member Role and permissions
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
        wsShareId
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  const resetShortLinkFormHandler = () => {
    try {
      setNewShortLinkFormState(_ => ({
        folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
        shortUrl: {
          domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN
        },
        type: messengerPlatformsBlockEnum.link,
        pixelIds: [],
        tags: [],
        formMode: FormMode.ADD
      }));

      const selectedTypeOptionData = LinkTypeOptionsData.find(
        el => el.type === messengerPlatformsBlockEnum.link
      );

      if (selectedTypeOptionData) {
        setNewShortLinkTypeOptionDataAtom(_ => ({
          ...selectedTypeOptionData
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const isZFetching =
    isSWSShortLinksFoldersDataFetching ||
    isSWSShortLinksDataFetching ||
    isSWSFetching;
  return (
    <>
      <div
        className={classNames({
          'flex flex-col ion-no-margin ion-no-padding': true,
          'gap-4': isMdScale,
          'gap-3 py-3 px-2': !isMdScale
        })}>
        {/* Switch it button & page heading */}
        <ZIonRow
          className={classNames({
            'ion-align-items-center border rounded-lg zaions__light_bg': true,
            'mt-4 ion-padding': isLgScale,
            'mt-2 p-2': !isLgScale
          })}>
          <ZIonCol
            className={classNames({
              'order-1': !isLgScale
            })}>
            <ZIonText
              className={classNames({
                'block font-bold ion-no-padding': true,
                'text-2xl': isLgScale,
                'text-xl': !isLgScale,
                'ion-text-center': !isLgScale
              })}
              // color='medium'
            >
              {getMemberRolePermissions?.memberPermissions?.includes(
                shareWSPermissionEnum.create_sws_shortLink
              )
                ? 'Create a New Link or Manage Existing Ones!'
                : 'Explore Existing Links'}
            </ZIonText>
            <ZIonText
              className={classNames({
                'block mt-1': true,
                'text-sm': !isLgScale,
                'ion-text-center': !isLgScale
              })}
              // color='medium'
            >
              {getMemberRolePermissions?.memberPermissions?.includes(
                shareWSPermissionEnum.create_sws_shortLink
              )
                ? 'Craft fresh links or take a peek at existing ones. The choice is yours!'
                : 'As new member, dive into short link world and oversee existing creations.'}
            </ZIonText>
          </ZIonCol>

          {isLgScale ? (
            <ZCan
              shareWSId={wsShareId}
              permissionType={permissionsTypeEnum.shareWSMemberPermissions}
              havePermissions={[shareWSPermissionEnum.create_sws_sl_folder]}>
              <ZIonCol
                sizeXl='4'
                sizeLg='5'
                sizeMd='5.5'
                sizeSm='12'
                sizeXs='12'
                className={classNames({
                  'order-2': !isLgScale,
                  'mt-3': !isMdScale
                })}>
                <ZaionsCreateShortLinkUrlInput showSkeleton={isZFetching} />
              </ZIonCol>
            </ZCan>
          ) : null}
        </ZIonRow>

        {/* filter input, export, import, & create short links buttons */}
        <ZIonRow className='mt-1 border rounded-lg ion-align-items-center ion-justify-content-between zaions__light_bg ion-padding'>
          <ZIonCol
            sizeXl='4'
            sizeLg='5'
            sizeMd='12'
            sizeSm='12'
            sizeXs='12'>
            <SearchQueryInputComponent />
          </ZIonCol>

          <ZIonCol
            sizeXl='8'
            sizeLg='6'
            sizeMd='12'
            sizeSm='12'
            sizeXs='12'
            className={classNames({
              flex: true,
              'ion-justify-content-end': isXlScale,
              'ion-justify-content-between': !isXlScale
            })}>
            <ZIonButtons
              className={classNames({
                'w-full': true,
                'ion-justify-content-end gap-3': isXlScale,
                'ion-justify-content-between flex': !isXlScale,
                'mt-2': !isLgScale,
                'gap-2 flex-col': !isSmScale
              })}>
              {/* Filter button */}
              {swsShortLinksData && swsShortLinksData?.length > 0 && (
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
                  onClick={async () => {
                    await menuController.enable(
                      true,
                      CONSTANTS.MENU_IDS.SL_FILTERS_MENU_ID
                    );
                    await menuController.open(
                      CONSTANTS.MENU_IDS.SL_FILTERS_MENU_ID
                    );
                  }}>
                  <ZIonIcon
                    icon={filterOutline}
                    className='pr-1'
                  />
                  Filter
                </ZIonButton>
              )}

              {/* <ZIonMenuToggle
								autoHide={false}
								menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID}
							> */}
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
                  onClick={async () => {
                    await menuController.enable(
                      true,
                      CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
                    );
                    await menuController.open(
                      CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
                    );
                  }}>
                  Open folders menu
                </ZIonButton>
              ) : null}
              {/* </ZIonMenuToggle> */}

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
                  void invalidedQueries();
                }}
                testingselector={
                  CONSTANTS.testingSelectors.shortLink.listPage.refetchBtn
                }>
                <ZIonIcon
                  slot='start'
                  icon={refresh}
                />
                Refetch
              </ZIonButton>

              <ZCan
                shareWSId={wsShareId}
                permissionType={permissionsTypeEnum.shareWSMemberPermissions}
                havePermissions={[shareWSPermissionEnum.create_sws_shortLink]}>
                <ZIonButton
                  fill='solid'
                  color='primary'
                  expand={!isSmScale ? 'block' : undefined}
                  height={isLgScale ? '39px' : '20px'}
                  className={classNames({
                    'my-2 normal-case': true,
                    'text-xs w-[25%]': !isLgScale,
                    'w-full': !isSmScale
                  })}
                  onClick={() => resetShortLinkFormHandler()}
                  routerLink={replaceParams(
                    ZaionsRoutes.AdminPanel.ShortLinks.Create,
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    workspaceId
                  )}
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.createBtn
                  }>
                  Create a new link
                </ZIonButton>
              </ZCan>
            </ZIonButtons>
          </ZIonCol>
        </ZIonRow>

        {/* Shortlink Table */}
        <ZCan
          shareWSId={wsShareId}
          permissionType={permissionsTypeEnum.shareWSMemberPermissions}
          havePermissions={[shareWSPermissionEnum.viewAny_sws_shortLink]}>
          <ZaionsShortLinkTable showSkeleton={isZFetching} />
        </ZCan>
      </div>
    </>
  );
};

const SearchQueryInputComponent = () => {
  const setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRStateAtom
  );
  return (
    <Formik
      initialValues={{
        searchValue: ''
      }}
      onSubmit={values => {
        try {
          if (values.searchValue) {
            setShortLinksFilterOptions(oldValues => ({
              ...oldValues,
              searchQuery: values.searchValue
            }));
          } else {
            setShortLinksFilterOptions(oldValues => ({
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
          className='border ion-item-start-no-padding'
          style={{ '--inner-padding-end': '0px' }}
          lines='none'
          minHeight='40px'>
          <ZIonInput
            aria-label='search'
            type='text'
            name='searchValue'
            fill='outline'
            minHeight='40px'
            clearInput={true}
            placeholder='Search link by title, domain...'
            counter={false}
            className='zaions__bg_white'
            onIonChange={handleChange}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.searchInput
            }
            style={{
              '--padding-start': '10px',
              '--border-radius': '0'
            }}
          />
          <ZIonButton
            slot='end'
            className='ion-no-margin ion-text-capitalize'
            onClick={() => void submitForm()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.searchBtn
            }
            style={{
              height: '100%',
              '--border-radius': '0'
            }}>
            <ZIonIcon
              icon={searchOutline}
              className='me-2'
            />
            <ZIonText>search</ZIonText>
          </ZIonButton>
        </ZIonItem>
      )}
    </Formik>
  );
};

export default ZSWSShortLinksListPage;
