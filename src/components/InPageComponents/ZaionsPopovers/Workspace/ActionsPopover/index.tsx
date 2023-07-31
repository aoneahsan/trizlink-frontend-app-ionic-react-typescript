/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	checkmarkOutline,
	pencilOutline,
	peopleOutline,
	pricetagOutline,
	settingsOutline,
	timeOutline,
	trashBinOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormTabEnum,
	workspaceInterface,
	workspaceSettingsModalTabEnum,
	WorkspaceSharingTabEnum,
} from '@/types/AdminPanel/workspace';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import {
	useZGetRQCacheData,
	useZRQDeleteRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

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

const ZWorkspacesActionPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
	zNavigatePushRoute: (_url: string) => void;
	showDeleteWorkspaceOption?: boolean;
	showEditWorkspaceOption?: boolean;
	showManageUserOption?: boolean;
	workspaceId?: string;
}> = ({
	showDeleteWorkspaceOption = true,
	showEditWorkspaceOption = true,
	showManageUserOption = false,
	workspaceId,
	dismissZIonPopover,
	zNavigatePushRoute,
}) => {
	// component states
	const [modalTab, setModalTab] = useState<workspaceSettingsModalTabEnum>();

	// Custom hooks
	const { presentZIonAlert } = useZIonAlert(); // hook to present alert.
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	// Modals
	const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
		ZWorkspacesSettingModal,
		{
			Tab: modalTab,
			workspaceId: workspaceId,
		}
	);
	const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
		ZWorkspacesSharingModal,
		{
			Tab: WorkspaceSharingTabEnum.invite,
		}
	);

	// delete workspace api.
	const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest(
		API_URL_ENUM.workspace_update_delete,
		[]
	);

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
				dismissZIonPopover();
			} else {
				showErrorNotification('Workspace id is undefined :(');
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZIonList lines='none'>
			{/* Manage User */}
			{showManageUserOption && (
				<ZIonItem
					onClick={() => {
						presentWorkspaceSharingModal({
							_cssClass: 'workspace-sharing-modal-size',
						});
					}}
					className='ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='32px'
				>
					<ZIonIcon icon={peopleOutline} className='me-2' />
					<ZIonText className={classNames('text-sm')}>Manage users</ZIonText>
				</ZIonItem>
			)}

			{/* Configure timetable */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.timetable);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});

					dismissZIonPopover();
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer '
				minHeight={'32px'}
			>
				<ZIonIcon icon={timeOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>
					Configure timetable
				</ZIonText>
			</ZIonItem>

			{/* Manage labels */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.labels);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});

					dismissZIonPopover();
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={pricetagOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Manage labels</ZIonText>
			</ZIonItem>

			{/* Manage people */}
			{/* <ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.timetable);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={peopleOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Manage people</ZIonText>
			</ZIonItem> */}

			{/* Settings */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.settings);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});

					dismissZIonPopover();
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={settingsOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Settings</ZIonText>
			</ZIonItem>

			{/* Approvals settings */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.approvals);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});

					dismissZIonPopover();
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={checkmarkOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>
					Approvals settings
				</ZIonText>
			</ZIonItem>

			{/* Edit */}
			{showEditWorkspaceOption && (
				<ZCan havePermission={permissionsEnum.update_workspace}>
					<ZIonItem
						onClick={() => {
							if (workspaceId) {
								zNavigatePushRoute(
									createRedirectRoute({
										url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
										params: [
											CONSTANTS.RouteParams.workspace.editWorkspaceIdParam,
										],
										values: [workspaceId],
										routeSearchParams: {
											tab: workspaceFormTabEnum.inviteClients,
										},
									})
								);

								dismissZIonPopover();
							}
						}}
						className='ion-activatable ion-focusable zaions__cursor_pointer'
						minHeight={'32px'}
					>
						<ZIonIcon icon={pencilOutline} className='me-2' />
						<ZIonText>Edit</ZIonText>
					</ZIonItem>
				</ZCan>
			)}

			{/* Delete */}
			{showDeleteWorkspaceOption && (
				<ZCan havePermission={permissionsEnum.delete_workspace}>
					<ZIonItem
						onClick={async () => {
							await deleteWorkspaceConfirmModal();
						}}
						className='ion-activatable ion-focusable zaions__cursor_pointer'
						minHeight={'32px'}
					>
						<ZIonIcon icon={trashBinOutline} className='me-2' color='danger' />
						<ZIonText color='danger'>Delete</ZIonText>
					</ZIonItem>
				</ZCan>
			)}
		</ZIonList>
	);
};

export default ZWorkspacesActionPopover;
