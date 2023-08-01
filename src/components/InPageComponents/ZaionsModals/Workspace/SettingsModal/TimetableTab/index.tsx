/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { WorkspaceSettingsTimetablePlaceholder } from '@/assets/images';
import ZWorkspaceSettingPlaceholderComp from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal/PlaceholderComp';
import { Formik } from 'formik';
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	addOutline,
	ellipsisHorizontalOutline,
	pencilOutline,
	timeOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspaceTimeSlotFormModal from '../../TimeSlotFormModal';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import {
	daysEnum,
	FormMode,
	TimeSlotInterface,
} from '@/types/AdminPanel/index.type';

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
		timeSlotId: '',
	});

	const { presentZIonPopover: presentZTimeSlotActionPopover } = useZIonPopover(
		ZTimeSlotActionPopover,
		{
			workspaceId: workspaceId,
			timeSlotId: compState.timeSlotId,
		}
	);

	const { presentZIonModal: presentZWorkspaceTimeSlotFormModal } = useZIonModal(
		ZWorkspaceTimeSlotFormModal,
		{
			workspaceId: workspaceId,
			timeSlotDay: compState.timeSlotDay,
		}
	);

	//#region APIS
	const { data: timeSlotData, isFetching: isTimeSlotDataFetching } =
		useZRQGetRequest<TimeSlotInterface[]>({
			_url: API_URL_ENUM.time_slot_create_list,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN, workspaceId],
			_showLoader: false,
			_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
			_itemsIds: [workspaceId],
		});
	// #endregion

	const isZFetching = isTimeSlotDataFetching;

	const ZDays = [
		daysEnum.monday,
		daysEnum.tuesday,
		daysEnum.wednesday,
		daysEnum.thursday,
		daysEnum.friday,
		daysEnum.saturday,
		daysEnum.sunday,
	];

	return (
		<Formik initialValues={{}} onSubmit={() => {}}>
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
							{ZDays.map((_day, _dayIndex) => {
								return (
									<ZIonCol className='h-full bg-white' key={_dayIndex}>
										{!isZFetching &&
											timeSlotData &&
											timeSlotData?.map((_timeSlot, _timeSlotIndex) => {
												if (_day === _timeSlot?.day) {
													return (
														<div
															key={_timeSlotIndex}
															className='w-full h-[2.4rem] mb-3 shadow-sm bg-white rounded border flex ion-align-items-center ion-justify-content-between px-2'
														>
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
																onClick={(event: unknown) => {
																	if (_timeSlot.id) {
																		setCompState((oldValues) => ({
																			...oldValues,
																			timeSlotId: _timeSlot.id as string,
																		}));

																		//
																		presentZTimeSlotActionPopover({
																			_event: event as Event,
																			_cssClass:
																				'zaions_present_folder_Action_popover_width',
																			_dismissOnSelect: false,
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
											[1, 2].map((el) => {
												return (
													<div
														className='w-full h-[2.4rem] mb-3 shadow-sm bg-white rounded border flex ion-align-items-center ion-justify-content-between px-2'
														key={el}
													>
														<ZIonText className='flex ion-align-items-center'>
															<ZIonIcon
																icon={timeOutline}
																className='w-6 h-6'
															/>
															<ZIonText className='mt-[2px] text-sm ms-2'>
																<ZIonSkeletonText height='.9rem' width='4rem' />
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
											onClick={() => {
												setCompState((oldValues) => ({
													...oldValues,
													timeSlotDay: _day,
												}));

												presentZWorkspaceTimeSlotFormModal({
													_cssClass: 'workspace-create-time-slot-modal',
												});
											}}
										>
											<ZIonIcon icon={addOutline} />
											<ZIonText className='ms-1 pt-[2px]'>Add Time</ZIonText>
										</ZIonButton>
									</ZIonCol>
								);
							})}
							{/* <ZIonCol></ZIonCol>
							<ZIonCol></ZIonCol>
							<ZIonCol></ZIonCol>
							<ZIonCol></ZIonCol>
							<ZIonCol></ZIonCol>
							<ZIonCol></ZIonCol> */}
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
			mode: FormMode.EDIT,
		}
	);

	return (
		<ZIonList lines='full' className='ion-no-padding'>
			{/* Edit */}
			<ZIonItem
				minHeight='2.1rem'
				className='cursor-pointer ion-activatable'
				onClick={() => {
					if (timeSlotId) {
						presentZWorkspaceTimeSlotFormModal({
							_cssClass: 'workspace-create-time-slot-modal',
						});

						dismissZIonPopover('', '');
					}
				}}
			>
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
			>
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
