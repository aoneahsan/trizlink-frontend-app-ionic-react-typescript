/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	add,
	alertCircle,
	attachOutline,
	chatbubblesOutline,
	chevronDownOutline,
	chevronUpOutline,
	ellipse,
	enter,
	exit,
	pencil,
	refreshOutline,
	reorderFourOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCheckbox,
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
	ZIonSkeletonText,
	ZIonText,
	ZIonTextarea,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZProjectStatusPopover from '@/components/InPageComponents/ZaionsPopovers/Project/StatusPopover';
import ZProjectOrderPopover from '@/components/InPageComponents/ZaionsPopovers/Project/OrderPopover';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import {
	useZUpdateRQCacheData,
	useZRQCreateRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ProjectBoardStatusEnum,
	ZBoardIdeaVoteInterface,
	ZBoardStatusInterface,
	ZProjectBoardIdeasInterface,
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	ZAllIdeasAndFilterOptionsRStateAtom,
	ZFiltratedIdeasRStateSelector,
	ZProjectBoardStatesRStateAtom,
} from '@/ZaionsStore/UserDashboard/Project/index.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo, zEmptyPosts } from '@/assets/images';
import ZIonRefresher from '@/components/ZIonComponents/ZIonRefresher';
import ZIonRefresherContent from '@/components/ZIonComponents/ZIonRefresherContent';
import { RefresherEventDetail } from '@ionic/react';
import ZProjectBoardIdeaVoteButton from '@/components/ProjectComponents/VoteButton';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectViewPage: React.FC = () => {
	const { isXlScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	// Recoil state that will hold all the ideas and filter options.
	const setZAllIdeasAndFilterOptionsStateAtom = useSetRecoilState(
		ZAllIdeasAndFilterOptionsRStateAtom
	);

	// file upload modal.
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	// Recoil state to store boardStatus.
	const [zProjectBoardStatesStateAtom, setZProjectBoardStatesStateAtom] =
		useRecoilState(ZProjectBoardStatesRStateAtom);

	// Order popover.
	const { presentZIonPopover: presentZProjectOrderPopover } =
		useZIonPopover(ZProjectOrderPopover);

	// Recoil state that hold filtrated Ideas.
	const zFiltratedIdeasStateSelector = useRecoilValue(
		ZFiltratedIdeasRStateSelector
	);

	// Status popover.
	const { presentZIonPopover: presentZProjectStatusPopover } = useZIonPopover(
		ZProjectStatusPopover
	);

	// Getting project from backend.
	const { data: ZCurrentProjectData, error: ZProjectError } =
		useZRQGetRequest<ZProjectInterface>({
			_url: API_URL_ENUM.project_update_delete,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET, projectId],
			_itemsIds: [projectId],
			_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// Getting project board from backend.
	const {
		data: ZCurrentBoardData,
		error: ZBoardError,
		refetch: refetchZCurrentBoardData,
		isFetching: isCurrentBoardDataFetching,
	} = useZRQGetRequest<ZProjectBoardInterface>({
		_url: API_URL_ENUM.board_update_delete,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.GET,
			projectId,
			boardId,
		],
		_itemsIds: [projectId, boardId],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.project.projectId,
			CONSTANTS.RouteParams.project.board.boardId,
		],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	// Getting project boardStatuses from backend.
	const {
		data: ZCurrentBoardStatues,
		refetch: refetchZCurrentBoardStatues,
		isFetching: isCurrentBoardStatusDataFetching,
	} = useZRQGetRequest<ZBoardStatusInterface[]>({
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

	// Getting project board boardIdeas from backend.
	const {
		data: ZBoardIdeasData,
		refetch: refetchZBoardIdeasData,
		isFetching: isCurrentBoardIdeasDataFetching,
	} = useZRQGetRequest<ZProjectBoardIdeasInterface[]>({
		_url: API_URL_ENUM.boardIdea_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
			projectId,
			boardId,
		],
		_itemsIds: [boardId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
		_shouldFetchWhenIdPassed: !boardId ? true : false,
	});

	// Create new idea API.
	const { mutateAsync: createBoardIdeaAsyncMutate } =
		useZRQCreateRequest<ZProjectBoardIdeasInterface>({
			_url: API_URL_ENUM.boardIdea_create_list,
			_queriesKeysToInvalidate: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
				projectId,
				boardId,
			],
			_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
			_itemsIds: [boardId],
		});

	// Delete file api.
	const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
		_url: API_URL_ENUM.deleteSingleFile,
	});

	// After getting the boardStatus from backend storing it to recoil state.
	useEffect(() => {
		if (ZCurrentBoardStatues && ZCurrentBoardStatues?.length) {
			setZProjectBoardStatesStateAtom((oldValues) => ({
				...oldValues,
				allStatus: ZCurrentBoardStatues,
			}));
		}
	}, [ZCurrentBoardStatues]);

	// After getting all the ideas from backend storing it to recoil state.
	useEffect(() => {
		try {
			if (ZBoardIdeasData && ZBoardIdeasData?.length) {
				setZAllIdeasAndFilterOptionsStateAtom((oldValues) => ({
					...oldValues,
					allIdeas: ZBoardIdeasData,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [ZBoardIdeasData]);

	// Idea Formik submit handler.
	const IdeaFormikSubmitHandler = async (_data: string) => {
		try {
			if (_data) {
				const _response = await createBoardIdeaAsyncMutate(_data);

				if (_response) {
					const _item = extractInnerData<ZProjectBoardIdeasInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item?.id) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_IDEA_CREATED_SUCCESSFULLY
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

	// function to set ideas filter options
	const zSetIdeasFilterOptions = ({ _status }: { _status: string | null }) => {
		try {
			if (_status || _status === null) {
				setZAllIdeasAndFilterOptionsStateAtom((oldValues) => ({
					...oldValues,
					filterOptions: { state: _status, order: '' },
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// Refresh handler
	const refetchDataHandler = async () => {
		try {
			// Refetch Boards
			await refetchZCurrentBoardData();

			// Refetch Board Status
			await refetchZCurrentBoardStatues();

			// Refetch Board Ideas
			await refetchZBoardIdeasData();
		} catch (error) {
			reportCustomError(error);
		}
	};

	// Refresh handler
	const zIonRefresherRefreshHandler = async (
		event: CustomEvent<RefresherEventDetail>
	) => {
		try {
			await refetchDataHandler();
			//
			event.detail.complete();
		} catch (error) {
			reportCustomError(error);
		}
	};

	// if we don't have project with ProjectId show no project found UI.
	if (
		Object.keys(
			((ZProjectError as AxiosError)?.response?.data as { errors: {} })
				?.errors || {}
		)?.length > 0
	) {
		return <ZProjectNotFound />;
	}

	// if we don't have board with boardId show no board found UI.
	if (
		Object.keys(
			((ZBoardError as AxiosError)?.response?.data as { errors: {} })?.errors ||
				{}
		)?.length > 0
	) {
		return <ZProjectBoardNotFound />;
	}

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Refresher */}
				<ZIonRefresher slot='fixed' onIonRefresh={zIonRefresherRefreshHandler}>
					<ZIonRefresherContent />
				</ZIonRefresher>

				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'ion-no-margin ion-no-padding mx-auto sm:px-4 mt-6 mb-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Row */}
					<ZIonRow className='gap-6 ion-no-margin ion-no-padding'>
						{/* Col-1 */}
						<ZIonCol
							className='ion-no-margin ion-no-padding'
							sizeXl='3.3'
							sizeLg='3.3'
							sizeMd='4'
							sizeSm='12'
							sizeXs='12'
						>
							{/* new idea form div */}
							{isCurrentBoardDataFetching ? (
								<NewIdeaFormSkeleton />
							) : (
								<div className='px-5 py-4 bg-white rounded-lg shadow'>
									<ZIonText className='block text-lg font-bold'>
										{ZCurrentBoardData?.formCustomization?.intoHeading}
									</ZIonText>

									<ZIonText className='block mt-2 whitespace-pre-line'>
										{ZCurrentBoardData?.formCustomization?.intoText}
									</ZIonText>

									{/* Idea form */}
									<Formik
										initialValues={{
											authorName: '',
											title: '',
											description: '',
											image: {
												fileUrl: '',
												filePath: '',
											},
										}}
										onSubmit={async (values, { resetForm }) => {
											try {
												if (
													values.title?.trim()?.length > 0 &&
													values.description?.trim()?.length > 0
												) {
													const _stringifyValue = zStringify({
														title: values.title,
														description: values.description,
														status: ProjectBoardStatusEnum.notSet,
														image: zStringify(values.image),
													});
													await IdeaFormikSubmitHandler(_stringifyValue);

													resetForm({});
												}
											} catch (error) {
												reportCustomError(error);
											}
										}}
									>
										{({
											values,
											touched,
											handleChange,
											handleBlur,
											submitForm,
											setFieldValue,
										}) => {
											return (
												<Form className='mt-4'>
													{/* Author Name */}
													<ZIonInput
														label='Author Name'
														labelPlacement='floating'
													/>

													{/* Title */}
													<ZIonInput
														label={ZCurrentBoardData?.formCustomization?.title}
														labelPlacement='floating'
														name='title'
														value={values.title}
														className='mt-4'
														required
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														placeholder={
															ZCurrentBoardData?.formCustomization
																?.titlePlaceholder
														}
													/>

													{/* Description */}
													<ZIonTextarea
														name='description'
														value={values.description}
														fill='outline'
														label={ZCurrentBoardData?.formCustomization?.body}
														labelPlacement='floating'
														className='mt-4'
														autoGrow
														rows={3}
														required
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														placeholder={
															ZCurrentBoardData?.formCustomization
																?.bodyPlaceholder
														}
													/>

													{/* Attach/Replace image button */}
													<div className='mt-4'>
														{values.image.fileUrl.trim()?.length > 0 && (
															<div className='w-20 h-20 mb-2 mr-2 border rounded-md shadow-lg border-neutral-200'>
																<ZIonImg
																	className='w-full h-full'
																	src={values.image?.fileUrl}
																/>
															</div>
														)}
														<ZIonButton
															className='ion-no-padding ion-no-margin'
															size='small'
															fill='default'
															onClick={() => {
																presentZFileUploadModal({
																	_cssClass: 'file-upload-modal-size',
																	_onWillDismiss: async (
																		ev: CustomEvent<OverlayEventDetail>
																	) => {
																		if (
																			ev.detail.role ===
																			ZIonModalActionEnum.success
																		) {
																			// Getting file data from fileUploadModal and parse it.
																			const fileData = zJsonParse(
																				String(ev.detail.data)
																			) as {
																				fileUrl: string;
																				filePath: string;
																			};

																			if (
																				values?.image?.filePath &&
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
															<ZIonIcon icon={attachOutline} className='mr-1' />
															<ZIonText className='text-[.9rem]'>
																{values.image?.fileUrl?.trim()?.length > 0
																	? 'Replace'
																	: 'Attach'}{' '}
																images
															</ZIonText>
														</ZIonButton>
													</div>

													{ZCurrentBoardData?.formCustomization?.footerText && (
														<ZIonText className='block w-full mt-2 text-left break-words whitespace-pre-line'>
															{ZCurrentBoardData?.formCustomization?.footerText}
														</ZIonText>
													)}
													{touched.title &&
													touched.description &&
													values.title.trim()?.length === 0 &&
													values.description.trim()?.length === 0 ? (
														<ZIonText className='block' color='danger'>
															title and description are required.
														</ZIonText>
													) : (
														''
													)}
													{/* add idea button */}
													<ZIonButton
														className='mt-4'
														expand='block'
														disabled={
															values.title.trim()?.length > 0 &&
															values.description.trim()?.length > 0
																? false
																: true
														}
														onClick={() => {
															if (
																values.title.trim()?.length > 0 &&
																values.description.trim()?.length > 0
															) {
																submitForm();
															}
														}}
													>
														{ZCurrentBoardData?.formCustomization?.buttonText}
													</ZIonButton>
												</Form>
											);
										}}
									</Formik>
								</div>
							)}

							{/*  */}
							<div className='mt-5'>
								<ZIonText className='block font-medium' color='medium'>
									Admin tools
								</ZIonText>

								{/* Board settings */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
									routerLink={createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Projects.Board.Edit,
										params: [
											CONSTANTS.RouteParams.project.projectId,
											CONSTANTS.RouteParams.project.board.boardId,
										],
										values: [projectId, boardId],
									})}
								>
									<ZIonIcon icon={pencil} color='dark' className='mr-2' />
									<ZIonText color='dark'>Board settings</ZIonText>
								</ZIonItem>

								{/* Export ideas */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={exit} color='dark' className='mr-2' />
									<ZIonText color='dark'>Export ideas</ZIonText>
								</ZIonItem>

								{/* Import ideas */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={enter} color='dark' className='mr-2' />
									<ZIonText color='dark'>Import ideas</ZIonText>
								</ZIonItem>

								{/* New board */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
									routerLink={createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Projects.Board.Create,
										params: [CONSTANTS.RouteParams.project.projectId],
										values: [projectId],
									})}
								>
									<ZIonIcon icon={add} color='dark' className='mr-2' />
									<ZIonText color='dark'>New board</ZIonText>
								</ZIonItem>

								<ZIonText className='block w-full my-4 text-sm text-center ion-text-center'>
									Powered by
									<ZIonRouterLink
										color='dark'
										className='underline ms-1 text-md'
									>
										{PRODUCT_NAME}
									</ZIonRouterLink>
								</ZIonText>
							</div>
						</ZIonCol>

						{/* Col-2 */}
						<ZIonCol className='ion-no-margin ion-no-padding'>
							{/*  */}
							<div className='bg-white rounded-lg shadow'>
								{/* Top bar */}
								<div className='px-4 py-4 border-b rounded-t-lg z-ion-border-color-light_opacity_point8'>
									<ZIonRow className='ion-no-padding ion-no-margin'>
										<ZIonCol
											className='ion-no-padding ion-no-margin'
											sizeXl='9'
											sizeLg='9'
											sizeMd='9'
											sizeSm='12'
											sizeXs='12'
										>
											{/* Order popover button */}
											{isCurrentBoardDataFetching &&
											isCurrentBoardStatusDataFetching ? (
												<>
													{/* Order popover button */}
													<ZIonButton
														fill='outline'
														color='medium'
														style={{ '--border-width': '1px' }}
														expand={!isMdScale ? 'block' : undefined}
													>
														<ZIonText className='block text-lg font-bold'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '17px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '25px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '60px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '17px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>
													</ZIonButton>

													{/* Status popover button */}
													<ZIonButton
														fill='outline'
														color='medium'
														style={{ '--border-width': '1px' }}
														expand={!isMdScale ? 'block' : undefined}
													>
														<ZIonText className='block text-lg font-bold'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '17px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '25px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '60px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '17px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>
													</ZIonButton>
												</>
											) : (
												<>
													{/* Order popover button */}
													<ZIonButton
														fill='outline'
														color='medium'
														style={{ '--border-width': '1px' }}
														expand={!isMdScale ? 'block' : undefined}
														onClick={(event: unknown) => {
															presentZProjectOrderPopover({
																_event: event as Event,
																_cssClass: '',
																// _dismissOnSelect: false,
																// _onWillDismiss: ({ detail }) => {
																// 	console.log({ detail });
																// },
																// _onDidDismiss: (event) => {
																// 	console.log({ event });
																// },
															});
														}}
													>
														<ZIonIcon icon={reorderFourOutline} />
														<ZIonText
															className='text-[1rem] font-semibold ms-1'
															color='dark'
														>
															Order:
														</ZIonText>
														<ZIonText className='mx-1 text-[1rem] font-normal'>
															Trending
														</ZIonText>
														<ZIonIcon icon={chevronDownOutline} color='dark' />
													</ZIonButton>

													{/* Status popover button */}
													<ZIonButton
														color='medium'
														fill='outline'
														style={{ '--border-width': '1px' }}
														className={classNames({
															'ms-2': isMdScale,
															'mt-2': !isMdScale,
														})}
														expand={!isMdScale ? 'block' : undefined}
														onClick={(event: unknown) => {
															presentZProjectStatusPopover({
																_event: event as Event,
																_cssClass: '',
																_dismissOnSelect: false,
																_onWillDismiss: ({ detail }) => {
																	zSetIdeasFilterOptions({
																		_status: detail.data,
																	});
																},
															});
														}}
													>
														<ZIonIcon icon={ellipse} className='w-3 h-3' />
														<ZIonText
															className='text-[1rem] font-semibold ms-1'
															color='dark'
														>
															Status:
														</ZIonText>
														<ZIonText className='mx-1 text-[1rem] font-normal'>
															{
																zProjectBoardStatesStateAtom?.currentStatus
																	?.title
															}
														</ZIonText>
														<ZIonIcon icon={chevronDownOutline} color='dark' />
													</ZIonButton>
												</>
											)}
										</ZIonCol>

										{/* my ideas checkbox */}
										<ZIonCol
											className={classNames({
												'flex ion-no-padding ion-no-margin ion-align-items-center':
													true,
												'ion-justify-content-end': isMdScale,
												'ion-justify-content-start mt-2': !isMdScale,
											})}
										>
											{isCurrentBoardDataFetching &&
											isCurrentBoardStatusDataFetching ? (
												<>
													<ZIonButton
														size='small'
														color='tertiary'
														className='me-3'
													>
														<ZIonText className='block text-lg font-bold'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '17px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>

														<ZIonText className='block text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '40px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>
													</ZIonButton>
													<div className='flex ion-align-items-center'>
														<ZIonText className='mr-1 text-lg font-bold'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '19px', height: '19px' }}
															></ZIonSkeletonText>
														</ZIonText>
														<ZIonText className='text-lg font-bold ms-1'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '45px', height: '15px' }}
															></ZIonSkeletonText>
														</ZIonText>
													</div>
												</>
											) : (
												<>
													<ZIonButton
														size='small'
														color='tertiary'
														className='me-3'
														onClick={async () => {
															await refetchDataHandler();
														}}
													>
														<ZIonIcon icon={refreshOutline} className='me-1 ' />
														Refetch
													</ZIonButton>
													<div className='flex ion-align-items-center'>
														<ZIonCheckbox
															name='project-board-my-ideas'
															className='pr-1 mr-1'
															color='danger'
														/>
														<ZIonText>My ideas</ZIonText>
													</div>
												</>
											)}
										</ZIonCol>
									</ZIonRow>
								</div>

								{/*  */}
								{isCurrentBoardIdeasDataFetching && <ZIdeasSkeleton />}
								{!isCurrentBoardIdeasDataFetching ? (
									zFiltratedIdeasStateSelector &&
									zFiltratedIdeasStateSelector?.length > 0 ? (
										<ZProjectIdeasState />
									) : (
										<ZProjectEmptyIdeasState />
									)
								) : (
									''
								)}
							</div>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

// Empty posts state UI.
const ZProjectEmptyIdeasState: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center p-10'>
			<ZIonImg className='max-w-full' src={zEmptyPosts} />
			<ZIonText className='mt-2'>Let's add some ideas to get started!</ZIonText>
		</div>
	);
};

// Posts list UI.
const ZProjectIdeasState: React.FC = () => {
	const { isMdScale } = useZMediaQueryScale();

	const [compState, setCompState] = useState<{
		boardIdeaId: string;
		voteCount: number;
		currentData?: ZProjectBoardIdeasInterface;
	}>({
		boardIdeaId: '',
		voteCount: 0,
	});

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

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

	// Recoil state that hold filtrated Ideas.
	const zFiltratedIdeasStateSelector = useRecoilValue(
		ZFiltratedIdeasRStateSelector
	);

	// Add/Remove vote from idea.
	const { mutateAsync: updateBoardIdeaVoteAsyncMutate } =
		useZRQCreateRequest<ZBoardIdeaVoteInterface>({
			_url: API_URL_ENUM.boardIdeaVote_create_delete,
			_queriesKeysToInvalidate: [],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.project.projectId,
				CONSTANTS.RouteParams.project.board.boardId,
				CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
			],
			_itemsIds: [projectId, boardId, compState.boardIdeaId],
			_showLoader: false,
		});

	return (
		<ZIonGrid className='flex flex-col gap-4 pt-2'>
			{zFiltratedIdeasStateSelector &&
				zFiltratedIdeasStateSelector?.map((el, index) => {
					return (
						<ZIonRow
							className={classNames({
								'ion-align-items-center': true,
								'px-4': isMdScale,
								'px-2': isMdScale,
							})}
							key={index}
						>
							<ZIonCol className='mr-4 ps-2' size='max-content'>
								{/* Vote button */}
								<ZProjectBoardIdeaVoteButton
									boarIdea={el}
									projectId={projectId}
									boardId={boardId}
								/>
							</ZIonCol>

							<ZIonCol>
								{el.id && (
									<ZIonRouterLink
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.Projects.BoardIdea.Main,
											params: [
												CONSTANTS.RouteParams.project.projectId,
												CONSTANTS.RouteParams.project.board.boardId,
												CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
											],
											values: [projectId, boardId, el?.id],
										})}
										color='dark'
									>
										<ZIonTitle
											className={classNames({
												'inline-block ion-no-padding font-semibold': true,
												'text-lg': isMdScale,
												'text-md': !isMdScale,
											})}
										>
											{el.title}
										</ZIonTitle>
									</ZIonRouterLink>
								)}
								{/* Status */}
								{el?.statusUniqueId !== ProjectBoardStatusEnum.notSet && (
									<ZIonText
										className='block text-base font-bold tracking-wide rounded-full'
										style={{
											color: ZCurrentBoardStatues?.find(
												(_status) => _status.id === el?.statusUniqueId
											)?.color,
										}}
									>
										{ZCurrentBoardStatues?.find(
											(_status) => _status.id === el?.statusUniqueId
										)?.title ||
											(el?.statusUniqueId === null && '')}
									</ZIonText>
								)}

								<div className='overflow-hidden line-clamp-3'>
									<ZIonText
										className={classNames({
											'block  break-words force-break-words': true,
											'text-sm': !isMdScale,
										})}
									>
										{el.description}
									</ZIonText>
								</div>

								<div className='flex flex-wrap mt-1 text-sm'>
									<ZIonIcon
										icon={chatbubblesOutline}
										color='medium'
										className='mt-[2px] mr-2'
									/>
									<ZIonText
										color='medium'
										className={classNames({
											'text-sm': !isMdScale,
										})}
									>
										{el.commentsCount} comments
									</ZIonText>
								</div>
							</ZIonCol>
						</ZIonRow>
					);
				})}
		</ZIonGrid>
	);
};

// Project not found UI.
const ZProjectNotFound: React.FC = () => {
	return (
		<ZIonContent color='light'>
			<ZIonGrid>
				<ZIonRow className='pt-32'>
					<ZIonCol
						className='flex mb-16 ion-align-items-center ion-justify-content-center'
						size='12'
					>
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
					</ZIonCol>

					{/*  */}
					<ZIonCol
						size='12'
						className='flex ion-justify-content-center ion-align-items-center'
					>
						<div className='flex flex-col py-16 pl-16 pr-16 bg-white rounded-lg shadow-lg child-div ion-justify-content-center ion-align-items-center'>
							<ZIonIcon
								icon={alertCircle}
								className='w-[8rem] h-[8rem]'
								color='medium'
							/>

							<ZIonText
								className='block mt-4 text-3xl font-bold leading-9 tracking-normal text-center'
								color='medium'
							>
								Project not found
							</ZIonText>

							<ZIonText className='block mt-2 text-sm font-normal leading-5 tracking-normal text-center'>
								The project you are looking for doesn't exist anymore
							</ZIonText>

							<ZIonButton
								className='mt-4 text-lg font-bold'
								routerLink={ZaionsRoutes.AdminPanel.Projects.Main}
							>
								Go to {PRODUCT_NAME}
							</ZIonButton>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</ZIonContent>
	);
};

// Board not found UI.
const ZProjectBoardNotFound: React.FC = () => {
	return (
		<ZIonContent color='light'>
			<ZIonGrid>
				<ZIonRow className='pt-32'>
					<ZIonCol
						className='flex mb-16 ion-align-items-center ion-justify-content-center'
						size='12'
					>
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
					</ZIonCol>

					{/*  */}
					<ZIonCol
						size='12'
						className='flex ion-justify-content-center ion-align-items-center'
					>
						<div className='flex flex-col py-16 pl-16 pr-16 bg-white rounded-lg shadow-lg child-div ion-justify-content-center ion-align-items-center'>
							<ZIonIcon
								icon={alertCircle}
								className='w-[8rem] h-[8rem]'
								color='medium'
							/>

							<ZIonText
								className='block mt-4 text-3xl font-bold leading-9 tracking-normal text-center'
								color='medium'
							>
								Board not found
							</ZIonText>

							<ZIonText className='block mt-2 text-sm font-normal leading-5 tracking-normal text-center'>
								The Board you are looking for doesn't exist anymore
							</ZIonText>

							<ZIonButton
								className='mt-4 text-lg font-bold'
								routerLink={ZaionsRoutes.AdminPanel.Projects.Main}
							>
								Go to {PRODUCT_NAME}
							</ZIonButton>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</ZIonContent>
	);
};

// New idea form skeleton
const NewIdeaFormSkeleton: React.FC = () => {
	return (
		<ZIonCol
			className='ion-no-margin ion-no-padding'
			sizeXl='3.3'
			sizeLg='3.3'
			sizeMd='4'
			sizeSm='12'
			sizeXs='12'
		>
			{/* new idea form div */}
			<div className='px-5 py-4 bg-white rounded-lg shadow'>
				<ZIonText className='block text-lg font-bold'>
					<ZIonSkeletonText
						animated={true}
						style={{ width: '100%', height: '15px' }}
					></ZIonSkeletonText>
				</ZIonText>

				<ZIonText className='block mt-2 whitespace-pre-line'>
					<ZIonSkeletonText
						animated={true}
						style={{ width: '100%', height: '35px' }}
					></ZIonSkeletonText>
				</ZIonText>

				{/* Idea form */}
				<div className='mt-4'>
					{/* Author Name */}
					<ZIonText className='block'>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '100%', height: '45px' }}
						></ZIonSkeletonText>
					</ZIonText>

					{/* Title */}
					<ZIonText className='block mt-4'>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '100%', height: '45px' }}
						></ZIonSkeletonText>
					</ZIonText>

					{/* Description */}
					<ZIonText className='block mt-4'>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '100%', height: '65px' }}
						></ZIonSkeletonText>
					</ZIonText>

					{/* Attach/Replace image button */}
					<div className='mt-4'>
						<div className='w-20 h-20 mb-2 mr-2 border rounded-md'>
							<ZIonImg className='w-full h-full'>
								<ZIonSkeletonText
									animated={true}
									style={{ width: '100%', height: '100%' }}
								></ZIonSkeletonText>
							</ZIonImg>
						</div>

						<ZIonButton
							className='ion-no-padding ion-no-margin'
							size='small'
							fill='default'
						>
							<ZIonSkeletonText
								animated={true}
								style={{ width: '100%', height: '15px' }}
							></ZIonSkeletonText>
						</ZIonButton>
					</div>

					<ZIonText className='block w-full mt-2 text-left break-words whitespace-pre-line'>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '100%', height: '15px' }}
						></ZIonSkeletonText>
					</ZIonText>

					{/* add idea button */}
					<ZIonButton className='mt-4' expand='block'>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '100%', height: '15px' }}
						></ZIonSkeletonText>
					</ZIonButton>
				</div>
			</div>
		</ZIonCol>
	);
};

// Ideas list skeleton
const ZIdeasSkeleton: React.FC = () => {
	const { isMdScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'ion-align-items-center py-3': true,
				'px-4': isMdScale,
				'px-2': isMdScale,
			})}
		>
			<ZIonCol className='mr-4 ps-2' size='max-content'>
				<ZIonButton height='50px' fill='clear' color='medium'>
					<ZIonLabel color='light'>
						<p className='m-[0px!important] z_ion_color_danger'>
							<ZIonText className='block text-lg font-bold'>
								<ZIonSkeletonText
									animated={true}
									style={{ width: '17px', height: '15px' }}
								></ZIonSkeletonText>
							</ZIonText>
						</p>
						<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
							<ZIonText className='block text-lg font-bold'>
								<ZIonSkeletonText
									animated={true}
									style={{ width: '17px', height: '15px' }}
								></ZIonSkeletonText>
							</ZIonText>
						</p>
					</ZIonLabel>
				</ZIonButton>
			</ZIonCol>

			<ZIonCol>
				<ZIonTitle
					className={classNames({
						'inline-block ion-no-padding font-semibold': true,
						'text-lg': isMdScale,
						'text-md': !isMdScale,
					})}
				>
					<ZIonSkeletonText
						animated={true}
						style={{ width: '40px', height: '15px' }}
					></ZIonSkeletonText>
				</ZIonTitle>

				<div className='overflow-hidden line-clamp-3'>
					<ZIonText
						className={classNames({
							'block  break-words force-break-words': true,
							'text-sm': !isMdScale,
						})}
					>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '90%', height: '15px' }}
						></ZIonSkeletonText>
					</ZIonText>
				</div>

				<div className='flex flex-wrap mt-1 text-sm'>
					<ZIonText>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '17px', height: '15px' }}
						></ZIonSkeletonText>
					</ZIonText>

					<ZIonText
						color='medium'
						className={classNames({
							'text-sm': !isMdScale,
						})}
					>
						<ZIonSkeletonText
							animated={true}
							style={{ width: '30px', height: '15px' }}
						></ZIonSkeletonText>
					</ZIonText>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZProjectViewPage;
