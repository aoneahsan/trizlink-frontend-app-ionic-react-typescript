/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ellipsisHorizontalOutline, starOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCardHeader,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonPopover,
} from '@/ZaionsHooks/zionic-hooks';
import { useZRQDeleteRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

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
import classes from './styles.module.css';
import { showSuccessNotification } from '@/utils/notification';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { workspaceFormTabEnum } from '@/types/AdminPanel/workspace';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZWorkspacesCardInterface {
	id?: string;
	workspaceName: string;
	workspacePagesCount: string;
	userAvatar: string;
	lastActive: string;
	workspaceAvatar?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesCard: React.FC<ZWorkspacesCardInterface> = ({
	id,
	workspaceAvatar,
	workspaceName,
	workspacePagesCount,
	userAvatar,
	lastActive,
}) => {
	// Custom Hooks
	const { presentZIonPopover: presentUserInfoPopover } = useZIonPopover(
		ZUserInfoPopover,
		{ showBadges: true }
	); // popover hook to show UserInfoPopover

	const { presentZIonAlert } = useZIonAlert(); // hook to present alert
	const { presentZIonErrorAlert } = useZIonErrorAlert(); // hook to present error alert
	const { zNavigatePushRoute } = useZNavigate();

	const {
		presentZIonPopover: presentWorkspacesActionsPopover,
		dismissZIonPopover: dismissWorkspacesActionsPopover,
	} = useZIonPopover(ZWorkspacesActionPopover, {
		deleteButtonOnClickHn: () => {
			void deleteWorkspaceConfirmModal();
		},
		EditButtonOnClickHn: () => {
			if (id)
				zNavigatePushRoute(
					createRedirectRoute({
						url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
						params: [CONSTANTS.RouteParams.workspace.editWorkspaceIdParam],
						values: [id],
						routeSearchParams: {
							tab: workspaceFormTabEnum.inviteClients,
						},
					})
				);

			dismissWorkspacesActionsPopover();
		},
	}); // popover hook to show UserInfoPopover

	// delete workspace api.
	const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest(
		API_URL_ENUM.workspace_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
	);

	// delete Workspace Confirm Modal.
	const deleteWorkspaceConfirmModal = async () => {
		try {
			if (id && id) {
				await presentZIonAlert({
					header: `Delete Workspace "${workspaceName}"`,
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
			console.error(error);
		}
	};

	/**
	 * removeWorkspace will hit delete workspace folder api
	 */
	const removeWorkspace = async () => {
		try {
			if (id) {
				// hitting the delete api
				await deleteWorkspaceMutate({
					itemIds: [id],
					urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
				});

				// show success message after deleting
				showSuccessNotification(`Workspace deleted successfully.`);

				dismissWorkspacesActionsPopover();
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ZIonCard
			className='zaions__cursor_pointer'
			onClick={() => {
				// Click on card will redirect to view workspace.
				id &&
					zNavigatePushRoute(
						createRedirectRoute({
							url: ZaionsRoutes.AdminPanel.Workspaces.View,
							params: [CONSTANTS.RouteParams.workspace.workspaceId],
							values: [id],
						})
					);
			}}
		>
			<ZIonCardHeader>
				<ZIonRow className='ion-align-items-center'>
					<ZIonCol className='gap-3 d-flex ion-align-items-center'>
						<div
							className={classNames({
								'zaions__w50px zaions__h50px rounded overflow__hidden': true,
								'd-flex ion-align-items-center ion-justify-content-center zaions__primary_bg':
									!workspaceAvatar,
							})}
						>
							{workspaceAvatar && (
								<ZIonImg
									src={
										workspaceAvatar ||
										getUiAvatarApiUrl({ name: workspaceName })
									}
									className='rounded overflow__hidden'
								/>
							)}
						</div>
						<div>
							<ZIonText className='fw-bold d-block fs-6' color='dark'>
								{workspaceName}
							</ZIonText>
							<ZIonText className='d-block zaions__fs_11'>
								{workspacePagesCount} pages
							</ZIonText>
						</div>
					</ZIonCol>

					{/* Add to Favorites button col */}
					<ZIonCol className='ion-text-end me-2'>
						<ZIonButton
							fill='clear'
							className='h-auto mb-1 ion-no-padding ion-no-margin'
						>
							<ZIonIcon icon={starOutline} />
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonCardHeader>

			{/* Card body */}
			<ZIonCardContent>
				<ZIonRow>
					<ZIonCol>
						<ZIonButton
							color='primary'
							fill='solid'
							className={classNames(classes['workspace-user-avatar-button'], {
								'position-relative': true,
							})}
							onClick={(event: unknown) => {
								presentUserInfoPopover({
									_event: event as Event,
									_cssClass: 'zaions_user_info_popover_size',
								});
							}}
						>
							{/* MT */}
							<ZIonImg
								src={userAvatar} // TODO: add getUIAvatar function here
								className='w-100 h-100 zaions-object-fit-cover'
							/>
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>

				{/* Bottom row */}
				<ZIonRow className='mx-2 mt-5'>
					{/* Last active */}
					<ZIonCol>
						<ZIonButton
							fill='clear'
							className='h-auto mb-1 ion-no-padding ion-no-margin text-transform-initial'
							color='dark'
						>
							{lastActive}
						</ZIonButton>
					</ZIonCol>

					{/* actions popover button */}
					<ZIonCol className='ion-text-end'>
						<ZIonButton
							fill='clear'
							className='h-auto mb-1 ion-no-padding ion-no-margin text-transform-initial'
							color='dark'
							onClick={(event: unknown) => {
								presentWorkspacesActionsPopover({
									_event: event as Event,
									_cssClass: 'zaions_workspaces_actions_popover_size',
									_dismissOnSelect: false,
								});
							}}
						>
							<ZIonIcon icon={ellipsisHorizontalOutline} />
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspacesCard;
