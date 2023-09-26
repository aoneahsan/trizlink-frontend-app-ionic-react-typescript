/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  daysEnum,
  FormMode,
  TimeSlotInterface
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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

const ZTimetableTab: React.FC<{
  workspaceId: string;
}> = ({ workspaceId }) => {
  const [compState, setCompState] = useState<{
    timeSlotDay: daysEnum;
    timeSlotId: string;
  }>({
    timeSlotDay: daysEnum.monday,
    timeSlotId: ''
  });

  const { presentZIonPopover: presentZTimeSlotActionPopover } = useZIonPopover(
    ZTimeSlotActionPopover,
    {
      workspaceId: workspaceId,
      timeSlotId: compState.timeSlotId
    }
  );

  const { presentZIonModal: presentZWorkspaceTimeSlotFormModal } = useZIonModal(
    ZWorkspaceTimeSlotFormModal,
    {
      workspaceId: workspaceId,
      timeSlotDay: compState.timeSlotDay
    }
  );

  //#region APIS
  const { data: timeSlotData, isFetching: isTimeSlotDataFetching } =
    useZRQGetRequest<TimeSlotInterface[]>({
      _url: API_URL_ENUM.time_slot_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN, workspaceId],
      _showLoader: false,
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _itemsIds: [workspaceId]
    });
  // #endregion

  const isZFetching = isTimeSlotDataFetching;

  const ZDays = [
    { day: daysEnum.monday, loop: 2 },
    { day: daysEnum.tuesday, loop: 4 },
    { day: daysEnum.wednesday, loop: 5 },
    { day: daysEnum.thursday, loop: 3 },
    { day: daysEnum.friday, loop: 1 },
    { day: daysEnum.saturday, loop: 2 },
    { day: daysEnum.sunday, loop: 3 }
  ];

  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {}}>
      {/* <ZWorkspaceSettingPlaceholderComp
				buttonText='Add a time'
				image={WorkspaceSettingsTimetablePlaceholder}
				title={
					<span>
						Add your preferred publishing times <br /> for faster scheduling
					</span>
				}
			/> */}

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
                <ZIonText className='text-sm font-normal'>Wednesday</ZIonText>
              </ZIonCol>
              <ZIonCol>
                <ZIonText className='text-sm font-normal'>Thursday</ZIonText>
              </ZIonCol>
              <ZIonCol>
                <ZIonText className='text-sm font-normal'>Friday</ZIonText>
              </ZIonCol>
              <ZIonCol>
                <ZIonText className='text-sm font-normal'>Saturday</ZIonText>
              </ZIonCol>
              <ZIonCol>
                <ZIonText className='text-sm font-normal'>Sunday</ZIonText>
              </ZIonCol>
            </ZIonRow>

            <ZIonRow className='h-[92%] gap-2 mt-3 ion-text-center'>
              {ZDays.map((_element, _elementIndex) => {
                return (
                  <ZIonCol
                    className='h-full bg-white'
                    key={_elementIndex}>
                    {!isZFetching &&
                      timeSlotData &&
                      timeSlotData?.map((_timeSlot, _timeSlotIndex) => {
                        if (_element.day === _timeSlot?.day) {
                          return (
                            <div
                              key={_timeSlotIndex}
                              className='w-full h-[2.4rem] mb-3 shadow-sm bg-white rounded border flex ion-align-items-center ion-justify-content-between px-2'>
                              <ZIonText className='flex ion-align-items-center'>
                                <ZIonIcon
                                  icon={timeOutline}
                                  className='w-6 h-6'
                                />
                                <ZIonText className='mt-[2px] text-sm ms-2'>
                                  {_timeSlot?.time}
                                </ZIonText>
                              </ZIonText>
                              <ZIonIcon
                                testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.timeActionButton}-${_timeSlot.id}`}
                                testinglistselector={
                                  CONSTANTS.testingSelectors.workspace
                                    .settingsModal.timetable.timeActionButton
                                }
                                onClick={(event: unknown) => {
                                  if (_timeSlot.id) {
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
                            </div>
                          );
                        }
                      })}

                    {isZFetching &&
                      [...Array(_element.loop)].map((el, _loopIndex) => {
                        return (
                          <div
                            className='w-full h-[2.4rem] mb-3 shadow-sm bg-white rounded border flex ion-align-items-center ion-justify-content-between px-2'
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

                    <ZIonButton
                      expand='block'
                      disabled={isZFetching}
                      className='mb-3'
                      fill='outline'
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
                      <ZIonText className='ms-1 pt-[2px]'>Add Time</ZIonText>
                    </ZIonButton>
                  </ZIonCol>
                );
              })}
            </ZIonRow>
          </div>
        );
      }}
    </Formik>
  );
};

const ZTimeSlotActionPopover: React.FC<{
  workspaceId: string;
  timeSlotId: string;
  dismissZIonPopover: (data: string, role: string) => void;
}> = ({ timeSlotId, workspaceId, dismissZIonPopover }) => {
  const { presentZIonModal: presentZWorkspaceTimeSlotFormModal } = useZIonModal(
    ZWorkspaceTimeSlotFormModal,
    {
      workspaceId: workspaceId,
      timeSlotId: timeSlotId,
      mode: FormMode.EDIT
    }
  );

  // #region APIS.
  // Request for deleting time slot.
  const { mutateAsync: deleteTimeSlotMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.time_slot_update_delete
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
  const deleteTimeSlot = async () => {
    try {
      if (timeSlotId) {
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
  const removeTimeSlot = async () => {
    try {
      if (timeSlotId) {
        const __response = await deleteTimeSlotMutate({
          itemIds: [workspaceId, timeSlotId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.timeSlot.timeSlotId
          ]
        });

        if (__response) {
          const __data = extractInnerData<{ success: boolean }>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data && __data?.success) {
            // getting all the shortLinks from RQ cache.
            const __oldTimeSlots =
              extractInnerData<TimeSlotInterface[]>(
                getRQCDataHandler<TimeSlotInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                    workspaceId
                  ]
                }) as TimeSlotInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // removing deleted shortLinks from cache.
            const __updatedTimeSlots = __oldTimeSlots.filter(
              el => el.id !== timeSlotId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<TimeSlotInterface[] | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
                workspaceId
              ],
              data: __updatedTimeSlots as TimeSlotInterface[],
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            presentZIonToastSuccess(MESSAGES.TIME_SLOT.DELETED);
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
      <ZIonItem
        minHeight='2.1rem'
        className='cursor-pointer ion-activatable'
        testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.timeEditButton}-${timeSlotId}`}
        testinglistselector={
          CONSTANTS.testingSelectors.workspace.settingsModal.timetable
            .timeEditButton
        }
        onClick={() => {
          if (timeSlotId) {
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

      {/* Delete */}
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
          deleteTimeSlot();

          dismissZIonPopover('', '');
        }}>
        <ZIonIcon
          icon={trashBinOutline}
          className='w-5 h-5 me-2'
          color='danger'
        />
        <ZIonText className='font-normal'>Delete</ZIonText>
      </ZIonItem>
    </ZIonList>
  );
};

export default ZTimetableTab;
