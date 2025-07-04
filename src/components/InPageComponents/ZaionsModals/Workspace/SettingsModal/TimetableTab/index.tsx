/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useMemo, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import {
  addOutline,
  ellipsisHorizontalOutline,
  pencilOutline,
  timeOutline,
  trashBinOutline
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZWorkspaceTimeSlotFormModal from '../../TimeSlotFormModal';
import ZCan from '@/components/Can';
import SupportOnPatreon from '@/components/SupportOnPatreon';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal,
  useZIonPopover,
  useZIonToastSuccess
} from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { showErrorNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { extractInnerData } from '@/utils/helpers';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  daysEnum,
  FormMode,
  type TimeSlotInterface
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZTimetableTab: React.FC<{
  workspaceId?: string; // if this is owned workspace then pass the workspaceId id so we will know its a owner
  wsShareMemberId?: string; // if this is share workspace then pass the member id so we will know its a member
  wsShareId?: string; // if this is share workspace then pass the share ws id so we will know its a member
}> = ({ workspaceId, wsShareId, wsShareMemberId }) => {
  const [compState, setCompState] = useState<{
    timeSlotDay: daysEnum;
    timeSlotId: string;
    timeSlotData: TimeSlotInterface[];
  }>({
    timeSlotDay: daysEnum.monday,
    timeSlotId: '',
    timeSlotData: []
  });

  // #region Custom hooks
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Popovers and Modals
  const { presentZIonPopover: presentZTimeSlotActionPopover } = useZIonPopover(
    ZTimeSlotActionPopover,
    {
      workspaceId,
      wsShareMemberId,
      wsShareId,
      timeSlotId: compState.timeSlotId
    }
  );

  const { presentZIonModal: presentZWorkspaceTimeSlotFormModal } = useZIonModal(
    ZWorkspaceTimeSlotFormModal,
    {
      workspaceId,
      timeSlotDay: compState.timeSlotDay,
      wsShareMemberId
    }
  );
  // #endregion

  // #region APIS
  // if owner then this api hit to get time-slot for current workspace data.
  const { data: timeSlotData, isFetching: isTimeSlotDataFetching } =
    useZRQGetRequest<TimeSlotInterface[]>({
      _url: API_URL_ENUM.time_slot_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
        workspaceId ?? ''
      ],
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined && workspaceId?.trim()?.length > 0
      ),
      _showLoader: false,
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _itemsIds: [workspaceId ?? '']
    });

  // if member then this api hit to get time-slot for current share-workspace data.
  const {
    data: shareWSTimeSlotData,
    isFetching: isShareWSTimeSlotDataFetching
  } = useZRQGetRequest<TimeSlotInterface[]>({
    _url: API_URL_ENUM.time_slot_sws_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.SWS_MAIN,
      wsShareMemberId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      wsShareMemberId !== undefined && wsShareMemberId?.trim()?.length > 0
    ),
    _showLoader: false,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _itemsIds: [wsShareMemberId ?? '']
  });
  // #endregion

  // #region UseEffects
  useEffect(() => {
    try {
      // Accounting to the member or owner getting data and storing it to component state to show in frontend.
      if (wsShareMemberId !== undefined) {
        setCompState(oldValues => ({
          ...oldValues,
          timeSlotData: shareWSTimeSlotData ?? []
        }));
      } else if (workspaceId !== undefined) {
        setCompState(oldValues => ({
          ...oldValues,
          timeSlotData: timeSlotData ?? []
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [shareWSTimeSlotData, timeSlotData, workspaceId, wsShareMemberId]);
  // #endregion

  // #region Comp Constant
  // if owner then it will watch isFetching of owner api. to show skeleton while fetching data.
  let isZFetching = isTimeSlotDataFetching;

  // if member then it will watch isFetching of member api. to show skeleton while fetching data.
  if (wsShareMemberId !== undefined && wsShareMemberId?.trim()?.length > 0) {
    isZFetching = isShareWSTimeSlotDataFetching;
  }

  const formikInitialValues = {};

  const ZDays = useMemo(
    () => [
      { day: daysEnum.monday, loop: 2 },
      { day: daysEnum.tuesday, loop: 4 },
      { day: daysEnum.wednesday, loop: 5 },
      { day: daysEnum.thursday, loop: 3 },
      { day: daysEnum.friday, loop: 1 },
      { day: daysEnum.saturday, loop: 2 },
      { day: daysEnum.sunday, loop: 3 }
    ],
    []
  );
  // #endregion

  return (
    <ZCustomScrollable
      scrollX
      className='w-full h-full'>
      <div className='w-[71.375rem] h-full'>
        <SupportOnPatreon />
        <Formik
          initialValues={formikInitialValues}
          onSubmit={() => {}}>
          {() => {
            return (
              <div className='w-full h-full px-2 py-3'>
                <ZIonRow className='gap-2 border ion-text-center'>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>Monday</ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>Tuesday</ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>
                      Wednesday
                    </ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>
                      Thursday
                    </ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>Friday</ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>
                      Saturday
                    </ZIonText>
                  </ZIonCol>
                  <ZIonCol>
                    <ZIonText className='text-sm font-normal'>Sunday</ZIonText>
                  </ZIonCol>
                </ZIonRow>

                <ZIonRow className='h-[92%] gap-2 mt-3 ion-text-center'>
                  {ZDays.map((_element, _elementIndex) => {
                    return (
                      <ZIonCol
                        className='h-full zaions__bg_white'
                        key={_elementIndex}>
                        {!isZFetching &&
                          compState?.timeSlotData?.map(
                            (_timeSlot, _timeSlotIndex) => {
                              if (_element.day === _timeSlot?.day) {
                                const divStyle = {
                                  borderColor: _timeSlot?.color
                                };

                                const zIonIconStyle = {
                                  color: _timeSlot?.color
                                };

                                return (
                                  <div
                                    key={_timeSlotIndex}
                                    className='w-full h-[2.4rem] mb-3 shadow-sm zaions__bg_white rounded border flex ion-align-items-center ion-justify-content-between px-2'
                                    style={divStyle}>
                                    <ZIonText className='flex ion-align-items-center'>
                                      <ZIonIcon
                                        icon={timeOutline}
                                        className='w-6 h-6'
                                        style={zIonIconStyle}
                                      />
                                      <ZIonText className='mt-[2px] text-sm ms-2'>
                                        {_timeSlot?.time}
                                      </ZIonText>
                                    </ZIonText>

                                    <ZCan
                                      shareWSId={wsShareId}
                                      checkMode={permissionCheckModeEnum.any}
                                      permissionType={
                                        wsShareId !== undefined
                                          ? permissionsTypeEnum.shareWSMemberPermissions
                                          : permissionsTypeEnum.loggedInUserPermissions
                                      }
                                      havePermissions={
                                        wsShareId !== undefined
                                          ? [
                                              shareWSPermissionEnum.update_sws_timeSlot,
                                              shareWSPermissionEnum.delete_sws_timeSlot
                                            ]
                                          : [
                                              permissionsEnum.update_workspace,
                                              permissionsEnum.delete_workspace
                                            ]
                                      }>
                                      <ZIonIcon
                                        testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.timeActionButton}-${_timeSlot.id}`}
                                        testinglistselector={
                                          CONSTANTS.testingSelectors.workspace
                                            .settingsModal.timetable
                                            .timeActionButton
                                        }
                                        onClick={(event: unknown) => {
                                          if (_timeSlot?.id !== null) {
                                            setCompState(oldValues => ({
                                              ...oldValues,
                                              timeSlotId: _timeSlot.id as string
                                            }));

                                            //
                                            presentZTimeSlotActionPopover({
                                              _event: event as Event,
                                              _cssClass:
                                                'zaions_present_folder_Action_popover_width',
                                              _dismissOnSelect: false
                                            });
                                          }
                                        }}
                                        icon={ellipsisHorizontalOutline}
                                        className='w-5 h-5 cursor-pointer'
                                      />
                                    </ZCan>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            }
                          )}

                        {isZFetching &&
                          [...Array(_element.loop)].map((el, _loopIndex) => {
                            return (
                              <div
                                className='w-full h-[2.4rem] mb-3 shadow-sm zaions__bg_white rounded border flex ion-align-items-center ion-justify-content-between px-2'
                                key={_loopIndex}>
                                <ZIonText className='flex ion-align-items-center'>
                                  <ZIonIcon
                                    icon={timeOutline}
                                    className='w-6 h-6'
                                  />
                                  <ZIonText className='mt-[2px] text-sm ms-2'>
                                    <ZIonSkeletonText
                                      height='.9rem'
                                      width='4rem'
                                    />
                                  </ZIonText>
                                </ZIonText>
                                <ZIonIcon
                                  icon={ellipsisHorizontalOutline}
                                  className='w-5 h-5'
                                />
                              </div>
                            );
                          })}

                        <ZCan
                          shareWSId={wsShareId}
                          permissionType={
                            wsShareId !== undefined
                              ? permissionsTypeEnum.shareWSMemberPermissions
                              : permissionsTypeEnum.loggedInUserPermissions
                          }
                          havePermissions={
                            wsShareId !== undefined
                              ? [shareWSPermissionEnum.create_sws_timeSlot]
                              : [permissionsEnum?.create_timeSlot]
                          }>
                          <ZIonButton
                            expand='block'
                            disabled={isZFetching}
                            className='mb-3'
                            fill='outline'
                            size={isSmScale ? 'default' : 'small'}
                            testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.addTimeButton}-${_element.day}`}
                            onClick={() => {
                              setCompState(oldValues => ({
                                ...oldValues,
                                timeSlotDay: _element.day
                              }));

                              presentZWorkspaceTimeSlotFormModal({
                                _cssClass: 'workspace-create-time-slot-modal'
                              });
                            }}>
                            <ZIonIcon icon={addOutline} />
                            <ZIonText className='ms-1 pt-[2px]'>
                              Add Time
                            </ZIonText>
                          </ZIonButton>
                        </ZCan>
                      </ZIonCol>
                    );
                  })}
                </ZIonRow>
              </div>
            );
          }}
        </Formik>
      </div>
    </ZCustomScrollable>
  );
};

const ZTimeSlotActionPopover: React.FC<{
  workspaceId?: string;
  wsShareMemberId?: string;
  wsShareId?: string;
  timeSlotId: string;
  dismissZIonPopover: (data: string, role: string) => void;
}> = ({
  timeSlotId,
  wsShareId,
  workspaceId,
  wsShareMemberId,
  dismissZIonPopover
}) => {
  const { presentZIonModal: presentZWorkspaceTimeSlotFormModal } = useZIonModal(
    ZWorkspaceTimeSlotFormModal,
    {
      workspaceId,
      timeSlotId,
      mode: FormMode.EDIT,
      wsShareMemberId
    }
  );

  // #region APIS.
  // Request for deleting time slot.
  const { mutateAsync: deleteTimeSlotMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.time_slot_update_delete,
    _loaderMessage: MESSAGES.TIME_SLOT.DELETING_API
  });

  // Request for deleting share ws time slot.
  const { mutateAsync: deleteSWSTimeSlotMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.time_slot_sws_update_delete_get,
    _loaderMessage: MESSAGES.TIME_SLOT.DELETING_API
  });
  // #endregion

  // #region Custom hooks
  // const { isLgScale, isMdScale } = useZMediaQueryScale(); //
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  // #endregion

  // #region Functions.
  // when user won't to delete time slot and click on the delete button this function will fire and show the confirm alert.
  const deleteTimeSlot = async (): Promise<void> => {
    try {
      if (timeSlotId !== undefined) {
        await presentZIonAlert({
          header: MESSAGES.TIME_SLOT.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.TIME_SLOT.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.TIME_SLOT.DELETE_ALERT.MESSAGES,
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
                void removeTimeSlot();
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

  // on the delete time slot confirm alert, when user click on delete button this function will first which will trigger delete request and delete the time slot.
  const removeTimeSlot = async (): Promise<void> => {
    try {
      if (timeSlotId !== undefined) {
        let _response;
        if (workspaceId !== undefined) {
          _response = await deleteTimeSlotMutate({
            itemIds: [workspaceId, timeSlotId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.timeSlot.timeSlotId
            ]
          });
        } else if (wsShareMemberId !== undefined) {
          _response = await deleteSWSTimeSlotMutate({
            itemIds: [wsShareMemberId, timeSlotId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.timeSlot.timeSlotId
            ]
          });
        }

        if (_response !== undefined) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            let _rqTimeSlotData =
              (getRQCDataHandler<TimeSlotInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                  workspaceId ?? ''
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

            // getting all the shortLinks from RQ cache.
            const _oldTimeSlots =
              extractInnerData<TimeSlotInterface[]>(
                _rqTimeSlotData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted shortLinks from cache.
            const _updatedTimeSlots = _oldTimeSlots.filter(
              el => el.id !== timeSlotId
            );

            if (workspaceId !== undefined) {
              // Updating data in RQ cache.
              await updateRQCDataHandler<TimeSlotInterface[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                  workspaceId
                ],
                data: _updatedTimeSlots,
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
                data: _updatedTimeSlots,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            void presentZIonToastSuccess(MESSAGES.TIME_SLOT.DELETED);
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonList
      lines='full'
      className='ion-no-padding'>
      {/* Edit */}
      {/* if user as a owner or member have permission to do this action then showing element */}
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined
            ? [shareWSPermissionEnum.update_sws_timeSlot]
            : [permissionsEnum?.update_timeSlot]
        }>
        <ZIonItem
          minHeight='2.1rem'
          className='cursor-pointer ion-activatable'
          testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.timeEditButton}-${timeSlotId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.workspace.settingsModal.timetable
              .timeEditButton
          }
          onClick={() => {
            if (timeSlotId !== undefined) {
              presentZWorkspaceTimeSlotFormModal({
                _cssClass: 'workspace-create-time-slot-modal'
              });

              dismissZIonPopover('', '');
            }
          }}>
          <ZIonIcon
            icon={pencilOutline}
            className='w-5 h-5 me-2'
            color='secondary'
          />
          <ZIonText className='font-normal'>Edit</ZIonText>
        </ZIonItem>
      </ZCan>

      {/* Delete */}
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== undefined
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId !== undefined
            ? [shareWSPermissionEnum.delete_sws_timeSlot]
            : [permissionsEnum?.delete_timeSlot]
        }>
        <ZIonItem
          minHeight='2.1rem'
          lines='none'
          className='cursor-pointer ion-activatable'
          testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.timeDeleteButton}-${timeSlotId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.workspace.settingsModal.timetable
              .timeDeleteButton
          }
          onClick={() => {
            void deleteTimeSlot();

            dismissZIonPopover('', '');
          }}>
          <ZIonIcon
            icon={trashBinOutline}
            className='w-5 h-5 me-2'
            color='danger'
          />
          <ZIonText className='font-normal'>Delete</ZIonText>
        </ZIonItem>
      </ZCan>
    </ZIonList>
  );
};

export default ZTimetableTab;
