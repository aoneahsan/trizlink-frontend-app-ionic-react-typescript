/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	addOutline,
	arrowRedoOutline,
	arrowUndoOutline,
	attachOutline,
	chevronUpOutline,
	closeCircle,
	closeOutline,
	cloudUploadOutline,
	createOutline,
	documentsOutline,
	informationCircleOutline,
	optionsOutline,
	pencilOutline,
	pinOutline,
	trashBinOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonChip,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonLabel,
	ZIonMenuToggle,
	ZIonRouterLink,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
	useZInvalidateReactQueries,
	useZRQCreateRequest,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
	useZIonToast,
} from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	PAGE_MENU,
	VALIDATION_RULE,
} from '@/utils/enums';
import {
	createRedirectRoute,
	extractInnerData,
	validateFields,
	zJsonParse,
	zStringify,
} from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import {
	ProjectBoardStatusEnum,
	ZBoardStatusInterface,
	ZProjectBoardIdeasInterface,
} from '@/types/AdminPanel/Project/index.type';

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
import { ProductLogo } from '@/assets/images';
import {
	commentReplyEnum,
	ZCommentInterface,
} from '@/types/AdminPanel/index.type';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectSingleIdea: React.FC = () => {
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const { projectId, boardId, boardIdeaId } = useParams<{
		projectId: string;
		boardId: string;
		boardIdeaId: string;
	}>();

	// Custom hook
	const { presentZIonToast } = useZIonToast();
	const { zNavigatePushRoute } = useZNavigate();
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { zInvalidateReactQueries } = useZInvalidateReactQueries();

	//
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	// Getting project board from backend.
	const { data: ZCurrentBoardIdeaData, error: ZBoardIdeaError } =
		useZRQGetRequest<ZProjectBoardIdeasInterface>({
			_url: API_URL_ENUM.boardIdea_update_delete,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.GET,
				projectId,
				boardId,
				boardIdeaId,
			],
			_itemsIds: [projectId, boardId, boardIdeaId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.project.projectId,
				CONSTANTS.RouteParams.project.board.boardId,
				CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
			],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

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

	// Update BoardIdea API.
	const { mutateAsync: updateBoardIdeaMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.boardIdea_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.GET,
			projectId,
			boardId,
			boardIdeaId,
		],
	});

	// Delete file api.
	const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
		_url: API_URL_ENUM.deleteSingleFile,
	});

	// Delete board idea API.
	const { mutateAsync: deleteBoardIdeaMutate } = useZRQDeleteRequest(
		API_URL_ENUM.boardIdeaComments_create_list,
		[
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
			projectId,
			boardId,
		]
	);

	// Get ideas comments API.
	const { data: ZCurrentBoardIdeaCommentsData } = useZRQGetRequest<
		ZCommentInterface[]
	>({
		_url: API_URL_ENUM.boardIdeaComments_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.COMMENTS,
			projectId,
			boardId,
			boardIdeaId,
		],
		_itemsIds: [boardId, boardIdeaId],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.project.board.boardId,
			CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
		],
	});

	// Create new project API.
	const { mutateAsync: createIdeaCommentMutate } =
		useZRQCreateRequest<ZCommentInterface>({
			_url: API_URL_ENUM.boardIdeaComments_create_list,
			_queriesKeysToInvalidate: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.COMMENTS,
				projectId,
				boardId,
				boardIdeaId,
			],
			_itemsIds: [boardId, boardIdeaId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.project.board.boardId,
				CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
			],
		});

	const addCommentOnIdeaHandle = async (_data: string) => {
		try {
			if (_data) {
				const _response = await createIdeaCommentMutate(_data);

				if (_response) {
					const _item = extractInnerData<ZCommentInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item.id) {
						showSuccessNotification(MESSAGES.GENERAL.COMMENT.COMMENT_ADDED);
					} else {
						showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// Formik submit handler.
	const FormikSubmitHandler = async (_data: string) => {
		try {
			if (_data) {
				const _response = await updateBoardIdeaMutate({
					itemIds: [boardId, boardIdeaId],
					urlDynamicParts: [
						CONSTANTS.RouteParams.project.board.boardId,
						CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
					],
					requestData: _data,
				});

				if (_response) {
					const _item = extractInnerData<ZProjectBoardIdeasInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item.id) {
						await zInvalidateReactQueries([
							CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
							projectId,
							boardId,
						]);

						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_IDEA_UPDATED_SUCCESSFULLY
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
	const deleteBoardIdeaFn = async () => {
		try {
			if (boardId && ZCurrentBoardIdeaData?.id) {
				await presentZIonAlert({
					header: `Delete board "${ZCurrentBoardIdeaData?.title}"`,
					subHeader: 'Remove board from project.',
					message: 'Are you sure you want to delete this board?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeBoardIdea();
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
	const removeBoardIdea = async () => {
		try {
			if (ZCurrentBoardIdeaData?.id) {
				if (
					ZCurrentBoardIdeaData?.image?.filePath &&
					ZCurrentBoardIdeaData?.image?.filePath?.trim()?.length > 0
				) {
					// Deleting the file from storage
					await deleteSingleFile({
						requestData: zStringify({
							filePath: ZCurrentBoardIdeaData?.image?.filePath,
						}),
						itemIds: [],
						urlDynamicParts: [],
					});
				}

				// hitting the delete api
				const _response = await deleteBoardIdeaMutate({
					itemIds: [projectId, boardId, ZCurrentBoardIdeaData?.id],
					urlDynamicParts: [
						CONSTANTS.RouteParams.project.projectId,
						CONSTANTS.RouteParams.project.board.boardId,
						CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
					],
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

						zNavigatePushRoute(
							createRedirectRoute({
								url: ZaionsRoutes.AdminPanel.Projects.Board.Main,
								params: [
									CONSTANTS.RouteParams.project.projectId,
									CONSTANTS.RouteParams.project.board.boardId,
								],
								values: [projectId, boardId],
							})
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
		<ZaionsIonPage
			pageTitle='Zaions Idea Page'
			menu={PAGE_MENU.ADMIN_PROJECT_BOARD_STATUS_MENU}
			id={CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID}
		>
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
					{/* Row */}
					<Formik
						initialValues={{
							title: ZCurrentBoardIdeaData?.title || '',
							description: ZCurrentBoardIdeaData?.description || '',
							statusId: ZCurrentBoardIdeaData?.isCompleted
								? ProjectBoardStatusEnum.done
								: ZCurrentBoardIdeaData?.statusUniqueId || null,
							internalNotes: ZCurrentBoardIdeaData?.internalNotes || '',
							image: {
								fileUrl: ZCurrentBoardIdeaData?.image?.fileUrl || '',
								filePath: ZCurrentBoardIdeaData?.image?.filePath || '',
							},
							tags: ZCurrentBoardIdeaData?.tags || [],
							isCompleted: ZCurrentBoardIdeaData?.isCompleted || false,

							editMode: false,
							addTag: false,

							// Comment
							commentContent: '',
						}}
						enableReinitialize={true}
						validate={(values) => {
							const errors: {
								title?: string;
								description?: string;
							} = {};
							validateFields(['title', 'description'], values, errors, [
								VALIDATION_RULE.string,
								VALIDATION_RULE.string,
							]);

							return errors;
						}}
						onSubmit={async (values, { setFieldValue }) => {
							try {
								const _stringifyValue = zStringify({
									title: values.title,
									description: values.description,
									statusUniqueId:
										values.statusId === ProjectBoardStatusEnum.done
											? null
											: values.statusId,
									internalNotes: values.internalNotes,
									isCompleted: values.isCompleted,
									image: zStringify(values.image),
									tags: zStringify(values.tags),
								});

								await FormikSubmitHandler(_stringifyValue);

								setFieldValue('editMode', false, false);
							} catch (error) {
								reportCustomError(error);
							}
						}}
					>
						{({
							values,
							touched,
							errors,
							handleChange,
							handleBlur,
							setFieldValue,
							submitForm,
						}) => {
							return (
								<ZIonRow
									className={classNames({
										'mb-8 lg:gap-6': true,
										'w-[80%] mx-auto': !isLgScale && isMdScale,
										'w-[90%] mx-auto': !isMdScale && isSmScale,
										'w-full mx-auto': !isSmScale,
									})}
								>
									{/* Col-1 */}
									<ZIonCol
										className='mb-6 lg:mb-0'
										sizeXl='8.5'
										sizeLg='8.5'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										{!values.editMode && (
											<div className='w-full px-6 py-5 bg-white rounded-lg shadow'>
												<div className='flex ion-align-items-start'>
													<ZIonButton
														height='65px'
														fill='outline'
														color='medium'
														style={{ '--border-width': '1px' }}
														className='mr-4'
													>
														<ZIonLabel color='light'>
															<p className='m-[0px!important] z_ion_color_danger'>
																<ZIonIcon
																	icon={chevronUpOutline}
																	className='w-5 h-5 font-extrabold'
																/>
															</p>
															<p
																className='m-[0px!important] font-extrabold z_ion_color_danger'
																style={{ fontSize: '1.1rem!important' }}
															>
																{ZCurrentBoardIdeaData?.votesCount}
															</p>
														</ZIonLabel>
													</ZIonButton>

													<div className=''>
														<ZIonText className='block text-lg font-semibold leading-tight md:text-2xl'>
															{ZCurrentBoardIdeaData?.title}
														</ZIonText>

														{/* Status */}
														{ZCurrentBoardIdeaData?.statusUniqueId !==
															ProjectBoardStatusEnum.notSet && (
															<ZIonText
																className='block text-base font-bold tracking-wide rounded-full'
																style={{
																	color: ZCurrentBoardStatues?.find(
																		(el) =>
																			el.id ===
																			ZCurrentBoardIdeaData?.statusUniqueId
																	)?.color,
																}}
															>
																{ZCurrentBoardStatues?.find(
																	(el) =>
																		el.id ===
																		ZCurrentBoardIdeaData?.statusUniqueId
																)?.title ||
																	(ZCurrentBoardIdeaData?.statusUniqueId ===
																		null &&
																		'')}
															</ZIonText>
														)}
													</div>

													<ZIonIcon
														className='w-5 h-5 cursor-pointer ms-auto'
														onClick={() => {
															setFieldValue('editMode', true, false);
														}}
														icon={createOutline}
													/>
												</div>
												<div className='overflow-hidden line-clamp-3'>
													<ZIonText className='block mt-4 break-words whitespace-pre-wrap'>
														{ZCurrentBoardIdeaData?.description}
													</ZIonText>
												</div>

												<ZIonText
													className='block mt-5 text-lg font-medium'
													color='medium'
												>
													Attached images
												</ZIonText>

												{values.image?.fileUrl?.trim()?.length > 0 && (
													<ZIonImg
														className='w-20 h-20 mr-2 transition duration-150 ease-in-out transform border rounded-md shadow-lg hover:scale-105 hover:shadow-xl'
														src={values?.image?.fileUrl}
													/>
												)}

												<div className='flex flex-wrap mt-6 ion-align-items-center ion-justify-content-start'>
													<ZIonImg
														src={ProductLogo}
														className='w-[28px] h-[28px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
													/>

													<ZIonText className='pr-1 font-semibold cursor-pointer'>
														Talha Bin Irshad
													</ZIonText>

													<ZIonText
														className='pr-1 font-light cursor-pointer text-md'
														color='medium'
													>
														posted 2 days ago
													</ZIonText>
												</div>
											</div>
										)}

										{values.editMode && (
											<div className='w-full px-6 py-5 mt-3 bg-white rounded-lg shadow'>
												<div className='flex w-full ion-align-items-center'>
													<ZIonText className='block text-2xl font-bold'>
														Editing post
													</ZIonText>

													<ZIonIcon
														className='w-5 h-5 cursor-pointer ms-auto'
														onClick={() => {
															setFieldValue('editMode', false, false);
														}}
														icon={closeOutline}
													/>
												</div>

												<ZIonInput
													minHeight='42px'
													label='Title'
													labelPlacement='stacked'
													name='title'
													value={values.title}
													errorText={errors.title}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													className={classNames({
														'mt-4': true,
														'ion-touched ion-invalid':
															touched.title && errors.title,
														'ion-touched ion-valid':
															touched.title && !errors.title,
													})}
												/>

												<ZIonTextarea
													fill='outline'
													rows={6}
													label='Content'
													autoGrow
													labelPlacement='stacked'
													name='description'
													value={values.description}
													errorText={errors.description}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													className={classNames({
														'mt-5': true,
														'ion-touched ion-invalid':
															touched.description && errors.description,
														'ion-touched ion-valid':
															touched.description && !errors.description,
													})}
												/>

												<ZIonTextarea
													autoGrow
													fill='outline'
													className='mt-5'
													label='Internal notes'
													placeholder='Add a note for your team...'
													labelPlacement='stacked'
													name='internalNotes'
													value={values.internalNotes}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
												/>

												<ZIonText className='block mt-5 text-lg font-medium'>
													Additional images
												</ZIonText>
												<ZIonText className='block'>
													To attach more images, upload them here.
												</ZIonText>

												{values.image?.fileUrl?.trim()?.length > 0 && (
													<ZIonImg
														className='w-20 h-20 mt-4 mr-2 transition duration-150 ease-in-out transform border rounded-md shadow-lg hover:scale-105 hover:shadow-xl'
														src={values?.image?.fileUrl}
													/>
												)}

												<ZIonButton
													className='mx-0 ion-no-padding'
													fill='default'
													onClick={() => {
														presentZFileUploadModal({
															_cssClass: 'file-upload-modal-size',
															_onWillDismiss: async (
																ev: CustomEvent<OverlayEventDetail>
															) => {
																if (
																	ev.detail.role === ZIonModalActionEnum.success
																) {
																	// Getting file data from fileUploadModal and parse it.
																	const fileData = zJsonParse(
																		String(ev.detail.data)
																	) as {
																		fileUrl: string;
																		filePath: string;
																	};

																	if (
																		values?.image?.filePath.trim()?.length >
																			0 &&
																		fileData.filePath !==
																			values?.image?.filePath
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
												>
													<ZIonIcon
														icon={attachOutline}
														size='small'
														className='w-5 h-5'
													/>
													<ZIonText>
														{values.image?.fileUrl?.trim()?.length === 0
															? 'Attach '
															: 'Replace '}
														images
													</ZIonText>
												</ZIonButton>

												<div className='w-full'>
													<ZIonButton
														className='mt-4'
														onClick={() => {
															submitForm();
														}}
													>
														Update Post
													</ZIonButton>
												</div>
											</div>
										)}

										{/* Internal Notes */}
										{!values.editMode && (
											<div className='mt-5'>
												<ZIonText
													className='block text-sm font-semibold tracking-wider uppercase'
													color='medium'
												>
													Internal Notes
												</ZIonText>

												<div className='px-5 overflow-hidden line-clamp-3 py-4 mb-4 bg-white mt-[8px] shadow rounded-xl'>
													<ZIonTextarea
														fill='outline'
														autoGrow
														className='break-words whitespace-pre-wrap'
														value={ZCurrentBoardIdeaData?.internalNotes}
														readonly
														style={{ '--padding-top': '10px' }}
													/>
												</div>
											</div>
										)}

										{/*  */}
										<div className='relative flex flex-col justify-between gap-4 p-4 pt-6 mt-4 mb-4 bg-white border-2 rounded-lg lg:flex-row xl:justify-around items-justify lg:items-center md:p-6 lg:p-4 xl:px-12'>
											<div className='flex flex-col gap-1 xl:-ml-8 2xl:-ml-36 max-w-[32rem]'>
												<ZIonText className='text-xl font-bold'>
													{PRODUCT_NAME} can help you reply!
												</ZIonText>
												<ZIonText color='medium'>
													Use {PRODUCT_NAME}'s AI tools to generate replies for
													new ideas. Demonstrate to your users that you are
													listening to their feedback.
												</ZIonText>
											</div>

											<ZIonButton
												className='flex px-2 text-lg rounded-lg text-md whitespace-nowrap xl:px-14 2xl:-mr-36'
												size='large'
											>
												Try it now!
											</ZIonButton>

											<ZIonButton
												className='absolute top-0 right-0 ion-no-padding'
												size='small'
												fill='default'
											>
												<ZIonIcon icon={closeOutline} className='w-6 h-6' />
											</ZIonButton>
										</div>

										<div className='mt-5'>
											<ZIonText
												className='text-sm font-semibold tracking-wider uppercase'
												color='medium'
											>
												DISCUSSION
											</ZIonText>

											{/* Comments box */}
											<div className='px-5 py-5 mt-2 mb-8 bg-white rounded-lg shadow'>
												{/* Comment form */}
												<div className='p-4 rounded-lg bg-neutral-100 comment-input-container'>
													<div className='flex ion-align-items-center'>
														<ZIonImg
															src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
															className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
														/>
														<ZIonTextarea
															placeholder='What do you think?'
															// minHeight='45px'
															fill='outline'
															rows={1}
															style={{
																minHeight: '41px',
																'--padding-top': '12px',
															}}
															onIonChange={handleChange}
															onIonBlur={handleBlur}
															name='commentContent'
															autoGrow={true}
															value={values?.commentContent}
														/>
													</div>

													<div className='flex gap-1 mt-2 ion-align-items-start ion-justify-content-between comment_button md:mt-4'>
														<ZIonButton
															className='ion-no-padding'
															fill='clear'
															color='dark'
														>
															<ZIonIcon icon={attachOutline} className='mr-1' />
															<ZIonText className='text-md'>
																Attach image
															</ZIonText>
														</ZIonButton>

														<div className=''>
															<ZIonButton
																className=''
																disabled={
																	values?.commentContent?.trim()?.length === 0
																}
																color='tertiary'
																onClick={async () => {
																	if (
																		values?.commentContent?.trim()?.length > 0
																	) {
																		const _stringifyData = zStringify({
																			content: values.commentContent,
																		});
																		await addCommentOnIdeaHandle(
																			_stringifyData
																		);

																		setFieldValue('commentContent', '', false);
																	}
																}}
															>
																<ZIonText className='text-md'>Comment</ZIonText>
															</ZIonButton>
														</div>
													</div>
												</div>

												{/* Comments */}
												<div className=''>
													{/* single comment */}
													{ZCurrentBoardIdeaCommentsData?.map((el, index) => {
														if (el.id) {
															return (
																// <div className=''>
																// 	<ZProjectSingleComment
																// 		id={el.id}
																// 		text={el?.text}
																// 		username={el?.username}
																// 		userAvatar={el?.userAvatar}
																// 		type={commentReplyEnum.comment}
																// 	/>
																// 	{ZCurrentCommentReplies &&
																// 		ZCurrentCommentReplies?.map((el) => {
																// 			if (el.id) {
																// 				return (
																// 					<div className='ml-6 border-l-4 border-neutral-200'>
																// 						<ZProjectSingleComment
																// 							id={el.id}
																// 							commentId={id} // comment id which the reply is belong
																// 							text={el?.content}
																// 							username={el?.user?.username}
																// 							userAvatar={
																// 								el?.user?.profilePitcher
																// 							}
																// 							type={commentReplyEnum.reply}
																// 						/>
																// 					</div>
																// 				);
																// 			}
																// 		})}
																// </div>
																<></>
															);
														}
													})}
												</div>
											</div>
										</div>
									</ZIonCol>

									{/* Col-2 */}
									<ZIonCol>
										{/* Post status */}
										<ZIonText className='block font-semibold'>Status</ZIonText>
										<div className='flex mt-4'>
											<ZIonSelect
												minHeight='45px'
												fill='outline'
												name='statusId'
												label='board status'
												labelPlacement='stacked'
												value={values.statusId}
												interface='popover'
												onIonChange={(event) => {
													handleChange(event);

													if (
														event.target.value === ProjectBoardStatusEnum.done
													) {
														setFieldValue('isCompleted', true, false);
													} else {
														setFieldValue('isCompleted', false, false);
													}
												}}
												onIonBlur={handleBlur}
												style={{ '--background': '#fff' }}
											>
												<ZIonSelectOption value={null}>
													Not set
												</ZIonSelectOption>

												<ZIonSelectOption value={ProjectBoardStatusEnum.done}>
													Done
												</ZIonSelectOption>
												{/*  */}
												{ZCurrentBoardStatues &&
													ZCurrentBoardStatues?.map((el, index) => {
														return (
															<ZIonSelectOption value={el.id} key={index}>
																{el.title}
															</ZIonSelectOption>
														);
													})}
											</ZIonSelect>

											<ZIonButton
												height='41px'
												className='ion-no-margin ms-2'
												color='medium'
												onClick={() => {
													try {
														if (
															ZCurrentBoardIdeaData?.status !== values.statusId
														) {
															submitForm();
														}
													} catch (error) {
														reportCustomError(errors);
													}
												}}
												disabled={
													ZCurrentBoardIdeaData?.status === values.statusId
												}
											>
												Save
											</ZIonButton>
										</div>

										{/* Edit status */}
										<ZIonMenuToggle
											autoHide={false}
											menu={
												CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID
											}
										>
											<ZIonItem
												className='mt-2 mb-8 rounded cursor-pointer'
												lines='none'
												minHeight='41px'
											>
												<ZIonIcon icon={optionsOutline} className='mr-2' />
												<ZIonText>Edit Statuses</ZIonText>
											</ZIonItem>
										</ZIonMenuToggle>

										{/* Actions */}
										<ZIonText className='block font-semibold'>Actions</ZIonText>

										{/* Edit */}
										{/* <ZIonItem
											className='mt-2 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
										>
											<ZIonIcon icon={pencilOutline} className='mr-2' />
											<ZIonText>Edit</ZIonText>
										</ZIonItem> */}

										{/* Move to another board */}
										<ZIonItem
											className='mt-2 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
										>
											<ZIonIcon icon={arrowRedoOutline} className='mr-2' />
											<ZIonText>Move to another board</ZIonText>
										</ZIonItem>

										{/* Merge into another idea */}
										<ZIonItem
											className='mt-2 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
										>
											<ZIonIcon icon={documentsOutline} className='mr-2' />
											<ZIonText>Merge into another idea</ZIonText>
										</ZIonItem>

										{/* Delete */}
										<ZIonItem
											className={classNames({
												'mt-2 mb-8 rounded cursor-pointer ion-color ion-color-danger':
													true,
											})}
											lines='none'
											minHeight='41px'
											onClick={() => {
												void deleteBoardIdeaFn();
											}}
										>
											<ZIonIcon icon={trashBinOutline} className='mr-2' />
											<ZIonText>Delete</ZIonText>
										</ZIonItem>

										{/* Tags */}
										<ZIonText className='block font-semibold'>Tags</ZIonText>

										<div className='flex px-3 py-3 mt-2 rounded-md ion-align-items-center ion-justify-content-start zaions__warning_bg_opacity_point_5'>
											<ZIonIcon
												icon={informationCircleOutline}
												className='w-6 h-6 mr-1'
											/>
											<ZIonText className='text-sm'>
												Tags are visible only to project admins.
												<ZIonRouterLink
													routerLink=''
													className='hover:underline ms-1'
													color='dark'
												>
													Learn more
												</ZIonRouterLink>
												.
											</ZIonText>
											<ZIonIcon icon={closeCircle} className='w-6 h-6 ms-1' />
										</div>

										<div className='flex flex-wrap mt-2 mb-8 ion-align-items-center ion-justify-content-start'>
											{values.tags?.map((el, index) => (
												<ZIonChip
													className='zaions__warning_bg_opacity_point_5'
													key={index}
												>
													<ZIonLabel>{el}</ZIonLabel>
													<ZIonIcon
														icon={closeCircle}
														onClick={() => {
															if (values.tags?.includes(el)) {
																const _tags = values.tags?.filter(
																	(_tag) => _tag !== el
																);
																setFieldValue('tags', _tags, true);
															}
														}}
													/>
												</ZIonChip>
											))}

											{values.addTag && (
												<ZIonInput
													minHeight='42px'
													className='mt-2'
													autofocus
													onKeyUp={async ({ currentTarget, key }) => {
														try {
															if (
																currentTarget?.value &&
																currentTarget?.value?.toString()?.trim()
																	.length > 0 &&
																key === 'Enter'
															) {
																const _tag = currentTarget?.value
																	?.toString()
																	.toLowerCase()
																	.trim();

																if (!values.tags.includes(_tag)) {
																	const __tags = [...values.tags];

																	__tags.push(_tag);

																	setFieldValue('tags', __tags, true);
																} else {
																	await presentZIonToast(
																		`"${_tag}" Tag already exists.`
																	);
																}
																currentTarget.value = '';

																setFieldValue('addTag', false, false);
															}
														} catch (error) {
															console.error(error);
														}
													}}
													placeholder='Try to search or add new...'
												/>
											)}

											{!values.addTag && (
												<ZIonChip
													className='bg-transparent'
													onClick={() => {
														setFieldValue('addTag', true, false);
													}}
												>
													<ZIonIcon icon={addOutline} />
													<ZIonLabel>Add tag</ZIonLabel>
												</ZIonChip>
											)}

											{ZCurrentBoardIdeaData?.tags?.length !==
												values.tags?.length && (
												<ZIonChip
													onClick={() => {
														void submitForm();
													}}
												>
													<ZIonLabel>Save</ZIonLabel>
												</ZIonChip>
											)}
										</div>

										{/* Voters */}
										<div className='flex ion-align-items-center ion-justify-content-between'>
											<ZIonText className='block font-semibold'>
												Voters
											</ZIonText>

											<ZIonIcon icon={cloudUploadOutline} className='w-5 h-5' />
										</div>

										<div className='flex flex-row items-center mt-2'>
											<ZIonImg
												src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
												className='w-[32px] h-[32px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
											/>

											<ZIonText className='pr-1 font-semibold cursor-pointer'>
												Talha Bin Irshad
											</ZIonText>
										</div>

										<div className='mt-4 mb-8'>
											<ZIonInput minHeight='42px' placeholder='Name required' />
											<ZIonButton
												className='mt-2'
												expand='block'
												height='42px'
												color='medium'
											>
												Add Vote
											</ZIonButton>
										</div>

										<ZIonText
											className='block w-full ion-text-center'
											color='medium'
										>
											Powered by
											<ZIonRouterLink color='medium'>
												{PRODUCT_NAME}
											</ZIonRouterLink>
										</ZIonText>
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

const ZIdeaComments: React.FC<{
	id: string;
	text?: string;
	userAvatar?: string;
	username?: string;
}> = ({ id, text, userAvatar, username }) => {
	const { projectId, boardId, boardIdeaId } = useParams<{
		projectId: string;
		boardId: string;
		boardIdeaId: string;
	}>();

	// Getting reply on comment from backend.
	const { data: ZCurrentCommentReplies } = useZRQGetRequest<
		ZCommentInterface[]
	>({
		_url: API_URL_ENUM.reply_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.REPLY.MAIN,
			projectId,
			boardId,
			boardIdeaId,
			id,
		],
		_itemsIds: [id],
		_urlDynamicParts: [CONSTANTS.RouteParams.comment.commentId],
		_shouldFetchWhenIdPassed: !id ? true : false,
	});

	return (
		<div className=''>
			<ZProjectSingleComment
				id={id}
				text={text}
				username={username}
				userAvatar={userAvatar}
				type={commentReplyEnum.comment}
			/>
			{ZCurrentCommentReplies &&
				ZCurrentCommentReplies?.map((el) => {
					if (el.id) {
						return (
							<div className='ml-6 border-l-4 border-neutral-200'>
								<ZProjectSingleComment
									id={el.id}
									commentId={id} // comment id which the reply is belong
									text={el?.content}
									username={el?.user?.username}
									userAvatar={el?.user?.profilePitcher}
									type={commentReplyEnum.reply}
								/>
							</div>
						);
					}
				})}
		</div>
	);
};

const ZProjectSingleComment: React.FC<{
	id: string;
	commentId?: string; // if reply we need to pass comment id to.
	text?: string;
	userAvatar?: string;
	username?: string;
	type?: commentReplyEnum;
}> = ({
	id,
	text,
	userAvatar,
	username,
	type = commentReplyEnum.comment,
	commentId,
}) => {
	const { projectId, boardId, boardIdeaId } = useParams<{
		projectId: string;
		boardId: string;
		boardIdeaId: string;
	}>();

	// custom hook
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { zInvalidateReactQueries } = useZInvalidateReactQueries();

	// Create new project API.
	const { mutateAsync: createCommentReplyMutate } =
		useZRQCreateRequest<ZCommentInterface>({
			_url: API_URL_ENUM.reply_create_list,
			_queriesKeysToInvalidate: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.REPLY.MAIN,
				projectId,
				boardId,
				boardIdeaId,
				id,
			],
			_itemsIds: [id],
			_urlDynamicParts: [CONSTANTS.RouteParams.comment.commentId],
		});

	// Delete comment API.
	const { mutateAsync: deleteCommentMutate } = useZRQDeleteRequest(
		API_URL_ENUM.boardIdeaComments_update_delete,
		[
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.COMMENTS,
			projectId,
			boardId,
			boardIdeaId,
		]
	);

	// Delete comment API.
	const { mutateAsync: deleteReplyMutate } = useZRQDeleteRequest(
		API_URL_ENUM.reply_update_delete,
		[
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.REPLY.MAIN,
			projectId,
			boardId,
			boardIdeaId,
			commentId || '',
		]
	);

	// create a new reply on comment handler
	const addReplyOnIdeaHandle = async (_data: string) => {
		try {
			if (_data) {
				const _response = await createCommentReplyMutate(_data);

				if (_response) {
					const _item = extractInnerData<ZCommentInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item.id) {
						showSuccessNotification(MESSAGES.GENERAL.REPLY.REPLY_ADDED);
					} else {
						showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// deleteCommentFn will show the confirm alert before deleting boardIdea.
	const deleteCommentOrReplyFn = async () => {
		try {
			if (id) {
				await presentZIonAlert({
					header: `Delete ${
						type === commentReplyEnum.comment
							? 'Comment'
							: type === commentReplyEnum.reply
							? 'Reply'
							: ''
					}.`,
					subHeader: `Remove ${
						type === commentReplyEnum.comment
							? 'Comment'
							: type === commentReplyEnum.reply
							? 'Reply'
							: ''
					} from ${
						type === commentReplyEnum.comment
							? 'Idea'
							: type === commentReplyEnum.reply
							? 'Comment'
							: ''
					}.`,
					message: `Are you sure you want to delete this ${
						type === commentReplyEnum.comment
							? 'comment'
							: type === commentReplyEnum.reply
							? 'reply'
							: ''
					}?`,
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeCommentOrReply();
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

	// removeCommentOrReply will hit delete comment/reply api.
	const removeCommentOrReply = async () => {
		try {
			if (id) {
				// hitting the delete api
				let _response;

				switch (type) {
					case commentReplyEnum.comment:
						_response = await deleteCommentMutate({
							itemIds: [boardId, boardIdeaId, id],
							urlDynamicParts: [
								CONSTANTS.RouteParams.project.board.boardId,
								CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
								CONSTANTS.RouteParams.comment.commentId,
							],
						});
						break;

					case commentReplyEnum.reply:
						if (commentId) {
							_response = await deleteReplyMutate({
								itemIds: [commentId, id],
								urlDynamicParts: [
									CONSTANTS.RouteParams.comment.commentId,
									CONSTANTS.RouteParams.reply.replyId,
								],
							});

							// await zInvalidateReactQueries([
							// 	CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.COMMENTS,
							// 	projectId,
							// 	boardId,
							// 	boardIdeaId,
							// ]);
						}
						break;
				}

				if (_response) {
					const _data = extractInnerData<{ success: boolean }>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data?.success) {
						switch (type) {
							case commentReplyEnum.comment:
								showSuccessNotification(
									MESSAGES.GENERAL.COMMENT.COMMENT_DELETE
								);
								break;

							case commentReplyEnum.reply:
								showSuccessNotification(MESSAGES.GENERAL.REPLY.REPLY_DELETE);
								break;
						}
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
		<Formik
			initialValues={{
				addReplyMode: false,
				replyText: '',
			}}
			onSubmit={async (values) => {
				try {
					const _stringifyData = zStringify({
						content: values.replyText,
					});

					await addReplyOnIdeaHandle(_stringifyData);
				} catch (error) {
					reportCustomError(error);
				}
			}}
		>
			{({
				values,
				setFieldValue,
				resetForm,
				handleChange,
				handleBlur,
				submitForm,
			}) => {
				return (
					<div
						className={classNames({
							'mt-4 md:pl-4 pt-2 pb-2 pl-2.5 ': true,
							'border-l-4 border-neutral-200': values?.addReplyMode,
						})}
					>
						<div className='flex ion-align-items-center'>
							<ZIonImg
								src={userAvatar || getUiAvatarApiUrl({ name: username })}
								className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
							/>

							<div className='ms-2'>
								<ZIonText className='block text-sm font-semibold leading-snug cursor-pointer'>
									{username}
								</ZIonText>
								<ZIonText className='block text-sm leading-snug' color='medium'>
									1 day ago
								</ZIonText>
							</div>
						</div>

						{/* Comment message */}
						<div className='overflow-hidden line-clamp-3'>
							<ZIonText
								className='block mt-3 break-words whitespace-pre-wrap offset'
								style={{ marginLeft: 'calc(36px + 1rem)' }}
							>
								{text}
							</ZIonText>
						</div>

						{/* Action buttons */}
						<div
							className='flex mt-3 offset'
							style={{ marginLeft: 'calc(27px + 1rem)' }}
						>
							{/* Replay */}
							<ZIonButton
								color='medium'
								fill='clear'
								className='mr-3 ion-no-padding ion-no-margin'
								onClick={() => {
									setFieldValue('addReplyMode', true, false);
								}}
							>
								<ZIonIcon
									icon={arrowUndoOutline}
									className='mr-1 font-extrabold'
								/>
								<ZIonText className='font-bold'>REPLAY</ZIonText>
							</ZIonButton>

							{/* Delete */}
							<ZIonButton
								color='medium'
								fill='clear'
								className='mr-3 ion-no-padding ion-no-margin'
								onClick={async () => {
									await deleteCommentOrReplyFn();
								}}
							>
								<ZIonIcon
									icon={trashBinOutline}
									className='mr-1 font-extrabold'
								/>
								<ZIonText className='font-bold'>DELETE</ZIonText>
							</ZIonButton>

							{/* Edit */}
							<ZIonButton
								color='medium'
								fill='clear'
								className='mr-3 ion-no-padding ion-no-margin'
							>
								<ZIonIcon
									icon={pencilOutline}
									className='mr-1 font-extrabold'
								/>
								<ZIonText className='font-bold'>EDIT</ZIonText>
							</ZIonButton>

							{/* Pin */}
							<ZIonButton
								color='medium'
								fill='clear'
								className='mr-3 ion-no-padding ion-no-margin'
							>
								<ZIonIcon icon={pinOutline} className='mr-1 font-extrabold' />
								<ZIonText className='font-bold'>PIN TO TOP</ZIonText>
							</ZIonButton>
						</div>

						{/* Replay form */}
						{values?.addReplyMode && (
							<div className='mt-4 md:pl-4 pt-2 pb-2 pl-2.5'>
								<div className='flex ion-align-items-start'>
									<ZIonImg
										src={userAvatar || getUiAvatarApiUrl({ name: username })}
										className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
									/>

									<div className='w-full ms-2'>
										<ZIonTextarea
											placeholder='What do you think?'
											fill='outline'
											className='w-full'
											rows={1}
											style={{
												minHeight: '41px',
												'--padding-top': '12px',
											}}
											onIonChange={handleChange}
											onIonBlur={handleBlur}
											name='replyText'
											autoGrow={true}
											value={values?.replyText}
										/>

										<div className='flex gap-1 ion-align-items-start ion-justify-content-between comment_button md:mt-2'>
											<ZIonButton
												className='ion-no-padding'
												fill='clear'
												color='dark'
											>
												<ZIonIcon icon={attachOutline} className='mr-1' />
												<ZIonText className='text-md'>Attach image</ZIonText>
											</ZIonButton>

											<div>
												<ZIonButton
													className='me-2'
													color='medium'
													onClick={() => {
														resetForm({
															values: { addReplyMode: false, replyText: '' },
														});
													}}
												>
													<ZIonText className='text-md'>Cancel</ZIonText>
												</ZIonButton>
												<ZIonButton
													color='tertiary'
													disabled={values?.replyText?.trim()?.length === 0}
													onClick={async () => {
														try {
															await submitForm();

															setFieldValue('addReplyMode', false, false);
															setFieldValue('replyText', '', false);
														} catch (error) {
															reportCustomError(error);
														}
													}}
												>
													<ZIonText className='text-md'>Comment</ZIonText>
												</ZIonButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				);
			}}
		</Formik>
	);
};

export default ZProjectSingleIdea;
