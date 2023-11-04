/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import ZaionsAddPixelAccount from '../ZaionsModals/AddPixelsAccount';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZEmptyTable from '../ZEmptyTable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type PixelAccountType,
  type PixelPlatformsEnum
} from '@/types/AdminPanel/linksType';
import {
  FormMode,
  ZPixelsListPageTableColumnsIds,
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  FilteredPixelsDataRStateSelector,
  PixelAccountsRStateAtom
} from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZPixelsTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region custom hooks.
  // #endregion

  // #region APIS requests.
  // If owned-workspace then this api will fetch pixels in this owned-workspace.
  const { data: PixelsData, isFetching: isPixelsDateFetching } =
    useZRQGetRequest<PixelAccountType[]>({
      _url: API_URL_ENUM.userPixelAccounts_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
        workspaceId ?? ''
      ],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _itemsIds: [workspaceId ?? ''],
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      )
    });

  // If share-workspace then this api will fetch pixels in this share-workspace.
  const { data: swsPixelsData, isFetching: isSWSPixelsDateFetching } =
    useZRQGetRequest<PixelAccountType[]>({
      _url: API_URL_ENUM.sws_pixel_account_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
        wsShareId ?? ''
      ],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _itemsIds: [shareWSMemberId ?? ''],
      _shouldFetchWhenIdPassed: !(
        wsShareId !== undefined &&
        wsShareId !== null &&
        (wsShareId?.trim()?.length ?? 0) > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        (shareWSMemberId?.trim()?.length ?? 0) > 0
      )
    });

  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
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
      wsShareId !== undefined &&
      wsShareId !== null &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId !== null &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { formMode: FormMode.ADD, workspaceId, wsShareId, shareWSMemberId }
  );
  // #endregion

  // #region Functions.

  // #endregion

  let isZFetching = isPixelsDateFetching;

  if (
    workspaceId !== undefined &&
    workspaceId !== null &&
    (workspaceId?.trim()?.length ?? 0) > 0
  ) {
    isZFetching = isPixelsDateFetching;
  } else if (
    (wsShareId?.trim()?.length ?? 0) > 0 &&
    shareWSMemberId !== undefined &&
    shareWSMemberId !== null &&
    (shareWSMemberId?.trim()?.length ?? 0) > 0
  ) {
    isZFetching = isSWSPixelsDateFetching;
  }

  return (
    <>
      {!isZFetching ? (
        (workspaceId !== undefined &&
          workspaceId !== null &&
          (workspaceId?.trim()?.length ?? 0) > 0 &&
          PixelsData !== null &&
          PixelsData !== undefined &&
          PixelsData?.length > 0) ||
        (wsShareId !== undefined &&
          wsShareId !== null &&
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
          swsPixelsData?.length !== undefined &&
          swsPixelsData?.length !== null &&
          swsPixelsData?.length > 0) ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message={
                [
                  shareWSPermissionEnum.create_sws_pixel,
                  shareWSPermissionEnum.update_sws_pixel
                ].some(el =>
                  getMemberRolePermissions?.memberPermissions?.includes(el)
                ) ||
                (workspaceId !== undefined &&
                  workspaceId !== null &&
                  (workspaceId?.trim()?.length ?? 0) > 0 &&
                  PixelsData?.length !== null)
                  ? 'No pixels founds. please create a pixel.'
                  : 'No pixels founds.'
              }
              btnText='Create pixel'
              btnOnClick={() => {
                presentZAddPixelAccount({
                  _cssClass: 'pixel-account-modal-size'
                });
              }}
              showBtn={
                [
                  shareWSPermissionEnum.create_sws_pixel,
                  shareWSPermissionEnum.update_sws_pixel
                ].some(el =>
                  getMemberRolePermissions?.memberPermissions?.includes(el)
                ) ||
                (workspaceId !== undefined &&
                  workspaceId !== null &&
                  (workspaceId?.trim()?.length ?? 0) > 0 &&
                  PixelsData?.length !== null)
              }
            />
          </div>
        )
      ) : null}

      {showSkeleton || isZFetching ? <ZPixelTableSkeleton /> : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  const [compState, setCompState] = useState<{
    selectedId?: string;
    selectedPixelId?: string;
    selectedPixelTitle?: string;
    selectedPixelPlatform?: PixelPlatformsEnum;
  }>();

  // #region Recoil state.
  const setPixelDataRState = useSetRecoilState(PixelAccountsRStateAtom);
  const filteredPixelsDataRSelector = useRecoilValue(
    FilteredPixelsDataRStateSelector
  );
  // #endregion

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  // #region APIS requests.
  // If owned-workspace then this api will fetch pixels in this owned-workspace.
  const { data: PixelsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
      workspaceId ?? ''
    ],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId ?? ''],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined &&
      workspaceId !== null &&
      (workspaceId?.trim()?.length ?? 0) > 0
    )
  });

  // If share-workspace then this api will fetch pixels in this share-workspace.
  const { data: swsPixelsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.sws_pixel_account_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
      wsShareId ?? ''
    ],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [shareWSMemberId ?? ''],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      wsShareId !== null &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId !== null &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    )
  });

  const { data: getPixelFiltersData } = useZRQGetRequest<ZUserSettingInterface>(
    {
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        workspaceId ?? '',
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [workspaceId ?? '', ZUserSettingTypeEnum.pixelListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      )
    }
  );

  const { data: getSWSPixelFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.sws_user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [
        shareWSMemberId ?? '',
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.shareWSMemberId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      )
    });
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<PixelAccountType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZPixelsListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: ({ row }) => {
        return (
          <ZIonCheckbox
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.select}-${row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.select
            }
          />
        );
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.title, {
      header: 'Title',
      id: ZPixelsListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.title}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.title
            }>
            {row.getValue()}
          </ZIonText>
        );
      },
      footer: 'Title'
    }),

    // pixelId
    columnHelper.accessor(itemData => itemData.pixelId, {
      header: 'pixel id',
      id: ZPixelsListPageTableColumnsIds.pixelId,
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.pixelId}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.pixelId
            }>
            {row.getValue()}
          </ZIonText>
        );
      },
      footer: 'pixel id'
    }),

    // platform
    columnHelper.accessor(itemData => itemData.platform, {
      header: 'platform',
      id: ZPixelsListPageTableColumnsIds.platform,
      footer: 'platform',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.platform}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.platform
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // create at
    columnHelper.accessor(itemData => itemData.formattedCreateAt, {
      header: 'create at',
      id: ZPixelsListPageTableColumnsIds.formattedCreateAt,
      footer: 'create at',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.createAt}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.createAt
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    })
  ];

  const zPixelTable = useReactTable({
    columns: defaultColumns,
    data: filteredPixelsDataRSelector ?? [],
    state: {
      columnOrder:
        getPixelFiltersData?.settings?.columnOrderIds ??
        getSWSPixelFiltersData?.settings?.columnOrderIds ??
        []
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
        getPixelFiltersData?.settings?.columns !== undefined ??
        getSWSPixelFiltersData?.settings?.columns !== undefined
      ) {
        let _getTitleColumn;
        let _getFormattedCreateAtColumn;
        let _getPixelIdColumn;
        let _getPlatformColumn;

        if (
          workspaceId !== undefined &&
          workspaceId !== null &&
          workspaceId?.trim()?.length > 0
        ) {
          _getTitleColumn = getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.title
          )[0];

          _getFormattedCreateAtColumn =
            getPixelFiltersData?.settings?.columns.filter(
              el => el?.id === ZPixelsListPageTableColumnsIds.formattedCreateAt
            )[0];

          _getPixelIdColumn = getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.pixelId
          )[0];

          _getPlatformColumn = getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.platform
          )[0];
        } else if (
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ) {
          _getTitleColumn = getSWSPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.title
          )[0];

          _getFormattedCreateAtColumn =
            getSWSPixelFiltersData?.settings?.columns.filter(
              el => el?.id === ZPixelsListPageTableColumnsIds.formattedCreateAt
            )[0];

          _getPixelIdColumn = getSWSPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.pixelId
          )[0];

          _getPlatformColumn = getSWSPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.platform
          )[0];
        }

        if (_getTitleColumn !== undefined) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.title)
            ?.toggleVisibility(_getTitleColumn?.isVisible);
        }

        if (_getFormattedCreateAtColumn !== undefined) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.formattedCreateAt)
            ?.toggleVisibility(_getFormattedCreateAtColumn?.isVisible);
        }

        if (_getPixelIdColumn !== undefined) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.pixelId)
            ?.toggleVisibility(_getPixelIdColumn?.isVisible);
        }

        if (_getPlatformColumn !== undefined) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.platform)
            ?.toggleVisibility(_getPlatformColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getPixelFiltersData,
    getSWSPixelFiltersData,
    workspaceId,
    wsShareId,
    shareWSMemberId
  ]);

  useEffect(() => {
    zPixelTable.setPageIndex(Number(pageindex ?? 0));
    zPixelTable.setPageSize(Number(pagesize ?? 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0 &&
        PixelsData !== null
      ) {
        setPixelDataRState(PixelsData ?? []);
      } else if (
        wsShareId !== undefined &&
        shareWSMemberId !== null &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId?.trim()?.length > 0 &&
        swsPixelsData !== undefined &&
        swsPixelsData !== null
      ) {
        setPixelDataRState(swsPixelsData ?? []);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PixelsData, workspaceId, swsPixelsData, wsShareId, shareWSMemberId]);
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZPixelActionPopover } = useZIonPopover(
    ZPixelActionPopover,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId,
      selectedId: compState?.selectedId,
      pixelId: compState?.selectedPixelId,
      pixelTitle: compState?.selectedPixelTitle,
      pixelPlatform: compState?.selectedPixelPlatform
    }
  );

  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { formMode: FormMode.ADD, workspaceId, wsShareId, shareWSMemberId }
  );
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
          {zPixelTable?.getHeaderGroups()?.map((_headerInfo, _headerIndex) => {
            return (
              <ZIonRow
                key={_headerIndex}
                className='flex flex-nowrap zaions__light_bg'>
                {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                  return (
                    <ZIonCol
                      size={
                        _columnInfo.column.id ===
                          ZPixelsListPageTableColumnsIds.id ||
                        _columnInfo.column.id ===
                          ZPixelsListPageTableColumnsIds.actions
                          ? '.8'
                          : '2.6'
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
              {filteredPixelsDataRSelector?.length > 0 ? (
                zPixelTable?.getRowModel()?.rows?.map((_rowInfo, _rowIndex) => {
                  return (
                    <ZIonRow
                      key={_rowIndex}
                      className='flex-nowrap'>
                      {_rowInfo?.getAllCells()?.map((_cellInfo, _cellIndex) =>
                        _cellInfo?.column?.getIsVisible() ? (
                          <ZIonCol
                            key={_cellIndex}
                            size={
                              _cellInfo.column.id ===
                                ZPixelsListPageTableColumnsIds.id ||
                              _cellInfo.column.id ===
                                ZPixelsListPageTableColumnsIds.actions
                                ? '.8'
                                : '2.6'
                            }
                            className={classNames({
                              'py-1 mt-1 border-b flex ion-align-items-center':
                                true,
                              'border-r': false,
                              'ps-2':
                                _cellInfo.column.id !==
                                ZPixelsListPageTableColumnsIds.id,
                              'ps-0':
                                _cellInfo.column.id ===
                                ZPixelsListPageTableColumnsIds.id
                            })}>
                            <div
                              className={classNames({
                                'w-full text-sm ZaionsTextEllipsis': true,
                                'ps-3':
                                  _cellInfo.column.id ===
                                  ZPixelsListPageTableColumnsIds.id
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
                          testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.pixelId}-${_rowInfo?.original?.id}`}
                          testinglistselector={
                            CONSTANTS.testingSelectors.pixels.listPage.table
                              .pixelId
                          }
                          onClick={(_event: unknown) => {
                            setCompState(oldVal => ({
                              ...oldVal,
                              selectedId: _rowInfo?.original?.id ?? '',
                              selectedPixelId:
                                _rowInfo?.original?.pixelId ?? '',
                              selectedPixelTitle: _rowInfo?.original?.title,
                              selectedPixelPlatform:
                                _rowInfo?.original?.platform
                            }));
                            //
                            presentZPixelActionPopover({
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
                })
              ) : (
                <ZEmptyTable
                  message='No pixels founds. please create a pixel.'
                  btnText='Create pixel'
                  btnTestingselector={
                    CONSTANTS.testingSelectors.pixels.listPage.table.createBtn
                  }
                  btnOnClick={() => {
                    presentZAddPixelAccount({
                      _cssClass: 'pixel-account-modal-size'
                    });
                  }}
                />
              )}
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
            disabled={!zPixelTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zPixelTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  workspaceId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Pixel,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex: 0,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== undefined && shareWSMemberId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .Pixel,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex: 0,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : ''
                );

                zPixelTable.setPageIndex(0);
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
            disabled={!zPixelTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.previousButton
            }
            onClick={() => {
              if (zPixelTable.getCanPreviousPage()) {
                zPixelTable.previousPage();

                zNavigatePushRoute(
                  workspaceId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Pixel,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex:
                            zPixelTable.getState().pagination.pageIndex - 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== undefined && shareWSMemberId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .Pixel,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex:
                            zPixelTable.getState().pagination.pageIndex - 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : ''
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
            disabled={!zPixelTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.nextButton
            }
            onClick={() => {
              if (zPixelTable.getCanNextPage()) {
                zPixelTable.nextPage();

                zNavigatePushRoute(
                  workspaceId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Pixel,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex:
                            zPixelTable.getState().pagination.pageIndex + 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== undefined && shareWSMemberId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .Pixel,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex:
                            zPixelTable.getState().pagination.pageIndex + 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : ''
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
            disabled={!zPixelTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.getLastPageButton
            }
            onClick={() => {
              if (zPixelTable.getCanNextPage()) {
                zPixelTable.setPageIndex(zPixelTable.getPageCount() - 1);

                zNavigatePushRoute(
                  workspaceId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Pixel,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex: zPixelTable.getPageCount() - 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== undefined && shareWSMemberId !== undefined
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .Pixel,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex:
                            zPixelTable.getState().pagination.pageIndex + 1,
                          pagesize: zPixelTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : ''
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
            {filteredPixelsDataRSelector?.length ?? 0}{' '}
            {filteredPixelsDataRSelector?.length === 1 ? 'Pixel' : 'Pixels'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem]'
            interface='popover'
            value={zPixelTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zPixelTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                workspaceId !== undefined
                  ? createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                        .Pixel,
                      params: [CONSTANTS.RouteParams.workspace.workspaceId],
                      values: [workspaceId],
                      routeSearchParams: {
                        pageindex: zPixelTable.getPageCount() - 1,
                        pagesize: Number(e.target.value)
                      }
                    })
                  : wsShareId !== undefined && shareWSMemberId !== undefined
                  ? createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                        .Pixel,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId
                      ],
                      values: [wsShareId, shareWSMemberId],
                      routeSearchParams: {
                        pageindex: zPixelTable.getPageCount() - 1,
                        pagesize: Number(e.target.value)
                      }
                    })
                  : ''
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

// Skeleton.
const ZPixelTableSkeleton: React.FC = React.memo(() => {
  return (
    <div className='w-full overflow-y-hidden border rounded-lg ms-1 h-max zaions_pretty_scrollbar ion-no-padding'>
      {/* Row-1 */}
      <ZIonRow className='flex mb-2 flex-nowrap zaions__light_bg'>
        {/* Col-1 */}
        <ZIonCol
          size='.8'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.3rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-2 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.4rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-3 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-4 */}
        <ZIonCol className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='4.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-5 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='4.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='rounded-b-lg'>
        <ZIonCol
          size='12'
          className='w-full ion-no-padding'>
          {[1, 2].map(el => {
            return (
              <ZIonRow
                className='flex-nowrap'
                key={el}>
                {/* Row-2 Col-1 */}
                <ZIonCol
                  size='.8'
                  className='flex py-1 mt-1 border-b ps-4 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='1rem'
                    height='1rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='2.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='4.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='2.3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='3.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-1 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='3.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>
              </ZIonRow>
            );
          })}
        </ZIonCol>
      </ZIonRow>
    </div>
  );
});

ZPixelTableSkeleton.displayName = 'ZPixelTableSkeleton';

// Pixel action popover
const ZPixelActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId?: string; // if owned workspace then this will be id of owned workspace.
  wsShareId?: string; // if share workspace then this will be id of share workspace.
  shareWSMemberId?: string; // if share workspace then this will be id of current member.
  pixelId: string;
  selectedId: string;
  pixelTitle: string;
  pixelPlatform: PixelPlatformsEnum;
}> = ({
  workspaceId,
  wsShareId,
  shareWSMemberId,
  pixelId,
  selectedId,
  pixelTitle,
  pixelPlatform,
  dismissZIonPopover,
  zNavigatePushRoute
}) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region Modals & popovers
  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    {
      selectedId,
      pixelId,
      pixelTitle,
      pixelPlatform,
      workspaceId,
      wsShareId,
      shareWSMemberId,
      formMode: FormMode.EDIT
    }
  );
  // #endregion

  // If owned-workspace then this api will delete pixels in this owned-workspace.
  const { mutateAsync: deletePixelMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.userPixelAccounts_update_delete
  });

  // If share-workspace then this api will delete pixels in this owned-workspace.
  const { mutateAsync: swsDeletePixelMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.sws_pixel_account_update_delete
  });

  // when user won't to delete pixel and click on the delete button this function will fire and show the confirm alert.
  const deletePixel = async (): Promise<void> => {
    try {
      if (selectedId?.trim()?.length > 0) {
        await presentZIonAlert({
          header: MESSAGES.PIXEL_ACCOUNT.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.PIXEL_ACCOUNT.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.PIXEL_ACCOUNT.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void removePixel();
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

  // on the delete pixel confirm alert, when user click on delete button this function will fires which will trigger delete request and delete the pixel.
  const removePixel = async (): Promise<void> => {
    try {
      if (selectedId?.trim()?.length > 0) {
        let _response;
        if (
          workspaceId !== undefined &&
          workspaceId !== null &&
          workspaceId?.trim()?.length > 0
        ) {
          _response = await deletePixelMutate({
            itemIds: [workspaceId, selectedId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.pixel.pixelId
            ]
          });
        } else if (
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ) {
          _response = await swsDeletePixelMutate({
            itemIds: [shareWSMemberId, selectedId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.pixel.pixelId
            ]
          });
        }

        if (_response !== undefined) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data !== null && _data?.success) {
            // getting all the pixel from RQ cache.
            let _oldPixels: PixelAccountType[] = [];

            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              _oldPixels =
                extractInnerData<PixelAccountType[]>(
                  getRQCDataHandler<PixelAccountType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                      workspaceId
                    ]
                  }) as PixelAccountType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) ?? [];
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              _oldPixels =
                extractInnerData<PixelAccountType[]>(
                  getRQCDataHandler<PixelAccountType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                      wsShareId
                    ]
                  }) as PixelAccountType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) ?? [];
            }

            // removing deleted pixel from cache.
            const _updatedPixels = _oldPixels.filter(
              el => el.id !== selectedId
            );

            // Updating data in RQ cache.
            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<PixelAccountType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
                  workspaceId
                ],
                data: _updatedPixels,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<PixelAccountType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.SWS_MAIN,
                  wsShareId
                ],
                data: _updatedPixels,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            showSuccessNotification(MESSAGES.PIXEL_ACCOUNT.DELETED);

            dismissZIonPopover('', '');
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);

            dismissZIonPopover('', '');
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
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
          workspaceId !== undefined
            ? [permissionsEnum.update_pixel]
            : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [shareWSPermissionEnum.update_sws_pixel]
            : []
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.editBtn}-${selectedId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.pixels.listPage.table.editBtn
          }
          onClick={() => {
            void (async () => {
              try {
                if (selectedId !== undefined) {
                  //
                  presentZAddPixelAccount({
                    _cssClass: 'pixel-account-modal-size'
                  });

                  dismissZIonPopover('', '');
                } else {
                  await presentZIonErrorAlert();
                }
              } catch (error) {
                reportCustomError(error);
              }
            })();
          }}>
          <ZIonButton
            size='small'
            expand='full'
            fill='clear'
            color='light'
            className='ion-text-capitalize'>
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
          workspaceId !== undefined
            ? [permissionsEnum.delete_pixel]
            : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [shareWSPermissionEnum.delete_sws_pixel]
            : []
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => {
            void deletePixel();
          }}
          testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.deleteBtn}-${selectedId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.pixels.listPage.table.deleteBtn
          }>
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

export default ZPixelsTable;
