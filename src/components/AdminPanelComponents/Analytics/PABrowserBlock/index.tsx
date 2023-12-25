/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { browsersOutline } from 'ionicons/icons';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  ZAnalyticsBrowserTableColumnIds,
  type IAnalyticsModalTable
} from '@/types/AdminPanel/index.type';

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
interface PABrowserBlockI {
  data?: IAnalyticsModalTable[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const emptyArray: never[] = [];

const PABrowserBlock: React.FC<PABrowserBlockI> = ({ data }) => {
  const { isLgScale } = useZMediaQueryScale();

  return (
    <div className='h-full overflow-hidden border rounded-lg shadow-md zaions__light_bg'>
      <div
        className={classNames({
          'px-2 py-3 border-b zaions__bg_white': true,
          'ion-text-center': !isLgScale
        })}>
        <ZIonText className='text-lg'>🔎 Browsers</ZIonText>
      </div>
      {data !== undefined && data?.length > 0 ? (
        <PAReferersTable data={data} />
      ) : (
        <div className='flex flex-col gap-3 ion-padding ion-align-items-center ion-justify-content-center'>
          <ZIonIcon
            icon={browsersOutline}
            className='w-20 h-20'
            color='medium'
          />
          <div className='flex flex-col mt-3 ion-text-center'>
            <ZIonText className='text-lg'>Browser Discovery</ZIonText>
            <ZIonText
              className='mt-2'
              color='medium'>
              No browser data available. your short link is ready to be
              discoverd by a variety of browsers.
            </ZIonText>
          </div>
        </div>
      )}
    </div>
  );
};

const PAReferersTable: React.FC<PABrowserBlockI> = ({ data }) => {
  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<IAnalyticsModalTable>();

  const defaultColumns = [
    // Countries
    columnHelper.accessor(itemData => itemData.modal, {
      header: 'Browser',
      id: ZAnalyticsBrowserTableColumnIds.browser,
      cell: row => {
        return (
          <div className=''>
            <ZIonText>{row?.getValue()}</ZIonText>
          </div>
        );
      },
      footer: 'Browser'
    }),

    // visits
    columnHelper.accessor(itemData => itemData.visits, {
      header: 'Visits',
      id: ZAnalyticsBrowserTableColumnIds.visits,
      footer: 'Visits'
    }),

    // unique
    columnHelper.accessor(itemData => itemData.unique, {
      header: 'Unique',
      id: ZAnalyticsBrowserTableColumnIds.unique,
      footer: 'Unique',
      cell: row => {
        return (
          <>
            <div className=''>
              <ZIonText>{row?.getValue()}</ZIonText>
            </div>
          </>
        );
      }
    }),

    // visitsPercentage
    columnHelper.accessor(itemData => itemData.visitsPercentage, {
      id: ZAnalyticsBrowserTableColumnIds.visitsPercentage,
      header: '% Visits',
      footer: '% Visits',
      cell: row => {
        return (
          <div className=''>
            <ZIonText>{row?.getValue()}</ZIonText>
          </div>
        );
      }
    })
  ];

  const zBrowserTable = useReactTable({
    columns: defaultColumns,
    data: data ?? emptyArray,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion

  return (
    <ZCustomScrollable
      className='w-full border h-max ion-no-padding'
      scrollX={true}>
      <div className='min-w-[55rem]'>
        {zBrowserTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
          return (
            <ZIonRow
              key={_headerIndex}
              className='flex flex-nowrap zaions__light_bg'>
              {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                return (
                  <ZIonCol
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
            </ZIonRow>
          );
        })}
        <ZIonRow className='rounded-b-lg'>
          <ZIonCol
            size='12'
            className='w-full ion-no-padding'>
            {zBrowserTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
              return (
                <ZIonRow
                  key={_rowIndex}
                  className='flex-nowrap'>
                  {_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
                    _cellInfo.column.getIsVisible() ? (
                      <ZIonCol
                        key={_cellIndex}
                        className={classNames({
                          'py-1 mt-1 ps-2 border-b flex ion-align-items-center':
                            true,
                          'border-r': false
                        })}>
                        <div
                          className={classNames({
                            'w-full text-sm ZaionsTextEllipsis': true
                          })}>
                          {flexRender(
                            _cellInfo.column.columnDef.cell,
                            _cellInfo.getContext()
                          )}
                        </div>
                      </ZIonCol>
                    ) : null
                  )}
                </ZIonRow>
              );
            })}
          </ZIonCol>
        </ZIonRow>
      </div>
    </ZCustomScrollable>
  );
};

export default PABrowserBlock;
