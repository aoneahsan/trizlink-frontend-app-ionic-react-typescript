// Core Imports
import React, { useEffect, useState } from 'react';

// Packages Imports
import routeQueryString from 'qs';
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { useLocation, useParams } from 'react-router';

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
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonCheckbox,
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
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
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
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';

// Types
import {
  type LinkInBioType,
  ZLIBListPageTableColumnsIds,
  ZLinkInBioPageEnum,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Recoil State
import {
  FilteredLinkInBioLinksDataSelector,
  LinkInBiosFilterOptionsRStateAtom,
  LinkInBiosRStateAtom
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import classNames from 'classnames';
import ZEmptyTable from '../../ZEmptyTable';
import ZaionsAddLinkInBioModal from '../../ZaionsModals/AddNewLinkInBioModal';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  type ZUserSettingInterface,
  ZUserSettingTypeEnum,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';
import { ZUserCurrentLimitsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

// Styles

const ZaionsLinkInBioLinksTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    folderId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region APIS requests.
  // get share-workspace data api.
  const { data: getMemberRolePermissions } = useZRQGetRequest<{
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

  const { data: getLinkInBioLinkData } = useZRQGetRequest<{
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
  // #endregion

  // #region Modals.
  const { presentZIonModal: presentAddLinkInBioModal } = useZIonModal(
    ZaionsAddLinkInBioModal,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId
    }
  );
  // #endregion

  // console.count('ZaionsLinkInBioLinksTable re-rendering');

  return (
    <>
      {showSkeleton && <ZaionsLinkInBioTableSkeleton />}

      {!showSkeleton ? (
        getLinkInBioLinkData !== undefined &&
        getLinkInBioLinkData !== null &&
        getLinkInBioLinkData?.items?.length > 0 ? (
          <ZInpageTable getLinkInBioLinkData={getLinkInBioLinkData} />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message={
                ((wsShareId?.length ?? 0) > 0 &&
                  (getMemberRolePermissions?.memberPermissions?.includes(
                    shareWSPermissionEnum.create_sws_linkInBio
                  ) ??
                    false)) ||
                (workspaceId?.trim()?.length ?? 0) > 0
                  ? "No link-in-bio's founds. please create a link-in-bio."
                  : "No link-in-bio's founds."
              }
              showBtn={
                ((wsShareId?.length ?? 0) > 0 &&
                  (getMemberRolePermissions?.memberPermissions?.includes(
                    shareWSPermissionEnum.create_sws_linkInBio
                  ) ??
                    false)) ||
                (workspaceId?.trim()?.length ?? 0) > 0
              }
              btnText={
                ((wsShareId?.length ?? 0) > 0 &&
                  (getMemberRolePermissions?.memberPermissions?.includes(
                    shareWSPermissionEnum.create_sws_linkInBio
                  ) ??
                    false)) ||
                (workspaceId?.trim()?.length ?? 0) > 0
                  ? 'Create link-in-bio'
                  : undefined
              }
              btnOnClick={() => {
                if (
                  ((wsShareId?.length ?? 0) > 0 &&
                    (getMemberRolePermissions?.memberPermissions?.includes(
                      shareWSPermissionEnum.create_sws_linkInBio
                    ) ??
                      false)) ||
                  (workspaceId?.trim()?.length ?? 0) > 0
                ) {
                  presentAddLinkInBioModal({
                    _cssClass: 'lib-create-modal-size'
                  });
                }
              }}
              // message={`No link-in-bio's founds
              // ${(folderId !== null || folderId !== 'all') &&
              // 'In this Folder'}
              // . please create a link-in-bio.`}
            />
          </div>
        )
      ) : null}
    </>
  );
};

const ZInpageTable: React.FC<{
  getLinkInBioLinkData:
    | {
        items: LinkInBioType[];
        itemsCount: string;
      }
    | null
    | undefined;
}> = ({ getLinkInBioLinkData }) => {
  const { folderId, workspaceId, wsShareId, shareWSMemberId } = useParams<{
    folderId?: string;
    workspaceId?: string;
    wsShareId?: string;
    shareWSMemberId?: string;
  }>();

  // getting search param from url with the help of 'qs' package.
  const { search } = useLocation();
  const routeQSearchParams = routeQueryString.parse(search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;

  // #region Component state.
  const [compState, setCompState] = useState<{
    selectedLinkInBioLinkId?: string;
    showActionPopover: boolean;
  }>({ showActionPopover: false, selectedLinkInBioLinkId: '' });
  // #endregion

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Modals & Popover.
  const { presentZIonPopover: presentZShortLinkActionPopover } = useZIonPopover(
    ZLinkInBioActionPopover,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId,
      linInBioId: compState.selectedLinkInBioLinkId
    }
  );
  // #endregion

  // #region Recoils.
  // Recoil state for storing all link-in-bio's of a user.
  const setLinkInBiosStateAtom = useSetRecoilState(LinkInBiosRStateAtom);

  // Recoil selector that will filter from all link-in-bio state(LinkInBiosRStateAtom) and give the filter link-in-bio.
  const _filteredLinkInBioLinksDataSelector = useRecoilValue(
    FilteredLinkInBioLinksDataSelector
  );

  // Recoil state for storing filter options for link-in-bio. for example folderId, time, etc.
  const _setLinkInBiosFilterOptionsState = useSetRecoilState(
    LinkInBiosFilterOptionsRStateAtom
  );
  // #endregion

  // #region Apis
  const { data: getLinkInBioFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.libListPageTable
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
              ZUserSettingTypeEnum.libListPageTable
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.libListPageTable
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
              ZUserSettingTypeEnum.libListPageTable
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
            routerLink={
              (workspaceId?.trim()?.length ?? 0) > 0
                ? createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.linkInBio.linkInBioId
                    ],
                    values: [workspaceId ?? '', row?.row?.original?.id ?? ''],
                    routeSearchParams: {
                      page: ZLinkInBioPageEnum.design,
                      step: ZLinkInBioRHSComponentEnum.theme
                    }
                  })
                : (wsShareId?.trim()?.length ?? 0) > 0 &&
                  (shareWSMemberId?.trim()?.length ?? 0) > 0
                ? createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Edit,
                    params: [
                      CONSTANTS.RouteParams.workspace.wsShareId,
                      CONSTANTS.RouteParams.workspace.shareWSMemberId,
                      CONSTANTS.RouteParams.linkInBio.linkInBioId
                    ],
                    values: [
                      wsShareId ?? '',
                      shareWSMemberId ?? '',
                      row?.row?.original?.id ?? ''
                    ],
                    routeSearchParams: {
                      page: ZLinkInBioPageEnum.design,
                      step: ZLinkInBioRHSComponentEnum.theme
                    }
                  })
                : ''
            }>
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // Date
    columnHelper.accessor(itemData => itemData.formattedCreatedAt, {
      header: 'Date',
      id: ZLIBListPageTableColumnsIds.date,
      footer: 'Date'
    }),

    // Pixels
    columnHelper.accessor(itemData => itemData.pixelIds, {
      header: 'No of attached pixels',
      id: ZLIBListPageTableColumnsIds.pixel,
      footer: 'Pixels',
      cell: row => {
        return (
          <>
            {Array.isArray(row?.getValue()) &&
            (row?.getValue() as string[])?.length > 0 ? (
              <div className='flex gap-1 ion-align-items-center ZaionsTextEllipsis'>
                <div className=''>{(row?.getValue() as string[])?.length}</div>
                <ZIonText
                  color='primary'
                  className='cursor-pointer'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.table.pixel
                  }
                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.pixel}-${row.row.original.id}`}>
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
      id: ZLIBListPageTableColumnsIds.notes,
      header: 'Notes',
      footer: 'Notes',
      cell: row => {
        const rowsAvailable = row.getValue()?.trim().length ?? 0;
        return (
          <>
            {rowsAvailable > 0 ? (
              <div className='flex ion-align-items-center'>
                <div className='text-sm ZaionsTextEllipsis w-[max-content!important]'>
                  {row.getValue()}
                </div>
                {rowsAvailable > 23 && (
                  <ZIonText
                    color='primary'
                    className='text-sm cursor-pointer'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.listPage.table.notes
                    }
                    testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.notes}-${row.row.original.id}`}>
                    Read more
                  </ZIonText>
                )}
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // link to share
    columnHelper.accessor(itemData => itemData.shortUrl, {
      header: 'Link to share',
      id: ZLIBListPageTableColumnsIds.linkToShare,
      footer: 'Link to share',
      cell: ({ row }) => {
        return (
          <div className='ZaionsTextEllipsis'>{CONSTANTS.NO_VALUE_FOUND}</div>
        );
      }
    })
  ];

  const zLinkInBioTable = useReactTable({
    columns: defaultColumns,
    data: _filteredLinkInBioLinksDataSelector ?? [],
    state: {
      columnOrder: getLinkInBioFiltersData?.settings?.columnOrderIds ?? []
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
      if (getLinkInBioFiltersData?.settings?.columns !== undefined) {
        const _getTitleColumn =
          getLinkInBioFiltersData?.settings?.columns.filter(
            el => el?.id === ZLIBListPageTableColumnsIds.title
          )[0];
        const _getDateColumn =
          getLinkInBioFiltersData?.settings?.columns.filter(
            el => el?.id === ZLIBListPageTableColumnsIds.date
          )[0];
        const _getLinkToShareColumn =
          getLinkInBioFiltersData?.settings?.columns.filter(
            el => el?.id === ZLIBListPageTableColumnsIds.linkToShare
          )[0];
        const _getNotesColumn =
          getLinkInBioFiltersData?.settings?.columns.filter(
            el => el?.id === ZLIBListPageTableColumnsIds.notes
          )[0];
        const _getPixelsColumn =
          getLinkInBioFiltersData?.settings?.columns.filter(
            el => el?.id === ZLIBListPageTableColumnsIds.pixel
          )[0];

        if (_getTitleColumn !== undefined && _getTitleColumn !== null) {
          zLinkInBioTable
            .getColumn(ZLIBListPageTableColumnsIds.title)
            ?.toggleVisibility(_getTitleColumn.isVisible);
        }

        if (_getDateColumn !== undefined && _getDateColumn !== null) {
          zLinkInBioTable
            .getColumn(ZLIBListPageTableColumnsIds.date)
            ?.toggleVisibility(_getDateColumn.isVisible);
        }

        if (
          _getLinkToShareColumn !== undefined &&
          _getLinkToShareColumn !== null
        ) {
          zLinkInBioTable
            .getColumn(ZLIBListPageTableColumnsIds.linkToShare)
            ?.toggleVisibility(_getLinkToShareColumn.isVisible);
        }

        if (_getNotesColumn !== undefined && _getNotesColumn !== null) {
          zLinkInBioTable
            .getColumn(ZLIBListPageTableColumnsIds.notes)
            ?.toggleVisibility(_getNotesColumn.isVisible);
        }

        if (_getPixelsColumn !== undefined && _getPixelsColumn !== null) {
          zLinkInBioTable
            .getColumn(ZLIBListPageTableColumnsIds.pixel)
            ?.toggleVisibility(_getPixelsColumn.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [getLinkInBioFiltersData]);

  useEffect(() => {
    try {
      _setLinkInBiosFilterOptionsState(oldState => ({
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
      if (getLinkInBioLinkData !== undefined && getLinkInBioLinkData !== null) {
        setLinkInBiosStateAtom(getLinkInBioLinkData.items);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLinkInBioLinkData?.items?.length]);

  useEffect(() => {
    zLinkInBioTable.setPageIndex(Number(pageindex ?? 0));
    zLinkInBioTable.setPageSize(Number(pagesize ?? 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageindex, pagesize]);

  // #endregion

  return (
    <div>
      <ZCustomScrollable
        className='w-full border rounded-lg h-max ion-no-padding'
        scrollX>
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
                          selectedLinkInBioLinkId: _rowInfo.original.id ?? ''
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
        <ZIonCol
          sizeXl='4'
          sizeLg='4'
          sizeMd='4'
          sizeSm='4'
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
            disabled={!zLinkInBioTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanPreviousPage()) {
                if ((workspaceId?.trim()?.length ?? 0) > 0) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: 0,
                        pagesize: zLinkInBioTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  (wsShareId?.trim()?.length ?? 0) > 0 &&
                  (shareWSMemberId?.trim()?.length ?? 0) > 0
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId ?? '',
                        shareWSMemberId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: 0,
                        pagesize: zLinkInBioTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                }

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

                if ((workspaceId?.trim()?.length ?? 0) > 0) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zLinkInBioTable.getState().pagination.pageIndex - 1,
                        pagesize: zLinkInBioTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  (wsShareId?.trim()?.length ?? 0) > 0 &&
                  (shareWSMemberId?.trim()?.length ?? 0) > 0
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId ?? '',
                        shareWSMemberId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: +String(pageindex ?? '0') - 1 - 1,
                        pagesize: zLinkInBioTable
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
            disabled={!zLinkInBioTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table.nextButton
            }
            onClick={() => {
              if (zLinkInBioTable.getCanNextPage()) {
                zLinkInBioTable.nextPage();

                if ((workspaceId?.trim()?.length ?? 0) > 0) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex:
                          zLinkInBioTable.getState().pagination.pageIndex + 1,
                        pagesize: zLinkInBioTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  (wsShareId?.trim()?.length ?? 0) > 0 &&
                  (shareWSMemberId?.trim()?.length ?? 0) > 0
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId ?? '',
                        shareWSMemberId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: +String(pageindex ?? '0') + 1,
                        pagesize: zLinkInBioTable
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

                if ((workspaceId?.trim()?.length ?? 0) > 0) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: zLinkInBioTable.getPageCount() - 1,
                        pagesize: zLinkInBioTable
                          .getState()
                          .pagination.pageSize.toString()
                      }
                    })
                  );
                } else if (
                  (wsShareId?.trim()?.length ?? 0) > 0 &&
                  (shareWSMemberId?.trim()?.length ?? 0) > 0
                ) {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        wsShareId ?? '',
                        shareWSMemberId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ],
                      routeSearchParams: {
                        pageindex: zLinkInBioTable.getPageCount() - 1,
                        pagesize: zLinkInBioTable
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
        <ZIonCol></ZIonCol>

        <ZIonCol
          sizeXl='4'
          sizeLg='4'
          sizeMd='4'
          sizeSm='4'
          sizeXs='12'
          className={classNames({
            'flex ion-align-items-center ': true,
            'ion-justify-content-end': isSmScale,
            'ion-justify-content-between mt-1 px-2': !isSmScale
          })}>
          <ZIonText className='mt-1 font-semibold me-3'>
            {getLinkInBioLinkData?.itemsCount ?? 0}{' '}
            {getLinkInBioLinkData !== undefined &&
            getLinkInBioLinkData?.itemsCount !== undefined &&
            +getLinkInBioLinkData?.itemsCount === 1
              ? 'Link-in-bio'
              : "Link-in-bio's"}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='zaions__light_bg w-[7rem]'
            value={zLinkInBioTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.linkInBio.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zLinkInBioTable.setPageSize(Number(e.target.value));

              if ((workspaceId?.trim()?.length ?? 0) > 0) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId ?? '',
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: zLinkInBioTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              } else if (
                (wsShareId?.trim()?.length ?? 0) > 0 &&
                (shareWSMemberId?.trim()?.length ?? 0) > 0
              ) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.wsShareId,
                      CONSTANTS.RouteParams.workspace.shareWSMemberId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      wsShareId ?? '',
                      shareWSMemberId ?? '',
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: zLinkInBioTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              }
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
ZaionsLinkInBioTableSkeleton.displayName = 'ZaionsLinkInBioTableSkeleton';

const ZLinkInBioActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  linInBioId: string;
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonPopover,
  workspaceId,
  linInBioId,
  zNavigatePushRoute,
  shareWSMemberId,
  wsShareId
}) => {
  const _filteredLinkInBioLinksDataSelector = useRecoilValue(
    FilteredLinkInBioLinksDataSelector
  );

  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );

  // #region APIS requests.
  const { mutateAsync: deleteLinkInBioLinkMutateAsync } = useZRQDeleteRequest({
    _url: API_URL_ENUM.linkInBio_update_delete
  });
  // #endregion

  // #region Functions.
  const editLinkInBioDetails = async (): Promise<void> => {
    try {
      if (linInBioId?.trim()?.length > 0) {
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

  const deleteLinkInBio = async (): Promise<void> => {
    try {
      if (
        linInBioId?.trim()?.length > 0 &&
        _filteredLinkInBioLinksDataSelector?.length !== null
      ) {
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

  const removeLinkInBio = async (): Promise<void> => {
    try {
      if (
        linInBioId?.trim()?.length > 0 &&
        _filteredLinkInBioLinksDataSelector?.length !== null
      ) {
        const _response = await deleteLinkInBioLinkMutateAsync({
          itemIds:
            workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim()?.length > 0
              ? [ZWSTypeEum.personalWorkspace, workspaceId, linInBioId]
              : wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
              ? [ZWSTypeEum.shareWorkspace, shareWSMemberId, linInBioId]
              : [],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId
          ]
        });

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data !== null && _data.success) {
            const _libCacheData =
              getRQCDataHandler<LinkInBioType[]>({
                key:
                  workspaceId !== undefined &&
                  workspaceId !== null &&
                  workspaceId?.trim()?.length > 0
                    ? [
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                        workspaceId
                      ]
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
                    : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN]
              }) ?? [];

            // getting all the LinkInBios from RQ cache.
            const _oldLinkInBios =
              extractInnerData<LinkInBioType[]>(
                _libCacheData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted LinkInBios from cache.
            const _updatedLinkInBios = _oldLinkInBios.filter(
              el => el.id !== linInBioId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<LinkInBioType[] | undefined>({
              key:
                workspaceId !== undefined &&
                workspaceId !== null &&
                workspaceId?.trim()?.length > 0
                  ? [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                      workspaceId
                    ]
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
              data: _updatedLinkInBios,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            setZUserCurrentLimitsRState(oldValues => ({
              ...oldValues,
              [planFeaturesEnum.linkInBio]: _updatedLinkInBios?.length
            }));

            dismissZIonPopover();

            showSuccessNotification(MESSAGES.LINK_IN_BIO.DELETE);
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
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? [shareWSPermissionEnum.update_sws_linkInBio]
            : [permissionsEnum.update_linkInBio]
        }>
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

      <ZCan
        shareWSId={wsShareId}
        permissionType={
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0
            ? [shareWSPermissionEnum.delete_sws_linkInBio]
            : [permissionsEnum.delete_linkInBio]
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => {
            void deleteLinkInBio();
          }}
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
