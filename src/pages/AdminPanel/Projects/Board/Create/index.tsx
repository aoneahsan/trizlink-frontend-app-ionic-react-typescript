/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
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
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
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
import {
	useZInvalidateReactQueries,
	useZRQCreateRequest,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	createRedirectRoute,
	extractInnerData,
	validateFields,
	zStringify,
} from '@/utils/helpers';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import CONSTANTS, { ProjectBoardDefaultData } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ProjectBoardStatusEnum,
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useRecoilState } from 'recoil';
import { ZProjectBoardsRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { trashBinOutline } from 'ionicons/icons';
import { useZIonAlert, useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

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
 * About: (create or update project->board form page)
 * @type {*}
 * */

const ZProjectBoardFormPage: React.FC = () => {
	const { isXlScale, isSmScale, isLgScale } = useZMediaQueryScale();

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	/**
	 * Custom hooks.
	 */
	const { zNavigatePushRoute } = useZNavigate();
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { zInvalidateReactQueries } = useZInvalidateReactQueries();

	/**
	 * Recoil state to store current project boards.
	 */
	const [zProjectBoardsStateAtom, setZProjectBoardsStateAtom] = useRecoilState(
		ZProjectBoardsRStateAtom
	);

	/**
	 * Getting project from backend.
	 */
	const { data: ZCurrentProjectData } = useZRQGetRequest<ZProjectInterface>({
		_url: API_URL_ENUM.project_update_delete,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET, projectId],
		_itemsIds: [projectId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	/**
	 * Create new project board API
	 */
	const { mutateAsync: createProjectBoardMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.board_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.MAIN,
			projectId,
		],
		_itemsIds: [projectId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
	});

	/**
	 * Update board API.
	 */
	const { mutateAsync: updateProjectBoardMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.board_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.GET,
			projectId,
			boardId,
		],
	});

	/**
	 * Getting board data from backend with boardId.
	 */
	const {
		data: selectedBoard,
		// refetch: refetchSelectedBoard,
		isFetched: isSelectBoardFetched,
	} = useZRQGetRequest<ZProjectBoardInterface>({
		_url: API_URL_ENUM.board_update_delete,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.GET,
			projectId,
			boardId,
		],
		_authenticated: true,
		_itemsIds: [projectId, boardId],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.project.projectId,
			CONSTANTS.RouteParams.project.board.boardId,
		],
		_shouldFetchWhenIdPassed: !boardId ? true : false,
		_extractType: ZRQGetRequestExtractEnum.extractItem,
		// _staleTime: 0,
	});

	useEffect(() => {
		try {
			if (boardId && selectedBoard) {
				setZProjectBoardsStateAtom((oldValues) => ({
					...oldValues,
					currentBoard: {
						id: selectedBoard?.id,
						title: selectedBoard?.title,
						slug: selectedBoard?.slug,
						pageHeading: selectedBoard?.pageHeading,
						pageDescription: selectedBoard?.pageDescription,
						formCustomization: {
							intoHeading: selectedBoard?.formCustomization?.intoHeading,
							intoText: selectedBoard?.formCustomization?.intoText,
							title: selectedBoard?.formCustomization?.title,
							titlePlaceholder:
								selectedBoard?.formCustomization?.titlePlaceholder,
							body: selectedBoard?.formCustomization?.body,
							bodyPlaceholder:
								selectedBoard?.formCustomization?.bodyPlaceholder,
							footerText: selectedBoard?.formCustomization?.footerText,
							buttonText: selectedBoard?.formCustomization?.buttonText,
						},
						defaultStatus: {
							state: selectedBoard?.defaultStatus?.state,
							hideIdeaWithNoSet:
								selectedBoard?.defaultStatus?.hideIdeaWithNoSet,
						},
						votingSetting: {
							hideVotingCount: selectedBoard?.votingSetting?.hideVotingCount,
						},
					},
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [boardId]);

	/**
	 * Formik submit handler
	 */
	const formikSubmitHandler = async (data: string) => {
		try {
			if (data) {
				// Making an api call creating new project board
				let _response;
				if (boardId) {
					_response = await updateProjectBoardMutate({
						itemIds: [projectId, boardId],
						urlDynamicParts: [
							CONSTANTS.RouteParams.project.projectId,
							CONSTANTS.RouteParams.project.board.boardId,
						],
						requestData: data,
					});

					zInvalidateReactQueries([
						CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.MAIN,
						projectId,
					]);
				} else {
					_response = await createProjectBoardMutate(data);
				}

				if (_response) {
					const _data = extractInnerData<ZProjectBoardInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						if (boardId) {
							showSuccessNotification(
								MESSAGES.GENERAL.PROJECT.BOARD_UPDATED_SUCCESSFULLY
							);
						} else {
							showSuccessNotification(
								MESSAGES.GENERAL.PROJECT.BOARD_CREATED_SUCCESSFULLY
							);
						}

						setZProjectBoardsStateAtom((oldValues) => ({
							...oldValues,
							currentBoard: {
								id: _data.id,
								title: _data.title,
								slug: _data.slug,
								pageHeading: _data.pageHeading,
								pageDescription: _data.pageDescription,
								formCustomization: {
									intoHeading: _data.formCustomization.intoHeading,
									intoText: _data.formCustomization.intoText,
									title: _data.formCustomization.title,
									titlePlaceholder: _data.formCustomization.titlePlaceholder,
									body: _data.formCustomization.body,
									bodyPlaceholder: _data.formCustomization.bodyPlaceholder,
									footerText: _data.formCustomization.footerText,
									buttonText: _data.formCustomization.buttonText,
								},
								defaultStatus: {
									state: _data.defaultStatus.state,
									hideIdeaWithNoSet: _data.defaultStatus.hideIdeaWithNoSet,
								},
								votingSetting: {
									hideVotingCount: _data.votingSetting.hideVotingCount,
								},
							},
						}));

						zNavigatePushRoute(
							createRedirectRoute({
								url: ZaionsRoutes.AdminPanel.Projects.Board.Main,
								params: [
									CONSTANTS.RouteParams.project.projectId,
									CONSTANTS.RouteParams.project.board.boardId,
								],
								values: [projectId, _data.id],
							})
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

	/**
	 * delete short link folder api.
	 */
	const { mutateAsync: deleteProjectBoardMutate } = useZRQDeleteRequest(
		API_URL_ENUM.board_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.MAIN, projectId]
	);

	/**
	 * deleteBoardFn will show the confirm alert before deleting short link folder.
	 */
	const deleteBoardFn = async () => {
		try {
			if (boardId && selectedBoard?.id) {
				await presentZIonAlert({
					header: `Delete board "${selectedBoard?.title}"`,
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
								void removeBoard();
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

	/**
	 * removeBoard will hit delete short link folder api
	 */
	const removeBoard = async () => {
		try {
			if (selectedBoard?.id) {
				// hitting the delete api
				const _response = await deleteProjectBoardMutate({
					itemIds: [projectId, selectedBoard?.id],
					urlDynamicParts: [
						CONSTANTS.RouteParams.project.projectId,
						CONSTANTS.RouteParams.project.board.boardId,
					],
				});

				if (_response) {
					const _data = extractInnerData<{ success: boolean }>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data?.success) {
						showSuccessNotification(
							MESSAGES.GENERAL.PROJECT.BOARD_DELETED_SUCCESSFULLY
						);

						await zInvalidateReactQueries([
							CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET,
							projectId,
						]);

						ZCurrentProjectData?.firstBoardId &&
							zNavigatePushRoute(
								createRedirectRoute({
									url: ZaionsRoutes.AdminPanel.Projects.Board.Main,
									params: [
										CONSTANTS.RouteParams.project.projectId,
										CONSTANTS.RouteParams.project.board.boardId,
									],
									values: [projectId, ZCurrentProjectData?.firstBoardId],
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

	if (!isSelectBoardFetched) {
		return null;
	}
	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'ion-no-margin ion-no-padding mx-auto sm:px-4 mt-4 mb-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Formik */}
					<Formik
						initialValues={{
							title: selectedBoard?.title,
							slug: selectedBoard?.slug || '',
							pageHeading: selectedBoard?.pageHeading || '',
							pageDescription: selectedBoard?.pageDescription || '',
							formCustomization: {
								intoHeading:
									selectedBoard?.formCustomization?.intoHeading ||
									ProjectBoardDefaultData.formCustomization.intoHeading,
								intoText:
									selectedBoard?.formCustomization?.intoText ||
									ProjectBoardDefaultData.formCustomization.intoText,
								title:
									selectedBoard?.formCustomization?.title ||
									ProjectBoardDefaultData.formCustomization.title,
								titlePlaceholder:
									selectedBoard?.formCustomization?.titlePlaceholder ||
									ProjectBoardDefaultData.formCustomization.titlePlaceholder,
								body:
									selectedBoard?.formCustomization?.body ||
									ProjectBoardDefaultData.formCustomization.body,
								bodyPlaceholder:
									selectedBoard?.formCustomization?.bodyPlaceholder ||
									ProjectBoardDefaultData.formCustomization.bodyPlaceholder,
								footerText: selectedBoard?.formCustomization?.footerText || '',
								buttonText:
									selectedBoard?.formCustomization?.buttonText ||
									ProjectBoardDefaultData.formCustomization.buttonText,
							},
							defaultStatus: {
								state:
									selectedBoard?.defaultStatus?.state ||
									ProjectBoardDefaultData.defaultStatus.state,
								hideIdeaWithNoSet:
									selectedBoard?.defaultStatus?.hideIdeaWithNoSet ||
									ProjectBoardDefaultData.defaultStatus.hideIdeaWithNoSet,
							},
							votingSetting: {
								hideVotingCount:
									selectedBoard?.votingSetting?.hideVotingCount ||
									ProjectBoardDefaultData.votingSetting.hideVotingCount,
							},
						}}
						validate={(values) => {
							const errors: {
								title?: string;
								slug?: string;
								formCustomization: {
									intoHeading?: string;
									intoText?: string;
									title?: string;
									body?: string;
									buttonText?: string;
								};
							} = {
								formCustomization: {},
							};

							validateFields(['title', 'slug'], values, errors, [
								VALIDATION_RULE.string,
								VALIDATION_RULE.string,
							]);

							validateFields(
								['intoHeading', 'intoText', 'title', 'body', 'buttonText'],
								values.formCustomization,
								errors.formCustomization,
								[
									VALIDATION_RULE.string,
									VALIDATION_RULE.string,
									VALIDATION_RULE.string,
									VALIDATION_RULE.string,
									VALIDATION_RULE.string,
								]
							);

							if (
								(errors.formCustomization.title &&
									errors.formCustomization.title?.trim().length > 0) ||
								(errors.formCustomization.body &&
									errors.formCustomization.body?.trim().length > 0) ||
								(errors.formCustomization.buttonText &&
									errors.formCustomization.buttonText?.trim().length > 0) ||
								(errors.formCustomization.intoHeading &&
									errors.formCustomization.intoHeading?.trim().length > 0) ||
								(errors.formCustomization.intoText &&
									errors.formCustomization.intoText?.trim().length > 0) ||
								(errors.title && errors.title?.trim().length > 0) ||
								(errors.slug && errors.slug?.trim().length > 0)
							) {
								return errors;
							} else {
								return {};
							}
						}}
						onSubmit={async (values) => {
							try {
								const _data = zStringify({
									title: values.title,
									slug: values.slug,
									pageHeading: values.pageHeading,
									pageDescription: values.pageDescription,
									formCustomization: zStringify(values.formCustomization),
									defaultStatus: zStringify(values.defaultStatus),
									votingSetting: zStringify(values.votingSetting),
								});

								await formikSubmitHandler(_data);
							} catch (error) {
								reportCustomError(error);
							}
						}}
						enableReinitialize={true}
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
								<ZIonRow className='gap-4 ion-no-margin ion-no-padding'>
									{/* Col-1 */}
									<ZIonCol
										className='px-4 py-3 mb-8 bg-white rounded-lg shadow lg:mb-8'
										sizeXl='5.9'
										sizeLg='5.9'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<div className='flex w-full ion-align-items-center ion-justify-content-between'>
											<ZIonText className='block text-2xl font-semibold'>
												{boardId ? 'Board settings' : 'New feedback board'}
											</ZIonText>

											{boardId && (
												<>
													<ZIonIcon
														icon={trashBinOutline}
														onClick={() => {
															deleteBoardFn();
														}}
														color='danger'
														id='z-project-board-delete'
														className='w-5 h-5 cursor-pointer'
													/>

													<ZRTooltip
														anchorSelect='#z-project-board-delete'
														place='right'
														content='Delete board.'
													/>
												</>
											)}
										</div>

										<ZIonText className='block mt-4 text-lg font-semibold'>
											General
										</ZIonText>

										<div className='mt-4'>
											{/* Name */}
											<ZIonInput
												minHeight='45px'
												label='Name'
												placeholder='i.e. Feedback and ideas'
												labelPlacement='stacked'
												counter={true}
												maxlength={30}
												name='title'
												value={values.title}
												errorText={errors.title}
												onIonBlur={handleBlur}
												onIonChange={(e) => {
													handleChange(e);

													setFieldValue(
														'slug',
														String(e.target.value)
															.split(' ')
															.join('_')
															.toLowerCase(),
														false
													);
												}}
												className={classNames({
													'ion-touched ion-invalid':
														touched.title && errors.title,
													'ion-touched ion-valid':
														touched.title && !errors.title,
												})}
											/>

											{/* Slug */}
											<ZIonInput
												minHeight='45px'
												label='Slug'
												placeholder='feedback and ideas'
												labelPlacement='stacked'
												helperText='Use only a-z, 0-9 and "-"'
												counter={true}
												maxlength={20}
												name='slug'
												value={values.slug}
												errorText={errors.slug}
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												counterFormatter={() =>
													`https://mti.zaions.com/boards/`
												}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.slug && errors.slug,
													'ion-touched ion-valid': touched.slug && !errors.slug,
												})}
											/>

											{/* Page heading */}
											<ZIonInput
												minHeight='45px'
												className='mt-5'
												label='Page heading'
												placeholder='i.e. Feedback and ideas'
												labelPlacement='stacked'
												counter={true}
												maxlength={100}
												value={values.pageHeading}
												name='pageHeading'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											/>

											{/* Page description */}
											<ZIonTextarea
												className='mt-3'
												fill='outline'
												label='Page description'
												labelPlacement='stacked'
												counter={true}
												maxlength={300}
												autoGrow
												value={values.pageDescription}
												name='pageDescription'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											/>

											{/* from customization */}
											<ZIonText className='block mt-8 text-lg font-semibold'>
												New idea form customization
											</ZIonText>

											{/* Intro heading */}
											<ZIonInput
												minHeight='45px'
												label='Intro heading'
												labelPlacement='stacked'
												counter={true}
												maxlength={30}
												value={values.formCustomization.intoHeading}
												errorText={errors.formCustomization?.intoHeading}
												name='formCustomization.intoHeading'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.formCustomization?.intoHeading &&
														errors.formCustomization?.intoHeading,
													'ion-touched ion-valid':
														touched.formCustomization?.intoHeading &&
														!errors.formCustomization?.intoHeading,
												})}
											/>

											{/* Intro text */}
											<ZIonTextarea
												fill='outline'
												label='Intro text'
												labelPlacement='stacked'
												counter={true}
												maxlength={300}
												autoGrow
												value={values.formCustomization.intoText}
												errorText={errors.formCustomization?.intoText}
												name='formCustomization.intoText'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.formCustomization?.intoText &&
														errors.formCustomization?.intoText,
													'ion-touched ion-valid':
														touched.formCustomization?.intoText &&
														!errors.formCustomization?.intoText,
												})}
											/>

											{/* Form title */}
											<ZIonInput
												minHeight='45px'
												label='Form title'
												labelPlacement='stacked'
												counter={true}
												value={values.formCustomization.title}
												errorText={errors.formCustomization?.title}
												name='formCustomization.title'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												maxlength={30}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.formCustomization?.title &&
														errors.formCustomization?.title,
													'ion-touched ion-valid':
														touched.formCustomization?.title &&
														!errors.formCustomization?.title,
												})}
											/>

											{/* Form title placeholder */}
											<ZIonInput
												minHeight='45px'
												label='Form title placeholder'
												className='mt-4'
												labelPlacement='stacked'
												counter={true}
												maxlength={30}
												value={values.formCustomization.titlePlaceholder}
												name='formCustomization.titlePlaceholder'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											/>

											{/* Form body */}
											<ZIonInput
												minHeight='45px'
												label='Form body'
												labelPlacement='stacked'
												counter={true}
												maxlength={30}
												value={values.formCustomization.body}
												errorText={errors.formCustomization?.body}
												name='formCustomization.body'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.formCustomization?.body &&
														errors.formCustomization?.body,
													'ion-touched ion-valid':
														touched.formCustomization?.body &&
														!errors.formCustomization?.body,
												})}
											/>

											{/* Form body placeholder */}
											<ZIonInput
												minHeight='45px'
												className='mt-4'
												label='Form body placeholder'
												labelPlacement='stacked'
												counter={true}
												maxlength={60}
												value={values.formCustomization.bodyPlaceholder}
												name='formCustomization.bodyPlaceholder'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											/>

											{/* Form footer text */}
											<ZIonTextarea
												className='mt-4'
												fill='outline'
												label='Form footer text'
												labelPlacement='stacked'
												counter={true}
												maxlength={300}
												autoGrow
												value={values.formCustomization.footerText}
												name='formCustomization.footerText'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											/>

											{/* Form button text */}
											<ZIonInput
												minHeight='45px'
												label='Form button text'
												labelPlacement='stacked'
												counter={true}
												maxlength={60}
												value={values.formCustomization.buttonText}
												errorText={errors.formCustomization?.buttonText}
												name='formCustomization.buttonText'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
												className={classNames({
													'mt-4': true,
													'ion-touched ion-invalid':
														touched.formCustomization?.buttonText &&
														errors.formCustomization?.buttonText,
													'ion-touched ion-valid':
														touched.formCustomization?.buttonText &&
														!errors.formCustomization?.buttonText,
												})}
											/>

											<ZIonText className='block mt-8 text-lg font-semibold'>
												Default status for new ideas
											</ZIonText>
											<ZIonText>
												When new ideas are submitted, assign them this status
											</ZIonText>
											<ZIonSelect
												fill='outline'
												minHeight='45px'
												value={values.defaultStatus.state}
												interface='popover'
												name='defaultStatus.state'
												onIonBlur={handleBlur}
												onIonChange={handleChange}
											>
												<ZIonSelectOption
													value={ProjectBoardStatusEnum.needYourOpinion}
												>
													Need your opinion
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
													Not now
												</ZIonSelectOption>
												<ZIonSelectOption value={ProjectBoardStatusEnum.notSet}>
													Not set
												</ZIonSelectOption>
											</ZIonSelect>

											{/*  */}
											<div className='flex mt-8 ion-align-items-start'>
												<div>
													<ZIonCheckbox
														className='mt-1'
														name='defaultStatus.hideIdeaWithNoSet'
														checked={values.defaultStatus.hideIdeaWithNoSet}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
													/>
												</div>
												<div className='ml-4'>
													<ZIonText className='block font-bold'>
														Hide ideas with "Not Set" status from users
													</ZIonText>

													<ZIonText className='block'>
														Only admins will be able to see and filter ideas
														marked with the "Not Set" status.
													</ZIonText>
												</div>
											</div>

											{/* Voting settings */}
											<ZIonText className='block mt-6 text-lg font-semibold'>
												Voting settings
											</ZIonText>

											<div className='flex mt-8 ion-align-items-start'>
												<div>
													<ZIonCheckbox
														className='mt-1'
														name='votingSetting.hideVotingCount'
														checked={values.votingSetting.hideVotingCount}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
													/>
												</div>
												<div className='ml-4'>
													<ZIonText className='block font-bold'>
														Hide count of votes
													</ZIonText>

													<ZIonText className='block'>
														The number of votes on ideas will not be displayed
														to users
													</ZIonText>
												</div>
											</div>

											{/*  */}
											<div className='flex w-full mt-6 ion-align-items-center ion-justify-content-center'>
												<ZIonButton
													disabled={!isValid}
													onClick={() => {
														submitForm();
													}}
												>
													Save board
												</ZIonButton>
											</div>
										</div>
									</ZIonCol>

									{/* Col-2 (LIVE PREVIEW - PANEL) */}
									<ZIonCol
										className={classNames({
											'ion-align-items-center ion-justify-content-center-start flex flex-col':
												isLgScale,
										})}
										sizeXl=''
										sizeLg=''
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<div className='flex items-center w-full max-w-sm text-sm font-bold leading-none tracking-wider text-left uppercase'>
											<div className='w-2 h-2 mr-2 rounded-full zaions-ion-bg-color-danger'></div>
											<ZIonText>LIVE PREVIEW</ZIonText>
										</div>

										<div
											className={classNames({
												'bg-white rounded-lg shadow px-5 py-4 mt-2': true,
												'max-w-sm': isLgScale,
												'w-full': !isLgScale,
											})}
										>
											<ZIonText className='block text-lg font-bold'>
												{values.formCustomization.intoHeading}
											</ZIonText>

											<ZIonText className='block mt-2 whitespace-pre-line'>
												{values.formCustomization.intoText}
											</ZIonText>

											<ZIonInput
												placeholder={values.formCustomization.titlePlaceholder}
												label={values.formCustomization.title}
												labelPlacement='stacked'
												minHeight='42px'
												className='mt-5'
												readonly
											/>

											<ZIonTextarea
												fill='outline'
												placeholder={values.formCustomization.bodyPlaceholder}
												label={values.formCustomization.body}
												labelPlacement='stacked'
												autoGrow
												readonly
												className='mt-5'
											/>

											<ZIonButton className='mt-5' expand='block'>
												{values.formCustomization.buttonText}
											</ZIonButton>
										</div>
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

export default ZProjectBoardFormPage;
