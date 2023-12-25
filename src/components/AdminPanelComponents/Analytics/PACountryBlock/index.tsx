/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import classNames from 'classnames';
import { earthOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type ICountryTable,
  ZAnalyticsCountryTableColumnIds
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
interface PACountryBlockI {
  data?: ICountryTable[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const PACountryBlock: React.FC<PACountryBlockI> = ({ data }) => {
  return (
    <div className='overflow-hidden zaions__light_bg shadow-md rounded-lg border'>
      <div className='border-b py-3 px-2  zaions__bg_white'>
        <ZIonText className='text-lg'>🌎 Countries</ZIonText>
      </div>
      {data !== undefined && data?.length > 0 ? (
        <PACountryTable data={data} />
      ) : (
        <div className='ion-padding flex flex-col  gap-3 ion-align-items-center ion-justify-content-center'>
          <ZIonIcon
            icon={earthOutline}
            className='w-20 h-20'
            color='medium'
          />
          <div className='flex flex-col mt-3 ion-text-center'>
            <ZIonText className='text-lg'>Discover the World</ZIonText>
            <ZIonText
              className='mt-2'
              color='medium'>
              No specific country data found. Your short link is waiting to be
              explored by the global audience!
            </ZIonText>
          </div>
        </div>
      )}
    </div>
  );
};

const PACountryTable: React.FC<PACountryBlockI> = ({ data }) => {
  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<ICountryTable>();
  const defaultColumns = [
    // Countries
    columnHelper.accessor(itemData => itemData.countries, {
      header: 'Countries',
      id: ZAnalyticsCountryTableColumnIds.countries,
      cell: row => {
        return (
          <div className=''>
            <ZIonText>{row?.getValue()}</ZIonText>
          </div>
        );
      },
      footer: 'Countries'
    }),

    // visits
    columnHelper.accessor(itemData => itemData.visits, {
      header: 'Visits',
      id: ZAnalyticsCountryTableColumnIds.visits,
      footer: 'Visits'
    }),

    // unique
    columnHelper.accessor(itemData => itemData.unique, {
      header: 'Unique',
      id: ZAnalyticsCountryTableColumnIds.unique,
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
      id: ZAnalyticsCountryTableColumnIds.visitsPercentage,
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
  // #endregion

  const zCountriesTable = useReactTable({
    columns: defaultColumns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });

  return (
    <ZCustomScrollable
      className='w-full border rounded-lg h-max ion-no-padding'
      scrollX={true}>
      <div className='min-w-[55rem]'>
        {zCountriesTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
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
            {zCountriesTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
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

export default PACountryBlock;
