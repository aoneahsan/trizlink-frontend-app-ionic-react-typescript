import React, { useEffect, useState } from 'react';
import {
  chevronBackOutline,
  chevronForwardOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';
import routeQueryString from 'qs';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import ZaionsPixelAccountDetail from '../ZaionsModals/PixelAccount/pixelAccountDetailModal';
import ZaionsLinkNoteDetailModal from '../ZaionsModals/LinkNote/LinkNoteDetail';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonCheckbox,
  ZIonSelect,
  ZIonSelectOption,
  ZIonButton,
  ZIonRouterLink
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  createRedirectRoute,
  zGenerateShortLink,
  replaceRouteParams
} from '@/utils/helpers';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import {
  useZIonModal,
  useZIonPopover,
  useZIonToast
} from '@/ZaionsHooks/zionic-hooks';
import {
  type LinkTargetType,
  type ShortLinkType,
  ZShortLinkListPageTableColumnsIds
} from '@/types/AdminPanel/linksType';
import {
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';
import {
  FilteredShortLinkDataSelector,
  ShortLinksFilterOptionsRStateAtom,
  ShortLinksRStateAtom
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { reportCustomError } from '@/utils/customErrorType';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { ZShortLinkActionPopover } from './ShortLinkListTable';

//
export const ZInpageTable: React.FC = () => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    selectedShortLinkId?: string;
  }>({});
  // #endregion
  // Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
  const { folderId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    folderId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Recoils.
  // Recoil state for storing all short links of a user.
  const setShortLinksStateAtom = useSetRecoilState(ShortLinksRStateAtom);
  // Recoil selector that will filter from all short links state(ShortLinksRStateAtom) and give the filter short links.
  const _FilteredShortLinkDataSelector = useRecoilValue(
    FilteredShortLinkDataSelector
  );

  // Recoil state for storing filter options. for example folderId, time, etc.
  const _setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRStateAtom
  );
  //
  const setShortLinkFormState = useSetRecoilState(ShortLinkFormState);
  // #endregion
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonToast } = useZIonToast();
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  // const { search } = useLocation();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion
  // #region APIS requests.
  // Request for getting short links data.
  const { data: ShortLinksData } = useZRQGetRequest<{
    items: ShortLinkType[];
    itemsCount: string;
  }>({
    _url: API_URL_ENUM.shortLinks_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
      workspaceId ?? '',
      String(pageindex),
      String(pagesize)
    ],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined && workspaceId?.trim()?.length > 0
    ),
    _itemsIds: [workspaceId ?? '', String(pageindex), String(pagesize)],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.pageNumber,
      CONSTANTS.RouteParams.paginationLimit
    ],
    _showLoader: false,
    _extractType: ZRQGetRequestExtractEnum.extractData
  });

  // Request for getting share workspace short links data.
  const { data: swsShortLinksData } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.sws_sl_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN,
      wsShareId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined && (wsShareId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If owned-workspace then this api will fetch owned-workspace-short-link filters options data.
  const { data: getShortLinkFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.shortLinkListPageTable
            ]
          : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                wsShareId,
                shareWSMemberId,
                ZUserSettingTypeEnum.shortLinkListPageTable
              ]
            : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.shortLinkListPageTable
            ]
          : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [
                ZWSTypeEum.shareWorkspace,
                shareWSMemberId,
                ZUserSettingTypeEnum.shortLinkListPageTable
              ]
            : [],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        ((wsShareId?.trim()?.length ?? 0) === 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
        (workspaceId?.trim()?.length ?? 0) === 0
      ),
      _showLoader: false
    });
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonModal: presentPixelAccountDetailModal } = useZIonModal(
    ZaionsPixelAccountDetail,
    { workspaceId, shareWSMemberId, wsShareId }
  );

  const { presentZIonModal: presentShortLinkNoteModal } = useZIonModal(
    ZaionsLinkNoteDetailModal
  );

  const { presentZIonPopover: presentZShortLinkActionPopover } = useZIonPopover(
    ZShortLinkActionPopover,
    {
      workspaceId,
      shareWSMemberId,
      wsShareId,
      shortLinkId: compState.selectedShortLinkId
    }
  );
  // #endregion
  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<ShortLinkType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZShortLinkListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: props => {
        return <ZIonCheckbox />;
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.title, {
      header: 'Title',
      id: ZShortLinkListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonRouterLink
            className='hover:underline'
            routerLink={
              workspaceId !== undefined
                ? replaceRouteParams(
                    ZaionsRoutes.AdminPanel.ShortLinks.Edit,
                    [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.editShortLinkIdParam
                    ],
                    [workspaceId, row?.row?.original?.id ?? '']
                  )
                : wsShareId !== undefined && shareWSMemberId !== undefined
                  ? replaceRouteParams(
                      ZaionsRoutes.AdminPanel.ShareWS.Short_link.Edit,
                      [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.editShortLinkIdParam
                      ],
                      [wsShareId, shareWSMemberId, row?.row?.original?.id ?? '']
                    )
                  : ''
            }>
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // Date
    columnHelper.accessor(itemData => itemData.createdAt, {
      header: 'Date',
      id: ZShortLinkListPageTableColumnsIds.date,
      footer: 'Date'
    }),

    // Pixels
    columnHelper.accessor(itemData => itemData.pixelIds, {
      header: 'No of attached pixels',
      id: ZShortLinkListPageTableColumnsIds.pixel,
      footer: 'Pixels',
      cell: row => {
        return (
          <>
            {(row?.getValue() as string[])?.length > 0 ? (
              <div className='flex gap-1 ion-align-items-center ZaionsTextEllipsis'>
                <div className=''>{(row?.getValue() as string[])?.length}</div>
                <ZIonText
                  color='primary'
                  className='cursor-pointer'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.table.pixel
                  }
                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.pixel}-${row.row.original.id}`}
                  onClick={() => {
                    setShortLinkFormState(oldVal => ({
                      ...oldVal,
                      pixelAccountIds: JSON.parse(
                        (row?.getValue() ?? '').toString()
                      ) as string[]
                    }));
                    // Open The Modal
                    presentPixelAccountDetailModal({
                      _cssClass: 'pixel-account-detail-modal-size'
                    });
                  }}>
                  View Pixels
                </ZIonText>
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // Notes
    columnHelper.accessor(itemData => itemData.notes, {
      id: ZShortLinkListPageTableColumnsIds.notes,
      header: 'Notes',
      footer: 'Notes',
      cell: row => {
        return (
          <>
            {row.getValue() !== undefined ? (
              <div className='flex ion-align-items-center'>
                <div className='text-sm ZaionsTextEllipsis'>
                  {row.getValue()}
                </div>
                <ZIonText
                  color='primary'
                  className='text-sm cursor-pointer'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.table.notes
                  }
                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.notes}-${row.row.original.id}`}
                  onClick={() => {
                    setShortLinkFormState(oldVal => ({
                      ...oldVal,
                      note: row.getValue()
                    }));
                    presentShortLinkNoteModal({
                      _cssClass: 'pixel-account-detail-modal-size'
                    });
                  }}>
                  Read more
                </ZIonText>
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // Url
    columnHelper.accessor(
      itemData => {
        if (itemData?.target !== undefined) {
          return (itemData.target as LinkTargetType).url;
        }
      },
      {
        header: 'Url',
        id: ZShortLinkListPageTableColumnsIds.url,
        cell: row => (
          <ZIonRouterLink
            routerLink={String(row.getValue())}
            color='dark'
            className='hover:underline'
            target='_blank'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.url
            }
            testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.url}-${row.row.original.id}`}>
            {row.getValue()}
          </ZIonRouterLink>
        ),
        footer: 'Url Footer'
      }
    ),

    // link to share
    columnHelper.accessor(itemData => itemData.shortUrlDomain, {
      header: 'Link to share',
      id: ZShortLinkListPageTableColumnsIds.linkToShare,
      footer: 'Link to share',
      cell: ({ row }) => {
        const _shortLink = zGenerateShortLink({
          domain: row?.original?.shortUrlDomain,
          urlPath: row?.original?.shortUrlPath
        });
        return (
          <div className='ZaionsTextEllipsis'>
            <ZIonText
              color='primary'
              className='block cursor-pointer hover:underline'
              id={`z-shortlink-${row?.original?.id}`}
              testingselector={
                CONSTANTS.testingSelectors.shortLink.listPage.table.linkToShare
              }
              testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.linkToShare}-${row.original.id}`}
              onClick={() => {
                void navigator.clipboard.writeText(_shortLink ?? '');

                void presentZIonToast('✨ Copied', 'tertiary');
              }}>
              {_shortLink}
            </ZIonText>

            <ZRTooltip
              anchorSelect={`#z-shortlink-${row?.original?.id}`}
              place='top'
              onArrow={true}
              variant='info'
              className='z-50'>
              <ZIonText>{_shortLink}</ZIonText>
            </ZRTooltip>
          </div>
        );
      }
    })
  ];

  const zShortLinksTable = useReactTable({
    columns: defaultColumns,
    data: _FilteredShortLinkDataSelector ?? [],
    state: {
      columnOrder: getShortLinkFiltersData?.settings?.columnOrderIds ?? []
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });

  // #endregion
  // #region useEffect's
  useEffect(() => {
    try {
      if (
        getShortLinkFiltersData?.settings?.columns !== undefined &&
        getShortLinkFiltersData?.settings?.columns !== null
      ) {
        const _getTitleColumn =
          getShortLinkFiltersData?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.title
          )[0];

        const _getDateColumn =
          getShortLinkFiltersData?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.date
          )[0];

        const _getLinkToShareColumn =
          getShortLinkFiltersData?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.linkToShare
          )[0];

        const _getNotesColumn =
          getShortLinkFiltersData?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.notes
          )[0];

        const _getPixelsColumn =
          getShortLinkFiltersData?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.pixel
          )[0];

        const _getUrlColumn = getShortLinkFiltersData?.settings?.columns.filter(
          el => el?.id === ZShortLinkListPageTableColumnsIds.url
        )[0];

        if (_getTitleColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.title)
            ?.toggleVisibility(_getTitleColumn.isVisible);
        }

        if (_getDateColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.date)
            ?.toggleVisibility(_getDateColumn.isVisible);
        }

        if (_getLinkToShareColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.linkToShare)
            ?.toggleVisibility(_getLinkToShareColumn.isVisible);
        }

        if (_getNotesColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.notes)
            ?.toggleVisibility(_getNotesColumn.isVisible);
        }

        if (_getPixelsColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.pixel)
            ?.toggleVisibility(_getPixelsColumn.isVisible);
        }

        if (_getUrlColumn !== undefined) {
          zShortLinksTable
            .getColumn(ZShortLinkListPageTableColumnsIds.linkToShare)
            ?.toggleVisibility(_getUrlColumn.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getShortLinkFiltersData]);

  // When the short links data fetch from backend, storing it in ShortLinksRStateAtom recoil state.
  useEffect(() => {
    try {
      _setShortLinksFilterOptions(oldState => ({
        ...oldState,
        folderId
      }));
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  useEffect(() => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        ShortLinksData !== undefined
      ) {
        setShortLinksStateAtom(ShortLinksData?.items);
      } else if (wsShareId !== undefined && swsShortLinksData !== undefined) {
        setShortLinksStateAtom(swsShortLinksData ?? []);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShortLinksData, swsShortLinksData]);
  // #endregion

  return (
    <div
      className={classNames({
        'mt-2': !isMdScale
      })}>
      <ZCustomScrollable
        className='w-full border rounded-lg h-max ion-no-padding'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zShortLinksTable
            .getHeaderGroups()
            .map((_headerInfo, _headerIndex) => {
              return (
                <ZIonRow
                  key={_headerIndex}
                  className='flex flex-nowrap zaions__light_bg'>
                  {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                    return (
                      <ZIonCol
                        size={
                          _columnInfo.column.id ===
                            ZShortLinkListPageTableColumnsIds.id ||
                          _columnInfo.column.id ===
                            ZShortLinkListPageTableColumnsIds.actions
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
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
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
              {zShortLinksTable
                .getRowModel()
                .rows.map((_rowInfo, _rowIndex) => {
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
                                ZShortLinkListPageTableColumnsIds.id ||
                              _cellInfo.column.id ===
                                ZShortLinkListPageTableColumnsIds.actions
                                ? '.8'
                                : '2.5'
                            }
                            className={classNames({
                              'py-1 mt-1 border-b flex ion-align-items-center':
                                true,
                              'border-r': false,
                              'ps-2':
                                _cellInfo.column.id !==
                                ZShortLinkListPageTableColumnsIds.id,
                              'ps-0':
                                _cellInfo.column.id ===
                                ZShortLinkListPageTableColumnsIds.id
                            })}>
                            <div
                              className={classNames({
                                'w-full text-sm ZaionsTextEllipsis': true,
                                'ps-3':
                                  _cellInfo.column.id ===
                                  ZShortLinkListPageTableColumnsIds.id
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
                            CONSTANTS.testingSelectors.shortLink.listPage.table
                              .actionPopoverBtn
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
                          onClick={(_event: unknown) => {
                            setCompState(oldVal => ({
                              ...oldVal,
                              selectedShortLinkId: _rowInfo.original.id ?? ''
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
        </div>
      </ZCustomScrollable>

      {/*  */}
      <ZIonRow
        className={classNames({
          'w-full px-2 pt-1 pb-2 mt-1 overflow-hidden rounded-lg zaions__light_bg':
            true,
          'mt-2': !isMdScale
        })}>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className={classNames({
            'flex mt-1': true,
            'ion-align-items-center': isSmScale,
            'ion-justify-content-center': !isSmScale
          })}>
          {/* previous buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zShortLinksTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanPreviousPage()) {
                if (workspaceId !== undefined) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: 0,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  wsShareId !== undefined &&
                  shareWSMemberId !== undefined
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId,
                        shareWSMemberId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: 0,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                }

                zShortLinksTable.setPageIndex(0);
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
            disabled={!zShortLinksTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.previousButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanPreviousPage()) {
                zShortLinksTable.previousPage();

                if (workspaceId !== undefined) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zShortLinksTable.getState().pagination.pageIndex - 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  wsShareId !== undefined &&
                  shareWSMemberId !== undefined
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId,
                        shareWSMemberId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zShortLinksTable.getState().pagination.pageIndex - 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                }
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
            disabled={
              +String(pagesize) * +String(pageindex) + +String(pagesize) >=
              +(ShortLinksData?.itemsCount ?? '0')
            }
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.nextButton
            }
            onClick={() => {
              if (
                +String(pagesize ?? '0') * +String(pageindex ?? '0') +
                  +String(pagesize ?? '0') <=
                +(ShortLinksData?.itemsCount ?? '0')
              ) {
                // zShortLinksTable.nextPage();
                zShortLinksTable.setPageIndex(
                  zShortLinksTable.getState().pagination.pageIndex + 1
                );

                zShortLinksTable.setPageIndex(
                  zShortLinksTable.getState().pagination.pageIndex + 1
                );

                console.log({
                  log: 'yess',
                  c: zShortLinksTable.getState().pagination.pageIndex
                });

                if (workspaceId !== undefined) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zShortLinksTable.getState().pagination.pageIndex + 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  wsShareId !== undefined &&
                  shareWSMemberId !== undefined
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId,
                        shareWSMemberId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zShortLinksTable.getState().pagination.pageIndex + 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                }
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
            disabled={!zShortLinksTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanNextPage()) {
                zShortLinksTable.setPageIndex(
                  zShortLinksTable.getPageCount() - 1
                );

                if (workspaceId !== undefined) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: zShortLinksTable.getPageCount() - 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  wsShareId !== undefined &&
                  shareWSMemberId !== undefined
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId,
                        shareWSMemberId,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: zShortLinksTable.getPageCount() - 1,
                        pagesize: zShortLinksTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                }
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
        {/* <ZIonCol></ZIonCol> */}

        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className={classNames({
            'flex ion-align-items-center ': true,
            'ion-justify-content-end': isSmScale,
            'ion-justify-content-between mt-1 px-2': !isSmScale
          })}>
          <ZIonText className='mt-1 font-semibold me-3'>
            {ShortLinksData?.itemsCount ?? 0}{' '}
            {ShortLinksData !== undefined &&
            ShortLinksData?.itemsCount !== undefined &&
            +ShortLinksData?.itemsCount === 1
              ? 'Link'
              : 'Links'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='zaions__bg_white w-[8rem]'
            value={
              zShortLinksTable.getState().pagination.pageSize ??
              CONSTANTS.pagination.defaultPageSize
            }
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zShortLinksTable.setPageSize(Number(e.target.value));

              if (workspaceId !== undefined) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: zShortLinksTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              } else if (
                wsShareId !== undefined &&
                shareWSMemberId !== undefined
              ) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.wsShareId,
                      CONSTANTS.RouteParams.workspace.shareWSMemberId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      wsShareId,
                      shareWSMemberId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: zShortLinksTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              }
            }}>
            {CONSTANTS.pagination.pageSizeOptions.map(pageSize => (
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
