/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ellipsisVerticalOutline, starOutline } from 'ionicons/icons';
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
		<ZIonCard className='h-[13.4rem]'>
			<ZIonCardHeader>
				<ZIonRow className='ion-align-items-center'>
					<ZIonCol className='flex gap-3 ion-align-items-center'>
						<div
							className={classNames({
								'zaions__w50px zaions__h50px rounded overflow__hidden': true,
								'flex ion-align-items-center ion-justify-content-center zaions__primary_bg':
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
							<ZIonText className='block text-base font-bold' color='dark'>
								{workspaceName}
							</ZIonText>
							<ZIonText className='block zaions__fs_11'>
								{workspacePagesCount} pages
							</ZIonText>
						</div>
					</ZIonCol>

					{/* Add to Favorites button col */}
					<ZIonCol className='ion-text-end'>
						<ZIonButton
							fill='clear'
							className='h-auto mb-1 ion-no-padding ion-no-margin'
						>
							<ZIonIcon icon={starOutline} />
						</ZIonButton>

						<ZIonButton
							fill='clear'
							className='h-auto mb-1 ion-no-padding ion-no-margin text-transform-initial ms-2'
							color='dark'
							onClick={(event: unknown) => {
								presentWorkspacesActionsPopover({
									_event: event as Event,
									_cssClass: 'zaions_workspaces_actions_popover_size',
									_dismissOnSelect: false,
								});
							}}
						>
							<ZIonIcon icon={ellipsisVerticalOutline} />
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonCardHeader>

			{/* Card body */}
			<ZIonCardContent
				className='zaions__cursor_pointer'
				onClick={() => {
					// Click on card will redirect to view workspace.
					id &&
						zNavigatePushRoute(
							createRedirectRoute({
								url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
								params: [
									CONSTANTS.RouteParams.workspace.workspaceId,
									CONSTANTS.RouteParams.folderIdToGetShortLinks,
								],
								values: [id, 'all'],
							})
						);
				}}
			>
				<ZIonRow>
					<ZIonCol>
						<ZIonButton
							color='primary'
							fill='solid'
							className={classNames(classes['workspace-user-avatar-button'], {
								relative: true,
							})}
							onClick={(event: unknown) => {
								presentUserInfoPopover({
									_event: event as Event,
									_cssClass: 'zaions_user_info_popover_size',
								});
							}}
						>
							<ZIonImg
								src={userAvatar || getUiAvatarApiUrl({ name: workspaceName })}
								className='w-[40px] h-[40px] zaions-object-fit-cover'
							/>
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>

				{/* Bottom row */}
				<ZIonRow className='pt-5 mx-2 mt-8'>
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
				</ZIonRow>
			</ZIonCardContent>
		</ZIonCard>
	);
};

export default ZWorkspacesCard;
