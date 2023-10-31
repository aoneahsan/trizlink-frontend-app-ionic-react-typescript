/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { checkmark, close } from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonToastSuccess } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { extractInnerData, validateFields, zStringify } from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import MESSAGES from '@/utils/messages';
import { ZDaysData } from '@/data/UserDashboard/Days';
import { DefaultTimeSlotColors } from '@/data/UserDashboard/Workspace/index.data';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
  daysEnum,
  FormMode,
  type TimeSlotInterface
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';

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

const ZWorkspaceTimeSlotFormModal: React.FC<{
  workspaceId: string;
  timeSlotId?: string;
  mode?: FormMode;
  timeSlotDay: daysEnum;
  wsShareMemberId?: string; // if this is share workspace then pass the member id
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({
  dismissZIonModal,
  workspaceId,
  timeSlotDay,
  timeSlotId,
  wsShareMemberId,
  mode = FormMode.ADD
}) => {
  // #region APIS.
  // if owner then this api hit to create time slot for current workspace data.
  const { mutateAsync: createTimeSlotMutateAsync } = useZRQCreateRequest({
    _url: API_URL_ENUM.time_slot_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId],
    _loaderMessage: MESSAGES.TIME_SLOT.CREATING_API
  });

  // if member then this api hit to create time slot for current share workspace data.
  const { mutateAsync: createSWSTimeSlotMutateAsync } = useZRQCreateRequest({
    _url: API_URL_ENUM.time_slot_sws_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [wsShareMemberId ?? ''],
    _loaderMessage: MESSAGES.TIME_SLOT.CREATING_API
  });

  // if owner then this api hit to get current time slot in current workspace data.
  const {
    data: currentTimeSlotData,
    isFetching: isCurrentTimeSlotDataFetching
  } = useZRQGetRequest<TimeSlotInterface>({
    _url: API_URL_ENUM.time_slot_update_delete,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.GET,
      workspaceId,
      timeSlotId ?? ''
    ],
    _showLoader: false,
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.timeSlot.timeSlotId
    ],
    _itemsIds: [workspaceId, timeSlotId ?? ''],
    _shouldFetchWhenIdPassed: !(
      timeSlotId !== undefined &&
      workspaceId !== undefined &&
      mode === FormMode.EDIT
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // if member then this api hit to get current time slot in current share workspace data.
  const {
    data: currentSWSTimeSlotData,
    isFetching: isCurrentSWSTimeSlotDataFetching
  } = useZRQGetRequest<TimeSlotInterface>({
    _url: API_URL_ENUM.time_slot_sws_update_delete_get,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_GET,
      wsShareMemberId ?? '',
      timeSlotId ?? ''
    ],
    _showLoader: false,
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.shareWSMemberId,
      CONSTANTS.RouteParams.timeSlot.timeSlotId
    ],
    _itemsIds: [wsShareMemberId ?? '', timeSlotId ?? ''],
    _shouldFetchWhenIdPassed: !(
      timeSlotId !== undefined &&
      wsShareMemberId !== undefined &&
      mode === FormMode.EDIT
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // if owner then this api hit to update time slot for current workspace data.
  const { mutateAsync: updateTimeSlotMutateAsync } = useZRQUpdateRequest({
    _url: API_URL_ENUM.time_slot_update_delete,
    _loaderMessage: MESSAGES.TIME_SLOT.UPDATING_API
  });

  // if member then this api hit to update time slot for current share workspace data.
  const { mutateAsync: updateSWSTimeSlotMutateAsync } = useZRQUpdateRequest({
    _url: API_URL_ENUM.time_slot_sws_update_delete_get,
    _loaderMessage: MESSAGES.TIME_SLOT.UPDATING_API
  });

  // #endregion

  // #region Custom hooks
  // const { isLgScale, isMdScale } = useZMediaQueryScale(); //
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  // #endregion

  // #region functions.
  const formikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;

        if (mode === FormMode.ADD) {
          if (wsShareMemberId !== undefined) {
            _response = await createSWSTimeSlotMutateAsync(_value);
          } else if (workspaceId !== undefined) {
            _response = await createTimeSlotMutateAsync(_value);
          }
        } else if (mode === FormMode.EDIT) {
          if (wsShareMemberId !== undefined) {
            _response = await updateSWSTimeSlotMutateAsync({
              itemIds: [wsShareMemberId, timeSlotId ?? ''],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.timeSlot.timeSlotId
              ],
              requestData: _value
            });
          } else if (workspaceId !== undefined) {
            _response = await updateTimeSlotMutateAsync({
              itemIds: [workspaceId, timeSlotId ?? ''],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.timeSlot.timeSlotId
              ],
              requestData: _value
            });
          }
        }

        if ((_response as ZLinkMutateApiType<TimeSlotInterface>).success) {
          // extract Data from _response.
          const _data = extractInnerData<TimeSlotInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null) {
            let _rqTimeSlotData =
              (getRQCDataHandler<TimeSlotInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                  workspaceId
                ]
              }) as TimeSlotInterface[]) ?? [];

            if (wsShareMemberId !== undefined) {
              _rqTimeSlotData = getRQCDataHandler<TimeSlotInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_MAIN,
                  wsShareMemberId
                ]
              }) as TimeSlotInterface[];
            }

            const _oldTimeSlot =
              extractInnerData<TimeSlotInterface[]>(
                _rqTimeSlotData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            if (_oldTimeSlot !== undefined) {
              if (mode === FormMode.ADD) {
                // added shortLink to all TimeSlot data in cache.
                const _updatedTimeSlot = [..._oldTimeSlot, _data];

                if (workspaceId !== undefined) {
                  // Updating all TimeSlot data in RQ cache.
                  await updateRQCDataHandler<TimeSlotInterface[] | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                      workspaceId
                    ],
                    data: _updatedTimeSlot as TimeSlotInterface[],
                    id: '',
                    extractType: ZRQGetRequestExtractEnum.extractItems,
                    updateHoleData: true
                  });
                } else if (wsShareMemberId !== undefined) {
                  await updateRQCDataHandler<TimeSlotInterface[] | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_MAIN,
                      wsShareMemberId
                    ],
                    data: _updatedTimeSlot as TimeSlotInterface[],
                    id: '',
                    extractType: ZRQGetRequestExtractEnum.extractItems,
                    updateHoleData: true
                  });
                }

                void presentZIonToastSuccess(MESSAGES.TIME_SLOT.CREATED);
              } else if (mode === FormMode.EDIT) {
                if (workspaceId !== undefined) {
                  // Updating all TimeSlot data in RQ cache.
                  await updateRQCDataHandler<TimeSlotInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                      workspaceId
                    ],
                    data: _data,
                    id: _data?.id ?? ''
                  });

                  // Updating TimeSlot data in RQ cache.
                  await updateRQCDataHandler<TimeSlotInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.GET,
                      workspaceId,
                      _data?.id ?? ''
                    ],
                    data: _data,
                    id: '',
                    updateHoleData: true,
                    extractType: ZRQGetRequestExtractEnum.extractItem
                  });
                } else if (wsShareMemberId !== undefined) {
                  // Updating all TimeSlot data in RQ cache.
                  await updateRQCDataHandler<TimeSlotInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_MAIN,
                      wsShareMemberId
                    ],
                    data: _data,
                    id: _data?.id ?? ''
                  });

                  // Updating TimeSlot data in RQ cache.
                  await updateRQCDataHandler<TimeSlotInterface | undefined>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_GET,
                      wsShareMemberId,
                      _data?.id ?? ''
                    ],
                    data: _data,
                    id: '',
                    updateHoleData: true,
                    extractType: ZRQGetRequestExtractEnum.extractItem
                  });
                }

                void presentZIonToastSuccess(MESSAGES.TIME_SLOT.UPDATED);
              }
            }

            dismissZIonModal();
          }
        } else {
          throw new Error(
            (_response as ZLinkMutateApiType<TimeSlotInterface>).message ??
              'something went wrong please try again! :('
          );
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  useEffect(() => {
    try {
      if (
        mode === FormMode.EDIT &&
        timeSlotId !== undefined &&
        currentTimeSlotData?.id !== undefined
      ) {
        const _oldTimeSlot =
          extractInnerData<TimeSlotInterface[]>(
            getRQCDataHandler<TimeSlotInterface[]>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                workspaceId
              ]
            }) as TimeSlotInterface[],
            extractInnerDataOptionsEnum.createRequestResponseItems
          ) ?? [];

        if (_oldTimeSlot !== undefined) {
          // Updating all TimeSlot data in RQ cache.
          void updateRQCDataHandler<TimeSlotInterface | undefined>({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
              workspaceId
            ],
            data: { ...currentTimeSlotData },
            id: currentTimeSlotData?.id
          });
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlotId, currentTimeSlotData?.id]);

  let isZFetching = mode === FormMode.EDIT;

  if (workspaceId !== undefined) {
    isZFetching = mode === FormMode.EDIT && isCurrentTimeSlotDataFetching;
  } else if (wsShareMemberId !== undefined) {
    isZFetching = mode === FormMode.EDIT && isCurrentSWSTimeSlotDataFetching;
  }

  return (
    <ZIonContent className='w-full h-full ion-padding'>
      <Formik
        initialValues={{
          time: currentTimeSlotData?.time ?? currentSWSTimeSlotData?.time ?? '',
          day:
            currentTimeSlotData?.day != null ??
            currentSWSTimeSlotData?.day != null ??
            timeSlotDay ??
            daysEnum.monday,
          color:
            currentTimeSlotData?.color ??
            currentSWSTimeSlotData?.color ??
            DefaultTimeSlotColors[0].color
        }}
        enableReinitialize={true}
        validate={values => {
          const errors: {
            time?: string;
            day?: string;
          } = {};

          validateFields(['time', 'day'], values, errors, [
            VALIDATION_RULE.string,
            VALIDATION_RULE.string
          ]);

          return errors;
        }}
        onSubmit={async values => {
          try {
            const _zStringifyData = zStringify({
              time: values.time,
              day: values.day,
              color: values.color
            });

            await formikSubmitHandler(_zStringifyData);
          } catch (error) {
            reportCustomError(error);
          }
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleBlur,
          handleChange,
          setFieldValue,
          submitForm
        }) => {
          return (
            <ZIonRow className='h-full ion-align-items-between'>
              <ZIonCol
                size='12'
                className='ion-no-padding'>
                {/* Row-1 (title & close modal button) */}
                <ZIonRow className='ion-align-items-center'>
                  {/* Title */}
                  <ZIonCol>
                    <ZIonText className='text-lg font-bold'>
                      {mode === FormMode.EDIT ? 'Update ' : 'Create '}
                      time slot
                    </ZIonText>
                  </ZIonCol>
                  {/* Close modal button */}
                  <ZIonCol className='pb-2 ion-text-end'>
                    <ZIonButton
                      className='ion-no-padding ion-no-margin'
                      size='small'
                      fill='clear'
                      testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.closeBtn}-1`}
                      onClick={() => {
                        dismissZIonModal();
                      }}>
                      <ZIonIcon
                        icon={close}
                        className='w-6 h-6'
                        color='medium'
                      />
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonCol>

              {/* Select time */}
              <ZIonCol
                size='12'
                className='ion-no-padding'>
                {isZFetching && (
                  <div className='w-full h-[2.3rem]'>
                    <ZIonSkeletonText
                      width='100%'
                      height='100%'
                      className='rounded-lg'
                    />
                  </div>
                )}
                {!isZFetching && (
                  <ZIonInput
                    name='time'
                    label='Select time'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    type='time'
                    value={values.time}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    errorText={
                      touched?.time === true ? errors?.time : undefined
                    }
                    testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.timeInput}-${timeSlotId}`}
                    testinglistselector={
                      CONSTANTS.testingSelectors.workspace.settingsModal
                        .timetable.formModal.timeInput
                    }
                    className={classNames({
                      z_ion_bg_white: true,
                      'ion-touched': touched?.time === true,
                      'ion-invalid': touched?.time === true && errors.time,
                      'ion-valid':
                        touched?.time === true &&
                        (errors?.time?.trim()?.length === 0 ||
                          errors?.time === undefined ||
                          errors?.time === null)
                    })}
                  />
                )}
              </ZIonCol>

              {/* Select day */}
              <ZIonCol
                size='12'
                className='ion-no-padding'>
                {isZFetching && (
                  <div className='w-full h-[2.3rem]'>
                    <ZIonSkeletonText
                      width='100%'
                      height='100%'
                      className='rounded-lg'
                    />
                  </div>
                )}
                {!isZFetching && (
                  <ZIonSelect
                    label='Select day'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    fill='outline'
                    interface='popover'
                    name='day'
                    value={values.day}
                    errorText={touched?.day === true ? errors.day : undefined}
                    testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.daySelector}-${timeSlotId}`}
                    testinglistselector={
                      CONSTANTS.testingSelectors.workspace.settingsModal
                        .timetable.formModal.daySelector
                    }
                    onIonChange={e => {
                      if (mode === FormMode.ADD) {
                        handleChange(e);
                      }
                    }}
                    onIonBlur={e => {
                      if (mode === FormMode.ADD) {
                        handleBlur(e);
                      }
                    }}
                    disabled={mode === FormMode.EDIT}
                    className={classNames({
                      z_ion_bg_white: true,
                      'ion-touched': touched?.day === true,
                      'ion-invalid': touched?.day === true && errors?.day,
                      'ion-valid':
                        touched?.day === true &&
                        (errors?.day?.trim()?.length === 0 ||
                          errors?.day === undefined ||
                          errors?.day === undefined)
                    })}>
                    {ZDaysData.map((el, index) => {
                      return (
                        <ZIonSelectOption
                          key={index}
                          value={el.type}
                          className='h-[2.3rem] text-sm pb-2'>
                          {el.title}
                        </ZIonSelectOption>
                      );
                    })}
                  </ZIonSelect>
                )}
              </ZIonCol>

              {/* Select color */}
              <ZIonCol
                size='12'
                className='ion-no-padding'>
                <ZIonText className='block text-sm font-bold'>
                  Select color
                </ZIonText>
                <div className='flex mt-3 ion-align-items-center'>
                  {/*  */}
                  {DefaultTimeSlotColors.map((el, index) => {
                    return (
                      <ZIonButton
                        key={index}
                        shape='round'
                        size='small'
                        fill='default'
                        className='w-[1.7rem] shadow-none cursor-pointer ion-no-margin ion-no-padding flex ion-align-items-center ion-justify-content-center h-[1.3rem] rounded-full mx-1'
                        style={{ '--background': el.color }}
                        testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.colorBtn}-${el.id}`}
                        testinglistselector={
                          CONSTANTS.testingSelectors.workspace.settingsModal
                            .timetable.formModal.colorBtn
                        }
                        onClick={() => {
                          void setFieldValue('color', el.color, false);
                        }}>
                        {values.color === el.color && (
                          <ZIonIcon
                            icon={checkmark}
                            color='light'
                          />
                        )}
                      </ZIonButton>
                    );
                  })}
                </div>
                <ZaionsColorPiker
                  value={values.color}
                  name='color'
                  setFieldValueFn={
                    setFieldValue as FormikSetFieldValueEventVoidType
                  }
                  minHeight='2.3rem'
                  showSkeleton={isZFetching}
                  setDefaultColor={DefaultTimeSlotColors[0].color}
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.colorInput}-${timeSlotId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.timetable
                      .formModal.colorInput
                  }
                />
              </ZIonCol>

              {/* buttons */}
              <ZIonCol
                size='12'
                className='flex gap-2 ion-text-end ion-align-items-end ion-justify-content-end ion-no-padding'>
                <ZIonButton
                  fill='outline'
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.closeBtn}-2`}
                  onClick={() => {
                    dismissZIonModal();
                  }}>
                  Cancel
                </ZIonButton>
                <ZIonButton
                  disabled={!isValid}
                  testingselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.timetable
                      .formModal.submitBtn
                  }
                  onClick={() => {
                    void submitForm();
                  }}>
                  {mode === FormMode.ADD
                    ? 'Create'
                    : mode === FormMode.EDIT
                    ? 'Update'
                    : 'Invalid'}
                </ZIonButton>
              </ZIonCol>
            </ZIonRow>
          );
        }}
      </Formik>
    </ZIonContent>
  );
};

export default ZWorkspaceTimeSlotFormModal;
