/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ReactDropzone from 'react-dropzone';
import classNames from 'classnames';
import { arrowForward } from 'ionicons/icons';
import { Formik, useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, {
	PRODUCT_NAME,
	ProjectBoardDefaultData,
} from '@/utils/constants';
import {
	createRedirectRoute,
	extractInnerData,
	validateField,
	validateFields,
	zJsonParse,
	zStringify,
} from '@/utils/helpers';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ProjectBoardStatusEnum,
	ProjectCreatePageTabEnum,
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo } from '@/assets/images';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectCreatePage: React.FC = () => {
	//
	const { isLgScale } = useZMediaQueryScale();

	// Create new project API.
	const { mutateAsync: createProjectMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.project_create_list,
		_queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.MAIN],
	});

	// Formik submit function
	const formikSubmitHandler = async (
		value: string,
		setFieldValue: FormikSetFieldValueEventType
	) => {
		try {
			if (value) {
				// Making an api call creating new project
				const _response = await createProjectMutate(value);

				if (_response) {
					const _data = extractInnerData<ZProjectInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						setFieldValue('id', _data.id, false);

						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.PROJECT_CREATED_SUCCESSFULLY
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
		<ZaionsIonPage>
			<ZIonContent>
				<Formik
					initialValues={{
						currentTab: ProjectCreatePageTabEnum.detailForm,
						projectName: '',
						subDomain: '',
						image: '',
						board: {
							id: '',
							title: 'Feature requests',
						},
						completedRecently: '',
						inProgress: '',
						plannedNext: '',
					}}
					validate={(values) => {
						const errors: {
							projectName?: string;
							subDomain?: string;
							board: {
								title?: string;
							};
							completedRecently?: string;
							inProgress?: string;
							plannedNext?: string;
						} = {
							board: {},
						};

						validateFields(['projectName', 'subDomain'], values, errors, [
							VALIDATION_RULE.string,
							VALIDATION_RULE.string,
						]);

						validateField(
							'title',
							values.board,
							errors.board,
							VALIDATION_RULE.string
						);

						if (
							(errors.board.title && errors.board.title?.trim().length > 0) ||
							(errors.projectName && errors.projectName?.trim().length > 0) ||
							(errors.subDomain && errors.subDomain?.trim().length > 0)
						) {
							return errors;
						} else {
							return {};
						}
					}}
					onSubmit={async (values, { setFieldValue }) => {
						try {
							await formikSubmitHandler(
								zStringify({
									projectName: values.projectName,
									subDomain: values.subDomain,
									image: values.image,
								}),
								setFieldValue
							);
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					{({ values, errors }) => {
						console.log({
							values,
							errors,
						});
						return (
							<ZIonRow>
								{/* Left (Form col) */}
								<ZIonCol className='relative z-10 flex flex-col-reverse justify-between w-full px-4 bg-white shadow-lg md:h-screen md:flex-row'>
									{/* dots */}
									<div className='flex flex-row justify-center my-4 md:flex-col md:my-0 md:mr-4'>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab ===
													ProjectCreatePageTabEnum.detailForm,
												zaions__secondary_set:
													values.currentTab !==
													ProjectCreatePageTabEnum.detailForm,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab === ProjectCreatePageTabEnum.board,
												zaions__secondary_set:
													values.currentTab !== ProjectCreatePageTabEnum.board,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab === ProjectCreatePageTabEnum.ideas,
												zaions__secondary_set:
													values.currentTab !== ProjectCreatePageTabEnum.ideas,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab ===
													ProjectCreatePageTabEnum.roadMap,
												zaions__secondary_set:
													values.currentTab !==
													ProjectCreatePageTabEnum.roadMap,
											})}
										></div>
									</div>

									{/* main form div */}
									<div className='w-full max-w-lg mx-auto mt-8 md:mt-16'>
										<div className='w-full'>
											{/* Logo */}
											<div className='flex ion-align-items-center'>
												<ZIonImg
													src={ProductLogo}
													className='w-[2.5rem] me-3 h-auto rounded-xl overflow-hidden'
												/>
												<ZIonText
													className='text-2xl font-extrabold tracking-wider'
													color='dark'
												>
													{PRODUCT_NAME}
												</ZIonText>
											</div>

											{/*  */}
											<div className='pt-16'>
												{values.currentTab ===
												ProjectCreatePageTabEnum.detailForm ? (
													<ZDetailFormTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.board ? (
													<ZBoardTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.ideas ? (
													<ZIdeasTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.roadMap ? (
													<ZRoadMapTab />
												) : (
													''
												)}
											</div>
										</div>
									</div>
								</ZIonCol>

								{/* Right (Preview col) */}
								{isLgScale && (
									<ZIonCol className='flex zaions__bg_light_opacity_point5 ion-align-items-center ion-justify-content-center'>
										{/* Browser window */}
										<div
											className={classNames(classes['z-browser-window'], {
												'h-[21rem] w-full max-w-[32rem] bg-[#f7f4f2] rounded-[0.375rem] overflow-hidden':
													true,
											})}
										>
											{/* Window tab */}
											<div
												className={classNames({
													'flex overflow-hidden h-10 ion-align-items-end w-full bg-[#cbcfd4]':
														true,
												})}
											>
												<div className='w-48'>
													<ZIonTitle className='ion-no-padding relative z-10 flex w-full h-8 ion-align-items-center bg-[#eaecee] px-2 text-sm leading-5 text-[#2e4052] mx-2 rounded-t font-normal'>
														{values.projectName.trim().length > 0
															? values.projectName
															: 'New Project'}{' '}
														Feedback
													</ZIonTitle>
												</div>
											</div>

											{/* Window tab url */}
											<div className='relative z-0 flex w-full h-10 ion-align-items-center bg-[#eaecee]'>
												<span className='flex w-full h-6 px-2 mx-2 text-sm leading-5 bg-white rounded-full'>
													<ZIonTitle className='w-min max-w-max ion-no-padding text-[rgba(46,64,82,1)] text-sm font-normal'>
														https://
													</ZIonTitle>
													<ZIonTitle className='ion-no-padding text-sm text-[rgba(46,64,82,1)] font-normal w-min max-w-max'>
														{values.subDomain.trim().length > 0
															? values.subDomain
															: 'new-project'}
													</ZIonTitle>
													<ZIonTitle className='text-sm ion-no-padding w-min max-w-max text-dblue-500'>
														.zaions.com
													</ZIonTitle>
												</span>
											</div>

											{/* Window body */}
											<div className='px-3 pt-2'>
												{/* Project Name */}
												<div className='w-full'>
													{values.image.trim().length === 0 && (
														<ZIonTitle className='ion-no-padding text-[rgba(109,121,134,1)] font-bold'>
															{values.projectName.trim().length > 0
																? values.projectName
																: 'New Project'}
														</ZIonTitle>
													)}

													{/* image */}
													{values.image.trim().length > 0 && (
														<ZIonImg
															className='max-w-max w-[7rem] h-[3rem] max-h-[2rem]'
															src={values.image}
														/>
													)}
												</div>

												{/*  */}
												<div className='flex'>
													<div
														className={classNames({
															'mr-1 text-sm font-bold rounded-lg': true,
															'w-16 h-3 mt-2 bg-[rgba(203,207,212,1)]':
																values.currentTab !==
																ProjectCreatePageTabEnum.roadMap,
															'mt-1 pr-1':
																values.currentTab ===
																ProjectCreatePageTabEnum.roadMap,
														})}
													>
														{values.currentTab ===
														ProjectCreatePageTabEnum.roadMap
															? 'Roadmap'
															: ''}
													</div>
													<div
														className={classNames({
															'mr-1 rounded-lg text-sm': true,
															'w-20 h-3 mt-2 bg-[rgba(203,207,212,1)]':
																values.currentTab ===
																ProjectCreatePageTabEnum.detailForm,
															'mt-1':
																values.currentTab !==
																ProjectCreatePageTabEnum.detailForm,
														})}
													>
														{values.board?.title.trim().length > 0 &&
														values.currentTab !==
															ProjectCreatePageTabEnum.detailForm
															? values.board?.title
															: ''}
													</div>
												</div>

												{/*  */}
												{(values.currentTab ===
													ProjectCreatePageTabEnum.detailForm ||
													values.currentTab ===
														ProjectCreatePageTabEnum.board ||
													values.currentTab ===
														ProjectCreatePageTabEnum.ideas) && (
													<div className='flex mt-3 ion-align-items-start'>
														<div className='w-1/3 p-2 mr-1 bg-white rounded'>
															<div
																className={classNames({
																	'text-sm rounded font-bold': true,
																	'w-16 h-3 bg-[rgba(234,236,238,1)]':
																		values.currentTab ===
																			ProjectCreatePageTabEnum.detailForm ||
																		values.currentTab ===
																			ProjectCreatePageTabEnum.board,
																})}
															>
																{values.currentTab ===
																ProjectCreatePageTabEnum.ideas
																	? 'New idea'
																	: ''}
															</div>

															<div className='w-full h-24 mt-2 rounded bg-[rgba(234,236,238,1)]'></div>

															<div className='w-12 h-5 mx-auto mt-2 rounded bg-[rgba(234,236,238,1)]'></div>
														</div>

														<div className='w-2/3 p-2 ml-1 bg-white rounded'>
															<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'>
																{values.completedRecently.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.completedRecently}
																		</ZIonTitle>
																		<ZIonText
																			className='text-sm mb-[2px] font-bold leading-none'
																			color='success'
																		>
																			Done
																		</ZIonText>
																	</>
																) : (
																	''
																)}
															</div>

															<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'>
																{values.inProgress.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.inProgress}
																		</ZIonTitle>
																		<ZIonText
																			className='text-sm mb-[2px] font-bold leading-none'
																			color='secondary'
																		>
																			In progress
																		</ZIonText>
																	</>
																) : (
																	''
																)}
															</div>

															<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'>
																{values.plannedNext.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.plannedNext}
																		</ZIonTitle>
																		<ZIonText
																			className='text-sm mb-[2px] font-bold leading-none'
																			color='tertiary'
																		>
																			planned
																		</ZIonText>
																	</>
																) : (
																	''
																)}
															</div>
														</div>
													</div>
												)}

												{/*  */}
												{values.currentTab ===
													ProjectCreatePageTabEnum.roadMap && (
													<div className='flex mt-2'>
														{/* Planned */}
														<div className='relative w-1/3 pt-2 pb-1 mr-1 bg-white rounded ion-text-center h-max'>
															<ZIonText
																color='tertiary'
																className='text-sm font-bold'
															>
																Planned
															</ZIonText>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2 ion-text-start'>
																{values.plannedNext.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.plannedNext}
																		</ZIonTitle>
																	</>
																) : (
																	''
																)}
															</div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>
														</div>

														{/* In progress */}
														<div className='relative w-1/3 pt-2 pb-1 mx-1 bg-white rounded ion-text-center h-max'>
															<ZIonText
																color='secondary'
																className='text-sm font-bold'
															>
																In progress
															</ZIonText>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2 ion-text-start'>
																{values.inProgress.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.inProgress}
																		</ZIonTitle>
																	</>
																) : (
																	''
																)}
															</div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>
														</div>

														{/* Done */}
														<div className='relative w-1/3 pt-2 pb-1 mx-1 bg-white rounded ion-text-center h-max'>
															<ZIonText
																color='success'
																className='text-sm font-bold'
															>
																Done
															</ZIonText>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2 ion-text-start'>
																{values.completedRecently.trim().length > 0 ? (
																	<>
																		<ZIonTitle className='p-0 text-sm leading-none'>
																			{values.completedRecently}
																		</ZIonTitle>
																	</>
																) : (
																	''
																)}
															</div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>

															<div className='flex flex-col h-[2rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-1 text-sm leading-5 bg-white rounded px-2'></div>
														</div>
													</div>
												)}
											</div>
										</div>
									</ZIonCol>
								)}
							</ZIonRow>
						);
					}}
				</Formik>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

// Project Detail From Tab UI
const ZDetailFormTab: React.FC = () => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		setFieldTouched,
		submitForm,
	} = useFormikContext<ZProjectInterface>();

	// File upload modal
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Welcome to {PRODUCT_NAME}</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				Start by creating your project.
			</ZIonText>

			<div className='mt-8'>
				{/* Project Name */}
				<ZIonInput
					name='projectName'
					label='Project name*'
					labelPlacement='floating'
					value={values.projectName}
					onIonBlur={handleBlur}
					errorText={errors.projectName}
					onIonChange={(e) => {
						handleChange(e);
						//

						if (e.target.value) {
							setFieldValue(
								'subDomain',
								String(e.target.value).split(' ').join('_').toLowerCase(),
								false
							);

							setFieldTouched('subDomain', true, false);
						}
					}}
					className={classNames({
						'ion-touched ion-invalid':
							touched.projectName && errors.projectName,
						'ion-touched ion-valid': touched.projectName && !errors.projectName,
					})}
				/>

				{/* Sub domain */}
				<ZIonInput
					name='subDomain'
					label='Subdomain*'
					labelPlacement='floating'
					value={values.subDomain}
					errorText={errors.subDomain}
					onIonBlur={handleBlur}
					onIonChange={handleChange}
					className={classNames({
						'mt-5': true,
						'ion-touched ion-invalid': touched.subDomain && errors.subDomain,
						'ion-touched ion-valid': touched.subDomain && !errors.subDomain,
					})}
				/>

				{/* File */}
				<div className='mt-5 transition duration-150 ease-in cursor-pointer bg-dirty input'>
					<ZIonInput
						label={
							(values.image.trim().length > 0 && values.image) ||
							'Select file... (Optional)'
						}
						onClick={() => {
							presentZFileUploadModal({
								_cssClass: 'file-upload-modal-size',
								_onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
									if (ev.detail.role === ZIonModalActionEnum.success) {
										// Getting file data from fileUploadModal and parse it.
										const fileData = zJsonParse(String(ev.detail.data)) as {
											fileUrl: string;
											filePath: string;
										};

										// setting the url in the formik state (setting image).
										setFieldValue('image', fileData.fileUrl, false);
									}
								},
							});
						}}
						readonly
					/>
				</div>

				{/* Continue Button */}
				<ZIonButton
					expand='block'
					className='mt-8'
					size='large'
					disabled={
						(touched?.projectName || false) &&
						!errors?.projectName?.trim().length &&
						!errors?.subDomain?.trim().length
							? false
							: true
					}
					onClick={async () => {
						try {
							if (
								values.projectName.trim().length > 0 &&
								values.subDomain.trim().length > 0
							) {
								console.log('me');
								await submitForm();

								setFieldValue(
									'currentTab',
									ProjectCreatePageTabEnum.board,
									false
								);
							}
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

// Project Board Tab UI
const ZBoardTab: React.FC = () => {
	const { values, errors, touched, setFieldValue, handleBlur, handleChange } =
		useFormikContext<ZProjectInterface>();

	// Create new project API.
	const { mutateAsync: createProjectBoardMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.board_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.MAIN,
			values.id || '',
		],
		_itemsIds: [values.id || ''],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
	});

	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Your first board</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				Boards are used to separate different kinds of feedback like
				<em> Feature requests</em> and <em> Bug reports</em>
			</ZIonText>

			<div className='mt-8'>
				{/* Feature requests */}
				<ZIonInput
					name='board.title'
					label='Most people start with'
					labelPlacement='floating'
					value={values.board.title}
					errorText={errors.board?.title}
					onIonBlur={handleBlur}
					onIonChange={handleChange}
					className={classNames({
						'ion-touched ion-invalid':
							touched.board?.title && errors.board?.title,
						'ion-touched ion-valid':
							touched.board?.title && !errors.board?.title,
					})}
				/>

				{/* Continue Button */}
				<ZIonButton
					expand='block'
					className='mt-8'
					size='large'
					disabled={!errors.board?.title?.trim().length ? false : true}
					onClick={async () => {
						try {
							// Making an api call creating new project
							const _response = await createProjectBoardMutate(
								zStringify({
									title: values.board.title,
									slug: String(values.board.title)
										.split(' ')
										.join('_')
										.toLowerCase(),
									pageHeading: '',
									pageDescription: '',
									formCustomization: zStringify({
										intoHeading:
											ProjectBoardDefaultData.formCustomization.intoHeading,
										intoText:
											ProjectBoardDefaultData.formCustomization.intoText,
										title: ProjectBoardDefaultData.formCustomization.title,
										titlePlaceholder:
											ProjectBoardDefaultData.formCustomization
												.titlePlaceholder,
										body: ProjectBoardDefaultData.formCustomization.body,
										bodyPlaceholder:
											ProjectBoardDefaultData.formCustomization.bodyPlaceholder,
										footerText: '',
										buttonText:
											ProjectBoardDefaultData.formCustomization.buttonText,
									}),
									defaultStatus: zStringify({
										state: ProjectBoardDefaultData.defaultStatus.state,
										hideIdeaWithNoSet:
											ProjectBoardDefaultData.defaultStatus.hideIdeaWithNoSet,
									}),
									votingSetting: zStringify({
										hideVotingCount:
											ProjectBoardDefaultData.votingSetting.hideVotingCount,
									}),
								})
							);

							if (_response) {
								const _data = extractInnerData<ZProjectBoardInterface>(
									_response,
									extractInnerDataOptionsEnum.createRequestResponseItem
								);

								if (_data && _data.id) {
									setFieldValue('board.id', _data.id, false);

									showSuccessNotification(
										MESSAGES.GENERAL.PROJECT.BOARD_CREATED_SUCCESSFULLY
									);
								} else {
									showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
								}
							}

							if (values.board.title.trim().length > 0) {
								setFieldValue(
									'currentTab',
									ProjectCreatePageTabEnum.ideas,
									false
								);
							}
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

// Project Ideas Tab UI
const ZIdeasTab: React.FC = () => {
	const { values, setFieldValue, handleBlur, handleChange } =
		useFormikContext<ZProjectInterface>();

	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Add a few ideas</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				In the future, your users will be adding these. To get the ball rolling,
				add a few ideas to
				<ZIonText className='font-bold'> Feature requests</ZIonText>.
			</ZIonText>

			<div className='mt-8'>
				{/* recentlyCompleted */}
				<ZIonInput
					name='completedRecently'
					label='What have you completed recently?'
					labelPlacement='floating'
					value={values.completedRecently}
					onIonBlur={handleBlur}
					onIonChange={handleChange}
				/>

				{/* inProgress */}
				<ZIonInput
					name='inProgress'
					label="What's in progress right now?"
					labelPlacement='floating'
					value={values.inProgress}
					onIonBlur={handleBlur}
					onIonChange={handleChange}
					className='mt-5'
				/>

				{/* plannedNext */}
				<ZIonInput
					name='plannedNext'
					label="What's planned next?"
					labelPlacement='floating'
					value={values.plannedNext}
					onIonBlur={handleBlur}
					onIonChange={handleChange}
					className='mt-5'
				/>

				{/* Continue Button */}
				<ZIonButton
					expand='block'
					className='mt-8'
					size='large'
					onClick={() => {
						try {
							setFieldValue(
								'currentTab',
								ProjectCreatePageTabEnum.roadMap,
								false
							);
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

// Project Road Map Tab UI
const ZRoadMapTab: React.FC = () => {
	const { values } = useFormikContext<ZProjectInterface>();

	const { zNavigatePushRoute } = useZNavigate();

	// Update project API.
	const { mutateAsync: UpdateProjectMutateAsync } = useZRQUpdateRequest({
		_url: API_URL_ENUM.project_update_delete,
		_queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.MAIN],
	});

	const UpdateProjectHandler = async (value: string) => {
		try {
			if (value && values.id) {
				const _response = await UpdateProjectMutateAsync({
					itemIds: [values.id],
					urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
					requestData: value,
				});

				if (_response) {
					const _data = extractInnerData<ZProjectInterface>(
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
			<ZIonText>
				<h1 className='block text-3xl font-bold'>This is your Roadmap</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				It shows your progress based on the status of ideas automatically. The
				ideas you created are already there!
			</ZIonText>

			<ZIonText className='block mt-24 text-lg'>
				<strong>You're all set!</strong> Share a link to your project with your
				users to start getting new ideas right now.
			</ZIonText>

			{/* Go to your project Button */}
			<ZIonButton
				expand='block'
				className='mt-8'
				size='large'
				onClick={() => {
					try {
						if (values.id && values.board.id) {
							zNavigatePushRoute(
								createRedirectRoute({
									url: ZaionsRoutes.AdminPanel.Projects.Board.Main,
									params: [
										CONSTANTS.RouteParams.project.projectId,
										CONSTANTS.RouteParams.project.board.boardId,
									],
									values: [values.id, values.board.id],
								})
							);
						}
						// setFieldValue(
						// 	'currentTab',
						// 	ProjectCreatePageTabEnum.detailForm,
						// 	false
						// );
						// UpdateProjectHandler(
						// 	zStringify({
						// 		projectName: values.projectName,
						// 		subDomain: values.subDomain,
						// 		image: values.image,
						// 		// completedRecently: values.completedRecently,
						// 		// inProgress: values.inProgress,
						// 		// plannedNext: values.plannedNext,
						// 	})
						// );
					} catch (error) {
						reportCustomError(error);
					}
				}}
			>
				Go to your project
				<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
			</ZIonButton>
		</>
	);
};

export default ZProjectCreatePage;
