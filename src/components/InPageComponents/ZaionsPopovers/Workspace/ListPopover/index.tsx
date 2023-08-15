/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import { useZIonAlert, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import {
	useZGetRQCacheData,
	useZRQDeleteRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	ellipsisHorizontalOutline,
	pencilOutline,
	trashBinOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZWorkspacesListPopover: React.FC<{
	workspaceId: string;
	dismissZIonPopover: (data: string, role: string) => void;
}> = ({ workspaceId, dismissZIonPopover }) => {
	// #region Comp state.
	const [compState, setCompState] = useState<{
		_workspaceId: string;
	}>({
		_workspaceId: '',
	});
	// #endregion

	// #region Custom hooks.
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	// #endregion

	// #region Popover.
	const { presentZIonPopover: presentZWorkspaceActionPopover } = useZIonPopover(
		ZWorkspaceActionPopover,
		{
			workspaceId: compState._workspaceId,
		}
	);
	// #endregion

	const workspacesList =
		extractInnerData<workspaceInterface[]>(
			getRQCDataHandler<workspaceInterface[]>({
				key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
			}) as workspaceInterface[],
			extractInnerDataOptionsEnum.createRequestResponseItems
		) || [];

	return (
		<div className='py-1'>
			<ZIonList lines='none'>
				{workspacesList?.map((el) => (
					<ZIonItem
						minHeight='2.2rem'
						className='cursor-pointer ion-activatable'
						key={el.id}
						testingSelector={
							CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
								.singleWorkspace
						}
						testingListSelector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.singleWorkspace}-${el.id}`}
					>
						<ZIonLabel className='w-full text-sm'>{el.workspaceName}</ZIonLabel>
						<ZIonIcon
							icon={ellipsisHorizontalOutline}
							className='cursor-pointer'
							onClick={(event: unknown) => {
								if (el?.id) {
									setCompState((oldValues) => ({
										...oldValues,
										_workspaceId: el.id!,
									}));

									//
									presentZWorkspaceActionPopover({
										_event: event as Event,
										_cssClass: 'zaions_present_folder_Action_popover_width',
										_dismissOnSelect: false,
									});
								}
							}}
						/>
					</ZIonItem>
				))}
			</ZIonList>
		</div>
	);
};

const ZWorkspaceActionPopover: React.FC<{
	workspaceId: string;
	dismissZIonPopover: (data: string, role: string) => void;
}> = ({ workspaceId, dismissZIonPopover }) => {
	// #region Custom hooks.
	const { presentZIonAlert } = useZIonAlert(); // hook to present alert.
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region
	// delete workspace api.
	const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest(
		API_URL_ENUM.workspace_update_delete,
		[]
	);
	// #endregion

	// #region Functions.
	// delete Workspace Confirm Modal.
	const deleteWorkspaceConfirmModal = async () => {
		try {
			if (workspaceId) {
				await presentZIonAlert({
					header: `Delete Workspace`,
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
				showErrorNotification('Workspace id is undefined :(');
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// removeWorkspace will hit delete workspace folder api
	const removeWorkspace = async () => {
		try {
			if (workspaceId) {
				// hitting the delete api.
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
						// getting all the workspace from RQ cache.
						const _oldWorkspaces =
							extractInnerData<workspaceInterface[]>(
								getRQCDataHandler<workspaceInterface[]>({
									key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
								}) as workspaceInterface[],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						// removing deleted workspace from cache.
						const _updatedWorkspaces = _oldWorkspaces.filter(
							(el) => el.id !== workspaceId
						);

						// Updating data in RQ cache.
						await updateRQCDataHandler<workspaceInterface[] | undefined>({
							key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
							data: _updatedWorkspaces as workspaceInterface[],
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItems,
							updateHoleData: true,
						});

						// show success message after deleting.
						showSuccessNotification(
							MESSAGES.GENERAL.WORKSPACE.WORKSPACE_DELETED
						);
					}
				} else {
					showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
				}

				// Dismiss popover.
				dismissZIonPopover('', '');
			} else {
				showErrorNotification('Workspace id is undefined :(');
			}
		} catch (error) {
			reportCustomError(error);
		}
	};
	// #endregion

	return (
		<ZIonList lines='full' className='ion-no-padding'>
			{/* Edit */}
			<ZIonItem
				minHeight='2.1rem'
				className='cursor-pointer ion-activatable'
				testingSelector={
					CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
						.actionPopover.editWorkspace
				}
				testingListSelector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.actionPopover.editWorkspace}-${workspaceId}`}
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
				testingSelector={
					CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
						.actionPopover.deleteWorkspace
				}
				testingListSelector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.actionPopover.deleteWorkspace}-${workspaceId}`}
				onClick={() => {
					deleteWorkspaceConfirmModal();
				}}
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

export default ZWorkspacesListPopover;
