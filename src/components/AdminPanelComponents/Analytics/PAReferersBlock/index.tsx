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
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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
  ZAnalyticsReferersTableColumnIds,
  type IReferersTable
} from '@/types/AdminPanel/index.type';
import { compassOutline } from 'ionicons/icons';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import classNames from 'classnames';
import ZRCPie from '@/components/CustomComponents/Charts/Pie';

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
interface PAReferersBlockI {
  data?: IReferersTable[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const PAReferersBlock: React.FC<PAReferersBlockI> = ({ data }) => {
  return (
    <div className='overflow-hidden zaions__light_bg shadow-md rounded-lg border'>
      <div className='border-b py-3 px-2  zaions__bg_white'>
        <ZIonText className='text-lg'>🧭 Referers</ZIonText>
      </div>
      <PAReferersTable data={data} />
      {/* {data !== undefined && data?.length > 0 ? (
        <PAReferersTable data={data} />
      ) : (
        <div className='ion-padding flex flex-col  gap-3 ion-align-items-center ion-justify-content-center'>
          <ZIonIcon
            icon={compassOutline}
            className='w-20 h-20'
            color='medium'
          />
          <div className='flex flex-col mt-3 ion-text-center'>
            <ZIonText className='text-lg'>Link Unexplored</ZIonText>
            <ZIonText
              className='mt-2'
              color='medium'>
              No referers data available.
            </ZIonText>
          </div>
        </div>
      )} */}
    </div>
  );
};

const PAReferersTable: React.FC<PAReferersBlockI> = ({ data }) => {
  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<IReferersTable>();
  const defaultColumns = [
    // Countries
    columnHelper.accessor(itemData => itemData.referers, {
      header: 'Referers',
      id: ZAnalyticsReferersTableColumnIds.referers,
      cell: row => {
        return (
          <div className=''>
            <ZIonText>{row?.getValue()}</ZIonText>
          </div>
        );
      },
      footer: 'Referers'
    }),

    // visits
    columnHelper.accessor(itemData => itemData.visits, {
      header: 'Visits',
      id: ZAnalyticsReferersTableColumnIds.visits,
      footer: 'Visits'
    }),

    // unique
    columnHelper.accessor(itemData => itemData.unique, {
      header: 'Unique',
      id: ZAnalyticsReferersTableColumnIds.unique,
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
      id: ZAnalyticsReferersTableColumnIds.visitsPercentage,
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

  const zReferersTable = useReactTable({
    columns: defaultColumns,
    // data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion

  return (
    <>
      <div className=''>
        <ZRCPie
          data={{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          }}
        />
      </div>
      <ZCustomScrollable
        className='w-full border rounded-lg h-max ion-no-padding'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zReferersTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
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
              {zReferersTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
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
    </>
  );
};

export default PAReferersBlock;
