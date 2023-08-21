/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { helpCircleOutline, notificationsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZHelpCenterPopover from '@/components/InPageComponents/ZaionsPopovers/HelpCenterPopover';
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
} from '@/components/ZIonComponents';
import ZUserProfileButton from '../UserProfileButton';
import ZNotificationPopover from '@/components/InPageComponents/ZaionsPopovers/NotificationPopover';
import ZWorkspaceSwitcher from '../WorkspaceSwitcher';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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
const ZAdminPanelTopBar: React.FC<{ workspaceId?: string }> = ({
	workspaceId,
}) => {
	// #region popovers.
	const { presentZIonPopover: presentZHelpCenterPopover } =
		useZIonPopover(ZHelpCenterPopover);
	const { presentZIonPopover: presentZNotificationPopover } =
		useZIonPopover(ZNotificationPopover);
	// #endregion

	// #region APIs.
	// get workspace data api.
	const { data: currentWorkspaceData, isFetching: isCurrentWorkspaceFetching } =
		useZRQGetRequest<workspaceInterface>({
			_url: API_URL_ENUM.workspace_update_delete,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
				workspaceId || '',
			],
			_authenticated: true,
			_itemsIds: [workspaceId || ''],
			_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
			_shouldFetchWhenIdPassed: !workspaceId ? true : false,
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});
	// #endregion

	const isZFetching = isCurrentWorkspaceFetching;

	return (
		<ZIonRow className='h-[4rem] px-3 zaions__bg_white shadow-[0_3px_6px_#00000029]'>
			{/*  */}
			<ZIonCol className='flex h-full ion-align-items-center'>
				<ZCan havePermissions={[permissionsEnum.viewAny_workspace]}>
					<ZWorkspaceSwitcher workspaceId={workspaceId} />
				</ZCan>
			</ZIonCol>

			{/*  */}
			<ZIonCol className='h-full '></ZIonCol>

			{/*  */}
			<ZIonCol className='flex h-full gap-2 ion-align-items-center ion-justify-content-end'>
				{/* Upgrade button */}
				<ZIonButton
					color='secondary'
					height='2.3rem'
					testingSelector={CONSTANTS.testingSelectors.topBar.upgradeBtn}
				>
					Upgrade
				</ZIonButton>

				{/* Help button */}
				<ZIonButton
					color='tertiary'
					size='small'
					height='2.3rem'
					testingSelector={CONSTANTS.testingSelectors.topBar.helpBtn}
					onClick={(event: unknown) => {
						presentZHelpCenterPopover({
							_event: event as Event,
							_cssClass: 'z-help-center-popover-size',
							_dismissOnSelect: false,
						});
					}}
				>
					<ZIonIcon icon={helpCircleOutline} className='w-7 h-7' />
					{/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
				</ZIonButton>

				{/* Notification button */}
				<ZIonButton
					color='tertiary'
					size='small'
					className='me-3'
					height='2.3rem'
					testingSelector={CONSTANTS.testingSelectors.topBar.notificationBtn}
					onClick={(event: unknown) => {
						presentZNotificationPopover({
							_event: event as Event,
							_cssClass: 'z-notification-popover-size',
							_dismissOnSelect: false,
						});
					}}
				>
					<ZIonIcon icon={notificationsOutline} className='w-6 h-6' />
					{/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
				</ZIonButton>

				{/* User profile button */}
				<ZUserProfileButton />
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZAdminPanelTopBar;
