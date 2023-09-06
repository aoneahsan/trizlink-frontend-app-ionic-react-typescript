/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

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
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZTimezoneInput, {
	ZTimezoneSelector,
} from '@/components/CustomComponents/ZTimezone';
import { alertCircleOutline, eyeOffOutline } from 'ionicons/icons';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { Formik } from 'formik';
import {
	useZGetRQCacheData,
	useZRQDeleteRequest,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import classNames from 'classnames';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import MESSAGES from '@/utils/messages';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { useZIonAlert, useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

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

const ZSettingsTab: React.FC<{
	workspaceId: string;
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ workspaceId, dismissZIonModal }) => {
	const [compState, setCompState] = useState<{
		workspace?: workspaceInterface;
	}>({});
	//#region Custom hooks.
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	//#endregion

	//#region APIS
	const { mutateAsync: updateWorkspaceMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.workspace_update_delete,
		_queriesKeysToInvalidate: [],
	});

	const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest(
		API_URL_ENUM.workspace_update_delete,
		[]
	);
	//#endregion

	//#region Functions.
	const formikSubmitHandler = async (values: string) => {
		try {
			if (values) {
				// Making an api call creating new workspace.
				const _response = await updateWorkspaceMutate({
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
					itemIds: [workspaceId],
					requestData: values,
				});

				if (_response) {
					// extracting data from _response.
					const _data = extractInnerData<workspaceInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						// Updating current short link in cache in RQ cache.
						await updateRQCDataHandler<workspaceInterface | undefined>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
							data: { ..._data },
							id: _data.id,
						});

						setCompState((oldValues) => ({
							...oldValues,
							workspace: _data,
						}));

						showSuccessNotification(
							MESSAGES.GENERAL.WORKSPACE.WORKSPACE_UPDATED
						);
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// when user won't to delete workspace and click on the delete button this function will fire and show the confirm alert.
	const deleteWorkspace = async () => {
		try {
			if (workspaceId) {
				await presentZIonAlert({
					header: `Delete workspace "${
						compState.workspace?.workspaceName || ''
					}"`,
					subHeader: 'Remove workspace from user account.',
					message: 'Are you sure you want to delete this workspace?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeWorkspace();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};

	// on the delete workspace confirm alert, when user click on delete button this function will firs which will trigger delete request and delete the workspace.
	const removeWorkspace = async () => {
		try {
			if (workspaceId) {
				const _response = await deleteWorkspaceMutate({
					itemIds: [workspaceId],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
				});

				if (_response) {
					const _data = extractInnerData<{ success: boolean }>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data?.success) {
						// getting all the shortLinks from RQ cache.
						const _oldShortLinks =
							extractInnerData<workspaceInterface[]>(
								getRQCDataHandler<workspaceInterface[]>({
									key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
								}) as workspaceInterface[],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						// removing deleted shortLinks from cache.
						const _updatedShortLinks = _oldShortLinks.filter(
							(el) => el.id !== workspaceId
						);

						// Updating data in RQ cache.
						await updateRQCDataHandler<workspaceInterface[] | undefined>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
							data: _updatedShortLinks as workspaceInterface[],
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItems,
							updateHoleData: true,
						});

						showSuccessNotification(
							MESSAGES.GENERAL.WORKSPACE.WORKSPACE_DELETED
						);

						dismissZIonModal();
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
	//#endregion

	useEffect(() => {
		try {
			if (workspaceId) {
				// getting all the workspace from RQ cache.
				const _allWorkspaces =
					extractInnerData<workspaceInterface[]>(
						getRQCDataHandler<workspaceInterface[]>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
						}) as workspaceInterface[],
						extractInnerDataOptionsEnum.createRequestResponseItems
					) || [];

				const _currentWorkspace = _allWorkspaces.filter(
					(el) => el.id === workspaceId
				);

				setCompState((oldValues) => ({
					...oldValues,
					workspace: _currentWorkspace[0],
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [workspaceId]);

	return (
		<ZIonGrid className='w-full'>
			<ZIonRow className='mx-auto w-[40%]'>
				<Formik
					initialValues={{
						workspaceName: compState.workspace?.workspaceName || '',
						workspaceTimezone: compState.workspace?.workspaceTimezone || '',
						internalPost: compState.workspace?.internalPost || false,
					}}
					enableReinitialize={true}
					validate={(values) => {
						const errors = {};
						validateField('workspaceName', values, errors);
						return errors;
					}}
					onSubmit={async (values) => {
						try {
							const zStringifyData = zStringify({
								title: values.workspaceName,
								timezone: values.workspaceTimezone,
								internalPost: values.internalPost,
							});
							await formikSubmitHandler(zStringifyData);
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						initialValues,
						handleChange,
						handleBlur,
						setFieldValue,
						submitForm,
					}) => {
						return (
							<ZIonCol size='12'>
								<ZIonInput
									label='Workspace Name'
									labelPlacement='stacked'
									placeholder='Workspace Name'
									minHeight='2.5rem'
									name='workspaceName'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									errorText={errors.workspaceName}
									value={values.workspaceName}
									testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.workspaceNameInput}-${workspaceId}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.settingsModal.settings
											.workspaceNameInput
									}
									className={classNames({
										'bg-white': true,
										'ion-touched': touched.workspaceName,
										'ion-invalid': errors.workspaceName,
										'ion-valid': !errors.workspaceName,
									})}
								/>

								<ZTimezoneSelector
									labelPlacement='stacked'
									label='Workspace timezone (Optional)'
									placeholder='Workspace timezone'
									name='workspaceTimezone'
									value={values.workspaceTimezone}
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									style={{
										'--background': '#fff',
									}}
									testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.workspaceTimezoneInput}-${workspaceId}`}
									testingListSelector={
										CONSTANTS.testingSelectors.workspace.settingsModal.settings
											.workspaceTimezoneInput
									}
									className={classNames({
										'pt-2 ion-margin-top': true,
										'ion-touched': touched.workspaceTimezone,
										'ion-invalid': errors.workspaceTimezone,
										'ion-valid': !errors.workspaceTimezone,
									})}
								/>

								<ZIonRow className='pt-4 ion-align-items-center'>
									<ZIonCol
										size='max-content'
										className='flex ion-align-items-center'
									>
										<ZIonIcon icon={eyeOffOutline} className='w-6 h-6 me-2' />
										<ZIonText>Create new posts as internal</ZIonText>
										<ZIonIcon
											icon={alertCircleOutline}
											className='w-6 h-6 cursor-pointer ms-2'
											id='z-workspace-internal-post'
											testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.internalPostInfoButton}-${workspaceId}`}
											testingListSelector={
												CONSTANTS.testingSelectors.workspace.settingsModal
													.settings.internalPostInfoButton
											}
										/>
										<ZRTooltip
											anchorSelect='#z-workspace-internal-post'
											place='bottom'
											className='z-40 bg-white'
											content='New posts will be visible only for team members.'
										/>
									</ZIonCol>

									<ZIonCol className='ion-text-end'>
										<ZRCSwitch
											testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.internalPostToggler}-${workspaceId}`}
											testingListSelector={
												CONSTANTS.testingSelectors.workspace.settingsModal
													.settings.internalPostToggler
											}
											onChange={(value) => {
												setFieldValue('internalPost', value, false);
											}}
										/>
									</ZIonCol>
								</ZIonRow>

								<div className='w-full mt-2 ion-text-end'>
									<ZIonButton
										testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.updateButton}-${workspaceId}`}
										testingListSelector={
											CONSTANTS.testingSelectors.workspace.settingsModal
												.settings.updateButton
										}
										disabled={
											values.workspaceName ===
												compState.workspace?.workspaceName &&
											values.workspaceTimezone ===
												compState.workspace?.workspaceTimezone &&
											values.internalPost === initialValues?.internalPost
										}
										onClick={() => {
											if (
												values.workspaceName !==
													compState.workspace?.workspaceName ||
												values.workspaceTimezone !==
													compState.workspace?.workspaceTimezone ||
												values.internalPost !==
													compState.workspace?.internalPost
											) {
												void submitForm();
											}
										}}
									>
										Update
									</ZIonButton>
								</div>
							</ZIonCol>
						);
					}}
				</Formik>

				<ZIonCol size='12' className='mt-2'>
					<ZIonText className='block text-lg'>Remove workspace</ZIonText>
					<ZIonText className='block text-sm text-muted'>
						Remove this workspace and erase all data (posts, comments, pages
						etc.). This action is irreversible.
					</ZIonText>

					<ZIonButton
						color='danger'
						className='mt-2 ion-no-margin normal-case'
						testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.deleteButton}-${workspaceId}`}
						testingListSelector={
							CONSTANTS.testingSelectors.workspace.settingsModal.settings
								.deleteButton
						}
						onClick={() => {
							void deleteWorkspace();
						}}
					>
						Remove this workspace
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZSettingsTab;
