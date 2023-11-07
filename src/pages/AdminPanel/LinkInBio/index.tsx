// Core Imports
import React, { lazy, Suspense, useState } from 'react';

// Packages Imports
import {
  IonCheckbox,
  IonChip,
  IonList,
  type ItemReorderEventDetail,
  type RefresherEventDetail
} from '@ionic/react';
import {
  calendar,
  pricetagOutline,
  filterOutline,
  refresh
} from 'ionicons/icons';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { Formik } from 'formik';

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
//
import ZCan from '@/components/Can';
// const ZCan = lazy(() => import('@/components/Can'));

// const ZCustomScrollable = lazy(
// () => import('@/components/CustomComponents/ZScrollable')
// );
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

// Types
import {
  AdminPanelSidebarMenuPageEnum,
  folderState
} from '@/types/AdminPanel/index.type';
import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type LinkFolderType,
  TimeFilterEnum
} from '@/types/AdminPanel/linksType';

// Recoil States
import {
  LinkInBiosFieldsDataRStateSelector,
  LinkInBiosFilterOptionsRStateAtom,
  LinkInBiosRStateAtom
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

// Global Contents
import {
  useZInvalidateReactQueries,
  useZRQGetRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, PAGE_MENU } from '@/utils/enums';
import { zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

// Styles
import classes from './styles.module.css';

const ZRCheckbox = lazy(
  () => import('@/components/CustomComponents/ZRCheckbox')
);
const ZaionsLinkInBioLinksTable = lazy(
  () =>
    import(
      '@/components/InPageComponents/ZaionsTable/LinkInBioTables/LinkInBioTable'
    )
);
const ZRScrollbars = lazy(
  () => import('@/components/CustomComponents/ZRScrollBar')
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
  // #region Component state.
  const [compState, setCompState] = useState<{
    LinkInBioFoldersReorder: {
      Ids?: string[];
      isEnable?: boolean;
    };
  }>({
    LinkInBioFoldersReorder: {
      isEnable: false
    }
  });
  // #endregion

  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { workspaceId } = useParams<{
    workspaceId?: string;
  }>();

  // #region Custom hooks.
  const { isXlScale, is2XlScale, isMdScale, isLgScale, isSmScale } =
    useZMediaQueryScale();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  const { validateRequestResponse } = useZValidateRequestResponse();
  // #endregion

  // #region Recoils.
  const linkInBiosFilterOptionsState = useRecoilValue(
    LinkInBiosFilterOptionsRStateAtom
  );
  const ZDashboardState = useRecoilValue(ZDashboardRState);
  const linkInBiosStateAtom = useRecoilValue(LinkInBiosRStateAtom);
  // #endregion

  // #region APIS requests.
  // get workspace data api.
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
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined && (workspaceId?.trim()?.length ?? 0) > 0
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  const {
    data: linkInBiosFoldersData,
    isFetching: isLinkInBiosFoldersDataFetching
  } = useZRQGetRequest<LinkFolderType[]>({
    _url: API_URL_ENUM.LinkInBio_folders_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
      workspaceId ?? '',
      folderState.linkInBio
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  const { isFetching: isLinkInBioLinkDataFetching } = useZRQGetRequest<
    LinkInBioType[]
  >({
    _url: API_URL_ENUM.linkInBio_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  // Update shortLinks folders reorder API
  const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
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
      state: folderState.linkInBio
    });

  const { presentZIonPopover: presentLinkInBioTimeFilterModal } =
    useZIonPopover(LinkInBiosTimeRangeFilterPopover);

  const { presentZIonPopover: presentLinkInBioTagsFilterModal } =
    useZIonPopover(LinkInBiosTagsFiltersPopover);

  // const { presentZIonPopover: presentLinkInBioDomainsFilterModal } =
  //   useZIonPopover(LinkInBiosDomainsFiltersPopover);

  // #endregion

  // #region Modals.
  const { presentZIonModal: presentFolderModal } = useZIonModal(
    ZaionsAddNewFolder,
    {
      state: folderState.linkInBio,
      workspaceId
    }
  );

  const { presentZIonModal: presentAddLinkInBioModal } = useZIonModal(
    ZaionsAddLinkInBioModal,
    {
      workspaceId
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
          _block.getAttribute('data-folder-id') as string
        );
      }

      if (_linkInBioFoldersIds.length > 0) {
        setCompState(_ => ({
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
      const _result = await UpdateShortLinksFoldersReorder({
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

  const isZFetching =
    isLinkInBiosFoldersDataFetching ||
    isLinkInBioLinkDataFetching ||
    isSelectedWorkspaceFetching;

  return (
    <ZIonPage
      pageTitle='Zaions link-in-bio list page'
      id={CONSTANTS.MENU_IDS.ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID}
      menu={PAGE_MENU.ADMIN_PANEL_LINK_IN_BIO_FOLDERS_MENU}>
      <ZCan
        havePermissions={[permissionsEnum.viewAny_linkInBio]}
        returnPermissionDeniedView={true}>
        {/* <Suspense fallback={<ZFallbackIonSpinner />}> */}
        <ZIonContent>
          {/* Page Navigation */}
          <ZIonRefresher
            onIonRefresh={event => {
              void handleRefresh(event);
            }}>
            <ZIonRefresherContent />
          </ZIonRefresher>

          {/* Grid-1 */}
          <ZIonGrid className='h-full ion-no-padding'>
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
                  <ZIonRow style={{ height: 'calc(100% - 4rem)' }}>
                    {isLgScale && (
                      <ZCan havePermissions={[permissionsEnum.viewAny_folder]}>
                        <Suspense
                          fallback={
                            <ZIonCol className='h-full border-e-[1px] zaions-transition'>
                              <ZFallbackIonSpinner2 />
                            </ZIonCol>
                          }>
                          <ZDashboardFolderMenu
                            showSkeleton={isZFetching}
                            type={AdminPanelSidebarMenuPageEnum.linkInBio}
                            foldersData={linkInBiosFoldersData ?? []}
                            showFoldersSaveReorderButton={
                              compState?.LinkInBioFoldersReorder?.isEnable
                            }
                            handleFoldersReorder={handleReorder}
                            addNewFolderButtonOnClickHandler={() => {
                              presentFolderModal({
                                _cssClass: 'folder-modal-size'
                              });
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
                      <ZCustomScrollable
                        className='flex flex-col w-full h-full gap-10 px-3'
                        scrollY={true}>
                        <div className='flex flex-col gap-4 ion-no-margin ion-no-padding'>
                          {/* Switch it button & page heading */}
                          <ZIonRow
                            className={classNames({
                              'ion-align-items-center border rounded-lg zaions__light_bg ion-padding':
                                true,
                              'mt-4': isLgScale
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
                                  menu={
                                    CONSTANTS.MENU_IDS
                                      .ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID
                                  }>
                                  <ZIonButton
                                    className={classNames({
                                      'normal-case': true,
                                      'open-folder-menu-button':
                                        isLgScale || isSmScale,
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
                                'order-1': !isMdScale
                              })}>
                              <ZIonText
                                className={classNames({
                                  'text-2xl font-bold block': true,
                                  'ion-text-center ': !isLgScale
                                })}
                                color='medium'>
                                Create a new Link In Bio
                              </ZIonText>
                              <ZIonText
                                className={classNames({
                                  'text-md block': true,
                                  'ion-text-center': !isLgScale
                                })}
                                color='medium'>
                                Create & manage your Link In Bios
                              </ZIonText>
                            </ZIonCol>

                            <ZCan
                              havePermissions={[
                                permissionsEnum.create_shortLink
                              ]}>
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
                                <ZaionsCreateShortLinkUrlInput
                                  showSkeleton={isZFetching}
                                />
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
                                <ZIonButton
                                  id='dropdown-basic'
                                  fill='outline'
                                  color='primary'
                                  height='39px'
                                  expand={!isSmScale ? 'block' : undefined}
                                  testingselector={
                                    CONSTANTS.testingSelectors.linkInBio
                                      .listPage.exportDataBtn
                                  }
                                  className={classNames({
                                    'my-2': true
                                  })}>
                                  Export data&apos;s
                                </ZIonButton>

                                <ZIonButton
                                  fill='outline'
                                  color='primary'
                                  expand={!isSmScale ? 'block' : undefined}
                                  height='39px'
                                  testingselector={
                                    CONSTANTS.testingSelectors.linkInBio
                                      .listPage.bulkImportBtn
                                  }
                                  className={classNames({
                                    'my-2': true
                                  })}>
                                  Bulk Import
                                </ZIonButton>

                                <ZCan
                                  havePermissions={[
                                    permissionsEnum.create_linkInBio
                                  ]}>
                                  <ZIonButton
                                    color='primary'
                                    fill='solid'
                                    height='39px'
                                    expand={!isSmScale ? 'block' : undefined}
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .listPage.createBtn
                                    }
                                    onClick={() => {
                                      presentAddLinkInBioModal({
                                        _cssClass: 'folder-modal-size'
                                      });
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

                          {/* total links count and filters buttons */}
                          <ZIonRow className='mt-1 border rounded-lg ion-align-items-center zaions__light_bg ion-padding'>
                            <ZIonCol className='flex ps-1 ion-align-items-center'>
                              <ZIonText className='text-2xl'>
                                <ZIonText className='font-bold total_links me-1'>
                                  {linkInBiosStateAtom?.length}
                                </ZIonText>
                                links
                              </ZIonText>
                            </ZIonCol>

                            <ZIonCol
                              className={classNames({
                                flex: true,
                                'justify-content-end': isXlScale,
                                'justify-content-between mt-2': !isXlScale
                              })}
                              sizeXl='10'
                              size='12'>
                              <ZIonRow
                                className={classNames({
                                  'w-full ion-justify-content-between': true,
                                  'gap-y-4': !isLgScale
                                })}>
                                <ZIonButtons
                                  className={classNames({
                                    'w-full': true,
                                    'ion-justify-content-between': !isXlScale,
                                    'ion-justify-content-end gap-3': isXlScale,
                                    block: !isMdScale
                                  })}>
                                  {/* Filter by days */}
                                  <ZIonButton
                                    fill='outline'
                                    color='primary'
                                    height='39px'
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .listPage.timeFilterBtn
                                    }
                                    expand={!isMdScale ? 'block' : undefined}
                                    className={classNames({
                                      'ms-auto me-3': isXlScale,
                                      'my-2': !isMdScale
                                    })}
                                    onClick={(event: unknown) => {
                                      presentLinkInBioTimeFilterModal({
                                        _event: event as Event,
                                        _cssClass:
                                          classes[
                                            'link-in-bio-time-filter-modal-size'
                                          ]
                                      });
                                    }}>
                                    <ZIonIcon
                                      slot='start'
                                      className='pb-1'
                                      icon={calendar}
                                    />
                                    {linkInBiosFilterOptionsState.timeFilter
                                      .daysToSubtract === TimeFilterEnum.allTime
                                      ? 'All Times'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.today
                                      ? 'Today'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.lastSevenDays
                                      ? 'Last 7 days'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.last30days
                                      ? 'Last 30 days'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.lastMonth
                                      ? 'Last Mouth'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.thisMonth
                                      ? 'This Month'
                                      : linkInBiosFilterOptionsState.timeFilter
                                          .daysToSubtract ===
                                        TimeFilterEnum.customRange
                                      ? 'Custom Range'
                                      : 'All Time'}
                                  </ZIonButton>

                                  {/* Filter by tags */}
                                  <ZIonButton
                                    fill='outline'
                                    color='primary'
                                    height='39px'
                                    expand={!isMdScale ? 'block' : undefined}
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .listPage.tagsFilterBtn
                                    }
                                    className={classNames({
                                      'ms-auto me-3': isXlScale,
                                      'my-2': !isMdScale
                                    })}
                                    onClick={(event: unknown) => {
                                      presentLinkInBioTagsFilterModal({
                                        _event: event as Event,
                                        _dismissOnSelect: false,
                                        _cssClass:
                                          classes[
                                            'link-in-bio-tags-filter-modal-size'
                                          ]
                                      });
                                    }}>
                                    <ZIonIcon
                                      slot='start'
                                      icon={pricetagOutline}
                                    />
                                    {linkInBiosFilterOptionsState?.tags !==
                                      undefined &&
                                    linkInBiosFilterOptionsState?.tags !== null
                                      ? linkInBiosFilterOptionsState?.tags
                                          ?.length === 1
                                        ? linkInBiosFilterOptionsState.tags[0]
                                        : (linkInBiosFilterOptionsState?.tags
                                            ?.length ?? 0) > 1
                                        ? `${linkInBiosFilterOptionsState.tags?.length} tags`
                                        : 'No values'
                                      : 'No values'}
                                  </ZIonButton>

                                  {/* Refetch data button */}
                                  <ZIonButton
                                    color='primary'
                                    fill='outline'
                                    height='39px'
                                    expand={!isMdScale ? 'block' : undefined}
                                    testingselector={
                                      CONSTANTS.testingSelectors.linkInBio
                                        .listPage.refetchBtn
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
                                </ZIonButtons>
                              </ZIonRow>
                            </ZIonCol>
                          </ZIonRow>
                        </div>

                        {/* Shortlink Table */}
                        <ZCan
                          havePermissions={[permissionsEnum.view_linkInBio]}>
                          <ZaionsLinkInBioLinksTable
                            showSkeleton={isZFetching}
                          />
                        </ZCan>
                      </ZCustomScrollable>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </ZIonCol>
            </ZIonRow>
          </ZIonGrid>
        </ZIonContent>
        {/* </Suspense> */}
      </ZCan>
    </ZIonPage>
  );
};

const LinkInBiosTimeRangeFilterPopover: React.FC = () => {
  const [linkInBiosFilterOptionsState, setLinkInBiosFilterOptionsState] =
    useRecoilState(LinkInBiosFilterOptionsRStateAtom);

  const timeRangeFilterSubmission = (_value: TimeFilterEnum): void => {
    try {
      setLinkInBiosFilterOptionsState(oldValues => ({
        ...oldValues,
        daysToSubtract: _value
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZRScrollbars style={{ width: 200, height: 300 }}>
      <div className='ion-padding-horizontal'>
        <ZIonButton
          color={'secondary'}
          expand='block'
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.allTime);
          }}
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.allTime
              ? 'solid'
              : 'outline'
          }>
          All Time
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.today);
          }}
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.today
              ? 'solid'
              : 'outline'
          }>
          Today
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.lastSevenDays);
          }}
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.lastSevenDays
              ? 'solid'
              : 'outline'
          }>
          Last 7 days
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.last30days
              ? 'solid'
              : 'outline'
          }
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.last30days);
          }}>
          Last 30 days
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.thisMonth
              ? 'solid'
              : 'outline'
          }
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.thisMonth);
          }}>
          This month
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.lastMonth
              ? 'solid'
              : 'outline'
          }
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.lastMonth);
          }}>
          Last month
        </ZIonButton>
        <ZIonButton
          color={'secondary'}
          expand='block'
          fill={
            linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
            TimeFilterEnum.customRange
              ? 'solid'
              : 'outline'
          }
          className='mx-2 my-3'
          onClick={() => {
            timeRangeFilterSubmission(TimeFilterEnum.customRange);
          }}>
          Custom Range
        </ZIonButton>
      </div>
    </ZRScrollbars>
  );
};

const LinkInBiosTagsFiltersPopover: React.FC = () => {
  // For getting all tags data
  const { tags: _LinkInBiosFieldsDataTagsSelector } = useRecoilValue(
    LinkInBiosFieldsDataRStateSelector
  );

  // For getting filter.
  const [linkInBiosFilterOptionsState, setLinkInBiosFilterOptionsState] =
    useRecoilState(LinkInBiosFilterOptionsRStateAtom);

  // function for generating initialValue for formik below.
  const generateInitialValueOfTagsFormik = (
    allTags: string[],
    filteredTags: string[] = []
  ): {
    _filteredTags?: Record<string, boolean>;
    _allTags?: boolean;
  } => {
    try {
      const _filteredTags: Record<string, boolean> = {};
      let _allTags = true;
      if (allTags.length > 0) {
        allTags.forEach((tag, i) => {
          if (filteredTags.includes(tag)) {
            _filteredTags[tag] = true;
          } else {
            _filteredTags[tag] = false;
            _allTags = false;
          }
        });
      }
      return { _filteredTags, _allTags };
    } catch (error) {
      reportCustomError(error);
      return {};
    }
  };

  return (
    <ZRScrollbars style={{ width: 300, height: 300 }}>
      <Formik
        initialValues={generateInitialValueOfTagsFormik(
          _LinkInBiosFieldsDataTagsSelector,
          linkInBiosFilterOptionsState.tags as string[]
        )}
        onSubmit={values => {
          try {
            if (values._filteredTags !== null) {
              const _tags: string[] = [];
              for (const [key, value] of Object.entries(
                values?._filteredTags ?? {}
              )) {
                if (value) {
                  _tags.push(key);
                }
              }

              setLinkInBiosFilterOptionsState(oldVales => ({
                ...oldVales,
                tags: [..._tags]
              }));
            }
          } catch (error) {
            reportCustomError(error);
          }
        }}
        enableReinitialize>
        {({ values, submitForm, handleBlur, setFieldValue }) => {
          return (
            <>
              <ZIonButton
                expand='block'
                className='m-0 ion-text-capitalize'
                onClick={() => {
                  void submitForm();
                }}>
                <ZIonIcon
                  icon={filterOutline}
                  className='me-1'
                />
                <ZIonText>filter</ZIonText>
              </ZIonButton>
              <ZIonItem className='ion-no-padding'>
                <ZIonText className='font-bold ms-3 text-[14px] zaions__color_gray2'>
                  All Tags
                </ZIonText>

                <ZRCheckbox
                  checkedValue={values._allTags}
                  handleChange={checked => {
                    void setFieldValue('_allTags', checked, false);
                    _LinkInBiosFieldsDataTagsSelector.forEach(el => {
                      void setFieldValue(`_filteredTags.${el}`, checked, false);
                    });
                  }}
                  className='ms-auto'
                />
              </ZIonItem>
              <IonList lines='none'>
                {_LinkInBiosFieldsDataTagsSelector.map((el, i) => {
                  return (
                    <ZIonItem key={i}>
                      <IonChip className='m-0 text-[14px]'>{el}</IonChip>
                      <IonCheckbox
                        slot='end'
                        checked={
                          values?._filteredTags !== undefined &&
                          values._filteredTags[el]
                        }
                        name={el}
                        onIonChange={({ target }) => {
                          if (
                            !target.checked &&
                            values?._allTags !== undefined &&
                            values?._allTags !== null
                          ) {
                            void setFieldValue('_allTags', false, false);
                          }
                          void setFieldValue(
                            `_filteredTags.${el}`,
                            target.checked,
                            false
                          );
                        }}
                        onIonBlur={handleBlur}
                      />
                    </ZIonItem>
                  );
                })}
              </IonList>
            </>
          );
        }}
      </Formik>
    </ZRScrollbars>
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
//     <ZRScrollbars style={{ width: 300, height: 300 }}>
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
  return (
    <Formik
      initialValues={{
        searchValue: ''
      }}
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
          className='ion-item-start-no-padding'
          style={{ '--inner-padding-end': '0px' }}
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
            className='zaions__bg_white'
            minHeight='40px'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.searchInput
            }
            style={{
              '--padding-start': '10px',
              '--border-radius': '0'
            }}
          />
          <ZIonButton
            onClick={() => {
              void submitForm();
            }}
            slot='end'
            className='ion-no-margin ion-text-capitalize'
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.searchBtn
            }
            style={{
              height: '100%',
              '--border-radius': '0'
            }}>
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
