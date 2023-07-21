/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonMenu,
	ZIonMenuToggle,
	ZIonRadioGroup,
	ZIonReorder,
	ZIonReorderGroup,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
	addCircleOutline,
	addOutline,
	checkmarkOutline,
	closeOutline,
	trashBin,
	trashBinOutline,
} from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, Formik } from 'formik';
import {
	useZRQCreateRequest,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { ZBoardStatusInterface } from '@/types/AdminPanel/Project/index.type';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { useParams } from 'react-router';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, zStringify } from '@/utils/helpers';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonToast,
} from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';

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

const ZProjectBoardStatusMenu: React.FC = () => {
	function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively
		console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		event.detail.complete();
	}

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	// Custom hook
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	// Getting project boardStatuses from backend.
	const { data: ZCurrentBoardStatues } = useZRQGetRequest<
		ZBoardStatusInterface[]
	>({
		_url: API_URL_ENUM.boardStatus_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_STATUS.MAIN,
			projectId,
			boardId,
		],
		_itemsIds: [boardId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
		_shouldFetchWhenIdPassed: !boardId ? true : false,
	});

	// Create new boardStatus API.
	const { mutateAsync: ZCreateBoardStatuesAsyncMutate } =
		useZRQCreateRequest<ZBoardStatusInterface>({
			_url: API_URL_ENUM.boardStatus_create_list,
			_queriesKeysToInvalidate: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_STATUS.MAIN,
				projectId,
				boardId,
			],
			_itemsIds: [boardId],
			_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
		});

	// Update boardStatus API.
	const { mutateAsync: updateBoardStatusMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.boardStatus_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_STATUS.MAIN,
			projectId,
			boardId,
		],
	});

	// Delete boardStatus API.
	const { mutateAsync: deleteBoardStatusAsyncMutate } = useZRQDeleteRequest(
		API_URL_ENUM.boardStatus_update_delete,
		[
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_STATUS.MAIN,
			projectId,
			boardId,
		]
	);

	// Formik submit handler
	const formikSubmitHandlerFn = async (_data: string) => {
		try {
			if (_data) {
				const _response = await ZCreateBoardStatuesAsyncMutate(_data);

				if (_response) {
					const _item = extractInnerData<ZBoardStatusInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item.id) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_STATUS_CREATED_SUCCESSFULLY
						);
					} else {
						showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// deleteBoardIdeaFn will show the confirm alert before deleting boardIdea.
	const deleteBoardIdeaFn = async (boardStatusId: string) => {
		try {
			if (boardId && boardStatusId) {
				await presentZIonAlert({
					header: `Delete board status`,
					subHeader: 'Remove status from board.',
					message: 'Are you sure you want to delete this status?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeBoardIdea(boardStatusId);
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	// removeBoardIdea will hit delete boardIdea api.
	const removeBoardIdea = async (boardStatusId: string) => {
		try {
			if (boardStatusId) {
				// hitting the delete api
				const _response = await deleteBoardStatusAsyncMutate({
					itemIds: [boardId, boardStatusId],
					urlDynamicParts: [
						CONSTANTS.RouteParams.project.board.boardId,
						CONSTANTS.RouteParams.project.boardStatus.boardStatusId,
					],
				});

				if (_response) {
					const _data = extractInnerData<{ success: boolean }>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data?.success) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_STATUS_DELETED_SUCCESSFULLY
						);
					}
				} else {
					await presentZIonErrorAlert();
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID}
			side='end'
			menuId={CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID}
			style={{ '--width': '37%' }}
		>
			<ZIonContent>
				<ZIonGrid className='px-[2rem] py-[1rem]'>
					<div className='flex w-full ion-align-items-center'>
						<ZIonText className='mt-2 text-xl font-bold'>
							Edit Statuses
						</ZIonText>

						<ZIonMenuToggle className='ms-auto'>
							<ZIonIcon
								icon={closeOutline}
								className='w-6 h-6 pt-1 cursor-pointer'
							/>
						</ZIonMenuToggle>
					</div>
					<ZIonText className='block mt-1'>
						Edit existing statuses, reorder them and create new ones.
					</ZIonText>

					<Formik
						initialValues={{
							addStatus: false,
							statusTitle: '',
							statusColor: '#828282',
							editMode: false,

							statues: ZCurrentBoardStatues || [],
						}}
						enableReinitialize={true}
						onSubmit={async (values, { setFieldValue }) => {
							try {
								const zStringifyValues = zStringify({
									title: values.statusTitle,
									color: values.statusColor,
								});

								await formikSubmitHandlerFn(zStringifyValues);

								setFieldValue('addStatus', false, false);
								setFieldValue('statusTitle', '', false);
							} catch (error) {
								reportCustomError(error);
							}
						}}
					>
						{({
							values,
							setFieldValue,
							handleChange,
							handleBlur,
							submitForm,
						}) => {
							return (
								<>
									<div className='mt-8'>
										<FieldArray name=''>
											{() => {
												return (
													<ZIonReorderGroup
														disabled={false}
														onIonItemReorder={handleReorder}
													>
														{ZCurrentBoardStatues?.map((el, index) => {
															return (
																<div
																	className='flex mt-4 ion-align-items-center'
																	key={index}
																>
																	<ZIonReorder></ZIonReorder>
																	{/* <ZIonButton
																			className='mx-2 ion-no-margin'
																			style={{
																				'--padding-start': '1rem',
																				'--background': el.color,
																			}}
																			height='27px'
																		></ZIonButton> */}
																	<div>
																		<ZaionsColorPiker
																			showInput={false}
																			value={values.statues[index]?.color}
																			name={`statues.${index}.color`}
																			setFieldValueFn={setFieldValue}
																			className='mt-[0px!important]'
																			colorInputClassName='h-[2.3rem!important] w-[2.3rem!important]'
																			onClick={() => {
																				values.statues.map((el, _index) => {
																					setFieldValue(
																						`statues.${_index}.editMode`,
																						false,
																						false
																					);
																				});
																				setFieldValue(
																					`statues.${index}.editMode`,
																					true,
																					false
																				);
																			}}
																		/>
																	</div>
																	{!values.statues[index]?.editMode && (
																		<ZIonItem
																			lines='none'
																			className='w-full rounded-lg cursor-pointer ion-activatable'
																			minHeight='40px'
																			style={{ '--padding-start': '9px' }}
																			onClick={() => {
																				if (values.statues[index]?.isEditable) {
																					values.statues.map((el, _index) => {
																						setFieldValue(
																							`statues.${_index}.editMode`,
																							false,
																							false
																						);
																					});
																					setFieldValue(
																						`statues.${index}.editMode`,
																						true,
																						false
																					);
																				}
																			}}
																		>
																			{el.title}
																		</ZIonItem>
																	)}
																	{values.statues[index]?.editMode &&
																	values.statues[index].isEditable ? (
																		<>
																			<ZIonInput
																				minHeight='37px'
																				value={values.statues[index]?.title}
																				autofocus={true}
																				onIonChange={handleChange}
																				onIonBlur={handleBlur}
																				name={`statues.${index}.title`}
																				className='ms-2'
																			/>
																		</>
																	) : (
																		''
																	)}
																	{values.statues[index]?.editMode &&
																	values.statues[index].isEditable ? (
																		<>
																			<ZIonButton
																				className='ion-no-margin ion-no-padding ms-3'
																				height='34px'
																				size='small'
																				color='success'
																				disabled={
																					values.statues[index]?.title?.trim()
																						?.length > 0
																						? false
																						: true
																				}
																				onClick={async () => {
																					if (
																						values.statues[index]?.title?.trim()
																							?.length > 0 &&
																						el?.id
																					) {
																						const _response =
																							await updateBoardStatusMutate({
																								itemIds: [boardId, el?.id],
																								urlDynamicParts: [
																									CONSTANTS.RouteParams.project
																										.board.boardId,
																									CONSTANTS.RouteParams.project
																										.boardStatus.boardStatusId,
																								],
																								requestData: zStringify({
																									title:
																										values.statues[index]
																											?.title,
																									color:
																										values.statues[index]
																											?.color,
																								}),
																							});

																						if (_response) {
																							const _item =
																								extractInnerData<ZBoardStatusInterface>(
																									_response,
																									extractInnerDataOptionsEnum.createRequestResponseItem
																								);

																							if (_item && _item.id) {
																								showSuccessNotification(
																									MESSAGES.GENERAL.PROJECT
																										.BOARD_IDEA_UPDATED_SUCCESSFULLY
																								);
																							} else {
																								showErrorNotification(
																									MESSAGES.GENERAL
																										.SOMETHING_WENT_WRONG
																								);
																							}

																							setFieldValue(
																								`statues.${index}.editMode`,
																								false,
																								false
																							);
																						}
																					}
																				}}
																			>
																				<ZIonIcon
																					icon={checkmarkOutline}
																					className='px-1'
																				/>
																			</ZIonButton>

																			<ZIonButton
																				className='ion-no-margin ion-no-padding ms-3'
																				height='34px'
																				size='small'
																				color='secondary'
																				onClick={() => {
																					setFieldValue(
																						'addStatus',
																						false,
																						false
																					);
																				}}
																			>
																				<ZIonIcon
																					icon={closeOutline}
																					className='px-1'
																				/>
																			</ZIonButton>
																		</>
																	) : (
																		''
																	)}

																	{!values.statues[index]?.editMode &&
																	values.statues[index]?.isDeletable ? (
																		<ZIonButton
																			className='ion-no-margin ion-no-padding ms-3'
																			height='30px'
																			color='danger'
																			onClick={() => {
																				try {
																					if (el.id) {
																						deleteBoardIdeaFn(el.id);
																					}
																				} catch (error) {
																					reportCustomError(error);
																				}
																			}}
																		>
																			<ZIonIcon
																				// color='danger'
																				icon={trashBinOutline}
																				className='w-4 h-4 px-1'
																			/>
																		</ZIonButton>
																	) : (
																		''
																	)}
																</div>
															);
														})}
													</ZIonReorderGroup>
												);
											}}
										</FieldArray>
									</div>

									{values.addStatus && (
										<ZIonReorderGroup>
											<div className='flex mt-4 ion-align-items-center'>
												<ZIonReorder></ZIonReorder>
												<div className='me-2'>
													<ZaionsColorPiker
														showInput={false}
														value={values.statusColor}
														name='statusColor'
														setFieldValueFn={setFieldValue}
														className='mt-[2px!important]'
														colorInputClassName='h-[2.3rem!important] w-[2.3rem!important]'
													/>
												</div>

												<ZIonInput
													minHeight='34px'
													autofocus
													placeholder='State title*'
													name='statusTitle'
													value={values.statusTitle}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
												/>

												<ZIonButton
													className='ion-no-margin ms-3'
													height='34px'
													color='success'
													disabled={
														values.statusTitle.trim().length > 0 ? false : true
													}
													onClick={() => {
														if (values.statusTitle.trim().length > 0) {
															submitForm();
														}
													}}
												>
													<ZIonIcon icon={checkmarkOutline} />
												</ZIonButton>

												<ZIonButton
													className='ion-no-margin ms-3'
													height='34px'
													color='secondary'
													onClick={() => {
														setFieldValue('addStatus', false, false);
													}}
												>
													<ZIonIcon icon={closeOutline} />
												</ZIonButton>
											</div>
										</ZIonReorderGroup>
									)}

									{!values.addStatus && (
										<div className='flex w-full mt-3 ion-justify-content-end'>
											<ZIonButton
												onClick={() => {
													void setFieldValue('addStatus', true, false);
												}}
											>
												<ZIonIcon icon={addOutline} className='mti' />
												<ZIonText>Add status</ZIonText>
											</ZIonButton>
										</div>
									)}
								</>
							);
						}}
					</Formik>
				</ZIonGrid>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZProjectBoardStatusMenu;
