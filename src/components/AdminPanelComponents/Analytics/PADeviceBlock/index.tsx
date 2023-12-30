/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { laptopOutline } from 'ionicons/icons';
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
import ZRCPolarArea from '@/components/CustomComponents/Charts/PolarArea';

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
  ZAnalyticsDeviceTableColumnIds,
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

const PADevicesBlock: React.FC<PABrowserBlockI> = ({ data }) => {
  const { isLgScale } = useZMediaQueryScale();

  return (
    <div className='h-full overflow-hidden border rounded-lg shadow-md zaions__light_bg'>
      <div
        className={classNames({
          'px-2 py-3 border-b zaions__bg_white': true,
          'ion-text-center': !isLgScale
        })}>
        <ZIonText className='text-lg'>💻 Device type</ZIonText>
      </div>
      <PADeviceTable data={data} />
      {/* {data !== undefined && data?.length > 0 ? (
        <PADeviceTable data={data} />
      ) : (
        <div className='flex flex-col gap-3 ion-padding ion-align-items-center ion-justify-content-center'>
          <ZIonIcon
            icon={laptopOutline}
            className='w-20 h-20'
            color='medium'
          />
          <div className='flex flex-col mt-3 ion-text-center'>
            <ZIonText className='text-lg'>Device Discovery</ZIonText>
            <ZIonText
              className='mt-2'
              color='medium'>
              No device data available. your short link is ready to be discoverd
              by a variety of devices.
            </ZIonText>
          </div>
        </div>
      )} */}
    </div>
  );
};

const PADeviceTable: React.FC<PABrowserBlockI> = ({ data }) => {
  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<IAnalyticsModalTable>();

  const defaultColumns = [
    // Countries
    columnHelper.accessor(itemData => itemData.modal, {
      header: 'Device',
      id: ZAnalyticsDeviceTableColumnIds.device,
      cell: row => {
        return (
          <div className=''>
            <ZIonText>{row?.getValue()}</ZIonText>
          </div>
        );
      },
      footer: 'Device'
    }),

    // visits
    columnHelper.accessor(itemData => itemData.visits, {
      header: 'Visits',
      id: ZAnalyticsDeviceTableColumnIds.visits,
      footer: 'Visits'
    }),

    // unique
    columnHelper.accessor(itemData => itemData.unique, {
      header: 'Unique',
      id: ZAnalyticsDeviceTableColumnIds.unique,
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
      id: ZAnalyticsDeviceTableColumnIds.visitsPercentage,
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

  const zDeviceTable = useReactTable({
    columns: defaultColumns,
    data: data ?? emptyArray,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion
  const _chartDomeData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <>
      <div className='h-[20rem] my-3'>
        <ZRCPolarArea
          width='100%'
          height='100%'
          options={{ maintainAspectRatio: false }}
          data={_chartDomeData}
        />
      </div>
      <ZCustomScrollable
        className='w-full border h-max ion-no-padding'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zDeviceTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
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
              {zDeviceTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
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

export default PADevicesBlock;
