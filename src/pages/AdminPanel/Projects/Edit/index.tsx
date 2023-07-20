/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZProjectHeader from '@/components/ProjectComponents/Header';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonList,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { Formik, useFormikContext } from 'formik';
import {
	cardOutline,
	chatboxEllipsesOutline,
	closeCircle,
	closeOutline,
	cloudOutline,
	codeSlashOutline,
	codeWorkingOutline,
	colorWandOutline,
	constructOutline,
	downloadOutline,
	extensionPuzzleOutline,
	happyOutline,
	languageOutline,
	linkOutline,
	lockClosedOutline,
	mailOutline,
	mapOutline,
	menuOutline,
	peopleOutline,
	settingsOutline,
	syncCircleOutline,
} from 'ionicons/icons';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';
import {
	useZInvalidateReactQueries,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import CONSTANTS from '@/utils/constants';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { useParams } from 'react-router';
import { reportCustomError } from '@/utils/customErrorType';
import {
	createRedirectRoute,
	extractInnerData,
	zJsonParse,
	zStringify,
} from '@/utils/helpers';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

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

const ZProjectEditPage: React.FC = () => {
	const { isXlScale, isSmScale } = useZMediaQueryScale();

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'mt-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Formik */}
					<Formik
						initialValues={{}}
						enableReinitialize={true}
						onSubmit={() => {}}
					>
						{() => {
							return (
								// Row
								<ZIonRow className='gap-6 mt-4'>
									{/* Col-1 */}
									<ZIonCol size='3.2'>
										<ZIonList
											lines='none'
											color='light'
											className='bg-transparent'
										>
											{/* General settings */}
											<ZIonItem
												minHeight='40px'
												className={classNames({
													'rounded-lg cursor-pointer': true,
													'ion-activatable': false,
												})}
											>
												<ZIonIcon
													icon={settingsOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													General settings
												</ZIonText>
											</ZIonItem>

											{/* Billing */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={cardOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Billing</ZIonText>
											</ZIonItem>

											{/* Team */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={peopleOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Team</ZIonText>
											</ZIonItem>

											{/* Integration */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={extensionPuzzleOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Integration</ZIonText>
											</ZIonItem>

											{/* Single Sign-On */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={cloudOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													Single Sign-On
												</ZIonText>
											</ZIonItem>

											{/* Custom domain */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={linkOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Custom domain</ZIonText>
											</ZIonItem>

											{/* Private */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={lockClosedOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Private</ZIonText>
											</ZIonItem>

											{/* Menu */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={menuOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Menu</ZIonText>
											</ZIonItem>

											{/* Feedback */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={happyOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Feedback</ZIonText>
											</ZIonItem>

											{/* Roadmap */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={mapOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Roadmap</ZIonText>
											</ZIonItem>

											{/* Updates */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={constructOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Updates</ZIonText>
											</ZIonItem>

											{/* Widget */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={chatboxEllipsesOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Widget</ZIonText>
											</ZIonItem>

											{/* Embed Settings */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={codeSlashOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													Embed Settings
												</ZIonText>
											</ZIonItem>

											{/* Custom CSS */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={codeWorkingOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Custom CSS</ZIonText>
											</ZIonItem>

											{/* Export */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={downloadOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Export</ZIonText>
											</ZIonItem>

											{/* Webhooks */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={syncCircleOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Webhooks</ZIonText>
											</ZIonItem>

											{/* Email Settings */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={mailOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													Email Settings
												</ZIonText>
											</ZIonItem>

											{/* Translation Settings */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={languageOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													Translation Settings
												</ZIonText>
											</ZIonItem>

											{/* AI Settings */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className={classNames({
													'mt-2 rounded-lg cursor-pointer': true,
													'ion-activatable': true,
												})}
											>
												<ZIonIcon
													icon={colorWandOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>AI Settings</ZIonText>
											</ZIonItem>
										</ZIonList>
									</ZIonCol>

									{/* Col-2 */}
									<ZIonCol className='px-10 py-5 mb-4 bg-white rounded-lg shadow h-max'>
										<ZGeneralSettingsTab />
									</ZIonCol>
								</ZIonRow>
							);
						}}
					</Formik>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

const ZGeneralSettingsTab: React.FC = () => {
	const { projectId } = useParams<{
		projectId: string;
	}>();

	/**
	 * Custom hooks.
	 */
	const { zInvalidateReactQueries } = useZInvalidateReactQueries();
	const { zNavigatePushRoute } = useZNavigate();
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	//
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	// Delete file api.
	const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
		_url: API_URL_ENUM.deleteSingleFile,
	});

	// Getting current project data from backend.
	const { data: ZCurrentProjectData } = useZRQGetRequest<ZProjectInterface>({
		_url: API_URL_ENUM.project_update_delete,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET, projectId],
		_itemsIds: [projectId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	// Update project API.
	const { mutateAsync: updateProjectMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.project_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET,
			projectId,
		],
	});

	// Delete project idea API.
	const { mutateAsync: deleteProjectMutate } = useZRQDeleteRequest(
		API_URL_ENUM.project_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.MAIN, projectId]
	);

	// deleteProjectFn will show the confirm alert before deleting project.
	const deleteProjectFn = async () => {
		try {
			if (projectId && ZCurrentProjectData?.id) {
				await presentZIonAlert({
					header: `Delete project "${ZCurrentProjectData?.projectName}"`,
					subHeader: 'Remove project.',
					message: 'Are you sure you want to delete this project?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeProject();
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

	// removeProject will hit delete project api.
	const removeProject = async () => {
		try {
			if (ZCurrentProjectData?.id) {
				if (
					ZCurrentProjectData?.image?.filePath &&
					ZCurrentProjectData?.image?.filePath?.trim()?.length > 0
				) {
					// Deleting the file from storage
					await deleteSingleFile({
						requestData: zStringify({
							filePath: ZCurrentProjectData?.image?.filePath,
						}),
						itemIds: [],
						urlDynamicParts: [],
					});
				}

				// hitting the delete api
				const _response = await deleteProjectMutate({
					itemIds: [projectId],
					urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
				});

				if (_response) {
					const _data = extractInnerData<{ success: boolean }>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data?.success) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_IDEA_DELETED_SUCCESSFULLY
						);

						zNavigatePushRoute(ZaionsRoutes.AdminPanel.Projects.Main);
					}
				} else {
					await presentZIonErrorAlert();
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	const formikSubmitHandler = async (_data: string) => {
		try {
			if (_data) {
				const _response = await updateProjectMutate({
					itemIds: [projectId],
					urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
					requestData: _data,
				});

				zInvalidateReactQueries([
					CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.MAIN,
					projectId,
				]);

				if (_response) {
					const _data = extractInnerData<ZProjectBoardInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.PROJECT_UPDATED_SUCCESSFULLY
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

	return (
		<>
			<ZIonText className='block pb-2 text-xl font-bold'>
				General settings
			</ZIonText>

			<Formik
				initialValues={{
					title: ZCurrentProjectData?.projectName || '',
					slug: ZCurrentProjectData?.subDomain || '',
					image: ZCurrentProjectData?.image || {
						fileUrl: '',
						filePath: '',
					}, // logo
					accentColor: ZCurrentProjectData?.accentColor || '#F84339',
					squaredIcon: ZCurrentProjectData?.squaredIcon || {
						fileUrl: '',
						filePath: '',
					},
					displayedInProjectHomePage: '',
				}}
				enableReinitialize={true}
				onSubmit={async (values) => {
					try {
						const zStringifyData = zStringify({
							projectName: values.title,
							subDomain: values.slug,
							image: zStringify(values.image),
							squaredIcon: zStringify(values.squaredIcon),
							accentColor: values.accentColor,
						});

						//
						await formikSubmitHandler(zStringifyData);
					} catch (error) {
						reportCustomError(error);
					}
				}}
			>
				{({
					values,
					errors,
					setFieldValue,
					handleBlur,
					handleChange,
					submitForm,
				}) => {
					return (
						<div className='mt-4'>
							{/* Project Name */}
							<ZIonInput
								label='Project Name'
								labelPlacement='stacked'
								name='title'
								value={values.title}
								errorText={errors.title}
								minHeight='42px'
								onIonBlur={handleBlur}
								onIonChange={(e) => {
									handleChange(e);

									setFieldValue(
										'slug',
										String(e.target.value).split(' ').join('_').toLowerCase(),
										false
									);
								}}
							/>

							{/* Project Subdomain */}
							<ZIonInput
								label='Project Subdomain'
								labelPlacement='stacked'
								minHeight='42px'
								className='mt-6'
								name='slug'
								value={values.slug}
								errorText={errors.slug}
								onIonBlur={handleBlur}
								onIonChange={handleChange}
							/>

							{/* Accent color */}
							<ZaionsColorPiker
								value={values.accentColor}
								name='accentColor'
								setFieldValueFn={setFieldValue}
								label='Accent color'
								className='mt-6'
							/>

							{/* Upload logo */}
							<div className='w-full mt-5'>
								<ZIonText className='block mb-1 text-sm font-bold'>
									Logo
								</ZIonText>
								{values.image?.fileUrl &&
									values.image?.fileUrl?.trim()?.length > 0 && (
										<div className='relative flex flex-row w-full mb-1'>
											<div className='relative w-[100px]'>
												<ZIonImg
													src={values.image.fileUrl}
													className='max-h-[109px] w-full h-full rounded-lg overflow-hidden'
												/>
												<ZIonIcon
													icon={closeCircle}
													color='danger'
													className='absolute w-6 h-6 border rounded-full cursor-pointer ion-no-padding -top-1 -right-2'
													onClick={async () => {
														if (
															values?.image?.filePath &&
															values?.image?.filePath.trim()?.length > 0
														) {
															// Deleting the file from storage
															await deleteSingleFile({
																requestData: zStringify({
																	filePath: values?.image?.filePath,
																}),
																itemIds: [],
																urlDynamicParts: [],
															});

															setFieldValue(
																'image',
																{
																	fileUrl: '',
																	filePath: '',
																},
																false
															);
														}
													}}
												/>
											</div>
										</div>
									)}
								<ZIonButton
									className='mx-0'
									onClick={() => {
										presentZFileUploadModal({
											_cssClass: 'file-upload-modal-size',
											_onWillDismiss: async (
												ev: CustomEvent<OverlayEventDetail>
											) => {
												if (ev.detail.role === ZIonModalActionEnum.success) {
													// Getting file data from fileUploadModal and parse it.
													const fileData = zJsonParse(
														String(ev.detail.data)
													) as {
														fileUrl: string;
														filePath: string;
													};

													if (
														values?.image?.filePath &&
														values?.image?.filePath.trim()?.length > 0 &&
														fileData.filePath !== values?.image?.filePath
													) {
														// Deleting the file from storage
														await deleteSingleFile({
															requestData: zStringify({
																filePath: values?.image?.filePath,
															}),
															itemIds: [],
															urlDynamicParts: [],
														});
													}

													setFieldValue(
														'image',
														{
															fileUrl: fileData.fileUrl,
															filePath: fileData.filePath,
														},
														false
													);
												}
											},
										});
									}}
									color='medium'
								>
									Upload logo
								</ZIonButton>
							</div>

							{/* Squared icon */}
							<div className='w-full mt-5'>
								<ZIonText className='block mb-1 text-sm font-bold'>
									Squared icon
								</ZIonText>
								{values.squaredIcon?.fileUrl &&
									values.squaredIcon?.fileUrl?.trim()?.length > 0 && (
										<div className='relative flex flex-row w-full mb-1'>
											<div className='relative w-[100px]'>
												<ZIonImg
													src={values.squaredIcon.fileUrl}
													className='max-h-[109px] w-full h-full rounded-lg overflow-hidden'
												/>
												<ZIonIcon
													icon={closeCircle}
													color='danger'
													className='absolute w-6 h-6 border rounded-full cursor-pointer ion-no-padding -top-1 -right-2'
													onClick={async () => {
														if (
															values?.squaredIcon?.filePath &&
															values?.squaredIcon?.filePath.trim()?.length > 0
														) {
															// Deleting the file from storage
															await deleteSingleFile({
																requestData: zStringify({
																	filePath: values?.squaredIcon?.filePath,
																}),
																itemIds: [],
																urlDynamicParts: [],
															});

															setFieldValue(
																'squaredIcon',
																{
																	fileUrl: '',
																	filePath: '',
																},
																false
															);
														}
													}}
												/>
											</div>
										</div>
									)}
								<ZIonButton
									className='mx-0 mb-0'
									onClick={() => {
										presentZFileUploadModal({
											_cssClass: 'file-upload-modal-size',
											_onWillDismiss: async (
												ev: CustomEvent<OverlayEventDetail>
											) => {
												if (ev.detail.role === ZIonModalActionEnum.success) {
													// Getting file data from fileUploadModal and parse it.
													const fileData = zJsonParse(
														String(ev.detail.data)
													) as {
														fileUrl: string;
														filePath: string;
													};

													if (
														values?.squaredIcon?.filePath &&
														values?.squaredIcon?.filePath.trim()?.length > 0 &&
														fileData.filePath !== values?.squaredIcon?.filePath
													) {
														// Deleting the file from storage
														await deleteSingleFile({
															requestData: zStringify({
																filePath: values?.squaredIcon?.filePath,
															}),
															itemIds: [],
															urlDynamicParts: [],
														});
													}

													setFieldValue(
														'squaredIcon',
														{
															fileUrl: fileData.fileUrl,
															filePath: fileData.filePath,
														},
														false
													);
												}
											},
										});
									}}
									color='medium'
								>
									Upload icon
								</ZIonButton>
								<ZIonText className='block mt-1 text-sm'>
									This will be used for your favicon and share icons. The
									recommended image size is 256x256
								</ZIonText>
							</div>

							{/* Choose what is displayed as your project's home screen. */}
							<div className='w-1/2'>
								<ZIonSelect
									label="Choose what is displayed as your project's home screen."
									labelPlacement='stacked'
									fill='outline'
									minHeight='42px'
									className='mt-6'
									value={values.displayedInProjectHomePage}
									interface='popover'
									name='displayedInProjectHomePage'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
								>
									<ZIonSelectOption value='talha-bin-irshad'>
										talha-bin-irshad
									</ZIonSelectOption>
								</ZIonSelect>
							</div>

							{/* Save settings */}
							<div className='w-full mt-6'>
								<ZIonButton
									onClick={() => {
										void submitForm();
									}}
								>
									Save settings
								</ZIonButton>
							</div>

							<div className='flex px-4 py-5 mt-12 bg-white border border-red-500 rounded-lg shadow ion-align-items-center ion-justify-content-between sm:p-6'>
								<div>
									<ZIonText className='block text-lg font-medium leading-6'>
										Delete this project
									</ZIonText>

									<ZIonText className='block mt-2 text-sm'>
										Once you delete this project, you will lose all data
										associated with it.
									</ZIonText>
								</div>

								<div className=''>
									<ZIonButton
										color='danger'
										onClick={() => {
											void deleteProjectFn();
										}}
									>
										Delete this project
									</ZIonButton>
								</div>
							</div>
						</div>
					);
				}}
			</Formik>
		</>
	);
};

export default ZProjectEditPage;
