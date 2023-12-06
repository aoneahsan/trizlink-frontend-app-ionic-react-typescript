/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  checkmark,
  checkmarkCircle,
  closeOutline,
  createOutline,
  informationCircleOutline,
  trashBinOutline,
  warning
} from 'ionicons/icons';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonChip,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal
} from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  extractInnerData,
  getUserDataObjectForm,
  STORAGE,
  zStringify
} from '@/utils/helpers';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type EmailAddressInterface } from '@/types/UserAccount/index.type';
import {
  EmailStatusEnum,
  ZEmailAddressesListPageTableColumnIds
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

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

const ZEmailAddressesTable: React.FC<{ enableMakeEmailPrimary: boolean }> = ({
  enableMakeEmailPrimary
}) => {
  // #region APIS.
  const { isFetching: isUserEmailsDataFetching } = useZRQGetRequest<
    EmailAddressInterface[]
  >({
    _url: API_URL_ENUM.userEmailsList,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
    _itemsIds: [],
    _urlDynamicParts: []
  });
  // #endregion

  if (isUserEmailsDataFetching) {
    return <ZEmailTableSkeleton />;
  } else {
    return <ZInpageTable enableMakeEmailPrimary={enableMakeEmailPrimary} />;
  }
};

const ZInpageTable: React.FC<{ enableMakeEmailPrimary: boolean }> = ({
  enableMakeEmailPrimary
}) => {
  // #region comp state.
  const [compState, setCompState] = useState<{
    selectedEmail: EmailAddressInterface;
  }>();
  // #endregion

  // #region custom hooks.
  const { isMdScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { presentZIonAlert } = useZIonAlert();
  // #endregion

  // #region modals & popovers.

  const { presentZIonModal: presentUpdateEmailModal } = useZIonModal(
    ZUpdateEmailModal,
    {
      _id: compState?.selectedEmail?.id,
      _email: compState?.selectedEmail?.email,
      _isPrimary: compState?.selectedEmail?.isPrimary,
      _status: compState?.selectedEmail?.status
    }
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
              className='w-5 h-5 me-1'
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
        const formikInitialValues = {
          otp: ''
        };
        const zIonButtonStyle = {
          '--box-shadow': 'none'
        };
        return (
          <div className='flex ion-align-items-center'>
            {_row?.status === EmailStatusEnum.Verified ? (
              <ZIonText>{CONSTANTS.NO_VALUE_FOUND}</ZIonText>
            ) : _row?.status === EmailStatusEnum.Unverified ? (
              dayjs().isBefore(_expireTime) ? (
                <div className='flex mb-1 ion-align-items-center'>
                  <div className='w-[80%] flex ion-align-items-center'>
                    <Formik
                      initialValues={formikInitialValues}
                      onSubmit={async (values, { setFieldValue }) => {
                        try {
                          const _zStringifyData = zStringify({
                            email: _row?.email,
                            otp: values?.otp
                          });
                          const _response = await confirmEmailOtpAsyncMutate({
                            itemIds: [_row?.id ?? ''],
                            urlDynamicParts: [
                              CONSTANTS.RouteParams.user.itemId
                            ],
                            requestData: _zStringifyData
                          });
                          if (_response !== undefined) {
                            const _data =
                              extractInnerData<EmailAddressInterface>(
                                _response,
                                extractInnerDataOptionsEnum.createRequestResponseItem
                              );

                            if (_data?.id !== null && _data?.id !== undefined) {
                              // Updating data in RQ cache.
                              await updateRQCDataHandler<EmailAddressInterface>(
                                {
                                  key: [
                                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER
                                      .EMAILS
                                  ],
                                  data: _data,
                                  id: _data?.id
                                }
                              );

                              showSuccessNotification(
                                MESSAGES.USER.CONFIRMED_EMAIL_OTP
                              );
                            }
                          }
                        } catch (error) {
                          if (error instanceof AxiosError) {
                            const _apiErrorObjects = error.response?.data as {
                              errors: { item: string[] };
                              status: number;
                            };

                            const _apiErrors = _apiErrorObjects?.errors?.item;
                            const _apiErrorCode = _apiErrorObjects?.status;

                            if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
                              showErrorNotification(_apiErrors[0]);
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
                              className={classNames({
                                'w-[90%] z-ion-border-radius-0': true,
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
                                className='ion-no-margin h-[2rem] z-ion-border-radius-0'
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={submitForm}
                                style={zIonButtonStyle}>
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
                  className='cursor-pointer hover:underline'
                  color='primary'
                  onClick={() => {
                    void (async () => {
                      try {
                        const _zStringifyData = zStringify({
                          email: _row?.email
                        });
                        const _response = await resendEmailOtpAsyncMutate({
                          itemIds: [_row?.id ?? ''],
                          urlDynamicParts: [CONSTANTS.RouteParams.user.itemId],
                          requestData: _zStringifyData
                        });

                        if (_response !== undefined) {
                          const _data = extractInnerData<EmailAddressInterface>(
                            _response,
                            extractInnerDataOptionsEnum.createRequestResponseItem
                          );

                          if (_data?.id !== null && _data?.id !== undefined) {
                            // Updating data in RQ cache.
                            await updateRQCDataHandler<EmailAddressInterface>({
                              key: [
                                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS
                              ],
                              data: _data,
                              id: _data?.id
                            });

                            showSuccessNotification(MESSAGES.USER.RESEND_OTP);
                          }
                        }
                      } catch (error) {
                        reportCustomError(error);
                      }
                    })();
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
          <ZIonChip
            className='p-0 px-3 py-[2px] cursor-auto h-max'
            color={row?.getValue() ? 'success' : 'danger'}>
            {row?.getValue() ? 'Yes' : 'No'}
          </ZIonChip>
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
            {row?.getValue() ?? CONSTANTS.NO_VALUE_FOUND}
          </ZIonText>
        );
      }
    })
  ];

  const zEmailAddressesTable = useReactTable({
    columns: defaultColumns,
    data: userEmailsData ?? [],
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
  const deleteEmail = async (selectedId: string): Promise<void> => {
    try {
      if (selectedId?.trim()?.length > 0 && userEmailsData?.length !== null) {
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

  const removeEmail = async (selectedId: string): Promise<void> => {
    try {
      if (selectedId?.trim()?.length > 0) {
        const _response = await deleteEmailAsyncMutate({
          itemIds: [selectedId],
          urlDynamicParts: [CONSTANTS.RouteParams.user.itemId]
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            // getting all the emails from RQ cache.
            const _oldEmails =
              extractInnerData<EmailAddressInterface[]>(
                getRQCDataHandler<EmailAddressInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS]
                }) as EmailAddressInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted email from cache.
            const _updatedEmails = _oldEmails.filter(
              el => el.id !== selectedId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<EmailAddressInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
              data: _updatedEmails,
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
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors?.item;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          showErrorNotification(_apiErrors[0]);
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

                  {/* Actions */}
                  <ZIonCol
                    size='.8'
                    className={classNames({
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
                      'border-r': false
                    })}>
                    <ZIonText>Actions</ZIonText>
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

                      {/* Actions */}
                      <ZIonCol
                        size='.8'
                        className={classNames({
                          'py-1 mt-1 border-b ps-2 ion-justify-content-center flex ion-align-items-center gap-2 pe-1':
                            true,
                          'border-r': false
                        })}>
                        {!_rowInfo?.original?.isPrimary &&
                        _rowInfo?.original?.status ===
                          EmailStatusEnum.Verified &&
                        enableMakeEmailPrimary ? (
                          <>
                            {/* Edit */}
                            <ZIonIcon
                              icon={createOutline}
                              color='secondary'
                              className='w-6 h-6 cursor-pointer'
                              id={`email-edit-btn-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}
                              onClick={() => {
                                setCompState(oldValues => ({
                                  ...oldValues,
                                  selectedEmail: _rowInfo?.original
                                }));

                                //
                                presentUpdateEmailModal({
                                  _cssClass: 'add-email-modal-size'
                                });
                              }}
                            />
                            <ZRTooltip
                              place='left'
                              variant='info'
                              anchorSelect={`#email-edit-btn-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}>
                              Make email primary
                            </ZRTooltip>
                          </>
                        ) : !enableMakeEmailPrimary ? (
                          <>
                            <ZIonIcon
                              icon={informationCircleOutline}
                              color='warning'
                              className='w-6 h-6 cursor-pointer '
                              id={`primary-enable-email-info-warning-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}
                            />

                            <ZRTooltip
                              place='left'
                              variant='info'
                              anchorSelect={`#primary-enable-email-info-warning-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}>
                              You can&apos;t make an email
                              <br /> primary until the password
                              <br /> change process is complete.
                            </ZRTooltip>
                          </>
                        ) : null}

                        {/* Delete or warning */}
                        {_rowInfo?.original?.isPrimary ? (
                          <>
                            <ZIonIcon
                              icon={informationCircleOutline}
                              color='warning'
                              className='w-6 h-6 cursor-pointer '
                              id={`primary-email-info-warning-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}
                            />

                            <ZRTooltip
                              place='left'
                              variant='info'
                              anchorSelect={`#primary-email-info-warning-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}>
                              Important note: Primary email <br /> deletion is
                              restricted.
                            </ZRTooltip>
                          </>
                        ) : (
                          <>
                            <ZIonIcon
                              icon={trashBinOutline}
                              color='danger'
                              className='w-5 h-5 cursor-pointer'
                              id={`email-delete-btn-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}
                              onClick={() => {
                                void deleteEmail(_rowInfo?.original?.id ?? '');
                              }}
                            />

                            <ZRTooltip
                              place='left'
                              variant='error'
                              anchorSelect={`#email-delete-btn-tt-${
                                _rowInfo?.original?.id ?? ''
                              }`}>
                              Delete email
                            </ZRTooltip>
                          </>
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
const ZEmailTableSkeleton: React.FC = React.memo(() => {
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
ZEmailTableSkeleton.displayName = 'ZEmailTableSkeleton';

// Email edit modal.
const ZUpdateEmailModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  _email: string;
  _id: string;
  _isPrimary: string;
  _status: string;
}> = ({ dismissZIonModal, _email, _id, _isPrimary }) => {
  // #region Custom hooks.
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil states.
  const [userAccountStateAtom, setUserAccountStateAtom] = useRecoilState(
    ZaionsUserAccountRStateAtom
  );
  // #endregion

  // #region APIS.
  const { mutateAsync: makeEmailPrimaryAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.makeEmailPrimary,
    _loaderMessage: MESSAGES.USER.MAKE_EMAIL_PRIMARY_API_LOADER,
    _showAlertOnError: false
  });
  // #endregion

  // #region Functions.
  const makeEmailPrimaryFn = async (): Promise<void> => {
    try {
      if (_email !== undefined && _id !== undefined) {
        if (_isPrimary !== null && _isPrimary?.length > 0) {
          showInfoNotification('Email is already a primary email.');
        } else {
          //
          const _zStringifyData = zStringify({
            email: _email
          });

          //
          const _response = await makeEmailPrimaryAsyncMutate({
            itemIds: [_id],
            urlDynamicParts: [CONSTANTS.RouteParams.user.itemId],
            requestData: _zStringifyData
          });

          if (_response !== undefined) {
            const _data = extractInnerData<{
              primaryEmail: EmailAddressInterface;
              oldPrimaryEmail: EmailAddressInterface;
            }>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (
              _data?.oldPrimaryEmail?.id !== undefined &&
              _data?.primaryEmail?.id !== undefined
            ) {
              // getting user data.

              await updateRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
                id: _data?.oldPrimaryEmail?.id,
                data: _data?.oldPrimaryEmail
              });

              await updateRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
                id: _data?.primaryEmail?.id,
                data: _data?.primaryEmail
              });

              const userData = getUserDataObjectForm({
                ...userAccountStateAtom,
                email: _data?.primaryEmail?.email
              });

              // update User token.
              void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);

              setUserAccountStateAtom(oldState => ({
                ...oldState,
                email: _data?.primaryEmail?.email
              }));

              showSuccessNotification(MESSAGES.USER.EMAIL_PRIMARY_SUCCESS);
            }
          }
          dismissZIonModal();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors?.item;
        // const _apiErrorCode = _apiErrorObjects?.status;

        // if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
        //   showErrorNotification(__apiErrors[0]);
        // }
        showErrorNotification(_apiErrors[0]);
      }

      reportCustomError(error);
    }
  };

  // #endregion

  return (
    <>
      <ZIonContent className='ion-no-padding ion-padding-horizontal'>
        <div className='mt-5'>
          <div className='flex ion-align-items-start ion-justify-content-between'>
            <ZIonTitle className='mb-3 font-semibold ion-no-padding ion-no-margin'>
              Make email primary
            </ZIonTitle>

            <ZIonIcon
              icon={closeOutline}
              className='w-6 h-6 cursor-pointer'
              onClick={() => {
                dismissZIonModal();
              }}
            />
          </div>

          <ZIonText className='block'>
            Pick this email to be your primary point of contact. This email will
            receive all important notifications. and used to login.
          </ZIonText>

          {/* Email input */}
          <ZIonInput
            name='email'
            label='Email'
            minHeight='2.3rem'
            labelPlacement='stacked'
            value={_email}
            className='mt-5'
            disabled
            readonly
          />

          {/* <div className='mt-5'>
            <ZIonButton>Make it primary</ZIonButton>
          </div> */}
        </div>
      </ZIonContent>

      <ZIonFooter className='py-1 ion-text-end'>
        <ZIonButton
          className='me-4'
          fill='outline'
          onClick={() => {
            dismissZIonModal();
          }}>
          Cancel
        </ZIonButton>
        <div
          className={classNames({
            'inline-block': true,
            'cursor-not-allowed': false
          })}>
          <ZIonButton
            className='me-4'
            color='tertiary'
            onClick={() => {
              void makeEmailPrimaryFn();
            }}>
            Make it primary
          </ZIonButton>
        </div>
      </ZIonFooter>
    </>
  );
};

export default ZEmailAddressesTable;
