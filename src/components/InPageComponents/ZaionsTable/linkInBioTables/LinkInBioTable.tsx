// Core Imports
import React, { useEffect, useRef, useState } from 'react';

// Packages Imports
import routeQueryString from 'qs';
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  fileTrayFullOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

// Custom Imports
import {
  ZTable,
  ZTableHeadCol,
  ZTableRow,
  ZTableRowCol,
  ZTableTBody,
  ZTableTHead
} from '../table-styled-components.sc';

import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonContent,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonCheckbox,
  ZIonTitle,
  ZIonSkeletonText,
  ZIonButton,
  ZIonSelect,
  ZIonSelectOption,
  ZIonRouterLink
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';

// Global Constants
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  createRedirectRoute,
  extractInnerData,
  zConsoleError
} from '@/utils/helpers';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';
import CONSTANTS from '@/utils/constants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';

// Types
import {
  LinkInBioType,
  ZLIBListPageTableColumnsIds,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Recoil State
import { useParams } from 'react-router';
import {
  FilteredLinkInBioLinksDataSelector,
  LinkInBiosFilterOptionsRStateAtom,
  LinkInBiosRStateAtom
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import classNames from 'classnames';
import ZEmptyTable from '../../ZEmptyTable';
import ZaionsAddLinkInBioModal from '../../ZaionsModals/AddNewLinkInBioModal';

// Styles

const ZaionsLinkInBioLinksTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  const { folderId, workspaceId } = useParams<{
    folderId: string;
    workspaceId: string;
  }>();

  // #region APIS requests.
  const { data: getLinkInBioLinkData } = useZRQGetRequest<LinkInBioType[]>({
    _url: API_URL_ENUM.linkInBio_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });
  // #endregion

  // #region Modals.
  const { presentZIonModal: presentAddLinkInBioModal } = useZIonModal(
    ZaionsAddLinkInBioModal,
    {
      workspaceId: workspaceId
    }
  );
  // #endregion

  return (
    <>
      {showSkeleton && <ZaionsLinkInBioTableSkeleton />}

      {!showSkeleton ? (
        getLinkInBioLinkData && getLinkInBioLinkData?.length > 0 ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message="No link-in-bio's founds. please create a link-in-bio."
              // message={`No link-in-bio's founds
              // ${(folderId !== null || folderId !== 'all') &&
              // 	'In this Folder'}
              // . please create a link-in-bio.`}
              btnText='Create link-in-bio'
              btnOnClick={() => {
                presentAddLinkInBioModal({
                  _cssClass: 'folder-modal-size'
                });
              }}
            />
          </div>
        )
      ) : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    selectedLinkInBioLinkId?: string;
    showActionPopover: boolean;
  }>({ showActionPopover: false });
  // #endregion

  const { folderId, workspaceId } = useParams<{
    folderId: string;
    workspaceId: string;
  }>();

  // #region APIS requests.
  const { data: getLinkInBioLinkData } = useZRQGetRequest<LinkInBioType[]>({
    _url: API_URL_ENUM.linkInBio_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });
  // #endregion

  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;

  const { presentZIonPopover: presentZShortLinkActionPopover } = useZIonPopover(
    ZLinkInBioActionPopover,
    {
      workspaceId: workspaceId,
      linInBioId: compState.selectedLinkInBioLinkId
    }
  );

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();

  // #endregion

  // #region Recoils.
  const setLinkInBiosStateAtom = useSetRecoilState(LinkInBiosRStateAtom);

  const _FilteredLinkInBioLinksDataSelector = useRecoilValue(
    FilteredLinkInBioLinksDataSelector
  );

  const _linkInBiosFilterOptionsState = useSetRecoilState(
    LinkInBiosFilterOptionsRStateAtom
  );
  // #endregion

  // #region useEffect's
  useEffect(() => {
    try {
      _linkInBiosFilterOptionsState(oldState => ({
        ...oldState,
        folderId: folderId
      }));
    } catch (error) {
      zConsoleError({
        message:
          'From ZaionsLinkInBioLinksTable -> useIonViewDidEnter -> catch',
        err: error
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  useEffect(() => {
    try {
      if (getLinkInBioLinkData) {
        setLinkInBiosStateAtom(getLinkInBioLinkData);
      }
    } catch (error) {
      zConsoleError({
        message:
          'From ZaionsLinkInBioLinksTable -> useIonViewDidEnter -> catch',
        err: error
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLinkInBioLinkData]);

  useEffect(() => {
    zLinkInBioTable.setPageIndex(Number(pageindex) || 0);
    zLinkInBioTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);

  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<LinkInBioType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZLIBListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select',
      cell: _ => {
        return <ZIonCheckbox />;
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.linkInBioTitle, {
      header: 'Title',
      id: ZLIBListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonRouterLink
            className='hover:underline'
            routerLink={createRedirectRoute({
              url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
              params: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.linkInBio.linkInBioId
              ],
              values: [workspaceId, row?.row?.original?.id!],
              routeSearchParams: {
                page: ZLinkInBioPageEnum.design,
                step: ZLinkInBioRHSComponentEnum.theme
              }
            })}>
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // Date
    columnHelper.accessor(itemData => itemData.createdAt, {
      header: 'Date',
      id: ZLIBListPageTableColumnsIds.date,
      footer: 'Date'
    })
  ];

  const zLinkInBioTable = useReactTable({
    columns: defaultColumns,
    data: _FilteredLinkInBioLinksDataSelector || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion

  return (
    <div>
      <ZCustomScrollable
        className='w-full border rounded-lg h-max ion-no-padding'
        scrollX={true}>
        {zLinkInBioTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
          return (
            <ZIonRow
              key={_headerIndex}
              className='flex flex-nowrap zaions__light_bg'>
              {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                return (
                  <ZIonCol
                    size={
                      _columnInfo.column.id ===
                        ZLIBListPageTableColumnsIds.id ||
                      _columnInfo.column.id ===
                        ZLIBListPageTableColumnsIds.actions
                        ? '.8'
                        : '2.5'
                    }
                    key={_columnInfo.id}
                    className={classNames({
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
                      'border-r': false
                    })}>
                    {_columnInfo.column.columnDef.header?.toString()}
                  </ZIonCol>
                );
              })}

              <ZIonCol
                size='.8'
                className={classNames({
                  'border-b ps-2 py-1 font-bold zaions__light_bg text-sm': true,
                  'border-r': false
                })}>
                Actions
              </ZIonCol>
            </ZIonRow>
          );
        })}

        {/* Body Section */}
        <ZIonRow className='rounded-b-lg'>
          <ZIonCol
            size='12'
            className='w-full ion-no-padding'>
            {zLinkInBioTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
              return (
                <ZIonRow
                  key={_rowIndex}
                  className='flex-nowrap'>
                  {_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
                    _cellInfo.column.getIsVisible() ? (
                      <ZIonCol
                        key={_cellIndex}
                        size={
                          _cellInfo.column.id ===
                            ZLIBListPageTableColumnsIds.id ||
                          _cellInfo.column.id ===
                            ZLIBListPageTableColumnsIds.actions
                            ? '.8'
                            : '2.5'
                        }
                        className={classNames({
                          'py-1 mt-1 border-b flex ion-align-items-center':
                            true,
                          'border-r': false,
                          'ps-2':
                            _cellInfo.column.id !==
                            ZLIBListPageTableColumnsIds.id,
                          'ps-0':
                            _cellInfo.column.id ===
                            ZLIBListPageTableColumnsIds.id
                        })}>
                        <div
                          className={classNames({
                            'w-full text-sm ZaionsTextEllipsis': true,
                            'ps-3':
                              _cellInfo.column.id ===
                              ZLIBListPageTableColumnsIds.id
                          })}>
                          {flexRender(
                            _cellInfo.column.columnDef.cell,
                            _cellInfo.getContext()
                          )}
                        </div>
                      </ZIonCol>
                    ) : null
                  )}

                  <ZIonCol
                    size='.8'
                    className={classNames({
                      'py-1 mt-1 border-b ps-2 ion-justify-content-center flex ion-align-items-center':
                        true,
                      'border-r': false
                    })}>
                    <ZIonButton
                      fill='clear'
                      color='dark'
                      className='ion-no-padding ion-no-margin'
                      size='small'
                      testingselector={
                        CONSTANTS.testingSelectors.linkInBio.listPage.table
                          .actionPopoverBtn
                      }
                      testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
                      onClick={(_event: unknown) => {
                        setCompState(oldVal => ({
                          ...oldVal,
                          selectedLinkInBioLinkId: _rowInfo.original.id || ''
                        }));

                        //
                        presentZShortLinkActionPopover({
                          _event: _event as Event,
                          _cssClass:
                            'zaions_present_folder_Action_popover_width',
                          _dismissOnSelect: false
                        });
                      }}>
                      <ZIonIcon icon={ellipsisVerticalOutline} />
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              );
            })}
          </ZIonCol>
        </ZIonRow>
      </ZCustomScrollable>

      {/*  */}
      <ZIonRow className='w-full px-2 pt-1 pb-2 mt-1 overflow-hidden rounded-lg zaions__light_bg'>
        <ZIonCol className='flex mt-1 ps-1 ion-align-items-center'>
          {/* previous buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zLinkInBioTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [workspaceId, 'all'],
                    routeSearchParams: {
                      pageindex: 0,
                      pagesize: zLinkInBioTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );

                zLinkInBioTable.setPageIndex(0);
              }
            }}>
            <ZIonIcon
              icon={playBackOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zLinkInBioTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table.previousButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanPreviousPage()) {
                zLinkInBioTable.previousPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [workspaceId, 'all'],
                    routeSearchParams: {
                      pageindex:
                        zLinkInBioTable.getState().pagination.pageIndex - 1,
                      pagesize: zLinkInBioTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonIcon
              icon={chevronBackOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          {/* next buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zLinkInBioTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table.nextButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanNextPage()) {
                zLinkInBioTable.nextPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [workspaceId, 'all'],
                    routeSearchParams: {
                      pageindex:
                        zLinkInBioTable.getState().pagination.pageIndex + 1,
                      pagesize: zLinkInBioTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonIcon
              icon={chevronForwardOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zLinkInBioTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanNextPage()) {
                zLinkInBioTable.setPageIndex(
                  zLinkInBioTable.getPageCount() - 1
                );

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [workspaceId, 'all'],
                    routeSearchParams: {
                      pageindex: zLinkInBioTable.getPageCount() - 1,
                      pagesize: zLinkInBioTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonIcon
              icon={playForwardOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>
        </ZIonCol>

        {/* Col for pagination number like 1,2,3,...,n */}
        <ZIonCol></ZIonCol>

        <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem]'
            interface='popover'
            value={zLinkInBioTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zLinkInBioTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                  ],
                  values: [workspaceId, 'all'],
                  routeSearchParams: {
                    pageindex: zLinkInBioTable.getPageCount() - 1,
                    pagesize: Number(e.target.value)
                  }
                })
              );
            }}>
            {[2, 3].map(pageSize => (
              <ZIonSelectOption
                key={pageSize}
                value={pageSize}
                className='h-[2.3rem]'>
                Show {pageSize}
              </ZIonSelectOption>
            ))}
          </ZIonSelect>
        </ZIonCol>
      </ZIonRow>
    </div>
  );
};

const ZaionsLinkInBioTableSkeleton: React.FC = React.memo(() => {
  return (
    <ZIonRow className='px-4 pt-2 pb-1 mx-1 mt-5 overflow-y-scroll zaions_pretty_scrollbar ion-margin-bottom'>
      <ZIonCol>
        <ZTable>
          <ZTableTHead>
            <ZTableRow>
              <ZTableHeadCol>
                <ZIonSkeletonText
                  width='20px'
                  height='20px'
                  animated={true}
                />
              </ZTableHeadCol>
              <ZTableHeadCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableHeadCol>
              <ZTableHeadCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableHeadCol>
              <ZTableHeadCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableHeadCol>
              <ZTableHeadCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableHeadCol>
            </ZTableRow>
          </ZTableTHead>
          <ZTableTBody>
            <ZTableRow>
              <ZTableRowCol>
                <ZIonSkeletonText
                  width='20px'
                  height='20px'
                  animated={true}
                />
              </ZTableRowCol>
              <ZTableRowCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableRowCol>
              <ZTableRowCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableRowCol>
              <ZTableRowCol>
                <ZIonSkeletonText
                  width='40px'
                  height='17px'
                  animated={true}
                />
              </ZTableRowCol>
              <ZTableRowCol>
                <ZIonText
                  color='primary'
                  className='mt-1 cursor-pointer'>
                  <ZIonSkeletonText
                    width='40px'
                    height='17px'
                    animated={true}
                  />
                </ZIonText>
              </ZTableRowCol>
            </ZTableRow>
          </ZTableTBody>
        </ZTable>
      </ZIonCol>
    </ZIonRow>
  );
});

const ZLinkInBioActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  linInBioId: string;
}> = ({ dismissZIonPopover, workspaceId, linInBioId, zNavigatePushRoute }) => {
  const _FilteredLinkInBioLinksDataSelector = useRecoilValue(
    FilteredLinkInBioLinksDataSelector
  );

  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region APIS requests.
  const { mutateAsync: deleteLinkInBioLinkMutateAsync } = useZRQDeleteRequest(
    API_URL_ENUM.linkInBio_update_delete,
    []
  );
  // #endregion

  // #region Functions.
  const editLinkInBioDetails = async () => {
    try {
      if (linInBioId) {
        // was using history here.
        zNavigatePushRoute(
          createRedirectRoute({
            url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
            params: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.linkInBio.linkInBioId
            ],
            values: [workspaceId, linInBioId],
            routeSearchParams: {
              page: ZLinkInBioPageEnum.design,
              step: ZLinkInBioRHSComponentEnum.theme
            }
          })
        );
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const deleteLinkInBio = async () => {
    try {
      if (linInBioId?.trim() && _FilteredLinkInBioLinksDataSelector?.length) {
        await presentZIonAlert({
          header: MESSAGES.LINK_IN_BIO.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.LINK_IN_BIO.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.LINK_IN_BIO.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'danger',
              cssClass: 'zaions_ion_color_danger',
              handler: () => {
                void removeLinkInBio();
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  const removeLinkInBio = async () => {
    try {
      if (linInBioId?.trim() && _FilteredLinkInBioLinksDataSelector?.length) {
        if (linInBioId) {
          const _response = await deleteLinkInBioLinkMutateAsync({
            itemIds: [workspaceId, linInBioId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.linkInBio.linkInBioId
            ]
          });

          if (_response) {
            const _data = extractInnerData<{ success: boolean }>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data && _data.success) {
              // getting all the LinkInBios from RQ cache.
              const _oldLinkInBios =
                extractInnerData<LinkInBioType[]>(
                  getRQCDataHandler<LinkInBioType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                      workspaceId
                    ]
                  }) as LinkInBioType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];

              // removing deleted LinkInBios from cache.
              const _updatedLinkInBios = _oldLinkInBios.filter(
                el => el.id !== linInBioId
              );

              // Updating data in RQ cache.
              await updateRQCDataHandler<LinkInBioType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                  workspaceId
                ],
                data: _updatedLinkInBios as LinkInBioType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });

              showSuccessNotification(MESSAGES.LINK_IN_BIO.DELETE);
            }
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
      <ZCan havePermissions={[permissionsEnum.update_linkInBio]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={
            CONSTANTS.testingSelectors.linkInBio.listPage.table.editBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.listPage.table.editBtn}-${linInBioId}`}>
          <ZIonButton
            size='small'
            expand='full'
            fill='clear'
            color='light'
            className='ion-text-capitalize'
            onClick={() => {
              void editLinkInBioDetails();
            }}>
            <ZIonIcon
              icon={createOutline}
              className='w-5 h-5 me-2'
              color='secondary'
            />
            <ZIonText
              color='secondary'
              className='text-[.9rem] pt-1'>
              Edit
            </ZIonText>
          </ZIonButton>
        </ZIonItem>
      </ZCan>

      <ZCan havePermissions={[permissionsEnum.delete_linkInBio]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => void deleteLinkInBio()}
          testingselector={
            CONSTANTS.testingSelectors.linkInBio.listPage.table.deleteBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.linkInBio.listPage.table.deleteBtn}-${linInBioId}`}>
          <ZIonButton
            size='small'
            expand='full'
            fill='clear'
            color='light'
            className='ion-text-capitalize'>
            <ZIonIcon
              icon={trashBinOutline}
              className='w-4 h-4 me-2'
              color='danger'
            />
            <ZIonText
              color='danger'
              className='text-[.9rem] pt-1'>
              Delete
            </ZIonText>
          </ZIonButton>
        </ZIonItem>
      </ZCan>
    </ZIonList>
  );
};

export default ZaionsLinkInBioLinksTable;
