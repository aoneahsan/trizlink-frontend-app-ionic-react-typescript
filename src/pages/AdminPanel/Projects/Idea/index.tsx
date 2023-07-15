/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

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
	ZIonRouterLink,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { useParams } from 'react-router';
import {
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	ProjectBoardStatusEnum,
	ZProjectBoardIdeasInterface,
	ZProjectBoardInterface,
} from '@/types/AdminPanel/Project/index.type';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { Formik } from 'formik';
import {
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
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';

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

const ZProjectSingleIdea: React.FC = () => {
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const { projectId, boardId, boardIdeaId } = useParams<{
		projectId: string;
		boardId: string;
		boardIdeaId: string;
	}>();

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

	// Update BoardIdea API
	const { mutateAsync: updateBoardIdeaMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.boardIdea_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.GET,
			projectId,
			boardId,
			boardIdeaId,
		],
	});

	// Formik submit handler
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
					{/* Row */}
					<Formik
						initialValues={{
							title: ZCurrentBoardIdeaData?.title || '',
							description: ZCurrentBoardIdeaData?.description || '',
							status:
								ZCurrentBoardIdeaData?.status || ProjectBoardStatusEnum.notSet,
							internalNotes: ZCurrentBoardIdeaData?.internalNotes || '',
							image: ZCurrentBoardIdeaData?.image || '',
							editMode: false,
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
									status: values.status,
									internalNotes: values.internalNotes,
									image: values.image,
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
																1
															</p>
														</ZIonLabel>
													</ZIonButton>

													<div className=''>
														<ZIonText className='block text-lg font-semibold leading-tight md:text-2xl'>
															{ZCurrentBoardIdeaData?.title}
														</ZIonText>

														{/* Status */}
														{values.status !==
															ProjectBoardStatusEnum.notSet && (
															<ZIonText className='block text-base font-medium tracking-wide rounded-full'>
																{ZCurrentBoardIdeaData?.status}
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

												<ZIonText className='block mt-4 break-words whitespace-pre-wrap'>
													{ZCurrentBoardIdeaData?.description}
												</ZIonText>

												<ZIonText
													className='block mt-5 text-lg font-medium'
													color='medium'
												>
													Attached images
												</ZIonText>

												{values.image.trim().length > 0 && (
													<ZIonImg
														className='w-20 h-20 mr-2 transition duration-150 ease-in-out transform border rounded-md shadow-lg hover:scale-105 hover:shadow-xl'
														src={values.image}
													/>
												)}

												<div className='flex flex-wrap mt-6 ion-align-items-center ion-justify-content-start'>
													<ZIonImg
														src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
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
												<ZIonText className='block text-2xl font-bold'>
													Editing post
												</ZIonText>

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

												<ZIonButton
													className='mx-0 ion-no-padding'
													fill='default'
													onClick={() => {
														presentZFileUploadModal({
															_cssClass: 'file-upload-modal-size',
															_onWillDismiss: (
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

																	setFieldValue(
																		'image',
																		fileData.fileUrl,
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
													<ZIonText>Attach images</ZIonText>
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

												<div className='px-5 py-4 mb-4 bg-white mt-[8px] shadow rounded-xl'>
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
												<ZIonText className='' color='medium'>
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
														<ZIonInput
															placeholder='What do you think?'
															minHeight='45px'
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
															<ZIonButton className='' color='tertiary'>
																<ZIonText className='text-md'>Comment</ZIonText>
															</ZIonButton>
														</div>
													</div>
												</div>

												{/* Comments */}
												<div className=''>
													{/* single comment */}
													<div className=''>
														<ZProjectSingleComment />
														<div className='ml-6 border-l-4 border-neutral-200'>
															<ZProjectSingleComment />
														</div>
													</div>
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
												name='status'
												value={values.status}
												interface='popover'
												onIonChange={handleChange}
												onIonBlur={handleBlur}
												style={{ '--background': '#fff' }}
											>
												<ZIonSelectOption
													value={ProjectBoardStatusEnum.needYourOpinion}
												>
													Need Your Opinion
												</ZIonSelectOption>
												<ZIonSelectOption
													value={ProjectBoardStatusEnum.planned}
												>
													Planned
												</ZIonSelectOption>
												<ZIonSelectOption
													value={ProjectBoardStatusEnum.inProgress}
												>
													In progress
												</ZIonSelectOption>
												<ZIonSelectOption value={ProjectBoardStatusEnum.done}>
													Done
												</ZIonSelectOption>
												<ZIonSelectOption value={ProjectBoardStatusEnum.notNow}>
													Not Now
												</ZIonSelectOption>
												<ZIonSelectOption value={ProjectBoardStatusEnum.notSet}>
													Not set
												</ZIonSelectOption>
											</ZIonSelect>

											<ZIonButton
												height='41px'
												className='ion-no-margin ms-2'
												color='medium'
												onClick={() => {
													try {
														if (
															ZCurrentBoardIdeaData?.status !== values.status
														) {
															submitForm();
														}
													} catch (error) {
														reportCustomError(errors);
													}
												}}
												disabled={
													ZCurrentBoardIdeaData?.status === values.status
												}
											>
												Save
											</ZIonButton>
										</div>

										{/* Edit status */}
										<ZIonItem
											className='mt-2 mb-8 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
										>
											<ZIonIcon icon={optionsOutline} className='mr-2' />
											<ZIonText>Edit Statuses</ZIonText>
										</ZIonItem>

										{/* Actions */}
										<ZIonText className='block font-semibold'>Actions</ZIonText>

										{/* Edit */}
										<ZIonItem
											className='mt-2 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
										>
											<ZIonIcon icon={pencilOutline} className='mr-2' />
											<ZIonText>Edit</ZIonText>
										</ZIonItem>

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
											className='mt-2 mb-8 rounded cursor-pointer'
											lines='none'
											minHeight='41px'
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
											{[1, 2, 3, 4, 5].map((el) => (
												<ZIonChip
													className='zaions__warning_bg_opacity_point_5'
													key={el}
												>
													<ZIonLabel>Avatar Chip</ZIonLabel>
													<ZIonIcon icon={closeCircle} />
												</ZIonChip>
											))}

											{/* <ZIonInput
									minHeight='42px'
									className='mt-2'
									placeholder='Try to search or add new...'
								/> */}

											<ZIonChip className='bg-transparent'>
												<ZIonIcon icon={addOutline} />
												<ZIonLabel>Add tag</ZIonLabel>
											</ZIonChip>
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

const ZProjectSingleComment: React.FC = () => {
	return (
		<div className='mt-4 md:pl-4 pt-2 pb-2 pl-2.5'>
			<div className='flex ion-align-items-center'>
				<ZIonImg
					src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
					className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
				/>

				<div className='ms-2'>
					<ZIonText className='block text-sm font-semibold leading-snug cursor-pointer'>
						Talha Bin Irshad
					</ZIonText>
					<ZIonText className='block text-sm leading-snug' color='medium'>
						1 day ago
					</ZIonText>
				</div>
			</div>

			{/* Comment message */}
			<ZIonText
				className='block mt-3 break-words whitespace-pre-wrap offset'
				style={{ marginLeft: 'calc(36px + 1rem)' }}
			>
				Use {PRODUCT_NAME}'s AI tools to generate replies for new ideas.
				Demonstrate to your users that you are listening to their feedback.
			</ZIonText>

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
				>
					<ZIonIcon icon={arrowUndoOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>REPLAY</ZIonText>
				</ZIonButton>

				{/* Delete */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={trashBinOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>DELETE</ZIonText>
				</ZIonButton>

				{/* Edit */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={pencilOutline} className='mr-1 font-extrabold' />
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
		</div>
	);
};

export default ZProjectSingleIdea;
