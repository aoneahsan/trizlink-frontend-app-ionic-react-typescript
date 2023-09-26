/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

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
import {
  checkmark,
  checkmarkCircle,
  ellipsisVerticalOutline,
  informationCircleOutline,
  trashBinOutline,
  warning
} from 'ionicons/icons';

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
  ZIonInput,
  ZIonRadio,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { EmailAddressInterface } from '@/types/UserAccount/index.type';
import {
  EmailStatusEnum,
  ZEmailAddressesListPageTableColumnIds
} from '@/types/AdminPanel/index.type';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import dayjs from 'dayjs';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';
import ZConfirmEmailOTPPopover from '../../ZaionsPopovers/ProfileSettings/ConfirmEmailOtpPopover';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { Formik } from 'formik';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { AxiosError } from 'axios';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

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

const ZEmailAddressesTable: React.FC = () => {
  // #region APIS.
  const { data: userEmailsData, isFetching: isUserEmailsDataFetching } =
    useZRQGetRequest<EmailAddressInterface[]>({
      _url: API_URL_ENUM.userEmailsList,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
      _itemsIds: [],
      _urlDynamicParts: []
    });
  // #endregion

  if (isUserEmailsDataFetching) {
    return <ZPixelTableSkeleton />;
  } else {
    return <ZInpageTable />;
  }
};

const ZInpageTable: React.FC = () => {
  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { presentZIonAlert } = useZIonAlert();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  // #region modals & popovers.
  const { presentZIonPopover: presentZConfirmEmailOTPPopover } = useZIonPopover(
    ZConfirmEmailOTPPopover
  );
  // #endregion

  // #region APIS.
  const { data: userEmailsData } = useZRQGetRequest<EmailAddressInterface[]>({
    _url: API_URL_ENUM.userEmailsList,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
    _itemsIds: [],
    _urlDynamicParts: []
  });

  const { mutateAsync: confirmEmailOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.confirmEmailOTP,
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.USER.CONFIRM_OTP_API
  });

  const { mutateAsync: resendEmailOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.resendEmailOTP,
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.USER.RESEND_OTP_API
  });

  const { mutateAsync: deleteEmailAsyncMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.userEmailDelete,
    _showAlertOnError: false
  });
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<EmailAddressInterface>();

  const defaultColumns = [
    columnHelper.display({
      id: ZEmailAddressesListPageTableColumnIds.id,
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

    // email
    columnHelper.accessor(itemData => itemData.email, {
      header: 'Email',
      id: ZEmailAddressesListPageTableColumnIds.email,
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
      footer: 'Email'
    }),

    // status
    columnHelper.accessor(itemData => itemData.status, {
      header: 'Status',
      id: ZEmailAddressesListPageTableColumnIds.status,
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.pixelId}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.pixelId
            }
            className={classNames({
              'flex ion-align-items-center': true
            })}>
            <ZIonIcon
              icon={
                row.getValue() === EmailStatusEnum.Verified
                  ? checkmarkCircle
                  : warning
              }
              color={
                row.getValue() === EmailStatusEnum.Verified
                  ? 'success'
                  : 'warning'
              }
              className='me-1 w-5 h-5'
            />
            <ZIonText className='font-semibold text-md'>
              {row.getValue()}
            </ZIonText>
          </ZIonText>
        );
      },
      footer: 'Status'
    }),

    // Enter otp
    columnHelper.accessor(itemData => itemData.status, {
      header: 'Enter OTP',
      id: ZEmailAddressesListPageTableColumnIds.OTP,
      cell: row => {
        const _row = row?.row?.original;
        const _expireTime = dayjs(_row.optExpireTime);
        return (
          <div className='flex ion-align-items-center'>
            {_row?.status === EmailStatusEnum.Verified ? (
              <ZIonText>{CONSTANTS.NO_VALUE_FOUND}</ZIonText>
            ) : _row?.status === EmailStatusEnum.Unverified ? (
              dayjs().isBefore(_expireTime) ? (
                <div className='flex ion-align-items-center mb-1'>
                  <div className='w-[80%] flex ion-align-items-center'>
                    <Formik
                      initialValues={{
                        otp: ''
                      }}
                      onSubmit={async (values, { setFieldValue }) => {
                        try {
                          const __zStringifyData = zStringify({
                            email: _row?.email,
                            otp: values?.otp
                          });
                          const __response = await confirmEmailOtpAsyncMutate({
                            itemIds: [_row?.id!],
                            urlDynamicParts: [
                              CONSTANTS.RouteParams.user.itemId
                            ],
                            requestData: __zStringifyData
                          });
                          if (__response) {
                            const __data =
                              extractInnerData<EmailAddressInterface>(
                                __response,
                                extractInnerDataOptionsEnum.createRequestResponseItem
                              );

                            if (__data?.id) {
                              // Updating data in RQ cache.
                              await updateRQCDataHandler<EmailAddressInterface>(
                                {
                                  key: [
                                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER
                                      .EMAILS
                                  ],
                                  data: __data as EmailAddressInterface,
                                  id: __data?.id!
                                }
                              );

                              showSuccessNotification(
                                MESSAGES.USER.CONFIRMED_OTP
                              );
                            }
                          }
                        } catch (error) {
                          if (error instanceof AxiosError) {
                            const __apiErrorObjects = error.response?.data as {
                              errors: { item: string[] };
                              status: number;
                            };

                            const __apiErrors = __apiErrorObjects?.errors?.item;
                            const __apiErrorCode = __apiErrorObjects?.status;

                            if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
                              showErrorNotification(__apiErrors[0]);
                            }
                          }

                          reportCustomError(error);
                        }
                      }}>
                      {({
                        values,
                        touched,
                        submitForm,
                        handleChange,
                        handleBlur
                      }) => {
                        return (
                          <>
                            <ZIonInput
                              aria-label='confirm otp'
                              name='otp'
                              value={values.otp}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              // label='Enter OTP'
                              // labelPlacement='stacked'
                              minHeight='2rem'
                              counter={false}
                              maxlength={6}
                              style={{ '--border-radius': '0px' }}
                              className={classNames({
                                'w-[90%]': true,
                                'ion-touched': touched.otp
                              })}
                            />
                            <div
                              className={classNames({
                                'inline-block': true,
                                'cursor-not-allowed': values?.otp?.length !== 6
                              })}>
                              <ZIonButton
                                slot='end'
                                disabled={values?.otp?.length !== 6}
                                size='small'
                                className='ion-no-margin h-[2rem]'
                                onClick={submitForm}
                                style={{
                                  '--border-radius': '0px',
                                  '--box-shadow': 'none'
                                }}>
                                <ZIonIcon icon={checkmark} />
                              </ZIonButton>
                            </div>
                          </>
                        );
                      }}
                    </Formik>
                  </div>
                  <ZIonText className='ms-1 w-[20%]'>
                    <ZCountdown
                      countDownTime={_row?.optExpireTime}
                      color='dark'
                      component={({ d, color }) => {
                        return (
                          <>
                            {d.minutes}:{d.seconds}
                          </>
                        );
                      }}
                    />
                  </ZIonText>
                </div>
              ) : (
                <ZIonText
                  className='hover:underline cursor-pointer'
                  color='primary'
                  onClick={async () => {
                    try {
                      const __zStringifyData = zStringify({
                        email: _row?.email
                      });
                      const __response = await resendEmailOtpAsyncMutate({
                        itemIds: [_row?.id!],
                        urlDynamicParts: [CONSTANTS.RouteParams.user.itemId],
                        requestData: __zStringifyData
                      });

                      if (__response) {
                        const __data = extractInnerData<EmailAddressInterface>(
                          __response,
                          extractInnerDataOptionsEnum.createRequestResponseItem
                        );

                        if (__data?.id) {
                          // Updating data in RQ cache.
                          await updateRQCDataHandler<EmailAddressInterface>({
                            key: [
                              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS
                            ],
                            data: __data as EmailAddressInterface,
                            id: __data?.id!
                          });

                          showSuccessNotification(MESSAGES.USER.RESEND_OTP);
                        }
                      }
                    } catch (error) {
                      reportCustomError(error);
                    }
                  }}>
                  Resend OTP
                </ZIonText>
              )
            ) : (
              <ZIonText>{CONSTANTS.NO_VALUE_FOUND}</ZIonText>
            )}
          </div>
        );
      },
      footer: 'Enter OTP'
    }),

    // Is Primary
    columnHelper.accessor(itemData => itemData.isPrimary, {
      header: 'Is primary',
      id: ZEmailAddressesListPageTableColumnIds.isPrimary,
      footer: 'Is primary',
      cell: row => {
        return (
          // <input
          //   name='isPrimary'
          //   type='radio'
          //   // testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.pixelId}-${row?.row?.original?.id}`}
          //   // testinglistselector={
          //   //   CONSTANTS.testingSelectors.pixels.listPage.table.pixelId
          //   // }
          //   // checked={row.getValue()}
          // />
          <ZIonRadio name='isPrimary' />
        );
      }
    }),

    // verified at
    columnHelper.accessor(itemData => itemData.verifiedAt, {
      header: 'Verified at',
      id: ZEmailAddressesListPageTableColumnIds.verifiedAt,
      footer: 'Verified at',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.pixels.listPage.table.createAt}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.pixels.listPage.table.createAt
            }>
            {row.getValue() || CONSTANTS.NO_VALUE_FOUND}
          </ZIonText>
        );
      }
    })
  ];

  const zEmailAddressesTable = useReactTable({
    columns: defaultColumns,
    data: userEmailsData || [],
    // state: {
    //   columnOrder: getPixelFiltersData?.settings?.columnOrderIds || []
    // },
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion

  // #region functions.
  // when user won't to delete email and click on the delete button this function will fire and show the confirm alert.
  const deleteEmail = async (selectedId: string) => {
    try {
      if (selectedId?.trim() && userEmailsData?.length) {
        // const selectedEmail = EmailsData?.find(el => el.id === selectedId);
        await presentZIonAlert({
          header: MESSAGES.USER.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.USER.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.USER.DELETE_ALERT.MESSAGES,
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
                void removeEmail(selectedId);
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

  const removeEmail = async (selectedId: string) => {
    try {
      if (selectedId) {
        const __response = await deleteEmailAsyncMutate({
          itemIds: [selectedId],
          urlDynamicParts: [CONSTANTS.RouteParams.user.itemId]
        });

        if (__response) {
          const __data = extractInnerData<{ success: boolean }>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data?.success) {
            // getting all the emails from RQ cache.
            const __oldEmails =
              extractInnerData<EmailAddressInterface[]>(
                getRQCDataHandler<EmailAddressInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS]
                }) as EmailAddressInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // removing deleted email from cache.
            const __updatedEmails = __oldEmails.filter(
              el => el.id !== selectedId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<EmailAddressInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
              data: __updatedEmails as EmailAddressInterface[],
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            showSuccessNotification(MESSAGES.USER.DELETED);
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const __apiErrors = __apiErrorObjects?.errors?.item;
        const __apiErrorCode = __apiErrorObjects?.status;

        if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
          showErrorNotification(__apiErrors[0]);
        }
      }
      reportCustomError(error);
    }
  };
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
          {zEmailAddressesTable
            ?.getHeaderGroups()
            ?.map((_headerInfo, _headerIndex) => {
              return (
                <ZIonRow
                  key={_headerIndex}
                  className='flex flex-nowrap zaions__light_bg'>
                  {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                    return (
                      <ZIonCol
                        size={
                          _columnInfo.column.id ===
                            ZEmailAddressesListPageTableColumnIds.id ||
                          _columnInfo.column.id ===
                            ZEmailAddressesListPageTableColumnIds.actions
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

                  {/* Delete */}
                  <ZIonCol
                    size='.8'
                    className={classNames({
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
                      'border-r': false
                    })}>
                    <ZIonText color='danger'>Delete</ZIonText>
                  </ZIonCol>

                  {/* <ZIonCol
                    size='.8'
                    className={classNames({
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
                      'border-r': false
                    })}>
                    Actions
                  </ZIonCol> */}
                </ZIonRow>
              );
            })}

          {/* Body Section */}
          <ZIonRow className='rounded-b-lg'>
            <ZIonCol
              size='12'
              className='w-full ion-no-padding'>
              {zEmailAddressesTable
                ?.getCoreRowModel()
                ?.rows?.map((_rowInfo, _rowIndex) => {
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
                                ZEmailAddressesListPageTableColumnIds.id ||
                              _cellInfo.column.id ===
                                ZEmailAddressesListPageTableColumnIds.actions
                                ? '.8'
                                : '2.6'
                            }
                            className={classNames({
                              'py-1 mt-1 border-b flex ion-align-items-center':
                                true,
                              'border-r': false,
                              'ps-2':
                                _cellInfo.column.id !==
                                ZEmailAddressesListPageTableColumnIds.id,
                              'ps-0':
                                _cellInfo.column.id ===
                                ZEmailAddressesListPageTableColumnIds.id
                            })}>
                            <div
                              className={classNames({
                                'w-full text-sm ZaionsTextEllipsis': true,
                                'ps-3':
                                  _cellInfo.column.id ===
                                  ZEmailAddressesListPageTableColumnIds.id
                              })}>
                              {flexRender(
                                _cellInfo.column.columnDef.cell,
                                _cellInfo.getContext()
                              )}
                            </div>
                          </ZIonCol>
                        ) : null
                      )}

                      {/* Delete */}
                      <ZIonCol
                        size='.8'
                        className={classNames({
                          'py-1 mt-1 border-b ps-2 ion-justify-content-center flex ion-align-items-center':
                            true,
                          'border-r': false
                        })}>
                        {_rowInfo?.original?.isPrimary ? (
                          <>
                            <ZIonIcon
                              icon={informationCircleOutline}
                              color='warning'
                              className='cursor-pointer w-6 h-6'
                              id={`primary-email-info-warning-tt-${_rowInfo
                                ?.original?.id!}`}
                            />

                            <ZRTooltip
                              place='left'
                              variant='info'
                              anchorSelect={`#primary-email-info-warning-tt-${_rowInfo
                                ?.original?.id!}`}>
                              Important note: Primary email <br /> deletion is
                              restricted.
                            </ZRTooltip>
                          </>
                        ) : (
                          <ZIonIcon
                            icon={trashBinOutline}
                            color='danger'
                            className='cursor-pointer w-5 h-5'
                            onClick={() => {
                              deleteEmail(_rowInfo?.original?.id!);
                            }}
                          />
                        )}
                      </ZIonCol>

                      {/* <ZIonCol
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
                          // onClick={(_event: unknown) => {
                          //   setCompState(oldVal => ({
                          //     ...oldVal,
                          //     selectedId: _rowInfo?.original?.id || '',
                          //     selectedPixelId:
                          //       _rowInfo?.original?.pixelId || '',
                          //     selectedPixelTitle: _rowInfo?.original?.title,
                          //     selectedPixelPlatform:
                          //       _rowInfo?.original?.platform
                          //   }));
                          //   //
                          //   presentZPixelActionPopover({
                          //     _event: _event as Event,
                          //     _cssClass:
                          //       'zaions_present_folder_Action_popover_width',
                          //     _dismissOnSelect: false
                          //   });
                          // }}
                        >
                          <ZIonIcon icon={ellipsisVerticalOutline} />
                        </ZIonButton>
                      </ZIonCol> */}
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

export default ZEmailAddressesTable;
