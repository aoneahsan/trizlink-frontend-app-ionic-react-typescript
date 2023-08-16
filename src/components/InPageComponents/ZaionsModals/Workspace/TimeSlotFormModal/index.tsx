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
	ZIonText,
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
	useZUpdateRQCacheData,
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
	VALIDATION_RULE,
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
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
	daysEnum,
	FormMode,
	TimeSlotInterface,
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

const ZWorkspaceTimeSlotFormModal: React.FC<{
	workspaceId: string;
	timeSlotId?: string;
	mode?: FormMode;
	timeSlotDay: daysEnum;
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({
	dismissZIonModal,
	workspaceId,
	timeSlotDay,
	timeSlotId,
	mode = FormMode.ADD,
}) => {
	// #region APIS.
	const { mutateAsync: createTimeSlotMutateAsync } = useZRQCreateRequest({
		_url: API_URL_ENUM.time_slot_create_list,
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
		_itemsIds: [workspaceId],
	});

	const {
		data: currentTimeSlotData,
		isFetching: isCurrentTimeSlotDataFetching,
	} = useZRQGetRequest<TimeSlotInterface>({
		_url: API_URL_ENUM.time_slot_update_delete,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.GET,
			workspaceId,
			timeSlotId || '',
		],
		_showLoader: false,
		_urlDynamicParts: [
			CONSTANTS.RouteParams.workspace.workspaceId,
			CONSTANTS.RouteParams.timeSlot.timeSlotId,
		],
		_itemsIds: [workspaceId, timeSlotId || ''],
		_shouldFetchWhenIdPassed:
			timeSlotId && mode === FormMode.EDIT ? false : true,
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	const { mutateAsync: updateTimeSlotMutateAsync } = useZRQUpdateRequest({
		_url: API_URL_ENUM.time_slot_update_delete,
	});

	// #endregion

	// #region Custom hooks
	// const { isLgScale, isMdScale } = useZMediaQueryScale(); //
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	const { presentZIonToastSuccess } = useZIonToastSuccess();
	// #endregion

	// #region functions.
	const formikSubmitHandler = async (_data: string) => {
		try {
			if (_data) {
				let __response;

				if (mode === FormMode.ADD) {
					__response = await createTimeSlotMutateAsync(_data);
				} else if (mode === FormMode.EDIT) {
					__response = await updateTimeSlotMutateAsync({
						itemIds: [workspaceId, timeSlotId || ''],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.timeSlot.timeSlotId,
						],
						requestData: _data,
					});
				}

				if ((__response as ZLinkMutateApiType<TimeSlotInterface>).success) {
					// extract Data from _response.
					const __data = extractInnerData<TimeSlotInterface>(
						__response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (__data && __data.id) {
						const __oldTimeSlot =
							extractInnerData<TimeSlotInterface[]>(
								getRQCDataHandler<TimeSlotInterface[]>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
										workspaceId,
									],
								}) as TimeSlotInterface[],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						if (__oldTimeSlot) {
							if (mode === FormMode.ADD) {
								// added shortLink to all TimeSlot data in cache.
								const __updatedTimeSlot = [...__oldTimeSlot, __data];

								// Updating all TimeSlot data in RQ cache.
								await updateRQCDataHandler<TimeSlotInterface[] | undefined>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
										workspaceId,
									],
									data: __updatedTimeSlot as TimeSlotInterface[],
									id: '',
									extractType: ZRQGetRequestExtractEnum.extractItems,
									updateHoleData: true,
								});

								presentZIonToastSuccess(MESSAGES.GENERAL.TIME_SLOT.CREATED);
							} else if (mode === FormMode.EDIT) {
								// Updating all TimeSlot data in RQ cache.
								await updateRQCDataHandler<TimeSlotInterface | undefined>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
										workspaceId,
									],
									data: __data as TimeSlotInterface,
									id: __data.id,
								});

								// Updating TimeSlot data in RQ cache.
								await updateRQCDataHandler<TimeSlotInterface | undefined>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.GET,
										workspaceId,
										__data.id,
									],
									data: __data as TimeSlotInterface,
									id: '',
									updateHoleData: true,
									extractType: ZRQGetRequestExtractEnum.extractItem,
								});

								presentZIonToastSuccess(MESSAGES.GENERAL.TIME_SLOT.UPDATED);
							}
						}

						dismissZIonModal();
					}
				} else {
					throw new Error(
						(__response as ZLinkMutateApiType<TimeSlotInterface>).message ||
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
			if (mode === FormMode.EDIT && timeSlotId && currentTimeSlotData?.id) {
				const __oldTimeSlot =
					extractInnerData<TimeSlotInterface[]>(
						getRQCDataHandler<TimeSlotInterface[]>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
								workspaceId,
							],
						}) as TimeSlotInterface[],
						extractInnerDataOptionsEnum.createRequestResponseItems
					) || [];

				if (__oldTimeSlot) {
					console.log({ currentTimeSlotData });
					// Updating all TimeSlot data in RQ cache.
					void updateRQCDataHandler<TimeSlotInterface | undefined>({
						key: [
							CONSTANTS.REACT_QUERY.QUERIES_KEYS.TIME_SLOT.MAIN,
							workspaceId,
						],
						data: { ...currentTimeSlotData },
						id: currentTimeSlotData?.id,
					});
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [timeSlotId, currentTimeSlotData?.id]);

	const isZFetching = mode === FormMode.EDIT && isCurrentTimeSlotDataFetching;

	return (
		<ZIonContent className='w-full h-full ion-padding'>
			<Formik
				initialValues={{
					time: currentTimeSlotData?.time || '',
					day: currentTimeSlotData?.day || timeSlotDay || daysEnum.monday,
					color: currentTimeSlotData?.color || DefaultTimeSlotColors[0].color,
				}}
				enableReinitialize={true}
				validate={(values) => {
					const errors: {
						time?: string;
						day?: string;
					} = {};

					validateFields(['time', 'day'], values, errors, [
						VALIDATION_RULE.string,
						VALIDATION_RULE.string,
					]);

					return errors;
				}}
				onSubmit={async (values) => {
					try {
						const __zStringifyData = zStringify({
							time: values.time,
							day: values.day,
							color: values.color,
						});

						await formikSubmitHandler(__zStringifyData);
					} catch (error) {
						reportCustomError(error);
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					isValid,
					handleBlur,
					handleChange,
					setFieldValue,
					submitForm,
				}) => {
					return (
						<ZIonRow className='h-full ion-align-items-between'>
							<ZIonCol size='12' className='ion-no-padding'>
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
											testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.closeBtn}-1`}
											onClick={() => {
												dismissZIonModal();
											}}
										>
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
							<ZIonCol size='12' className='ion-no-padding'>
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
										errorText={touched.time ? errors.time : undefined}
										testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.timeInput}-${timeSlotId}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.settingsModal
												.timetable.formModal.timeInput
										}
										className={classNames({
											'ion-touched': touched.time,
											'ion-invalid': errors.time,
											'ion-valid': !errors.time,
										})}
									/>
								)}
							</ZIonCol>

							{/* Select day */}
							<ZIonCol size='12' className='ion-no-padding'>
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
										errorText={touched.day ? errors.day : undefined}
										testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.daySelector}-${timeSlotId}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.settingsModal
												.timetable.formModal.daySelector
										}
										onIonChange={(e) => {
											if (mode === FormMode.ADD) {
												handleChange(e);
											}
										}}
										onIonBlur={(e) => {
											if (mode === FormMode.ADD) {
												handleBlur(e);
											}
										}}
										disabled={mode === FormMode.EDIT}
										className={classNames({
											'ion-touched': touched.day,
											'ion-invalid': errors.day,
											'ion-valid': !errors.day,
										})}
									>
										{ZDaysData.map((el, index) => {
											return (
												<ZIonSelectOption
													key={index}
													value={el.type}
													className='h-[2.3rem] text-sm pb-2'
												>
													{el.title}
												</ZIonSelectOption>
											);
										})}
									</ZIonSelect>
								)}
							</ZIonCol>

							{/* Select color */}
							<ZIonCol size='12' className='ion-no-padding'>
								<ZIonText className='block text-sm font-bold'>
									Select color
								</ZIonText>
								<div className='flex mt-3 ion-align-items-center'>
									{/* <div className='border-e selected'>
										<div className='w-[1.3rem] cursor-pointer flex ion-align-items-center ion-justify-content-center h-[1.3rem] rounded-full mx-1 bg-slate-800'>
											<ZIonIcon icon={checkmark} color='light' />
										</div>
									</div> */}

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
												testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.colorBtn}-${el.id}`}
												testingListSelector={
													CONSTANTS.testingSelectors.workspace.settingsModal
														.timetable.formModal.colorBtn
												}
												onClick={() => {
													setFieldValue('color', el.color, false);
												}}
											>
												{values.color === el.color && (
													<ZIonIcon icon={checkmark} color='light' />
												)}
											</ZIonButton>
										);
									})}
								</div>
								<ZaionsColorPiker
									value={values.color}
									name='color'
									setFieldValueFn={setFieldValue}
									minHeight='2.3rem'
									showSkeleton={isZFetching}
									setDefaultColor={DefaultTimeSlotColors[0].color}
									testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.colorInput}-${timeSlotId}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.settingsModal.timetable
											.formModal.colorInput
									}
								/>
							</ZIonCol>

							{/* buttons */}
							<ZIonCol
								size='12'
								className='flex gap-2 ion-text-end ion-align-items-end ion-justify-content-end ion-no-padding'
							>
								<ZIonButton
									fill='outline'
									testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.timetable.formModal.closeBtn}-2`}
									onClick={() => {
										dismissZIonModal();
									}}
								>
									Cancel
								</ZIonButton>
								<ZIonButton
									disabled={!isValid}
									testingSelector={
										CONSTANTS.testingSelectors.workspace.settingsModal.timetable
											.formModal.submitBtn
									}
									onClick={() => {
										void submitForm();
									}}
								>
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
