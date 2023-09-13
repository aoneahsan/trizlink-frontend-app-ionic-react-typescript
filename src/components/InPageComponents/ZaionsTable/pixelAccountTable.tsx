/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

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
  ZIonRouterLink,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZEmptyTable from '../ZEmptyTable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { ZPixelsListPageTableColumnsIds } from '@/types/AdminPanel/index.type';
import { ellipsisVerticalOutline } from 'ionicons/icons';

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
  const { data: PixelsData } = useZRQGetRequest<PixelAccountType[]>({
    _url: API_URL_ENUM.userPixelAccounts_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
    _itemsIds: [],
    _urlDynamicParts: []
  });
  // #endregion

  // #region Functions.

  // #endregion

  return (
    <>
      {!showSkeleton ? (
        PixelsData && PixelsData?.length ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message='No pixels founds. please create a pixel.'
              btnText='Create pixel'
              btnOnClick={() => {}}
            />
          </div>
        )
      ) : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonToast } = useZIonToast();
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
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<PixelAccountType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZPixelsListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: props => {
        return <ZIonCheckbox />;
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.title, {
      header: 'Title',
      id: ZPixelsListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonRouterLink
            className='hover:underline'
            // routerLink={replaceRouteParams(
            //   ZaionsRoutes.AdminPanel.ShortLinks.Edit,
            //   [
            //     CONSTANTS.RouteParams.workspace.workspaceId,
            //     CONSTANTS.RouteParams.editShortLinkIdParam
            //   ],
            //   [workspaceId, row?.row?.original?.id!]
            // )}
          >
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // pixelId
    columnHelper.accessor(itemData => itemData.pixelId, {
      header: 'pixel id',
      id: ZPixelsListPageTableColumnsIds.pixelId,
      footer: 'pixel id'
    }),

    // platform
    columnHelper.accessor(itemData => itemData.platform, {
      header: 'platform',
      id: ZPixelsListPageTableColumnsIds.platform,
      footer: 'platform'
    }),

    // create at
    columnHelper.accessor(itemData => itemData.createAt, {
      header: 'create at',
      id: ZPixelsListPageTableColumnsIds.createAt,
      footer: 'create at'
    })
  ];

  const zPixelTable = useReactTable({
    columns: defaultColumns,
    data: PixelsData || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });
  // #endregion

  // #region useEffect's
  useEffect(() => {
    zPixelTable.setPageIndex(Number(pageindex) || 0);
    zPixelTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);
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
          {zPixelTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
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
              {zPixelTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
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
                        testingselector={
                          CONSTANTS.testingSelectors.shortLink.listPage.table
                            .actionPopoverBtn
                        }
                        testingListSelector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
                        onClick={(_event: unknown) => {
                          // setCompState(oldVal => ({
                          //   ...oldVal,
                          //   selectedShortLinkId: _rowInfo.original.id || ''
                          // }));
                          // //
                          // presentZShortLinkActionPopover({
                          //   _event: _event as Event,
                          //   _cssClass:
                          //     'zaions_present_folder_Action_popover_width',
                          //   _dismissOnSelect: false
                          // });
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
    </div>
  );
};

export default ZPixelsTable;
