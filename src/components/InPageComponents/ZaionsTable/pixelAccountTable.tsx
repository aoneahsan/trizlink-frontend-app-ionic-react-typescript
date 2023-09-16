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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonRouterLink,
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
  useZIonPopover,
  useZIonToast
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  PixelAccountType,
  PixelPlatformsEnum
} from '@/types/AdminPanel/linksType';
import {
  FormMode,
  ZPixelsListPageTableColumnsIds,
  ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useParams } from 'react-router';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import ZCan from '@/components/Can';
import ZaionsAddPixelAccount from '../ZaionsModals/AddPixelsAccount';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { PixelAccountFormState } from '@/ZaionsStore/FormStates/pixelAccountFormState.recoil';
import {
  FilteredPixelsDataRStateSelector,
  PixelAccountsRStateAtom
} from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

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
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region APIS requests.
  // Request for getting pixels data.
  const { data: PixelsData, isFetching: isPixelsDateFetching } =
    useZRQGetRequest<PixelAccountType[]>({
      _url: API_URL_ENUM.userPixelAccounts_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
      _itemsIds: [],
      _urlDynamicParts: []
    });
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { formMode: FormMode.ADD }
  );
  // #endregion

  // #region Functions.

  // #endregion

  const isZFetching = isPixelsDateFetching;

  return (
    <>
      {!isZFetching ? (
        PixelsData && PixelsData?.length ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message='No pixels founds. please create a pixel.'
              btnText='Create pixel'
              btnOnClick={() => {
                presentZAddPixelAccount({
                  _cssClass: 'pixel-account-modal-size'
                });
              }}
            />
          </div>
        )
      ) : null}

      {showSkeleton || isZFetching ? <ZPixelTableSkeleton /> : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  const [compState, setCompState] = useState<{
    selectedId?: string;
    selectedPixelId?: string;
    selectedPixelTitle?: string;
    selectedPixelPlatform?: PixelPlatformsEnum;
  }>();

  const { workspaceId } = useParams<{
    workspaceId?: string;
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
  // Request for getting pixels data.
  const { data: PixelsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
    _itemsIds: [],
    _urlDynamicParts: []
  });

  const { data: getPixelFiltersData, isFetching: isPixelFiltersDataFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        ZUserSettingTypeEnum.pixelListPageTable
      ],
      _itemsIds: [ZUserSettingTypeEnum.pixelListPageTable],
      _urlDynamicParts: [CONSTANTS.RouteParams.settings.type],
      _extractType: ZRQGetRequestExtractEnum.extractItem
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
    data: filteredPixelsDataRSelector || [],
    state: {
      columnOrder: getPixelFiltersData?.settings?.columnOrderIds || []
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
      if (getPixelFiltersData?.settings?.columns) {
        const __getTitleColumn = getPixelFiltersData?.settings?.columns.filter(
          el => el?.id === ZPixelsListPageTableColumnsIds.title
        )[0];

        const __getFormattedCreateAtColumn =
          getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.formattedCreateAt
          )[0];

        const __getPixelIdColumn =
          getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.pixelId
          )[0];

        const __getPlatformColumn =
          getPixelFiltersData?.settings?.columns.filter(
            el => el?.id === ZPixelsListPageTableColumnsIds.platform
          )[0];

        if (__getTitleColumn) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.title)
            ?.toggleVisibility(__getTitleColumn?.isVisible);
        }

        if (__getFormattedCreateAtColumn) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.formattedCreateAt)
            ?.toggleVisibility(__getFormattedCreateAtColumn?.isVisible);
        }

        if (__getPixelIdColumn) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.pixelId)
            ?.toggleVisibility(__getPixelIdColumn?.isVisible);
        }

        if (__getPlatformColumn) {
          zPixelTable
            ?.getColumn(ZPixelsListPageTableColumnsIds.platform)
            ?.toggleVisibility(__getPlatformColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getPixelFiltersData]);

  useEffect(() => {
    zPixelTable.setPageIndex(Number(pageindex) || 0);
    zPixelTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (PixelsData) {
        setPixelDataRState(PixelsData);
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [PixelsData]);
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZPixelActionPopover } = useZIonPopover(
    ZPixelActionPopover,
    {
      workspaceId: workspaceId,
      selectedId: compState?.selectedId,
      pixelId: compState?.selectedPixelId,
      pixelTitle: compState?.selectedPixelTitle,
      pixelPlatform: compState?.selectedPixelPlatform
    }
  );

  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { formMode: FormMode.ADD }
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
                              selectedId: _rowInfo?.original?.id || '',
                              selectedPixelId:
                                _rowInfo?.original?.pixelId || '',
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
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId!],
                    routeSearchParams: {
                      pageindex: 0,
                      pagesize: zPixelTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
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
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId!],
                    routeSearchParams: {
                      pageindex:
                        zPixelTable.getState().pagination.pageIndex - 1,
                      pagesize: zPixelTable
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
            disabled={!zPixelTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.nextButton
            }
            onClick={() => {
              if (zPixelTable.getCanNextPage()) {
                zPixelTable.nextPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId!],
                    routeSearchParams: {
                      pageindex:
                        zPixelTable.getState().pagination.pageIndex + 1,
                      pagesize: zPixelTable
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
            disabled={!zPixelTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.getLastPageButton
            }
            onClick={() => {
              if (zPixelTable.getCanNextPage()) {
                zPixelTable.setPageIndex(zPixelTable.getPageCount() - 1);

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId!],
                    routeSearchParams: {
                      pageindex: zPixelTable.getPageCount() - 1,
                      pagesize: zPixelTable
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
            {filteredPixelsDataRSelector?.length || 0}{' '}
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
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                  params: [CONSTANTS.RouteParams.workspace.workspaceId],
                  values: [workspaceId!],
                  routeSearchParams: {
                    pageindex: zPixelTable.getPageCount() - 1,
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

// Pixel action popover
const ZPixelActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  pixelId: string;
  selectedId: string;
  pixelTitle: string;
  pixelPlatform: PixelPlatformsEnum;
}> = ({
  workspaceId,
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
      formMode: FormMode.EDIT
    }
  );
  // #endregion

  // Request for deleting pixel.
  const { mutateAsync: deletePixelMutate } = useZRQDeleteRequest(
    API_URL_ENUM.userPixelAccounts_update_delete
  );

  const { data: PixelsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
    _itemsIds: [],
    _urlDynamicParts: []
  });

  // when user won't to delete pixel and click on the delete button this function will fire and show the confirm alert.
  const deletePixel = async () => {
    try {
      if (selectedId?.trim() && PixelsData?.length) {
        const selectedPixel = PixelsData?.find(el => el.id === selectedId);
        await presentZIonAlert({
          header: `Delete pixel "${selectedPixel?.title || ''}"`,
          subHeader: 'Remove pixel from user account.',
          message: 'Are you sure you want to delete this pixel?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
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
  const removePixel = async () => {
    try {
      if (selectedId?.trim() && PixelsData?.length) {
        if (selectedId) {
          const _response = await deletePixelMutate({
            itemIds: [selectedId],
            urlDynamicParts: [CONSTANTS.RouteParams.pixel.pixelId]
          });

          if (_response) {
            const _data = extractInnerData<{ success: boolean }>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data && _data?.success) {
              // getting all the pixel from RQ cache.
              const _oldPixels =
                extractInnerData<PixelAccountType[]>(
                  getRQCDataHandler<PixelAccountType[]>({
                    key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN]
                  }) as PixelAccountType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];

              // removing deleted pixel from cache.
              const _updatedPixels = _oldPixels.filter(
                el => el.id !== selectedId
              );

              // Updating data in RQ cache.
              await updateRQCDataHandler<PixelAccountType[] | undefined>({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
                data: _updatedPixels as PixelAccountType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });

              showSuccessNotification(MESSAGES.GENERAL.PIXEL_ACCOUNT.DELETED);

              dismissZIonPopover('', '');
            } else {
              showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);

              dismissZIonPopover('', '');
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

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
      <ZCan havePermissions={[permissionsEnum.update_pixel]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.editBtn}-${selectedId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.pixels.listPage.table.editBtn
          }
          onClick={async () => {
            try {
              if (selectedId) {
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

      <ZCan havePermissions={[permissionsEnum.delete_pixel]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => void deletePixel()}
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
